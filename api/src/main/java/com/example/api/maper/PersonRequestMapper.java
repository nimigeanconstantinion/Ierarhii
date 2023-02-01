package com.example.api.maper;

import com.example.api.dtos.PersonDTO;
import com.example.api.model.Manager;
import com.example.api.model.Persoana;
import com.example.api.services.PersoanaServices;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class PersonRequestMapper {
    @Autowired
    private PersoanaServices persoanaServices;

    public PersonRequestMapper(PersoanaServices persoanaServices){
        this.persoanaServices=persoanaServices;
    }


    public Persoana personRequest(PersonDTO personDTO){
        System.out.println("Sunt in dto");
        Persoana p=new Persoana();
        p.setFullname(personDTO.getPersonFullName());
        p.setPosition(personDTO.getPersonPosition());
        p.setAge(personDTO.getPersonAge());
        p.setSalary(personDTO.getPersonSalary());

        if(personDTO.getIdSef()!=null){
            Persoana sef=persoanaServices.getByID(personDTO.getIdSef());
            Manager manager=new Manager();
            manager.setFullname(sef.getFullname());
            manager.setPosition(sef.getPosition());
            manager.setIdManager(personDTO.getIdSef());
            manager.setAge(personDTO.getManagerAge());
            manager.setSalary(personDTO.getManagerSalary());
            p.setParinte(manager);
        }else{
            Manager manager=new Manager();
            p.setParinte(manager);
        }
        return p;


    }
}
