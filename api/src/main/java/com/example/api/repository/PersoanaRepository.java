package com.example.api.repository;

import com.example.api.model.Persoana;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PersoanaRepository extends JpaRepository<Persoana,Long> {
    @Query("select p from Persoana p where p.id=?1")
    Optional<Persoana> getByMyId(Long idP);

    @Query("select p from Persoana p where p.parinte.idManager = ?1")
    List<Persoana> getChildrenByParinte(Long idP);

    @Query("select p from Persoana p where p.fullname=?1")
    List<Persoana> getPersonsByFullName(String fullname);
}

