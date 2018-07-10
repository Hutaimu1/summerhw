package com.example.jupiaoweb;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.mongo.MongoAutoConfiguration;

@SpringBootApplication(exclude = MongoAutoConfiguration.class)
public class JupiaowebApplication {

    public static void main(String[] args) {
        SpringApplication.run(JupiaowebApplication.class, args);
    }
}
