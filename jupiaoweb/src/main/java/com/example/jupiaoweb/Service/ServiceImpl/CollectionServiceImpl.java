package com.example.jupiaoweb.Service.ServiceImpl;

import com.example.jupiaoweb.Model.CollectionEntity;
import com.example.jupiaoweb.Model.MovieEntity;
import com.example.jupiaoweb.Service.CollectionService;
import com.example.jupiaoweb.bean.Movie;
import com.example.jupiaoweb.dao.CollectionRepository;
import com.example.jupiaoweb.dao.MovieRepository;
import com.google.gson.Gson;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

@Service
public class CollectionServiceImpl implements CollectionService {
    @Resource
    private CollectionRepository collectionRepository;

    @Resource
    private MovieRepository movieRepository;

    @Override
    public String getCollection(String userName){
        Gson gson = new Gson();
        List<CollectionEntity> myCollection = collectionRepository.findByUserName(userName);
        List<Movie> res = new ArrayList<>();
        for(CollectionEntity oneCollection : myCollection){
            if(oneCollection.getType() == (byte)1){
                MovieEntity result = movieRepository.findByMovieId(oneCollection.getTicketId()).get(0);
                Movie m = new Movie();
                m.setId(result.getMovieId());
                m.setSrc(result.getUrl());
                m.setTitle(result.getMovieName());
                m.setRate(result.getRate());
                res.add(m);
            }
        }
        return gson.toJson(res);
    }

    @Override
    public String deleteFromCollection(String userName,int ticketId){
        Gson gson = new Gson();
        List<CollectionEntity> myCollection = collectionRepository.findByUserName(userName);
        for(CollectionEntity oneCollection : myCollection){
            if(oneCollection.getTicketId() == ticketId){
                collectionRepository.delete(oneCollection);
                return gson.toJson(true);
            }
        }
        return gson.toJson(false);
    }
}
