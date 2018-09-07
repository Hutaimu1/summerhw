package com.example.jupiaoweb.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/bookstoreApp")
public class CollectionController {
    @Autowired
    private com.example.jupiaoweb.Service.CollectionService collectionService;

    @PostMapping(value = "getCollection")
    @ResponseBody
    public String getCollection(@RequestParam("userName") String username) {
        return collectionService.getCollection(username);
    }

    @PostMapping(value = "deleteFromCollection")
    @ResponseBody
    public String deleteFromCollection(@RequestParam("userName") String username,@RequestParam("ticketId") int ticketId) {
        return collectionService.deleteFromCollection(username,ticketId);
    }
}
