package com.example.jupiaoweb.bean;

import java.sql.Timestamp;

public class TicketOrder {
    private int orderId;
    private int totalPrice;
    private String date;
    private byte paid;


    public int getOrderId() {
        return orderId;
    }

    public void setOrderId(int orderId) {
        this.orderId = orderId;
    }

    public int getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(int totalPrice) {
        this.totalPrice = totalPrice;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public byte isPaid() {
        return paid;
    }

    public void setPaid(byte paid) {
        this.paid = paid;
    }
}
