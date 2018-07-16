package com.example.jupiaoweb.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/bookstoreApp")
public class MovieTicketController {
    @Autowired
    private com.example.jupiaoweb.Service.MovieTicketService movieTicketService;

    @PostMapping(value = "getMovieTicket")
    @ResponseBody
    public String getMovieTicket(@RequestParam("place") String place) {
        return movieTicketService.getMovieTicket(place);
    }

    @PostMapping(value = "getMovieDate")
    @ResponseBody
    public String getMovieTime(@RequestParam("place") String place,
                               @RequestParam("movie") String movie) {
        return movieTicketService.getMovieDate(place, movie);
    }

    @PostMapping(value = "getMovieBrand")
    @ResponseBody
    public String getMovieTime(@RequestParam("place") String place,
                               @RequestParam("movie") String movie,
                               @RequestParam("date") String date) {
        return movieTicketService.getMovieBrand(place, movie, date);
    }

    @PostMapping(value = "getMovieTime")
    @ResponseBody
    public String getMovieTime(@RequestParam("place") String place,
                               @RequestParam("movie") String movie,
                               @RequestParam("date") String date,
                               @RequestParam("brand") String brand) {
        return movieTicketService.getMovieTime(place, movie, date, brand);
    }

    @PostMapping(value = "getMovieMessage")
    @ResponseBody
    public String getMovieTime(@RequestParam("id") int id) {
        return movieTicketService.getMovieMessage(id);
    }

    @PostMapping(value = "movieTicketAddToShopCart")
    @ResponseBody
    public String movieTicketAddToShopCart(@RequestParam("ticketId") int ticketId,
                                           @RequestParam("userName") String userName,
                                           @RequestParam("ticketName") String ticketName,
                                           @RequestParam("price") int price,
                                           @RequestParam("leftTicket") int leftTicket,
                                           @RequestParam("description") String description){
        return movieTicketService.movieTicketAddToShopCart(ticketId,userName,ticketName,price,leftTicket,description) ;
    }

    @PostMapping(value = "movieTicketQuickBuy")
    @ResponseBody
    public String movieTicketQuickBuy(@RequestParam("ticketId") int ticketId,
                                      @RequestParam("userName") String userName,
                                      @RequestParam("ticketName") String ticketName,
                                      @RequestParam("price") int price,
                                      @RequestParam("leftTicket") int leftTicket,
                                      @RequestParam("date") String date,
                                      @RequestParam("description") String description){
        return movieTicketService.movieTicketQuickBuy(ticketId,userName,ticketName,price,leftTicket,date,description);
    }
}
