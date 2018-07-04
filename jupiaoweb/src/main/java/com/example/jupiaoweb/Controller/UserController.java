package com.example.jupiaoweb.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/bookstoreApp")
public class UserController {
    @Autowired
    private com.example.jupiaoweb.Service.UserService userService;

    @PostMapping(value = "login")
    @ResponseBody
    public String logIn(@RequestParam("userName") String username,
                        @RequestParam("password") String password) {
        return userService.logIn(username, password);
    }

    @PostMapping(value = "checkUserName")
    @ResponseBody
    public String checkUserName(@RequestParam("userName") String username) {
        return userService.checkUserName(username);
    }

    @PostMapping(value = "checkQQ")
    @ResponseBody
    public String checkQQ(@RequestParam("qq") String qq) {
        return userService.checkQQ(qq);
    }

    @PostMapping(value = "checkPhoneNumber")
    @ResponseBody
    public String checkPhoneNumber(@RequestParam("phone") String phone) {
        return userService.checkPhoneNumber(phone);
    }

    @PostMapping(value = "checkEmail")
    @ResponseBody
    public String checkEmail(@RequestParam("email") String email) {
        return userService.checkEmail(email);
    }

    @PostMapping(value = "registerUser")
    @ResponseBody
    public String registerUser(@RequestParam("userName") String username,
                               @RequestParam("password") String password,
                               @RequestParam("email") String email,
                               @RequestParam("qq") String qq,
                               @RequestParam("phone") String phone
                               ) {
        return userService.registerUser(username, password, email, qq, phone);
    }

    @PostMapping(value = "mailValidate")
    @ResponseBody
    public String mailValidate(@RequestParam("email") String email) throws Exception {
        return userService.mailValidate(email);
    }
}
