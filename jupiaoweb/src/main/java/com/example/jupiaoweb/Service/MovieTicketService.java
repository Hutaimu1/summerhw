package com.example.jupiaoweb.Service;

public interface MovieTicketService {
    String getMovieTicket(String place);
    String getMovieDate(String place, String movie);
    String getMovieBrand(String place, String movie, String date);
    String getMovieTime(String place, String movie, String date, String brand);
    String getMovieMessage(int id);
    String movieTicketAddToShopCart(int ticketId,String userName,String ticketName,int price,int leftTicket,String description);
    String movieTicketQuickBuy(int ticketId,String userName,String ticketName,int price,int leftTicket,String date,String description);
}
