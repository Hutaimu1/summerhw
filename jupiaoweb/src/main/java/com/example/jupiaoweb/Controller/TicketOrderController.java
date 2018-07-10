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
    public String addOrderList(@RequestParam("userName") String username,
                               @RequestParam("totalPrice") int totalprice,
                               @RequestParam("date")String time,
                               @RequestParam("cartIdArray") int[] cartId,
                               @RequestParam("cartNameArray") String[] cartName,
                               @RequestParam("cartPriceArray") int[] cartPrice,
                               @RequestParam("cartCountArray") int[] cartCount) {
        return ticketOrderService.addOrderList(username,totalprice,time,cartId,cartName,cartPrice,cartCount);
    }

    @PostMapping(value = "showOrderDetail")
    @ResponseBody
    public String showOrderDetail(@RequestParam("orderId") int orderid) {
        return ticketOrderService.showOrderDetail(orderid);
    }
}
