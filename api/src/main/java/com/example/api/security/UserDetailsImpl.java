package com.example.api.security;

import com.example.api.model.User;
import com.example.api.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

@Component
public class UserDetailsImpl implements UserDetailsService {
    private UserRepository userRepository;
    public UserDetailsImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    @Override
    public UserDetails loadUserByUsername(String s) throws RuntimeException {
        User user=userRepository.getUserByEmail(s).get();
        if(user!=null){
            return user;
        }

        throw new RuntimeException(
                "User with email " +s+" not found"
        );
    }
}
