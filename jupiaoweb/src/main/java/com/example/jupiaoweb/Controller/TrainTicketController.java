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
}
