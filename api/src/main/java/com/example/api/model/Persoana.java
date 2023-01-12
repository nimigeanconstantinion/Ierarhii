package com.example.api.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

@Entity(name="Persoana")
@Table(name="persoane")
public class Persoana {
    @Id
    @SequenceGenerator(
            name="pers_sequence",
            sequenceName = "pers_sequence",
            allocationSize = 1

    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "pers_sequence"
    )
    private Long id;

    private String fullname;


    private String position;

    @Embedded
    @AttributeOverride(name="fullname",column=@Column(name="manager_fullname"))
    @AttributeOverride(name="position",column=@Column(name="manager_position"))
 //   @AttributeOverride(name="id",column=@Column(name="manager_id"))
    private Manager parinte;

    public boolean equals(Object p){
        Persoana x=(Persoana) p;
        return x.getFullname().equals(this.getFullname());
    }
}
