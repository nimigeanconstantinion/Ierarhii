package com.example.api.security;

import com.example.api.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetailsService;

public class UserDetailsImp implements UserDetailsService {
    private UserRepository userRepository;
    
}
