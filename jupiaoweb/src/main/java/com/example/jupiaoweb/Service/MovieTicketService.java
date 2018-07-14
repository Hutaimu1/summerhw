package com.example.jupiaoweb.Service;

public interface MovieTicketService {
    String getMovieTicket(String place);
    String getMovieDate(String place, String movie);
    String getMovieBrand(String place, String movie, String date);
    String getMovieTime(String place, String movie, String date, String brand);
    String getMovieMessage(int id);
    String movieTicketAddToShopCart(int shopCartId,String userName,String ticketName,int price,int leftTicket);
    String movieTicketQuickBuy(int shopCartId,String userName,String ticketName,int price,int leftTicket,String date);
}
