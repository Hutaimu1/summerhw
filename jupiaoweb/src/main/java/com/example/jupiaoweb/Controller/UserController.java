package com.example.jupiaoweb.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
    public String mailValidate(@RequestParam("email") String email,
                               @RequestParam("type") String type) throws Exception {
        return userService.mailValidate(email, type);
    }

    @PostMapping(value = "checkBindEmail")
    @ResponseBody
    public String checkBindEmail(@RequestParam("userName") String username,
                                 @RequestParam("email") String email){
        return userService.checkBindEmail(username, email);
    }

    @PostMapping(value = "forgetPassword")
    @ResponseBody
    public String forgetPassword(@RequestParam("userName") String username,
                                 @RequestParam("password") String password){
        return userService.forgetPassword(username, password);
    }

    @PostMapping(value = "getAllUser")
    @ResponseBody
    public String getAllUser() {
        return userService.getAllUser();
    }

    @PostMapping(value = "changeFreeze")
    @ResponseBody
    public String changeFreeze(@RequestParam("userName") String username) {
        return userService.changeFreeze(username);
    }

    @PostMapping(value = "resetPassword")
    @ResponseBody
    public String resetPassword(@RequestParam("userName") String username) {
        return userService.resetPassword(username);
    }

    @PostMapping(value = "getUserMessage")
    @ResponseBody
    public String logIn(@RequestParam("userName") String username) {
        return userService.getUserMessage(username);
    }

    @PostMapping(value = "editUserMessage")
    @ResponseBody
    public String editUserMessage(@RequestParam("userName") String username,
                                  @RequestParam("password") String password,
                                  @RequestParam("email") String email,
                                  @RequestParam("phone") String phone,
                                  @RequestParam("qq") String qq) {
        return userService.editUserMessage(username,password,email,phone,qq);
    }

    @PostMapping(value = "uploadImage")
    @ResponseBody
    public String uploadImage(@RequestParam("userName") String username,@RequestParam("base64Str") String base64Str) {
        return userService.uploadImage(username,base64Str);
    }

    @PostMapping(value = "deleteImage")
    @ResponseBody
    public String deleteImage(@RequestParam("userName") String username) {
        return userService.deleteImage(username);
    }
}
