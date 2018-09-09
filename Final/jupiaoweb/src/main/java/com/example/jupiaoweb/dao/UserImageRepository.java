package com.example.jupiaoweb.dao;

import com.example.jupiaoweb.Model.UserImageEntity;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface UserImageRepository extends MongoRepository<UserImageEntity,String> {
    List<UserImageEntity> findByUserName(String userName);
}
