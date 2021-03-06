package com.example.jupiaoweb.Controller;

import com.example.jupiaoweb.Service.TicketOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/bookstoreApp")
public class TicketOrderController {
    private final com.example.jupiaoweb.Service.TicketOrderService ticketOrderService;

    @Autowired
    public TicketOrderController(TicketOrderService ticketOrderService) {
        this.ticketOrderService = ticketOrderService;
    }

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
    public String deleteHistoryOrder(@RequestParam("orderId") int[] orderIdArray) {
        return ticketOrderService.deleteHistoryOrder(orderIdArray);
    }

    @PostMapping(value = "getAllOrderList")
    @ResponseBody
    public String getAllOrderList(){
        return ticketOrderService.getAllOrderList();
    }

    @PostMapping(value = "saleReporting")
    @ResponseBody
    public String editTrainTicket(@RequestParam("startingYear") int startingYear,
                                  @RequestParam("startingMonth") int startingMonth,
                                  @RequestParam("endYear") int endYear,
                                  @RequestParam("endMonth") int endMonth){
        return ticketOrderService.saleReporting(startingYear, startingMonth, endYear, endMonth);
    }
}
