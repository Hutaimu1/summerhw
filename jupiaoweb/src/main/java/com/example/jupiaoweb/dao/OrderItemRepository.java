package com.example.jupiaoweb.dao;

import com.example.jupiaoweb.Model.OrderItemEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OrderItemRepository  extends JpaRepository<OrderItemEntity, String> {
    @Query("select o from OrderItemEntity o where o.orderId=:orderId")
    List<OrderItemEntity> findByOrderId(@Param("orderId") int orderId);
}
