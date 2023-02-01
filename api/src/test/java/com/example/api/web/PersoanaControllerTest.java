package com.example.api.web;

import com.example.api.ApiApplication;
import com.example.api.model.Manager;
import com.example.api.model.Persoana;
import com.example.api.repository.PersoanaRepository;
import com.example.api.services.PersoanaServices;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.contains;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(SpringExtension.class)
@SpringBootTest(classes = ApiApplication.class)
 //need this in Spring Boot test
    @AutoConfigureMockMvc
class PersoanaControllerTest {

    @MockBean
    private PersoanaRepository persoanaRepository;

    @Autowired
    private PersoanaServices persoanaServices;


    @Autowired
    private MockMvc mockMvc;

    @Test
    void getIerarhie() throws Exception {
//        Manager m=new Manager();
        Manager m=new Manager(1L,"manager","CEO",30,7000);
        Persoana p=new Persoana(2L,"kjklllh","tehnic",30,8000,m);
        List<Persoana> lista=new ArrayList<>();

        lista.add(p);
        ObjectMapper mapper=new ObjectMapper();
        when(persoanaRepository.findAll()).thenReturn(lista);
        List<Persoana> lista2=new ArrayList<>();
        Persoana p2=new Persoana(3L,"kjklllh","tehnic",30,8000,m);

       // lista2.add(new Persoana(3L,));
        MvcResult resultActions=mockMvc.perform(MockMvcRequestBuilders.get("http://localhost:8080/api/v1/ierarhii")
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().json(mapper.writeValueAsString(lista))).andReturn();

        System.out.println(resultActions.getResponse().getContentAsString());
    }
}