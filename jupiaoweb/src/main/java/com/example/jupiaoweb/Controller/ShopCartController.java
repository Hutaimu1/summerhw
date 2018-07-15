package com.example.jupiaoweb.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/bookstoreApp")
public class ShopCartController {
    @Autowired
    private com.example.jupiaoweb.Service.ShopCartService shopCartService;

    @PostMapping(value = "getShopCartList")
    @ResponseBody
    public String getShopCartList(@RequestParam("userName") String username) {
        return shopCartService.getShopCartList(username);
    }

    @PostMapping(value = "addToShopCart")
    @ResponseBody
    public String addToShopCart(@RequestParam("shopCartId") int id,@RequestParam("userName") String username,@RequestParam("ticketName") String ticketname,@RequestParam("price") int price) {
        return shopCartService.addToShopCart(id,username,ticketname,price);
    }

    @PostMapping(value = "updateLeftTicket")
    @ResponseBody
    public String updateLeftTicket(@RequestParam("ticketId") int[] ticketId,@RequestParam("count") int[] count,@RequestParam("type")int[] type) {
        return shopCartService.updateLeftTicket(ticketId,count,type);
    }

    @PostMapping(value = "deleteShopCartItem")
    @ResponseBody
    public String deleteCartItem(@RequestParam("cartItemId") int[] cartItemId) {
        return shopCartService.deleteCartItem(cartItemId);
    }

    @PostMapping(value = "updateCount")
    @ResponseBody
    public String updateCount(@RequestParam("cartItemId") int cartItemId,@RequestParam("count") int count) {
        return shopCartService.updateCount(cartItemId,count);
    }

    @PostMapping(value = "changeChecked")
    @ResponseBody
    public String changeChecked(@RequestParam("cartItemId") int []cartItemId) {
        return shopCartService.changeChecked(cartItemId);
    }

    @PostMapping(value = "addToOrderNotPaidList")
    @ResponseBody
    public String addToOrderNotPaidList(@RequestParam("userName") String username,
                               @RequestParam("totalPrice") int totalprice,
                               @RequestParam("date")String time,
                               @RequestParam("shopCartId")int[] shopCatId) {
        return shopCartService.addToOrderNotPaidList(username,totalprice,time,shopCatId);
    }

}
