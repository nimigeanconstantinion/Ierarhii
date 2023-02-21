package com.example.api.model;

import com.example.api.security.UserRole;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import com.example.api.security.UserPermission;
import com.example.api.security.UserRole;

import javax.persistence.*;
import java.util.*;

@Data
@AllArgsConstructor
@NoArgsConstructor

@Entity(name = "User")
@Table(name = "user")

public class User implements UserDetails {

    @Id
    @SequenceGenerator(
            name = "user_sequence",
            sequenceName = "user_sequence",
            allocationSize = 1

    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "user_sequence"
    )
    private Long id;
    private String name;
    private String email;
    private String password;

//    @OneToMany(
//            mappedBy = "user",
//            cascade = CascadeType.ALL,
//            orphanRemoval = true
//    )
//    @JsonManagedReference
//    @LazyCollection(LazyCollectionOption.FALSE)
//    @JsonManagedReference
//    @OneToMany(cascade=CascadeType.ALL, fetch=FetchType.LAZY, mappedBy="user")
      @OneToMany(mappedBy="user",fetch = FetchType.EAGER)
      @JsonManagedReference
      @JsonIgnore
//private Set<Item> items;
        Set<Persoana> roots = new HashSet<>();

    public User(String name,String email,String password){
        this.name=name;
        this.email=email;
        this.password= new BCryptPasswordEncoder().encode(password);

    }
    public User(String email,String password){
        this.email=email;
        this.password= new BCryptPasswordEncoder().encode(password);
    }
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return UserRole.USER.getGrantedAuthorities();
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

}
