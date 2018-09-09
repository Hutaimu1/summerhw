package com.example.jupiaoweb.dao;

import com.example.jupiaoweb.Model.MovieFieldEntity;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface MovieFieldRepository extends MongoRepository<MovieFieldEntity, String> {
    List<MovieFieldEntity> findByPlaceAndMovie(String place,String movie);

    List<MovieFieldEntity> findByPlaceAndMovieAndDate(String place,String movie,String date);

    List<MovieFieldEntity> findByPlaceAndMovieAndDateAndBrand(String place,String movie,String date,String brand);

}
