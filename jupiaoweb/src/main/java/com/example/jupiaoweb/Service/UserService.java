package com.example.jupiaoweb.Service;

import javax.mail.MessagingException;
import java.security.GeneralSecurityException;

public interface UserService {
    String logIn(String userName, String password);
    String checkUserName(String userName);
    String checkQQ(String qq);
    String checkPhoneNumber(String phone);
    String checkEmail(String email);
    String mailValidate(String email) throws Exception;
    String registerUser(String userName, String password, String email, String qq, String phone);
}
