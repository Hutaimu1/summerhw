package com.example.jupiaoweb.dao;

import com.example.jupiaoweb.Model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserRepository extends JpaRepository<UserEntity, String> {
    @Query("select count(u) from UserEntity u")
    int getRowNumber();

    @Query("select u from UserEntity u where u.userName=:userName")
    List<UserEntity> findByUsername(@Param("userName") String userName);

    @Query("select u from UserEntity u where u.phoneNumber=:phone")
    List<UserEntity> findByPhoneNumber(@Param("phone") String phone);

    @Query("select u from UserEntity u where u.qq=:qq")
    List<UserEntity> findByQq(@Param("qq") String qq);

    @Query("select u from UserEntity u where u.eMail=:email")
    List<UserEntity> findByEMail(@Param("email") String email);

    @Query("select u from UserEntity u where u.userName=:userName and u.password=:password")
    List<UserEntity> findByUsernameAndPassword(@Param("userName") String userName, @Param("password") String password);
}
