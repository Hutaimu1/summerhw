package com.example.jupiaoweb.Service;

import java.text.ParseException;
import java.util.Date;

public interface TrainTicketService {
    String searchTrain(String startPlace, String arrivePlace, String startTime);
    String trainTicketAddToShopCart(int ticketId,String userName,String ticketName,int price,int leftTicket,String description);
    String trainTicketQuickBuy(int ticketId,String userName,String ticketName,int price,int leftTicket,String date,String description);
}
