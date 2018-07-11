package com.example.jupiaoweb.Service.ServiceImpl;

import com.example.jupiaoweb.Model.TrainTicketEntity;
import com.example.jupiaoweb.Service.TrainTicketService;
import com.example.jupiaoweb.bean.TrainTicket;
import com.example.jupiaoweb.dao.TrainTicketRepository;
import com.google.gson.Gson;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@Service
public class TrainTicketServiceImpl implements TrainTicketService {

    @Resource
    private TrainTicketRepository trainTicketRepository;

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
}