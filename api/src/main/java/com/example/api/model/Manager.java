package com.example.api.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.AttributeOverride;
import javax.persistence.Embeddable;
import javax.persistence.Embedded;
import java.io.Serializable;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Embeddable
public class Manager implements Serializable{

    private long idManager;
    private String fullname;
    private String position;
    private int age,salary;



}
