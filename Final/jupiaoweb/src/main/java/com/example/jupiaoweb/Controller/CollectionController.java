package com.example.jupiaoweb.Controller;

import com.example.jupiaoweb.Service.CollectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/bookstoreApp")
public class CollectionController {
    private final com.example.jupiaoweb.Service.CollectionService collectionService;

    @Autowired
    public CollectionController(CollectionService collectionService) {
        this.collectionService = collectionService;
    }

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
