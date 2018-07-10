package com.example.jupiaoweb.bean;

import java.sql.Timestamp;

public class TicketOrder {
    private int orderId;
    private int totalPrice;
    private String date;
    private boolean paid;

    public int getOrderId(){return orderId;}
    public void setOrderId(int orderid){this.orderId=orderid;}
    public int getTotalPrice(){return totalPrice;}
    public void setTotalPrice(int totalprice){this.totalPrice=totalprice;}
    public String getDate(){return date;}
    public void setDate(String date){this.date=date;}
    public boolean isPaid(){return paid;}
    public void setPaid(boolean paid){this.paid=paid;}
}
