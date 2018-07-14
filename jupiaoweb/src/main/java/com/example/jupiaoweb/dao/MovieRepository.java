package com.example.jupiaoweb.dao;

import com.example.jupiaoweb.Model.MovieEntity;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface MovieRepository extends MongoRepository<MovieEntity, String> {
    List<MovieEntity> findByPlaceContaining(String place);

    List<MovieEntity> findByMovieId(int id);
}
