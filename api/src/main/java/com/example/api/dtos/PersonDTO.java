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
    private Long idSef;
    private String managerFullName,managerPosition;

    public PersonDTO(long idPerson,long idSef){
        this.idPerson=idPerson;
        this.idSef=idSef;
    }

    public PersonDTO(String personFullName,String personPosition,Long idSef){
        this.personFullName=personFullName;
        this.personPosition=personPosition;
        this.idSef=idSef;
    }


}
