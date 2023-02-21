package com.example.api.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.annotation.ParametersAreNonnullByDefault;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponse {
    private long id;
    private String email;
    private String tokenHeader;


}
