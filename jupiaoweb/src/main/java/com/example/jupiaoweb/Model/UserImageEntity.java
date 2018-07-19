package com.example.jupiaoweb.Model;

import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;

@Document(collection = "userImage")
public class UserImageEntity {

    @Id
    private String id;
    private String userName;
    private String url;

    public String getId() { return id; }

    public void setId(String id) { this.id = id; }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}
