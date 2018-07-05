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
            shop.setId(aResult.getShopcartId());
            shop.setName(aResult.getTicketName());
            shop.setCount(aResult.getCount());
            shop.setPrice(aResult.getPrice());
            shop.setSrc(aResult.getSrc());
            if ((aResult.getIsCheck() & 0xFF) == 1) {
                shop.setChecked(true);
            } else {
                shop.setChecked(false);
            }
            res.add(shop);
        }
        return gson.toJson(res);
    }
}