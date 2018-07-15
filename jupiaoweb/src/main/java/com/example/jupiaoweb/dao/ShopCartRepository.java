package com.example.jupiaoweb.dao;

import com.example.jupiaoweb.Model.ShopCartEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ShopCartRepository extends JpaRepository<ShopCartEntity, String> {
    @Query("select s from ShopCartEntity s where s.userName=:userName")
    List<ShopCartEntity> findByUserName(@Param("userName") String username);

    @Query("select s from ShopCartEntity s where s.shopcartId=:cartItemId")
    List<ShopCartEntity> findByShopcartId(@Param("cartItemId") int cartItemId);

    @Query("select s from ShopCartEntity s where s.ticketId=:ticketId")
    List<ShopCartEntity> findByTicketId(@Param("ticketId") int ticketId);

    @Query("select s from ShopCartEntity s where s.userName=:userName and s.ticketName=:ticketName and s.description=:description")
    List<ShopCartEntity> findByUserNameAndTicketNameAndDescription(@Param("userName") String username,
                                        @Param("ticketName")String ticketName,
                                        @Param("description") String description);

    @Query("select s from ShopCartEntity s where s.ticketId=:ticketId and s.userName=:userName")
    List<ShopCartEntity> findByTicketIdAndAndUserName(@Param("ticketId") int ticketId,@Param("userName") String username);
}
