package com.example.jupiaoweb.Model;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Objects;

@Entity
@Table(name = "ticketorder", schema = "jupiao", catalog = "")
public class TicketOrderEntity {
    private int orderId;
    private String userName;
    private byte isPaid;
    private Timestamp date;
    private Integer totalPrice;

    @Id
    @Column(name = "order_id")
    public int getOrderId() {
        return orderId;
    }

    public void setOrderId(int orderId) {
        this.orderId = orderId;
    }

    @Basic
    @Column(name = "user_name")
    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    @Basic
    @Column(name = "is_paid")
    public byte getIsPaid() {
        return isPaid;
    }

    public void setIsPaid(byte isPaid) {
        this.isPaid = isPaid;
    }

    @Basic
    @Column(name = "date")
    public Timestamp getDate() {
        return date;
    }

    public void setDate(Timestamp date) {
        this.date = date;
    }

    @Basic
    @Column(name = "total_price")
    public Integer getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Integer totalPrice) {
        this.totalPrice = totalPrice;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TicketOrderEntity that = (TicketOrderEntity) o;
        return orderId == that.orderId &&
                isPaid == that.isPaid &&
                Objects.equals(userName, that.userName) &&
                Objects.equals(date, that.date) &&
                Objects.equals(totalPrice, that.totalPrice);
    }

    @Override
    public int hashCode() {

        return Objects.hash(orderId, userName, isPaid, date, totalPrice);
    }
}
