package com.example.jupiaoweb.Service;

public interface ShopCartService {
    String getShopCartList(String userName);
    String updateLeftTicket(int[]ticketId,int[]count,int[] type);
    String addToShopCart(int ticketId,String userName,String ticketName,int price);
    String deleteCartItem(int[] cartItemId);
    String updateCount(int cartItemId,int count);
    String changeChecked(int[] cartItemId);
    String addToOrderNotPaidList(String userName,int totalPrice,String date,int[] shopCartId);
}
