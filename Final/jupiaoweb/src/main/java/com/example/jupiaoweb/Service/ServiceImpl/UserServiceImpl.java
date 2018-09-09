package com.example.jupiaoweb.Service.ServiceImpl;

import com.example.jupiaoweb.Model.UserEntity;
import com.example.jupiaoweb.Model.UserImageEntity;
import com.example.jupiaoweb.Service.UserService;
import com.example.jupiaoweb.bean.User;
import com.example.jupiaoweb.dao.UserImageRepository;
import com.example.jupiaoweb.dao.UserRepository;
import com.google.gson.Gson;
import com.sun.mail.util.MailSSLSocketFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import sun.misc.BASE64Encoder;

import javax.annotation.Resource;
import javax.mail.Message;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.io.*;
import java.util.*;
import java.util.Properties;


@Service
public class UserServiceImpl implements UserService {

    @Resource
    private UserRepository userRepository;

    @Resource
    private UserImageRepository userImageRepository;

    @Override
    public String logIn(String userName, String password) {
        List<UserEntity> result = userRepository.findByUserNameAndPassword(userName, password);
        Gson gson = new Gson();
        Integer isValid = 0;
        List<Integer> res = new ArrayList<>();
        if (result.size() > 0) {
            isValid = 1;
            res.add(isValid);
            res.add(result.get(0).getIsFreeze() & 0xFF);
            res.add(result.get(0).getIsAdmin() & 0xFF);
            return gson.toJson(res);
        }
        res.add(isValid);
        return gson.toJson(res);
    }

    @Override
    public String checkUserName(String username) {
        List<UserEntity> result = userRepository.findByUserName(username);
        Gson gson = new Gson();
        if (result.size() > 0) {
            return gson.toJson(true);
        } else {
            return gson.toJson(false);
        }
    }

    @Override
    public String checkQQ(String qq) {
        List<UserEntity> result = userRepository.findByQq(qq);
        Gson gson = new Gson();
        if (result.size() > 0) {
            return gson.toJson(true);
        } else {
            return gson.toJson(false);
        }
    }

    @Override
    public String checkPhoneNumber(String phone) {
        List<UserEntity> result = userRepository.findByPhoneNumber(phone);
        Gson gson = new Gson();
        if (result.size() > 0) {
            return gson.toJson(true);
        } else {
            return gson.toJson(false);
        }
    }

    @Override
    public String checkEmail(String email) {
        List<UserEntity> result = userRepository.findByEMail(email);
        Gson gson = new Gson();
        if (result.size() > 0) {
            return gson.toJson(true);
        } else {
            return gson.toJson(false);
        }
    }

    @Value("${email.user}")
    private String user;

    @Value("${email.password}")
    private String password;

    @Value("${email.sender}")
    private String sender;

    @Override
    public String mailValidate(String email, String type) throws Exception {

        Gson gson = new Gson();
        String content = getRandomString();
        Properties prop = new Properties();
        prop.setProperty("mail.debug", "true");// 开启debug调试，以便在控制台查看
        prop.setProperty("mail.host", "smtp.qq.com");// 设置邮件服务器主机名
        prop.setProperty("mail.smtp.auth", "true");// 发送服务器需要身份验证
        prop.setProperty("mail.transport.protocol", "smtp");// 发送邮件协议名称
        MailSSLSocketFactory sf = new MailSSLSocketFactory();// 开启SSL加密，否则会失败
        sf.setTrustAllHosts(true);
        prop.put("mail.smtp.ssl.enable", "true");
        prop.put("mail.smtp.ssl.socketFactory", sf);
        Session session = Session.getInstance(prop);// 创建session
        Transport ts = session.getTransport();// 通过session得到transport对象
        ts.connect("smtp.qq.com", user, password);// 连接邮件服务器：邮箱类型，帐号，授权码代替密码（更安全）
        Message message = createSimpleMail(session, content, email, sender, type);// 创建邮件
        ts.sendMessage(message, message.getAllRecipients());// 发送邮件
        ts.close();
        return gson.toJson(content);
    }

    private static MimeMessage createSimpleMail(Session session, String content, String email , String sender , String type) throws Exception {
        MimeMessage message = new MimeMessage(session);// 创建邮件对象
        message.setFrom(new InternetAddress(sender));// 指明邮件的发件人
        message.setRecipient(Message.RecipientType.TO, new InternetAddress(email));// 指明邮件的收件人，现在发件人和收件人是一样的，那就是自己给自己发
        message.setSubject("聚票网用户" + type);// 邮件的标题
        message.setContent("您的8位验证码为" + content, "text/html;charset=UTF-8");// 邮件的文本内容
        return message;// 返回创建好的邮件对象
    }

