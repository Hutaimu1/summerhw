package com.example.jupiaoweb.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/bookstoreApp")
public class CommentController {
    @Autowired
    private com.example.jupiaoweb.Service.CommentService commentService;

    @RequestMapping(value = "getComment")
    @ResponseBody
    public String getComment(@RequestParam("ticketId") int ticketId,@RequestParam("type") byte type) {
        return commentService.getComment(ticketId,type);
    }

    @RequestMapping(value = "modifyComment")
    @ResponseBody
    public String modifyComment(@RequestParam("userName") String userName,
                                @RequestParam("content") String content,
                                @RequestParam("date")String date,
                                @RequestParam("ticketId") int ticketId,
                                @RequestParam("type") byte type) {
        return commentService.modifyComment(userName,content,date,ticketId,type);
    }

    @RequestMapping(value = "deleteComment")
    @ResponseBody
    public String deleteComment(@RequestParam("userName") String userName,
                                @RequestParam("ticketId") int ticketId,
                                @RequestParam("type") byte type) {
        return commentService.deleteComment(userName,ticketId,type);
    }

    @RequestMapping(value = "submitComment")
    @ResponseBody
    public String submitComment(@RequestParam("userName") String userName,
                                @RequestParam("content") String content,
                                @RequestParam("date")String date,
                                @RequestParam("ticketId") int ticketId,
                                @RequestParam("type") byte type) {
        return commentService.submitComment(userName,content,date,ticketId,type);
    }
}
