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
}
