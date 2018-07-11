package com.example.jupiaoweb.Service;

public interface ShopCartService {
    String getShopCartList(String userName);
    String addToShopCart(int ticketId,String userName,String ticketName,int price);
    String deleteCartItem(int[] cartItemId);
    String updateCount(int cartItemId,int count);
    String changeChecked(int[] cartItemId);
}
