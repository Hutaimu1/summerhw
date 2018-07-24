package com.example.jupiaoweb.Service.ServiceImpl;

import com.example.jupiaoweb.Model.OrderItemEntity;
import com.example.jupiaoweb.Model.ShopCartEntity;
import com.example.jupiaoweb.Model.TicketOrderEntity;
import com.example.jupiaoweb.Model.TrainTicketEntity;
import com.example.jupiaoweb.Service.TicketOrderService;
import com.example.jupiaoweb.bean.TicketOrder;
import com.example.jupiaoweb.bean.detailOrder;
import com.example.jupiaoweb.dao.OrderItemRepository;
import com.example.jupiaoweb.dao.ShopCartRepository;
import com.example.jupiaoweb.dao.TicketOrderRepository;
import com.example.jupiaoweb.dao.TrainTicketRepository;
import com.google.gson.Gson;
import org.springframework.stereotype.Service;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.Resource;

@Service
public class TicketOrderServiceImpl implements TicketOrderService {
    @Resource
    private TicketOrderRepository ticketOrderRepository;

    @Resource
    private OrderItemRepository orderItemRepository;

    @Resource
    private ShopCartRepository shopCartRepository;

    @Resource
    private TrainTicketRepository trainTicketRepository;

    @Override
    public String getOrderNotPaidList(String userName){
        Gson gson = new Gson();
        List<TicketOrderEntity> order = ticketOrderRepository.findByUserName(userName);
        List<TicketOrder> result = new ArrayList<>();
        for(TicketOrderEntity aOrder:order){
            if(aOrder.getIsPaid()== (byte)0){
                TicketOrder ticketOrder = new TicketOrder();
                ticketOrder.setOrderId(aOrder.getOrderId());
                ticketOrder.setTotalPrice(aOrder.getTotalPrice());
                String tsStr = "";
                DateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                tsStr = sdf.format(aOrder.getDate());
                ticketOrder.setDate(tsStr);
                ticketOrder.setPaid((byte)0);
                ticketOrder.setUserName(userName);
                result.add(ticketOrder);
            }
        }
        return gson.toJson(result);
    }

    @Override
    public String showOrderDetail(int orderId){
        List<OrderItemEntity> allDetailOrder = orderItemRepository.findByOrderId(orderId);
        List<detailOrder> result = new ArrayList<>();
        for(OrderItemEntity oneOrder:allDetailOrder){
            int shopCartId = oneOrder.getShopcartId();
            ShopCartEntity oneShopCart = shopCartRepository.findByShopcartId(shopCartId).get(0);
            detailOrder oneItem = new detailOrder();
            oneItem.setOrderId(oneShopCart.getShopcartId());
            oneItem.setName(oneShopCart.getTicketName());
            oneItem.setCount(oneShopCart.getCount());
            oneItem.setPrice(oneShopCart.getPrice());
            oneItem.setDescription(oneShopCart.getDescription());
            result.add(oneItem);
        }
        Gson gson = new Gson();
        return gson.toJson(result);
    }

    @Override
    public String deleteOrder(int orderId){
        TicketOrderEntity ticketOrder = ticketOrderRepository.findByOrderId(orderId).get(0);
        ticketOrder.setIsPaid((byte)1);
        ticketOrderRepository.save(ticketOrder);
        List<OrderItemEntity> orderItem = orderItemRepository.findByOrderId(orderId);
        for(OrderItemEntity oneOrder:orderItem){
            int shopCartId = oneOrder.getShopcartId();
            ShopCartEntity shopCartEntity = shopCartRepository.findByShopcartId(shopCartId).get(0);
            byte type = shopCartEntity.getType();
            if(type == 0){
                int count = shopCartEntity.getCount();
                int ticketId = shopCartEntity.getTicketId();
                TrainTicketEntity oneShopCart = trainTicketRepository.findByTicketId(ticketId).get(0);
                oneShopCart.setLeftTicket(oneShopCart.getLeftTicket() + count);
                trainTicketRepository.save(oneShopCart);
            }
        }
        Gson gson = new Gson();
        return gson.toJson(true);
    }

    @Override
    public String addToHistoryOrder(int orderId){
        Gson gson = new Gson();
        List<TicketOrderEntity> ticketOrder = ticketOrderRepository.findByOrderId(orderId);
        if(ticketOrder.size() == 0){
            return gson.toJson(false);
        }
        else{
            TicketOrderEntity ticket = ticketOrder.get(0);
            ticket.setIsPaid((byte)3);
            ticketOrderRepository.save(ticket);
            List<OrderItemEntity> orderItem = orderItemRepository.findByOrderId(orderId);
            for(OrderItemEntity oneOrderItem:orderItem){
                int shopCartId = oneOrderItem.getShopcartId();
                ShopCartEntity shopCart = shopCartRepository.findByShopcartId(shopCartId).get(0);
                shopCart.setIsBuy((byte)1);
                shopCartRepository.save(shopCart);
            }
            return gson.toJson(true);
        }
    }

    @Override
    public String getHistoryOrderList(String userName){
        Gson gson = new Gson();
        List<TicketOrderEntity> order = ticketOrderRepository.findByUserName(userName);
        List<TicketOrder> result = new ArrayList<>();
        for(TicketOrderEntity aOrder:order){
            if(aOrder.getIsPaid() != (byte)0){
                TicketOrder ticketOrder = new TicketOrder();
                ticketOrder.setOrderId(aOrder.getOrderId());
                ticketOrder.setTotalPrice(aOrder.getTotalPrice());
                String tsStr = "";
                DateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                tsStr = sdf.format(aOrder.getDate());
                ticketOrder.setDate(tsStr);
                ticketOrder.setPaid(aOrder.getIsPaid());
                ticketOrder.setUserName(userName);
                result.add(ticketOrder);
            }
        }
        return gson.toJson(result);
    }

    @Override
    public String deleteHistoryOrder(int[] orderIdArray){
        Gson gson = new Gson();
        if(orderIdArray.length == 0){
            return gson.toJson(false);
        }
        for(int orderId:orderIdArray){
            List<OrderItemEntity> orderItem = orderItemRepository.findByOrderId(orderId);
            TicketOrderEntity ticketOrder = ticketOrderRepository.findByOrderId(orderId).get(0);
            for(OrderItemEntity oneOrder:orderItem){
                int shopCartId = oneOrder.getShopcartId();
                ShopCartEntity shopCart = shopCartRepository.findByShopcartId(shopCartId).get(0);
                orderItemRepository.delete(oneOrder);
                shopCartRepository.delete(shopCart);
            }
            ticketOrderRepository.delete(ticketOrder);
        }
        return gson.toJson(true);
    }

    @Override
    public String getAllOrderList(){
        List<TicketOrderEntity> result = ticketOrderRepository.findAll();
        List<TicketOrder> res = new ArrayList<>();
        Gson gson = new Gson();
        for (TicketOrderEntity aResult : result) {
            TicketOrder t = new TicketOrder();
            t.setUserName(aResult.getUserName());
            t.setTotalPrice(aResult.getTotalPrice());
            t.setOrderId(aResult.getOrderId());
            String tsStr = "";
            DateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            tsStr = sdf.format(aResult.getDate());
            t.setDate(tsStr);
            t.setPaid(aResult.getIsPaid());
            res.add(t);
        }
        return gson.toJson(res);
    }
}
