package com.example.api.web;

import com.example.api.dtos.PersonDTO;
import com.example.api.dtos.PersonResponse;
import com.example.api.maper.PersonRequestMapper;
import com.example.api.model.Manager;
import com.example.api.model.Persoana;
import com.example.api.services.PersoanaServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.management.RuntimeErrorException;
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
    public ResponseEntity<PersonResponse<List<Persoana>>> getIerarhie(){
        List<Persoana> persoane=persoanaServices.getAll();
        return new ResponseEntity<>(new PersonResponse<>(persoane),HttpStatus.OK);
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


}
