package com.example.jupiaoweb.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/bookstoreApp")
public class TicketOrderController {
    @Autowired
    private com.example.jupiaoweb.Service.TicketOrderService ticketOrderService;

    @PostMapping(value = "getOrderList")
    @ResponseBody
    public String getOrderNotPaidList(@RequestParam("userName") String username) {
        return ticketOrderService.getOrderNotPaidList(username);
    }

    @PostMapping(value = "addOrderList")
    @ResponseBody
    public String addOrderList(@RequestParam("userName") String username, @RequestParam("totalPrice") int totalprice, @RequestParam("date")String time) {
        return ticketOrderService.addOrderList(username,totalprice,time);
    }
}
