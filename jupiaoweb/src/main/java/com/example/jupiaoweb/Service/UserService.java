package com.example.jupiaoweb.Service;

import org.springframework.web.multipart.MultipartFile;

import javax.mail.MessagingException;
import java.io.File;
import java.security.GeneralSecurityException;

public interface UserService {
    String getAllUser();
    String changeFreeze(String username);
    String resetPassword(String username);
    String logIn(String userName, String password);
    String checkUserName(String username);
    String checkQQ(String qq);
    String checkPhoneNumber(String phone);
    String checkEmail(String email);
    String mailValidate(String email, String type) throws Exception;
    String checkBindEmail(String username,String email);
    String registerUser(String userName, String password, String email, String qq, String phone);
    String forgetPassword(String userName, String password);
    //String uploadImage(String userName,String image);
    String getUserMessage(String userName);
    String editUserMessage(String username,String password, String email, String phone, String qq);
    String uploadImage(String userName,String base64Str);
    String deleteImage(String username);
}
