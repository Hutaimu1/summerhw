package com.example.jupiaoweb.Service;

public interface CommentService {
    String getComment(int ticketId,byte type);
    String modifyComment(String userName,String content,String date,int ticketId,byte type);
    String deleteComment(String userName,int ticketId,byte type);
    String submitComment(String userName,String content,String date,int ticketId,byte type);
}
