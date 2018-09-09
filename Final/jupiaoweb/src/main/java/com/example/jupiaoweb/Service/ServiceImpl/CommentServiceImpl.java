package com.example.jupiaoweb.Service.ServiceImpl;

import com.example.jupiaoweb.Model.CommentEntity;
import com.example.jupiaoweb.Model.UserImageEntity;
import com.example.jupiaoweb.Service.CommentService;
import com.example.jupiaoweb.bean.Comment;
import com.example.jupiaoweb.dao.CommentRepository;
import com.example.jupiaoweb.dao.UserImageRepository;
import com.google.gson.Gson;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

@Service
public class CommentServiceImpl implements CommentService {
    @Resource
    private CommentRepository commentRepository;

    @Resource
    private UserImageRepository userImageRepository;

    @Override
    public String getComment(int ticketId,byte type){
        Gson gson = new Gson();
        List<Comment> res = new ArrayList<>();
        List<CommentEntity> allComment = commentRepository.findByTicketIdAndType(ticketId,type);
        if(allComment.size() == 0){
            return gson.toJson(res);
        }
        for(CommentEntity oneComment:allComment){
            String username = oneComment.getUserName();
            Comment newComment = new Comment();
            newComment.setCommentId(oneComment.getCommentId());
            newComment.setContent(oneComment.getContent());
            String tsStr = "";
            DateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            tsStr = sdf.format(oneComment.getDate());
            newComment.setDate(tsStr);
            newComment.setUserName(username);
            List<UserImageEntity>  myImage = userImageRepository.findByUserName(username);
            if(myImage.size() == 0){
                newComment.setUrl("");
            }
            else{
                newComment.setUrl(myImage.get(0).getUrl());
            }
            res.add(newComment);
        }
        return gson.toJson(res);
    }

    @Override
    public String modifyComment(String userName,String content,String date,int ticketId,byte type){
        Gson gson = new Gson();
        List<CommentEntity> myComment = commentRepository.findByUserNameAndTicketIdAndType(userName,ticketId,type);
        if(myComment.size() == 0){
            return gson.toJson(false);
        }
        for(CommentEntity commentDetail:myComment){
            commentDetail.setContent(content);
            Timestamp ts = Timestamp.valueOf(date);
            commentDetail.setDate(ts);
            commentRepository.save(commentDetail);
        }
        return gson.toJson(true);
    }

    @Override
    public String deleteComment(String userName,int ticketId,byte type){
        Gson gson = new Gson();
        List<CommentEntity> myComment = commentRepository.findByUserNameAndTicketIdAndType(userName,ticketId,type);
        if(myComment.size() == 0){
            return gson.toJson(false);
        }
        for(CommentEntity commentDetail:myComment){
            commentRepository.delete(commentDetail);
        }
        return gson.toJson(true);
    }

    @Override
    public  String submitComment(String userName,String content,String date,int ticketId,byte type){
        Gson gson = new Gson();
        List<CommentEntity> myComment = commentRepository.findByUserNameAndTicketIdAndType(userName,ticketId,type);
        if(myComment.size() != 0){
            return gson.toJson(false);
        }

        List<String> res = new ArrayList<>();
        CommentEntity newComment = new CommentEntity();
        newComment.setUserName(userName);
        Timestamp ts = Timestamp.valueOf(date);
        newComment.setDate(ts);
        newComment.setContent(content);
        newComment.setTicketId(ticketId);
        newComment.setType(type);
        commentRepository.save(newComment);
        String commentId = String.valueOf(commentRepository.getMaxId());
        String url = "";
        List<UserImageEntity>  myImage = userImageRepository.findByUserName(userName);
        if(myImage.size() != 0){
            url = myImage.get(0).getUrl();
        }
        res.add(commentId);
        res.add(url);
        return gson.toJson(res);
    }
}
