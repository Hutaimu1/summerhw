package com.example.jupiaoweb.Service;

public interface ShopCartService {
    String getShopCartList(String userName);
    String deleteCartItem(int cartItemId);
    String updateCount(int cartItemId,int count);
    String removeAllFlag(int[] cartItemArr);
}
