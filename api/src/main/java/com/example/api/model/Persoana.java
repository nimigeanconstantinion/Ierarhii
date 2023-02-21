package com.example.api.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
    private int age;
    private int salary;

//    public Persoana(String fullname,String position,int age,int salary,Manager manager){
//        this.fullname=fullname;
//        this.position=position;
//        this.parinte=manager;
//        this.age=age;
//        this.salary=salary;
//    }
    @Embedded
    @AttributeOverride(name="fullname",column=@Column(name="manager_fullname"))
    @AttributeOverride(name="position",column=@Column(name="manager_position"))
    @AttributeOverride(name="age",column=@Column(name="manager_age"))
    @AttributeOverride(name="salary",column=@Column(name="manager_salary"))

   // @AttributeOverride(name="id",column=@Column(name="manager_id"))
    private Manager parinte;


    @ManyToOne(
            fetch = FetchType.LAZY
    )

    @JoinColumn(
            name="user_id",
            referencedColumnName = "id"
    )
    @JsonBackReference
    @JsonIgnore
    private User user;

    public boolean equals(Object p){
        Persoana x=(Persoana) p;
        return x.getFullname().equals(this.getFullname());
    }
}
