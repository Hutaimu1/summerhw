package com.example.jupiaoweb.Service;
import java.sql.Timestamp;

public interface TicketOrderService {
    String getOrderNotPaidList(String userName);
    String addOrderList(String userName, int totalPrice, String dateTime,int[]cartId,String[]cartName,int[]price,int[]count);
    String showOrderDetail(int orderId);
}
