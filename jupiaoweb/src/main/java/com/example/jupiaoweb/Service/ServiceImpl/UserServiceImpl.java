package com.example.jupiaoweb.Service.ServiceImpl;

import com.example.jupiaoweb.Model.UserEntity;
import com.example.jupiaoweb.Service.UserService;
import com.example.jupiaoweb.dao.UserRepository;
import com.google.gson.Gson;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Resource
    private UserRepository userRepository;

    @Override
    public String logIn(String username, String password){
        List<UserEntity> result = userRepository.findByUsernameAndPassword(username, password);
        System.out.println(username);
        System.out.println(password);
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
}