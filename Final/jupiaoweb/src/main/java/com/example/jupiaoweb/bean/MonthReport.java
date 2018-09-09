package com.example.jupiaoweb.bean;

public class MonthReport {
    private int id;
    private String time;
    private int sales;
    private int lastSales;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public int getSales() {
        return sales;
    }

    public void setSales(int sales) {
        this.sales = sales;
    }

    public int getLastSales() {
        return lastSales;
    }

    public void setLastSales(int lastSales) {
        this.lastSales = lastSales;
    }
}
