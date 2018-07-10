package com.example.jupiaoweb.Service;

import java.text.ParseException;
import java.util.Date;

public interface TrainTicketService {
    String searchTrain(String startPlace, String arrviePlace, String startTime);
    String updateLeftTicket(int[] shopCartId,int[] count);
}
