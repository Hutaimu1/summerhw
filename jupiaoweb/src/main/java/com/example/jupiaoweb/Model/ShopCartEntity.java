package com.example.jupiaoweb.Model;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "shopcart", schema = "jupiao", catalog = "")
public class ShopCartEntity {
    private int shopcartId;
    private String userName;
    private String ticketName;
    private int price;
    private int count;
    private byte isCheck;
    private int leftTicket;
    private byte isBuy;

    @Id
    @Column(name = "shopcart_id")
    public int getShopcartId() {
        return shopcartId;
    }

    public void setShopcartId(int shopcartId) {
        this.shopcartId = shopcartId;
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
    @Column(name = "ticket_name")
    public String getTicketName() {
        return ticketName;
    }

    public void setTicketName(String ticketName) {
        this.ticketName = ticketName;
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

    @Basic
    @Column(name = "is_check")
    public byte getIsCheck() {
        return isCheck;
    }

    public void setIsCheck(byte isCheck) {
        this.isCheck = isCheck;
    }

    @Basic
    @Column(name = "left_ticket")
    public int getLeftTicket() {
        return leftTicket;
    }

    public void setLeftTicket(int leftTicket) {
        this.leftTicket = leftTicket;
    }

    @Basic
    @Column(name = "is_buy")
    public byte getIsBuy() {
        return isBuy;
    }

    public void setIsBuy(byte isBuy) {
        this.isBuy = isBuy;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ShopCartEntity that = (ShopCartEntity) o;
        return shopcartId == that.shopcartId &&
                price == that.price &&
                count == that.count &&
                isCheck == that.isCheck &&
                leftTicket == that.leftTicket &&
                isBuy == that.isBuy &&
                Objects.equals(userName, that.userName) &&
                Objects.equals(ticketName, that.ticketName);
    }

    @Override
    public int hashCode() {

        return Objects.hash(shopcartId, userName, ticketName, price, count, isCheck, leftTicket, isBuy);
    }
}
