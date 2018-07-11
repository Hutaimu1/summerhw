package com.example.jupiaoweb.dao;

import com.example.jupiaoweb.Model.MovieTicketEntity;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface MovieTicketRepository extends MongoRepository<MovieTicketEntity, String> {
    List<MovieTicketEntity> findByPlace(String place);
}
