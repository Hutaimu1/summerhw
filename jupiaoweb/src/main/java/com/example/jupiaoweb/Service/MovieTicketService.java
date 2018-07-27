package com.example.jupiaoweb.Service;

public interface MovieTicketService {
    String getAllMovie();
    String getMovieTicket(String place);
    String getMovieDate(String place, String movie);
    String getMovieBrand(String place, String movie, String date);
    String getMovieTime(String place, String movie, String date, String brand);
    String getMovieMessage(int id);
    String movieTicketAddToShopCart(int ticketId,String userName,String ticketName,int price,int leftTicket,String description);
    String movieTicketQuickBuy(int ticketId,String userName,String ticketName,int price,int leftTicket,String date,String description);
    String addMovieTicket(String movie,String place,String date,String brand,String time);
}
