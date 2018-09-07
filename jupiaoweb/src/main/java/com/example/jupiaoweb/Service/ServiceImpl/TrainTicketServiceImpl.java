package com.example.jupiaoweb.Service.ServiceImpl;

import com.example.jupiaoweb.Model.OrderItemEntity;
import com.example.jupiaoweb.Model.ShopCartEntity;
import com.example.jupiaoweb.Model.TicketOrderEntity;
import com.example.jupiaoweb.Model.TrainTicketEntity;
import com.example.jupiaoweb.Service.TrainTicketService;
import com.example.jupiaoweb.bean.MonthReport;
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
import java.util.Calendar;
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
    public String searchTrain(String startPlace, String arrivePlace, String startTime) {
        Gson gson = new Gson();
        SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy-MM-dd");
        SimpleDateFormat sdf2 = new SimpleDateFormat("HH:mm");
        List<TrainTicketEntity> result = trainTicketRepository.findByStartPlaceAndArrviePlace(startPlace, arrivePlace);
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
    public String trainTicketAddToShopCart(int ticketId, String userName, String ticketName, int price, int leftTicket, String description) {
        Gson gson = new Gson();
        List<ShopCartEntity> myShopCartEntity = shopCartRepository.findExistingTrainTicket(userName, ticketId);
        if (myShopCartEntity.size() != 0) {
            int count = myShopCartEntity.get(0).getCount();
            int leftTrainTicket = trainTicketRepository.findByTicketId(ticketId).get(0).getLeftTicket();
            System.out.println(leftTrainTicket);
            if (leftTrainTicket >= (count + 1)) {
                myShopCartEntity.get(0).setCount(myShopCartEntity.get(0).getCount() + 1);
                shopCartRepository.save(myShopCartEntity.get(0));
                return gson.toJson(1);
            } else {
                return gson.toJson(2);
            }
        }
        ShopCartEntity newShopCart = new ShopCartEntity();
        newShopCart.setTicketId(ticketId);
        newShopCart.setUserName(userName);
        newShopCart.setTicketName(ticketName);
        newShopCart.setPrice(price);
        newShopCart.setCount(1);
        newShopCart.setIsCheck((byte) 0);
        newShopCart.setIsBuy((byte) 0);
        newShopCart.setType((byte) 0);
        newShopCart.setLeftTicket(leftTicket);
        newShopCart.setDescription(description);
        shopCartRepository.save(newShopCart);
        gson.toJson(0);
        return gson.toJson(0);
    }

    @Override
    public String trainTicketQuickBuy(int ticketId, String userName, String ticketName, int price, int leftTicket, String date, String description) {
        Gson gson = new Gson();
        ShopCartEntity newShopCart = new ShopCartEntity();
        newShopCart.setTicketId(ticketId);
        newShopCart.setUserName(userName);
        newShopCart.setTicketName(ticketName);
        newShopCart.setPrice(price);
        newShopCart.setCount(1);
        newShopCart.setIsCheck((byte) 0);
        newShopCart.setIsBuy((byte) 1);
        newShopCart.setType((byte) 0);
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
        int shopCartId = shopCartRepository.getMaxId();
        System.out.println(shopCartId);
        int orderId = ticketOrderRepository.getMaxId();
        System.out.println(orderId);
        OrderItemEntity newOrderItem = new OrderItemEntity();
        newOrderItem.setOrderId(orderId);
        newOrderItem.setShopcartId(shopCartId);
        orderItemRepository.save(newOrderItem);
        return gson.toJson(true);
    }

    @Override
    public String addTrainTicket(String ticketName, String startPlace, String arrivePlace, String startTime, int time, int leftTicket, int price) {
        Gson gson = new Gson();
        TrainTicketEntity t = new TrainTicketEntity();
        int index = trainTicketRepository.getRowNumber() + 1;
        t.setTicketId(index);
        t.setModel(ticketName);
        t.setStartPlace(startPlace);
        t.setArrivePlace(arrivePlace);
        Timestamp ts = new Timestamp(System.currentTimeMillis());
        try {
            ts = Timestamp.valueOf(startTime);
        } catch (Exception e) {
            e.printStackTrace();
        }
        t.setStartTime(ts);
        t.setSpendTime(time);
        Date d1 = new Date(ts.getTime() + time * 60000);
        Date d2 = new Date(ts.getTime());
        SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
        SimpleDateFormat sdf2 = new SimpleDateFormat("HH:mm");
        t.setArriveTime(Timestamp.valueOf(sdf1.format(d1)));
        t.setLeftTicket(leftTicket);
        t.setPrice(price);
        trainTicketRepository.save(t);
        TrainTicket res = new TrainTicket();
        res.setId(index);
        res.setModel(ticketName);
        res.setStart(sdf2.format(d2));
        res.setTime(time);
        res.setArrive(sdf2.format(d1));
        res.setLeft(leftTicket);
        res.setPrice(price);
        return gson.toJson(res);
    }

    @Override
    public String deleteTrainTicket(int[] ticketId) {
        Gson gson = new Gson();
        for (int aTicketId : ticketId) {
            TrainTicketEntity t = trainTicketRepository.findByTicketId(aTicketId).get(0);
            trainTicketRepository.delete(t);
        }
        return gson.toJson(true);
    }

    @Override
    public String editTrainTicket(int ticketId, String ticketName, String startTime, int time, int leftTicket, int price) {
        Gson gson = new Gson();
        TrainTicketEntity t = trainTicketRepository.findByTicketId(ticketId).get(0);
        t.setModel(ticketName);
        Timestamp ts = new Timestamp(System.currentTimeMillis());
        try {
            System.out.println(startTime);
            ts = Timestamp.valueOf(startTime);
        } catch (Exception e) {
            e.printStackTrace();
        }
        t.setStartTime(ts);
        t.setSpendTime(time);
        Date d1 = new Date(ts.getTime() + time * 60000);
        Date d2 = new Date(ts.getTime());
        SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
        SimpleDateFormat sdf2 = new SimpleDateFormat("HH:mm");
        t.setArriveTime(Timestamp.valueOf(sdf1.format(d1)));
        t.setLeftTicket(leftTicket);
        t.setPrice(price);
        trainTicketRepository.save(t);
        TrainTicket res = new TrainTicket();
        res.setId(ticketId);
        res.setModel(ticketName);
        res.setStart(sdf2.format(d2));
        res.setTime(time);
        res.setArrive(sdf2.format(d1));
        res.setLeft(leftTicket);
        res.setPrice(price);
        return gson.toJson(res);
    }
}