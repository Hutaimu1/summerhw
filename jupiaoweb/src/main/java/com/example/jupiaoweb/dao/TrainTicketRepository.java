package com.example.jupiaoweb.dao;

import com.example.jupiaoweb.Model.TrainTicketEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TrainTicketRepository extends JpaRepository<TrainTicketEntity, String> {
    @Query("select max(t.ticketId) from TrainTicketEntity t")
    int getRowNumber();

    @Query("select t from TrainTicketEntity t where t.startPlace=:startPlace and t.arrivePlace=:arrivePlace")
    List<TrainTicketEntity> findByStartPlaceAndArrviePlace(@Param("startPlace") String startPlace, @Param("arrivePlace") String arrivePlace);

    @Query("select t from TrainTicketEntity t where t.ticketId=:ticketId")
    List<TrainTicketEntity> findByTicketId(@Param("ticketId") int ticketId);
}
