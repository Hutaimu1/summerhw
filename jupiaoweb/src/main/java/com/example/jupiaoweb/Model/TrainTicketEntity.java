package com.example.jupiaoweb.Model;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Objects;

@Entity
@Table(name = "trainticket", schema = "jupiao", catalog = "")
public class TrainTicketEntity {
    private int ticketId;
    private String startPlace;
    private String arrivePlace;
    private String model;
    private Timestamp startTime;
    private int spendTime;
    private Timestamp arriveTime;
    private int price;
    private int leftTicket;

    @Id
    @Column(name = "ticket_id")
    public int getTicketId() {
        return ticketId;
    }

    public void setTicketId(int ticketId) {
        this.ticketId = ticketId;
    }

    @Basic
    @Column(name = "start_place")
    public String getStartPlace() {
        return startPlace;
    }

    public void setStartPlace(String startPlace) {
        this.startPlace = startPlace;
    }

    @Basic
    @Column(name = "arrive_place")
    public String getArrivePlace() {
        return arrivePlace;
    }

    public void setArrivePlace(String arrviePlace) {
        this.arrivePlace = arrviePlace;
    }

    @Basic
    @Column(name = "model")
    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    @Basic
    @Column(name = "start_time")
    public Timestamp getStartTime() {
        return startTime;
    }

    public void setStartTime(Timestamp startTime) {
        this.startTime = startTime;
    }

    @Basic
    @Column(name = "spend_time")
    public int getSpendTime() {
        return spendTime;
    }

    public void setSpendTime(int spendTime) {
        this.spendTime = spendTime;
    }

    @Basic
    @Column(name = "arrive_time")
    public Timestamp getArriveTime() {
        return arriveTime;
    }

    public void setArriveTime(Timestamp arriveTime) {
        this.arriveTime = arriveTime;
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
    @Column(name = "left_ticket")
    public int getLeftTicket() {
        return leftTicket;
    }

    public void setLeftTicket(int leftTicket) {
        this.leftTicket = leftTicket;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TrainTicketEntity that = (TrainTicketEntity) o;
        return ticketId == that.ticketId &&
                spendTime == that.spendTime &&
                price == that.price &&
                leftTicket == that.leftTicket &&
                Objects.equals(startPlace, that.startPlace) &&
                Objects.equals(arrivePlace, that.arrivePlace) &&
                Objects.equals(model, that.model) &&
                Objects.equals(startTime, that.startTime) &&
                Objects.equals(arriveTime, that.arriveTime);
    }

    @Override
    public int hashCode() {

        return Objects.hash(ticketId, startPlace, arrivePlace, model, startTime, spendTime, arriveTime, price, leftTicket);
    }
}
