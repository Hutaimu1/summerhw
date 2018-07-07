package com.example.jupiaoweb.Service.ServiceImpl;

import com.example.jupiaoweb.Model.ShopCartEntity;
import com.example.jupiaoweb.Service.ShopCartService;
import com.example.jupiaoweb.bean.ShopCart;
import com.example.jupiaoweb.dao.ShopCartRepository;
import com.google.gson.Gson;

import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;


@Service
public class ShopCartServiceImpl implements ShopCartService {

    @Resource
    private ShopCartRepository shopCartRepository;

    @Override
    public String getShopCartList(String userName){
        List<ShopCartEntity> result = shopCartRepository.findByUserName(userName);
        Gson gson = new Gson();
        List<ShopCart> res = new ArrayList<>();
        for (ShopCartEntity aResult : result) {
            ShopCart shop = new ShopCart();
            shop.setKey(aResult.getShopcartId());
            shop.setId(aResult.getShopcartId());
            shop.setName(aResult.getTicketName());
            shop.setCount(aResult.getCount());
            shop.setPrice(aResult.getPrice());
            if ((aResult.getIsCheck() & 0xFF) == 1) {
                shop.setChecked(true);
            } else {
                shop.setChecked(false);
            }
            res.add(shop);
        }
        return gson.toJson(res);
    }

    @Override
    public String deleteCartItem(int[] cartItemId){
        List<ShopCartEntity> result = new ArrayList<>();
        for(int i = 0;i<cartItemId.length;++i){
            result.add(shopCartRepository.findByShopcartId(cartItemId[i]).get(0));
        }
        Gson gson = new Gson();
        if(result.size() == 0){
            return gson.toJson(false);
        }
        else {
            for(ShopCartEntity s:result){
                shopCartRepository.delete(s);
            }
            return gson.toJson(true);
        }
    }

    @Override
    public String updateCount(int cartItemId,int count){
        List<ShopCartEntity> result = shopCartRepository.findByShopcartId(cartItemId);
        Gson gson = new Gson();
        if(result.size() == 0){
            return gson.toJson(false);
        }
        else {
            if(count == 0){
                shopCartRepository.delete(result.get(0));
            }
            else{
                result.get(0).setCount(count);
                shopCartRepository.save(result.get(0));
            }
            return gson.toJson(true);
        }
    }
    @Override
    public String changeChecked(int[] cartItemId){
        List<ShopCartEntity> result = new ArrayList<>();
        int temp = cartItemId.length;
        for(int i = 0;i<temp;++i){
            result.add(shopCartRepository.findByShopcartId(cartItemId[i]).get(0));
        }
        Gson gson = new Gson();
        if(result.size()==0){
            return gson.toJson(false);

        }
        else{
            for(ShopCartEntity aResult:result){
                if(aResult.getIsCheck() == (byte)1){
                    aResult.setIsCheck((byte)0);
                    shopCartRepository.save(aResult);
                }
                else{
                    aResult.setIsCheck((byte)1);
                    shopCartRepository.save(aResult);
                }
            }
                return gson.toJson(true);
        }
    }

}