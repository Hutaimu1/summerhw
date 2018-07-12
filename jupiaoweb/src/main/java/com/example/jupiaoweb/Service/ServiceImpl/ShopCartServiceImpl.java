package com.example.jupiaoweb.Service.ServiceImpl;

import com.example.jupiaoweb.Model.OrderItemEntity;
import com.example.jupiaoweb.Model.ShopCartEntity;
import com.example.jupiaoweb.Model.TicketOrderEntity;
import com.example.jupiaoweb.Model.TrainTicketEntity;
import com.example.jupiaoweb.Service.ShopCartService;
import com.example.jupiaoweb.bean.ShopCart;
import com.example.jupiaoweb.bean.TrainTicket;
import com.example.jupiaoweb.dao.OrderItemRepository;
import com.example.jupiaoweb.dao.ShopCartRepository;
import com.example.jupiaoweb.dao.TicketOrderRepository;
import com.example.jupiaoweb.dao.TrainTicketRepository;
import com.google.gson.Gson;

import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;


@Service
public class ShopCartServiceImpl implements ShopCartService {

    @Resource
    private ShopCartRepository shopCartRepository;

    @Resource
    private TicketOrderRepository ticketOrderRepository;

    @Resource
    private OrderItemRepository orderItemRepository;

    @Resource
    private TrainTicketRepository trainTicketRepository;

    @Override
    public String getShopCartList(String userName){
        List<ShopCartEntity> result = shopCartRepository.findByUserName(userName);
        Gson gson = new Gson();
        List<ShopCart> res = new ArrayList<>();
        for (ShopCartEntity aResult : result) {
            if(aResult.getIsBuy() == 0){
                ShopCart shop = new ShopCart();
                shop.setId(aResult.getShopcartId());
                shop.setName(aResult.getTicketName());
                shop.setCount(aResult.getCount());
                shop.setPrice(aResult.getPrice());
                shop.setLeftTicket(aResult.getLeftTicket());
                if ((aResult.getIsCheck() & 0xFF) == 1) {
                    shop.setChecked(true);
                } else {
                    shop.setChecked(false);
                }
                res.add(shop);
            }
        }
        return gson.toJson(res);
    }

    @Override
    public String updateLeftTicket(int[]shopCartId,int[]count){
        int len = shopCartId.length;
        Gson gson = new Gson();
        for(int i = 0;i<len;++i){
            TrainTicketEntity trainTicket = trainTicketRepository.findByTicketId(shopCartId[i]).get(0);
            int leftTicket = trainTicket.getLeftTicket()-count[i];
            if(leftTicket < 0){
                return gson.toJson(false);
            }
            trainTicket.setLeftTicket(leftTicket);
            trainTicketRepository.save(trainTicket);
        }
        return gson.toJson(true);
    }

    @Override
    public String deleteCartItem(int[] cartItemId){
        List<ShopCartEntity> result = new ArrayList<>();
        for (int aCartItemId : cartItemId) {
            result.add(shopCartRepository.findByShopcartId(aCartItemId).get(0));
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

    @Override
    public String addToShopCart(int ticketId,String userName,String ticketName,int price){
        ShopCartEntity shopCart = new ShopCartEntity();
        shopCart.setUserName(userName);
        shopCart.setPrice(price);
        shopCart.setTicketName(ticketName);
        shopCart.setIsCheck((byte)0);
        shopCart.setCount(1);
        shopCart.setShopcartId(ticketId);
        shopCartRepository.save(shopCart);

        Gson gson = new Gson();
        return gson.toJson(true);
    }

    @Override
    public String addOrderList(String userName,int totalPrice,String date,int[] shopCartId){
        int len = shopCartId.length;
        TicketOrderEntity newTicketOrder = new TicketOrderEntity();
        newTicketOrder.setUserName(userName);
        newTicketOrder.setTotalPrice(totalPrice);
        newTicketOrder.setIsPaid((byte)0);
        Timestamp ts = Timestamp.valueOf(date);
        newTicketOrder.setDate(ts);
        ticketOrderRepository.save(newTicketOrder);
        TicketOrderEntity result = ticketOrderRepository.findByUserNameAndDate(userName,ts).get(0);
        int orderId = result.getOrderId();
        for(int i = 0;i< len;++i){
            ShopCartEntity shopCart = shopCartRepository.findByShopcartId(shopCartId[i]).get(0);
            shopCart.setIsBuy((byte)1);
            shopCartRepository.save(shopCart);
            OrderItemEntity newOrderItem = new OrderItemEntity();
            newOrderItem.setShopcartId(shopCartId[i]);
            newOrderItem.setOrderId(orderId);
            orderItemRepository.save(newOrderItem);
        }
        Gson gson = new Gson();
        return gson.toJson(orderId);
    }

}