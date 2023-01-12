package com.example.api.services;

import com.example.api.ApiApplication;
import com.example.api.model.Persoana;
import com.example.api.repository.PersoanaRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.inject.Inject;
import com.jayway.jsonpath.JsonPath;
import org.json.JSONObject;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.asm.TypeReference;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


@TestPropertySource(
        locations="classpath:application.properties"
)
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ApiApplication.class)
@AutoConfigureMockMvc //need this in Spring Boot test

class PersoanaServicesTest {

    @MockBean
    private PersoanaRepository persoanaRepository;

    @Autowired
    private PersoanaServices persoanaServices;


    @Autowired
    private MockMvc mockMvc;


    @Test
    void getAll() throws Exception {
        Persoana p=new Persoana();
        List<Persoana> lista=new ArrayList<>();
        ObjectMapper mapper = new ObjectMapper();

         mockMvc.perform(MockMvcRequestBuilders.get("http://localhost:8080/api/v1/ierarhii")
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").value(contains("Ion")));


    }

    @Test
    void getRoot() {
    }

    @Test
    void getChildren() {
    }

    @Test
    void addPerson() {
    }

    @Test
    void getByID() {
    }

    public static String asJsonString(final Object obj) throws JsonProcessingException {
        try{
            return new ObjectMapper().writeValueAsString(obj);

        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }
}