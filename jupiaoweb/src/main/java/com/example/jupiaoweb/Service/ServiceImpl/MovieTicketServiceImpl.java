package com.example.jupiaoweb.Service.ServiceImpl;

import com.example.jupiaoweb.Model.MovieTicketEntity;
import com.example.jupiaoweb.Service.MovieTicketService;
import com.example.jupiaoweb.bean.MovieTicket;
import com.example.jupiaoweb.dao.MovieTicketRepository;
import com.google.gson.Gson;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

@Service
public class MovieTicketServiceImpl implements MovieTicketService {

    @Resource
    private MovieTicketRepository movieTicketRepository;

    @Override
    public String getMovieTicket(String place){
        Gson gson = new Gson();
        List<MovieTicket> res = new ArrayList<>();
        List<MovieTicketEntity> result = movieTicketRepository.findByPlace(place);
        for (MovieTicketEntity aResult : result) {
            MovieTicket m = new MovieTicket();
            m.setId(aResult.getMovie_id());
            m.setSrc(aResult.getUrl());
            m.setTitle(aResult.getMovie_name());
            m.setRate(aResult.getRate());
            res.add(m);
        }
        return gson.toJson(res);
    }
}