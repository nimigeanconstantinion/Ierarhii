package com.example.api.web;

import com.example.api.dtos.PersonDTO;
import com.example.api.dtos.PersonResponse;
import com.example.api.maper.PersonRequestMapper;
import com.example.api.model.Persoana;
import com.example.api.services.PersoanaServices;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/ierarhii")
@CrossOrigin
public class PersoanaController {

    private PersoanaServices persoanaServices;
    private PersonRequestMapper personRequestMapper;

    public PersoanaController(PersoanaServices persoanaServices,PersonRequestMapper personRequestMapper){
        this.persoanaServices=persoanaServices;
        this.personRequestMapper=personRequestMapper;

    }


    @GetMapping("")
    @PreAuthorize("hasAnyRole('ROLE_USER')")
    public ResponseEntity<PersonResponse<List<Persoana>>> getIerarhie(){
        List<Persoana> persoane=persoanaServices.getAll();
        return new ResponseEntity<>(new PersonResponse<>(persoane),HttpStatus.OK);
    }

    @GetMapping("/all")

    public List<Persoana> getIerarhie2(){
        List<Persoana> persoane=persoanaServices.getAll();
        return persoane;
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/getp/{idP}")
    public Persoana getPers(@PathVariable long idP){
        return persoanaServices.getByID(idP);
    }


    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/getch/{idP}")
    public List<Persoana> getChildren(@PathVariable Long idP)
    {
        return persoanaServices.getChildren(idP);

    }


    @ResponseStatus(HttpStatus.OK)
    @PostMapping("/addp")
    public PersonDTO addPers(@RequestBody PersonDTO persoanaDTO) throws RuntimeException {
        Persoana p=personRequestMapper.personRequest(persoanaDTO);
        try{
            persoanaServices.addPerson(p);
            return persoanaDTO;
        }catch (Exception e){
            throw new RuntimeException("Nu pot adauga mai mult de 2 subalterni");
        }
    }

    @ResponseStatus(HttpStatus.OK)
    @PostMapping("/addnp")
    public Persoana addNewPers(@RequestBody PersonDTO persoanaDTO) throws RuntimeException {
        Persoana p=personRequestMapper.personRequest(persoanaDTO);
        try{
            persoanaServices.addPerson(p);
            return p;
        }catch (Exception e){
            throw new RuntimeException("Nu pot adauga mai mult de 2 subalterni");
        }
    }

    @ResponseStatus
    @DeleteMapping("/delP/{idPers}")
    public void delPers(@PathVariable Long idPers) throws RuntimeException{
        try{
            persoanaServices.deletePersonAndAllChildren(persoanaServices.getByID(idPers));
        }catch (Exception e){
            throw new RuntimeException("Nu pot sterge persoana si toti copiii");
        }
    }



}
