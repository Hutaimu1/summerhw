package com.example.jupiaoweb.Service.ServiceImpl;

import com.example.jupiaoweb.Model.TicketorderEntity;
import com.example.jupiaoweb.Service.TicketOrderService;
import com.example.jupiaoweb.bean.TicketOrder;
import com.example.jupiaoweb.dao.TicketOrderRepository;
import com.google.gson.Gson;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.Resource;

@Service
public class TicketOrderServiceImpl implements TicketOrderService {
    @Resource
    private TicketOrderRepository TicketOrderRepository;

    @Override
    public    String addOrderList(String userName, int totalPrice,String date){
        Gson gson = new Gson();
        TicketorderEntity order = new TicketorderEntity();
        order.setUserName(userName);
        order.setIsPaid((byte)0);
        order.setTotalPrice(totalPrice);
        Timestamp ts = Timestamp.valueOf(date);
        order.setDate(ts);
        TicketOrderRepository.save(order);
        List<TicketorderEntity> res = TicketOrderRepository.findByUserNameAndDate(userName,ts);
        return gson.toJson(res.get(0).getOrderId());
    };

    @Override
    public String getOrderNotPaidList(String userName){
        Gson gson = new Gson();
        List<TicketorderEntity> order = TicketOrderRepository.findByUserName(userName);
        List<TicketOrder> result = new ArrayList<>();
        for(TicketorderEntity aOrder:order){
            if(aOrder.getIsPaid()== (byte)0){
                TicketOrder ticketOrder = new TicketOrder();
                ticketOrder.setOrderId(aOrder.getOrderId());
                ticketOrder.setTotalPrice(aOrder.getTotalPrice());
                String tsStr = "";
                DateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                tsStr = sdf.format(aOrder.getDate());
                ticketOrder.setDate(tsStr);
                ticketOrder.setPaid(false);
                result.add(ticketOrder);
            }
        }
        return gson.toJson(result);
    }
}
