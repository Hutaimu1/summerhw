package com.example.jupiaoweb.dao;

import com.example.jupiaoweb.Model.TicketOrderEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.sql.Timestamp;
import java.util.List;

public interface TicketOrderRepository extends JpaRepository<TicketOrderEntity, String> {
    @Query("select o from TicketOrderEntity o where o.userName=:userName")
    List<TicketOrderEntity> findByUserName(@Param("userName") String username);

    @Query("select o from TicketOrderEntity o where o.orderId=:orderId")
    List<TicketOrderEntity> findByOrderId(@Param("orderId") int orderId);

    @Query("select o from TicketOrderEntity o where o.userName=:userName and o.date=:date")
    List<TicketOrderEntity> findByUserNameAndDate(@Param("userName") String userName, @Param("date")Timestamp date);

}
