package com.example.jupiaoweb.dao;

import com.example.jupiaoweb.Model.CollectionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CollectionRepository  extends JpaRepository<CollectionEntity, String> {
    @Query("select c from CollectionEntity c where c.userName=:userName and c.ticketId=:ticketId and c.type=:type")
    List<CollectionEntity> findByUserNameAndTicketIdAndType(@Param("userName") String userName,
                                                            @Param("ticketId") int ticketId,
                                                            @Param("type") byte type);

    @Query("select c from CollectionEntity c where c.userName=:userName")
    List<CollectionEntity> findByUserName(@Param("userName") String userName);
}
