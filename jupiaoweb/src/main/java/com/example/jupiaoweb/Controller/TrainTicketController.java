package com.example.jupiaoweb.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.Date;

@RestController
@RequestMapping("/bookstoreApp")
public class TrainTicketController {
    @Autowired
    private com.example.jupiaoweb.Service.TrainTicketService trainTicketService;

    @PostMapping(value = "searchTrain")
    @ResponseBody
    public String searchTrain(@RequestParam("startPlace") String startPlace,
                                  @RequestParam("arrivePlace") String arrivePlace,
                                  @RequestParam("startTime") String startTime){
        return trainTicketService.searchTrain(startPlace, arrivePlace, startTime) ;
    }

    @PostMapping(value = "trainTicketAddToShopCart")
    @ResponseBody
    public String trainTicketAddToShopCart(@RequestParam("ticketId") int shopCartId,
                                           @RequestParam("userName") String userName,
                                           @RequestParam("ticketName") String ticketName,
                                           @RequestParam("price") int price,
                                           @RequestParam("leftTicket") int leftTicket,
                                           @RequestParam("description") String description){
        return trainTicketService.trainTicketAddToShopCart(shopCartId,userName,ticketName,price,leftTicket,description);
    }

    @PostMapping(value = "trainTicketQuickBuy")
    @ResponseBody
    public String trainTicketQuickBuy(@RequestParam("ticketId") int ticketId,
                                      @RequestParam("userName") String userName,
                                      @RequestParam("ticketName") String ticketName,
                                      @RequestParam("price") int price,
                                      @RequestParam("leftTicket") int leftTicket,
                                      @RequestParam("date") String date,
                                      @RequestParam("description") String description){
        return trainTicketService.trainTicketQuickBuy(ticketId,userName,ticketName,price,leftTicket,date,description) ;
    }
}
