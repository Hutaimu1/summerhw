package com.example.jupiaoweb.Service;

import java.text.ParseException;
import java.util.Date;

public interface TrainTicketService {
    String searchTrain(String startPlace, String arrivePlace, String startTime);
    String trainTicketAddToShopCart(int shopCartId,String userName,String ticketName,int price,int leftTicket);
    String trainTicketQuickBuy(int shopCartId,String userName,String ticketName,int price,int leftTicket,String date);
}
