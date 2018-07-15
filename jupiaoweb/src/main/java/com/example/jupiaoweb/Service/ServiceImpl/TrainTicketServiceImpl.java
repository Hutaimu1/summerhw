package com.example.jupiaoweb.Service.ServiceImpl;

import com.example.jupiaoweb.Model.OrderItemEntity;
import com.example.jupiaoweb.Model.ShopCartEntity;
import com.example.jupiaoweb.Model.TicketOrderEntity;
import com.example.jupiaoweb.Model.TrainTicketEntity;
import com.example.jupiaoweb.Service.TrainTicketService;
import com.example.jupiaoweb.bean.TrainTicket;
import com.example.jupiaoweb.dao.OrderItemRepository;
import com.example.jupiaoweb.dao.ShopCartRepository;
import com.example.jupiaoweb.dao.TicketOrderRepository;
import com.example.jupiaoweb.dao.TrainTicketRepository;
import com.google.gson.Gson;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@Service
public class TrainTicketServiceImpl implements TrainTicketService {

    @Resource
    private TrainTicketRepository trainTicketRepository;

    @Resource
    private ShopCartRepository shopCartRepository;

    @Resource
    private TicketOrderRepository ticketOrderRepository;

    @Resource
    private OrderItemRepository orderItemRepository;


    @Override
    public String searchTrain(String startPlace, String arrivePlace, String startTime){
        Gson gson = new Gson();
        SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy-MM-dd");
        SimpleDateFormat sdf2 = new SimpleDateFormat("HH:mm");
        List<TrainTicketEntity> result = trainTicketRepository.findByStartPlaceAndArrviePlace(startPlace,arrivePlace);
        List<TrainTicket> res = new ArrayList<>();
        for (TrainTicketEntity aResult : result) {
            Date date = new Date(aResult.getStartTime().getTime());
            if (sdf1.format(date).equals(startTime)) {
                TrainTicket t = new TrainTicket();
                t.setId(aResult.getTicketId());
                t.setModel(aResult.getModel());
                t.setStart(sdf2.format(aResult.getStartTime()));
                t.setTime(aResult.getSpendTime());
                t.setArrive(sdf2.format(aResult.getArriveTime()));
                t.setLeft(aResult.getLeftTicket());
                t.setPrice(aResult.getPrice());
                res.add(t);
            }
        }
        return gson.toJson(res);
    }



    @Override
    public String trainTicketAddToShopCart(int ticketId,String userName,String ticketName,int price,int leftTicket,String description){
        Gson gson = new Gson();
        List<ShopCartEntity> myShopCartEntity = shopCartRepository.findByUserNameAndTicketNameAndDescription(userName,ticketName,description);
        if(myShopCartEntity.size() != 0 && (myShopCartEntity.get(0).getIsBuy() == 0)){
            List<ShopCartEntity> shopCartEntity = shopCartRepository.findByTicketId(ticketId);
            int count = 0;
            int  leftTrainTicket = trainTicketRepository.findByTicketId(ticketId).get(0).getLeftTicket();
            for(ShopCartEntity oneShopCart:shopCartEntity){
                int tempCount = oneShopCart.getCount();
                count += tempCount;
                if(leftTrainTicket >= (count + 1)){
                    myShopCartEntity.get(0).setCount(myShopCartEntity.get(0).getCount() + 1);
                    shopCartRepository.save(myShopCartEntity.get(0));
                    return gson.toJson(1);
                }
                else{
                    return gson.toJson(2);
                }
            }
        }
        ShopCartEntity newShopCart = new ShopCartEntity();
        newShopCart.setTicketId(ticketId);
        newShopCart.setUserName(userName);
        newShopCart.setTicketName(ticketName);
        newShopCart.setPrice(price);
        newShopCart.setCount(1);
        newShopCart.setIsCheck((byte)0);
        newShopCart.setIsBuy((byte)0);
        newShopCart.setType((byte)0);
        newShopCart.setLeftTicket(leftTicket);
        newShopCart.setDescription(description);
        shopCartRepository.save(newShopCart);
        gson.toJson(0);
        return gson.toJson(0);
    }

    @Override
    public String trainTicketQuickBuy(int ticketId,String userName,String ticketName,int price,int leftTicket,String date,String description){
        Gson gson = new Gson();
        List<ShopCartEntity> myShopCartEntity = shopCartRepository.findByUserNameAndTicketNameAndDescription(userName,ticketName,description);
        if((myShopCartEntity.size() != 0) && (myShopCartEntity.get(0).getIsBuy() == 0)){
            return gson.toJson(false);
        }
        ShopCartEntity newShopCart = new ShopCartEntity();
        newShopCart.setTicketId(ticketId);
        newShopCart.setUserName(userName);
        newShopCart.setTicketName(ticketName);
        newShopCart.setPrice(price);
        newShopCart.setCount(1);
        newShopCart.setIsCheck((byte)0);
        newShopCart.setIsBuy((byte)1);
        newShopCart.setType((byte)0);
        newShopCart.setLeftTicket(leftTicket);
        newShopCart.setDescription(description);
        shopCartRepository.save(newShopCart);
        TrainTicketEntity newTrainTicket = trainTicketRepository.findByTicketId(ticketId).get(0);
        newTrainTicket.setLeftTicket(newTrainTicket.getLeftTicket() - 1);
        trainTicketRepository.save(newTrainTicket);
        TicketOrderEntity newTicketOrder = new TicketOrderEntity();
        newTicketOrder.setIsPaid((byte) 0);
        newTicketOrder.setTotalPrice(price);
        newTicketOrder.setUserName(userName);
        Timestamp ts = Timestamp.valueOf(date);
        newTicketOrder.setDate(ts);
        ticketOrderRepository.save(newTicketOrder);
        TicketOrderEntity result = ticketOrderRepository.findByUserNameAndDate(userName,ts).get(0);
        int orderId = result.getOrderId();
        ShopCartEntity newShopCartEntity = shopCartRepository.findByTicketIdAndAndUserName(ticketId,userName).get(0);
        int shopCartId = newShopCartEntity.getShopcartId();
        OrderItemEntity newOrderItem = new OrderItemEntity();
        newOrderItem.setOrderId(orderId);
        newOrderItem.setShopcartId(shopCartId);
        orderItemRepository.save(newOrderItem);
        return gson.toJson(true);
    }
}