    private static String getRandomString() {
        String str = "zxcvbnmlkjhgfdsaqwertyuiopQWERTYUIOPASDFGHJKLZXCVBNM1234567890";
        Random random = new Random();
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < 8; ++i) {
            int number = random.nextInt(62);
            sb.append(str.charAt(number));
        }
        return sb.toString();
    }

    @Override
    public String checkBindEmail(String username,String email) {
        List<UserEntity> result = userRepository.findByUserNameAndEMail(username,email);
        Gson gson = new Gson();
        if (result.size() > 0) {
            return gson.toJson(true);
        } else {
            return gson.toJson(false);
        }
    }

    @Override
    public String registerUser(String userName, String password, String email, String qq, String phone) {
        Gson gson = new Gson();
        int userId = userRepository.getRowNumber() + 1;
        System.out.println(userId);
        UserEntity user = new UserEntity();
        user.setUserId(userId);
        user.setUserName(userName);
        user.setPassword(password);
        user.seteMail(email);
        user.setQq(qq);
        user.setPhoneNumber(phone);
        user.setIsAdmin((byte) 0);
        user.setIsFreeze((byte) 0);
        userRepository.save(user);
        return gson.toJson(true);
    }

    @Override
    public String forgetPassword(String userName, String password) {
        List<UserEntity> result = userRepository.findByUserName(userName);
        Gson gson = new Gson();
        UserEntity user = result.get(0);
        user.setPassword(password);
        userRepository.save(user);
        return gson.toJson(true);
    }

    @Value("${picture.default}")
    private String defaultPicture;

    @Override
    public String getAllUser() {
        List<UserEntity> result = userRepository.findAll();
        List<User> res = new ArrayList<>();
        Gson gson = new Gson();
        for (UserEntity aResult : result) {
            if (aResult.getIsAdmin() == 1){
                continue;
            }
            User u = new User();
            u.setUserName(aResult.getUserName());
            List<UserImageEntity> myImageList = userImageRepository.findByUserName(aResult.getUserName());
            if (myImageList.size() == 0){
                u.setImage(defaultPicture);
            }
            else {
                u.setImage(myImageList.get(0).getUrl());
            }
            u.setHref("http://ant.design");
            List<String> content = new ArrayList<>();
            content.add(aResult.geteMail());
            content.add(aResult.getPhoneNumber());
            content.add(aResult.getQq());
            u.setContent(content);
            u.setIsFreeze(aResult.getIsFreeze());
            u.setEdit(false);
            res.add(u);
        }
        return gson.toJson(res);
    }


    @Override
    public String changeFreeze(String username){
        List<UserEntity> result = userRepository.findByUserName(username);
        Gson gson = new Gson();
        UserEntity u = result.get(0);
        u.setIsFreeze((byte)(((int)u.getIsFreeze() + 1) % 2));
        userRepository.save(u);
        return gson.toJson(u.getIsFreeze());
    }

    @Override
    public String resetPassword(String username){
        List<UserEntity> result = userRepository.findByUserName(username);
        Gson gson = new Gson();
        UserEntity u = result.get(0);
        u.setPassword("123456");
        userRepository.save(u);
        return gson.toJson(true);
    }

    @Override
    public String getUserMessage(String userName){
        Gson gson = new Gson();
        UserEntity user = userRepository.findByUserName(userName).get(0);
        List<UserImageEntity>  myImage = userImageRepository.findByUserName(userName);
        User myMessage = new User();
        myMessage.setUserName(userName);
        myMessage.setPassword(user.getPassword());
        List<String> content = new ArrayList<>();
        content.add(user.geteMail());
        content.add(user.getPhoneNumber());
        content.add(user.getQq());
        myMessage.setContent(content);
        if(myImage.size() == 0){
            myMessage.setImage("");
        }
        else{
            myMessage.setImage(myImage.get(0).getUrl());
            content.add("myImage.jpg");
            content.add("done");
            content.add("0");
        }
        return gson.toJson(myMessage);
    }

    @Override
    public String editUserMessage(String username,String password, String email, String phone, String qq){
        List<UserEntity> result = userRepository.findByUserName(username);
        Gson gson = new Gson();
        UserEntity u = result.get(0);
        String oldPassword = u.getPassword();
        u.seteMail(email);
        u.setPhoneNumber(phone);
        u.setQq(qq);
        System.out.println(password);
        if (!password.equals("")){
            u.setPassword(password);
        }
        userRepository.save(u);
        if(oldPassword.equals(password)){
            return gson.toJson(true);//表示密码被修改过
        }
        return gson.toJson(false);
    }

    @Override
    public String deleteImage(String username){
        List<UserImageEntity> myImageList = userImageRepository.findByUserName(username);
        Gson gson = new Gson();
        if(myImageList.size() == 0){
            return gson.toJson(false);
        }
        else{
            UserImageEntity myImage = myImageList.get(0);
            userImageRepository.delete(myImage);
        }
        return gson.toJson(true);
    }

    @Override
    public String uploadImage(String userName,MultipartFile mFile){
        String type = mFile.getContentType();
        Gson gson = new Gson();
        File f = null;
        String base64= null;
        String encoded = "";
        try {
            f=File.createTempFile("tmp", null);
            mFile.transferTo(f);
            f.deleteOnExit();     //使用完成删除文件
        }  catch (IOException e) {
            e.printStackTrace();
        }
        try{
            if(f != null){
                FileInputStream inputFile = new FileInputStream(f);
                byte[] buffer = new byte[(int) f.length()];
                int inputFileSuccess = inputFile.read(buffer);
                inputFile.close();
                base64=new BASE64Encoder().encode(buffer);
            }
        }catch (IOException e) {
            e.printStackTrace();
        }
        if(base64 != null){
            encoded += base64.replaceAll("[\\s*\t\n\r]", "");
        }
        String url = "data:" + type + ";base64," + encoded;
        List<UserImageEntity> myImageList = userImageRepository.findByUserName(userName);
        if(myImageList.size() != 0){
            return  gson.toJson(false);
        }
        else{
            UserImageEntity newUserImage = new UserImageEntity();
            newUserImage.setUserName(userName);
            newUserImage.setUrl(url);
            userImageRepository.save(newUserImage);
        }
        return gson.toJson(true);
    }
}