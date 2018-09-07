package com.example.jupiaoweb.Service;

public interface CollectionService {
    String getCollection(String userName);
    String deleteFromCollection(String userName,int ticketId);

}
