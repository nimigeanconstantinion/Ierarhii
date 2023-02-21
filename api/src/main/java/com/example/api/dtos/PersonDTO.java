package com.example.api.dtos;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class PersonDTO {
    private Long idPerson;
    private String personFullName,personPosition;
    private int personAge,personSalary;
    private Long idSef;
    private String managerFullName,managerPosition;
    private int managerAge,managerSalary;

    public PersonDTO(long idPerson,long idSef){
        this.idPerson=idPerson;
        this.idSef=idSef;
    }

    public PersonDTO(String personFullName,String personPosition,int personAge,int personSalary,Long idSef){
        this.personFullName=personFullName;
        this.personPosition=personPosition;
        this.personAge=personAge;
        this.personSalary=personSalary;
        this.idSef=idSef;
    }


}
