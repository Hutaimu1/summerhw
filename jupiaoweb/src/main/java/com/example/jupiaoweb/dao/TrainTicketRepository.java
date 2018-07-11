package com.example.jupiaoweb.dao;

import com.example.jupiaoweb.Model.TrainticketEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TrainTicketRepository extends JpaRepository<TrainticketEntity, String> {
    @Query("select t from TrainticketEntity t where t.startPlace=:startPlace and t.arrviePlace=:arrviePlace")
    List<TrainticketEntity> findByStartPlaceAndArrviePlace(@Param("startPlace") String startPlace, @Param("arrviePlace") String arrviePlace);
}
