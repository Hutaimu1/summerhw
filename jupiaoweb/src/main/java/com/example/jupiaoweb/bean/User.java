package com.example.jupiaoweb.bean;

import java.util.List;

public class User {
    private String href;
    private String userName;
    private String password;
    private String image;
    private byte isFreeze;
    private List<String> content;
    private boolean edit;

    public String getHref() {
        return href;
    }

    public void setHref(String href) {
        this.href = href;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public List<String> getContent() {
        return content;
    }

    public void setContent(List<String> content) {
        this.content = content;
    }

    public byte getIsFreeze() {
        return isFreeze;
    }

    public void setIsFreeze(byte isFreeze) {
        this.isFreeze = isFreeze;
    }

    public boolean isEdit() {
        return edit;
    }

    public void setEdit(boolean edit) {
        this.edit = edit;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
