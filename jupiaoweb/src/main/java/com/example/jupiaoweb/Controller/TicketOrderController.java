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

    @PostMapping(value = "showOrderDetail")
    @ResponseBody
    public String showOrderDetail(@RequestParam("orderId") int orderId) {
        return ticketOrderService.showOrderDetail(orderId);
    }


    @PostMapping(value = "deleteOrder")
    @ResponseBody
    public String deleteOrder(@RequestParam("orderId") int orderId) {
        return ticketOrderService.deleteOrder(orderId);
    }


    @PostMapping(value = "addToHistoryOrder")
    @ResponseBody
    public String addToHistoryOrder(@RequestParam("orderId") int orderId) {
        return ticketOrderService.addToHistoryOrder(orderId);
    }

    @PostMapping(value = "getHistoryOrderList")
    @ResponseBody
    public String getHistoryOrderList(@RequestParam("userName") String username) {
        return ticketOrderService.getHistoryOrderList(username);
    }

    @PostMapping(value = "deleteHistoryOrder")
    @ResponseBody
    public String deleteHistoryOrder(@RequestParam("orderId") int orderId) {
        return ticketOrderService.deleteHistoryOrder(orderId);
    }
}
