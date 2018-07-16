package com.example.jupiaoweb.bean;

public class detailOrder {
    private int orderId;
    private String name;
    private int price;
    private int count;
    private String description;


    public int getOrderId() {
        return orderId;
    }

    public String getName() {
        return name;
    }

    public int getPrice() {
        return price;
    }

    public int getCount() {
        return count;
    }

    public void setOrderId(int orderId) {
        this.orderId = orderId;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public String getDescription(){return description;}

    public void setDescription(String description) { this.description = description; }
}
