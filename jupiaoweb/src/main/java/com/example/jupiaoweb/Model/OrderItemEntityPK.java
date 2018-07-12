package com.example.jupiaoweb.Model;

import javax.persistence.Column;
import javax.persistence.Id;
import java.io.Serializable;
import java.util.Objects;

public class OrderItemEntityPK implements Serializable {
    private int orderId;
    private int shopcartId;

    @Column(name = "order_id")
    @Id
    public int getOrderId() {
        return orderId;
    }

    public void setOrderId(int orderId) {
        this.orderId = orderId;
    }

    @Column(name = "shopcart_id")
    @Id
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
        OrderItemEntityPK that = (OrderItemEntityPK) o;
        return orderId == that.orderId &&
                shopcartId == that.shopcartId;
    }

    @Override
    public int hashCode() {

        return Objects.hash(orderId, shopcartId);
    }
}
