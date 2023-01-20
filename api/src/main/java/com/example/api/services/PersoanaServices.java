package com.example.api.services;

import com.example.api.model.Manager;
import com.example.api.model.Persoana;
import com.example.api.repository.PersoanaRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PersoanaServices {
    private PersoanaRepository persoanaRepository;
    public PersoanaServices(PersoanaRepository persoanaRepository){
        this.persoanaRepository=persoanaRepository;
    }

    public List<Persoana> getAll(){
        return persoanaRepository.findAll();
    }

    public Persoana getRoot(Persoana p){
        Persoana parinte=persoanaRepository.findById(p.getParinte().getIdManager()).get();
        while(parinte!=null){
            parinte=persoanaRepository.findById(parinte.getParinte().getIdManager()).get();
        }
        return parinte;
    }



    public List<Persoana> getChildren(Long idP){
        return persoanaRepository.getChildrenByParinte(idP);
    }

    public Persoana addPerson(Persoana persoana){
            List<Persoana> listaCopii=persoanaRepository.getChildrenByParinte(persoana.getParinte().getIdManager());
            if(listaCopii.size()<=1) {
                persoanaRepository.save(persoana);
                return persoana;
            }else {
                throw new RuntimeException("Eroare mai mult de 2 copii");
            }

    }

    public void deletePersonAndAllChildren(Persoana p){
        List<Persoana> listaCopii=loadAllChildren(p);
        for (Persoana per:listaCopii) {
                persoanaRepository.delete(per);
        };
    }

    public List<Persoana> loadAllChildren(Persoana origin){
        List<Persoana> allCh=new ArrayList<>();
        List<Persoana> nivel=new ArrayList<>();
        nivel.add(origin);
        allCh.add(origin);
        boolean sw=true;
        while(sw){
            List<Persoana> level=new ArrayList<>();

            for (Persoana p:nivel
                 ) {
                level.addAll(getChildren(p.getId()));
            }
            if(level.size()==0){
                sw=false;

            }else{
                allCh.addAll(level);
                nivel=level;
            }
        }
        return allCh;
    }


    public void removePersoana(Persoana persoana){
        persoanaRepository.delete(persoana);
    }

    public Persoana getByID(long id){
        return persoanaRepository.getByMyId(id).get();
    }


}
