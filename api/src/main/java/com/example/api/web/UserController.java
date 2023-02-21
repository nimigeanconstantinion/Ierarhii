package com.example.api.web;

import com.example.api.dtos.LoginResponse;
import com.example.api.dtos.RegisterResponse;
import com.example.api.dtos.UserDTO;
import com.example.api.jwt.JWTTokenProvider;
import com.example.api.model.User;
import com.example.api.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import static com.example.api.constants.Utils.*;

@RestController
@RequestMapping(path = { "/api/v1/ierarhii"})
@CrossOrigin
@Slf4j
public class UserController {
    private UserRepository userRepository;
    private AuthenticationManager authenticationManager;
    private JWTTokenProvider jwtTokenProvider;

    public UserController(UserRepository userRepository,AuthenticationManager authenticationManager,JWTTokenProvider jwtTokenProvider){
        this.userRepository=userRepository;
        this.authenticationManager=authenticationManager;
        this.jwtTokenProvider=jwtTokenProvider;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody UserDTO user) {
        authenticate(user.getEmail(), user.getPassword());
        User loginUser = userRepository.getUserByEmail(user.getEmail()).get();
        User userPrincipal = new User(loginUser.getEmail(), loginUser.getPassword());
        HttpHeaders jwtHeader = getJwtHeader(loginUser);
     //   Long userId= this.userRepository.getUserByEmail(user.getEmail()).get().getId();
        LoginResponse loginResponse= new LoginResponse(loginUser.getId(), loginUser.getEmail(),jwtHeader.getFirst(JWT_TOKEN_HEADER));
        return new ResponseEntity<>(loginResponse, jwtHeader, HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<RegisterResponse> addUser(@RequestBody UserDTO user){
        this.userRepository.save(new User(user.getEmail(),user.getPassword()));
        User loginUser = userRepository.getUserByEmail(user.getEmail()).get();
        HttpHeaders jwtHeader = getJwtHeader(loginUser);
        Long userId= this.userRepository.getUserByEmail(user.getEmail()).get().getId();
        RegisterResponse registerResponse= new RegisterResponse(userId, user.getEmail(),jwtHeader.getFirst(JWT_TOKEN_HEADER));
        authenticate(user.getEmail(), user.getPassword());

        return  new ResponseEntity<>(registerResponse,jwtHeader, HttpStatus.OK);
    }



    private HttpHeaders getJwtHeader(User user) {
        HttpHeaders headers = new HttpHeaders();
        headers.add(JWT_TOKEN_HEADER, jwtTokenProvider.generateJwtToken(user));

        return headers;
    }

    private void authenticate(String username, String password) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
    }
}
