package com.example.jupiaoweb.bean;

public class ShopCart {
    private int id;
    private int ticketId;
    private String name;
    private int price;
    private int count;
    private boolean checked;
    private byte type;
    private int leftTicket;
    private String description;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getTicketId() { return ticketId; }

    public void setTicketId(int ticketId) { this.ticketId = ticketId; }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public boolean isChecked() {
        return checked;
    }

    public void setChecked(boolean checked) {
        this.checked = checked;
    }

    public byte getType() { return type; }

    public void setType(byte type) { this.type = type; }

    public int getLeftTicket(){return leftTicket;}

    public void setLeftTicket(int leftTicket) { this.leftTicket = leftTicket; }

    public String getDescription(){ return description; }

    public void setDescription(String description) { this.description = description; }
}
