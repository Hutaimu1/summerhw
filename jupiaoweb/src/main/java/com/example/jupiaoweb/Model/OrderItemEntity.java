package com.example.jupiaoweb.Model;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "orderitem", schema = "jupiao", catalog = "")
@IdClass(OrderItemEntityPK.class)
public class OrderItemEntity {
    private int orderId;
    private int shopcartId;

    @Id
    @Column(name = "order_id")
    public int getOrderId() {
        return orderId;
    }

    public void setOrderId(int orderId) {
        this.orderId = orderId;
    }

    @Id
    @Column(name = "shopcart_id")
    public int getShopcartId() {
        return shopcartId;
    }

    public void setShopcartId(int shopcartId) {
        this.shopcartId = shopcartId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        OrderItemEntity that = (OrderItemEntity) o;
        return orderId == that.orderId &&
                shopcartId == that.shopcartId;
    }

    @Override
    public int hashCode() {

        return Objects.hash(orderId, shopcartId);
    }
}
