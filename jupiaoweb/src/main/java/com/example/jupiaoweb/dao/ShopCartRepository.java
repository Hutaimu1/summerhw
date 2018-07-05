package com.example.jupiaoweb.dao;

import com.example.jupiaoweb.Model.ShopCartEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ShopCartRepository extends JpaRepository<ShopCartEntity, String> {
    @Query("select s from ShopCartEntity s where s.userName=:userName")
    List<ShopCartEntity> findByUserName(@Param("userName") String username);
}
