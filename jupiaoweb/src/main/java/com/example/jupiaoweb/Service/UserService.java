package com.example.jupiaoweb.Service;

import javax.mail.MessagingException;
import java.security.GeneralSecurityException;

public interface UserService {
    String getAllUser();
    String changeFreeze(String username);
    String resetPassword(String username);
    String editUserMessage(String username, String email, String phone, String qq);
    String logIn(String userName, String password);
    String checkUserName(String username);
    String checkQQ(String qq);
    String checkPhoneNumber(String phone);
    String checkEmail(String email);
    String mailValidate(String email, String type) throws Exception;
    String checkBindEmail(String username,String email);
    String registerUser(String userName, String password, String email, String qq, String phone);
    String forgetPassword(String userName, String password);
}
