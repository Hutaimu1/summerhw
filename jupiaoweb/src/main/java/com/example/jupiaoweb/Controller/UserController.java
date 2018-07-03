package com.example.jupiaoweb.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/bookstoreApp")
public class UserController {
    @Autowired
    private com.example.jupiaoweb.Service.UserService userService;

    @PostMapping(value = "checkuser")
    @ResponseBody
    public String logIn(@RequestParam("name") String username,
                        @RequestParam("password") String password) {
        return userService.logIn(username, password);
    }
}
