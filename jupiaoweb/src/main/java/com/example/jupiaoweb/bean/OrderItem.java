package com.example.jupiaoweb.bean;

public class OrderItem {
    private int orderId;
    private String name;
    private int count;
    private int price;
    public int getOrderId() {
        return orderId;
    }

    public String getName() {
        return name;
    }

    public int getCount() {
        return count;
    }

    public int getPrice() {
        return price;
    }
    public void setOrderId(int id) {
        this.orderId = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public void setPrice(int price) {
        this.price = price;
    }
}
