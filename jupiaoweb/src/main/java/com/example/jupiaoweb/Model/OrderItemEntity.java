package com.example.jupiaoweb.Model;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "orderitem", schema = "jupiao", catalog = "")
@IdClass(OrderItemEntityPK.class)
public class OrderItemEntity {
    private int orderId;
    private int shopcartId;
    private String shopcartName;
    private int price;
    private int count;

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

    @Basic
    @Column(name = "shopcart_name")
    public String getShopcartName() {
        return shopcartName;
    }

    public void setShopcartName(String shopcartName) {
        this.shopcartName = shopcartName;
    }

    @Basic
    @Column(name = "price")
    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    @Basic
    @Column(name = "count")
    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        OrderItemEntity that = (OrderItemEntity) o;
        return orderId == that.orderId &&
                shopcartId == that.shopcartId &&
                price == that.price &&
                count == that.count &&
                Objects.equals(shopcartName, that.shopcartName);
    }

    @Override
    public int hashCode() {

        return Objects.hash(orderId, shopcartId, shopcartName, price, count);
    }
}
