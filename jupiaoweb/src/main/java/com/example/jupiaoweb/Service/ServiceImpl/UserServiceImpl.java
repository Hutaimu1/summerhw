package com.example.jupiaoweb.Service.ServiceImpl;

import com.example.jupiaoweb.Model.UserEntity;
import com.example.jupiaoweb.Service.UserService;
import com.example.jupiaoweb.dao.UserRepository;
import com.google.gson.Gson;
import com.sun.mail.util.MailSSLSocketFactory;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.mail.Message;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.*;
import java.util.Properties;

@Service
public class UserServiceImpl implements UserService {

    @Resource
    private UserRepository userRepository;

    @Override
    public String logIn(String userName, String password) {
        List<UserEntity> result = userRepository.findByUsernameAndPassword(userName, password);
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
    public String checkUserName(String userName) {
        List<UserEntity> result = userRepository.findByUsername(userName);
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
    public String mailValidate(String email) throws Exception {
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
        ts.connect("smtp.qq.com", "2057572565", "vrcfpfurtluocjie");// 连接邮件服务器：邮箱类型，帐号，授权码代替密码（更安全）
        Message message = createSimpleMail(session, content, email);// 创建邮件
        ts.sendMessage(message, message.getAllRecipients());// 发送邮件
        ts.close();
        return gson.toJson(content);
    }

    private static MimeMessage createSimpleMail(Session session, String content, String email) throws Exception {
        MimeMessage message = new MimeMessage(session);// 创建邮件对象
        message.setFrom(new InternetAddress("2057572565@qq.com"));// 指明邮件的发件人
        message.setRecipient(Message.RecipientType.TO, new InternetAddress(email));// 指明邮件的收件人，现在发件人和收件人是一样的，那就是自己给自己发
        message.setSubject("聚票网用户注册");// 邮件的标题
        message.setContent("8位验证码为" + content, "text/html;charset=UTF-8");// 邮件的文本内容
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
}