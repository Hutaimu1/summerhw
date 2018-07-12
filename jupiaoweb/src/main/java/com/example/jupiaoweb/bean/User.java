package com.example.jupiaoweb.bean;

public class User {
    private int key;
    private int user_id;
    private String user_name;
    private String password;
    private String e_mail;
    private String nickname;
    private String phone_number;
    private String address;
    private String register_time;
    private int register_time_sort;
    private String last_login;
    private int last_login_sort;
    private int items_purchased;
    private String root;

    public int getKey() {
        return key;
    }
    public void setKey(int key) {
        this.key = key;
    }
    public int getUser_id() {
        return user_id;
    }
    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public String getE_mail() {
        return e_mail;
    }
    public void setE_mail(String e_mail) {
        this.e_mail = e_mail;
    }
    public String getUser_name() {
        return user_name;
    }
    public void setUser_name(String user_name) {
        this.user_name = user_name;
    }
    public String getNickname() {
        return nickname;
    }
    public void setNickname(String nickname) {
        this.nickname = nickname;
    }
    public String getPhone_number() {
        return phone_number;
    }
    public void setPhone_number(String phone_number) {
        this.phone_number = phone_number;
    }
    public String getRegister_time() {
        return register_time;
    }
    public void setRegister_time(String register_time) {
        this.register_time = register_time;
    }
    public int getRegister_time_sort() {
        return register_time_sort;
    }
    public void setRegister_time_sort(int register_time_sort) {
        this.register_time_sort = register_time_sort;
    }
    public String getLast_login() {
        return last_login;
    }
    public void setLast_login(String last_login) {
        this.last_login = last_login;
    }
    public int getLast_login_sort() {
        return last_login_sort;
    }
    public void setLast_login_sort(int last_login_sort) {
        this.last_login_sort = last_login_sort;
    }
    public int getItems_purchased() {
        return items_purchased;
    }
    public void setItems_purchased(int items_purchased) {
        this.items_purchased = items_purchased;
    }
    public String getAddress() {
        return address;
    }
    public void setAddress(String description) {
        this.address = description;
    }
    public String getRoot() {
        return root;
    }
    public void setRoot(String root) {
        this.root = root;
    }
    @Override
    public String toString() {
        return "User [user_id=" + user_id + ", nickname=" + nickname + ", e_mail=" + e_mail + "]";
    }
}
