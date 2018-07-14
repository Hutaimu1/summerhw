package com.example.jupiaoweb.Service.ServiceImpl;

import com.example.jupiaoweb.Model.MovieEntity;
import com.example.jupiaoweb.Model.MovieFieldEntity;
import com.example.jupiaoweb.Service.MovieTicketService;
import com.example.jupiaoweb.bean.Movie;
import com.example.jupiaoweb.dao.MovieFieldRepository;
import com.example.jupiaoweb.dao.MovieRepository;
import com.google.gson.Gson;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

@Service
public class MovieTicketServiceImpl implements MovieTicketService {

    @Resource
    private MovieRepository movieRepository;

    @Resource
    private MovieFieldRepository movieFieldRepository;

    @Override
    public String getMovieTicket(String place){
        Gson gson = new Gson();
        List<Movie> res = new ArrayList<>();
        List<MovieEntity> result = movieRepository.findByPlaceContaining(place);
        for (MovieEntity aResult : result) {
            Movie m = new Movie();
            m.setId(aResult.getMovieId());
            m.setSrc(aResult.getUrl());
            m.setTitle(aResult.getMovieName());
            m.setRate(aResult.getRate());
            res.add(m);
        }
        return gson.toJson(res);
    }

    @Override
    public String getMovieDate(String place, String movie){
        Gson gson = new Gson();
        List<String> res = new ArrayList<>();
        List<MovieFieldEntity> result = movieFieldRepository.findByPlaceAndMovie(place,movie);
        for (MovieFieldEntity aResult : result) {
            if (res.indexOf(aResult.getDate()) == -1)
            {
                res.add(aResult.getDate());
            }
        }
        return gson.toJson(res);
    }

    @Override
    public String getMovieBrand(String place, String movie, String date){
        Gson gson = new Gson();
        List<String> res = new ArrayList<>();
        List<MovieFieldEntity> result = movieFieldRepository.findByPlaceAndMovieAndDate(place, movie, date);
        for (MovieFieldEntity aResult : result) {
            res.add(aResult.getBrand());
        }
        return gson.toJson(res);
    }

    @Override
    public String getMovieTime(String place, String movie, String date, String brand){
        Gson gson = new Gson();
        List<MovieFieldEntity> result = movieFieldRepository.findByPlaceAndMovieAndDateAndBrand(place, movie, date, brand);
        return gson.toJson(result.get(0).getTime());
    }

    @Override
    public String getMovieMessage(int id){
        Gson gson = new Gson();
        List<MovieEntity> results = movieRepository.findByMovieId(id);
        MovieEntity result = results.get(0);
        Movie movie = new Movie();
        movie.setId(result.getMovieId());
        movie.setRate(result.getRate());
        movie.setSrc(result.getUrl());
        movie.setTitle(result.getMovieName());
        movie.setDate(result.getDate());
        movie.setDirector(result.getDirector());
        movie.setLanguage(result.getLanguage());
        movie.setLength(result.getLength());
        movie.setMade(result.getMade());
        movie.setNumberOfComments(result.getNumberOfComments());
        movie.setOthers(result.getOthers());
        movie.setScreenwriter(result.getScreenwriter());
        movie.setType(result.getType());
        System.out.println(movie.getTitle());
        return gson.toJson(movie);
    }


}