package com.example.jupiaoweb.Service;

public interface ShopCartService {
    String getShopCartList(String userName);
    String addToShopCart(int ticketId,String userName,String ticketName,int price);
    String updateLeftTicket(int[]shopCartId,int[]count);
    String deleteCartItem(int[] cartItemId);
    String updateCount(int cartItemId,int count);
    String changeChecked(int[] cartItemId);
    String addOrderList(String userName,int totalPrice,String date,int[] shopCartId);
}
