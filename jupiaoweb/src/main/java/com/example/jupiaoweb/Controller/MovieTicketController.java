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
}
