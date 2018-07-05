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
}
