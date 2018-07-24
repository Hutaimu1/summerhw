package com.example.jupiaoweb.Service;

public interface TicketOrderService {
    String getOrderNotPaidList(String userName);
    String showOrderDetail(int orderId);
    String deleteOrder(int orderId);
    String addToHistoryOrder(int orderId);
    String getHistoryOrderList(String userName);
    String deleteHistoryOrder(int[] orderIdArray);
    String getAllOrderList();
}
