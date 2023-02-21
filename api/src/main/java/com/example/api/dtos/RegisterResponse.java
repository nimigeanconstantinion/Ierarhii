package com.example.api.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RegisterResponse {
    private long id;
    private String email;
    private String tokenHeader;


}
