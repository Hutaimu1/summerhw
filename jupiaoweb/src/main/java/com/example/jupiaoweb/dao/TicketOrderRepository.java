package com.example.jupiaoweb.dao;

import com.example.jupiaoweb.Model.TicketorderEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.sql.Timestamp;
import java.util.List;

public interface TicketOrderRepository extends JpaRepository<TicketorderEntity, String> {
    @Query("select o from TicketorderEntity o where o.userName=:userName")
    List<TicketorderEntity> findByUserName(@Param("userName") String username);

    @Query("select o from TicketorderEntity o where o.orderId=:orderId")
    List<TicketorderEntity> findByOrderId(@Param("orderId") String orderid);

    @Query("select o from TicketorderEntity o where o.userName=:userName and o.date=:date")
    List<TicketorderEntity> findByUserNameAndDate(@Param("userName") String username, @Param("date")Timestamp date);
}
