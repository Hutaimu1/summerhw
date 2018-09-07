package com.example.jupiaoweb.dao;

import com.example.jupiaoweb.Model.CommentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CommentRepository extends JpaRepository<CommentEntity, String> {
    @Query("select max(c.commentId) from CommentEntity c")
    int getMaxId();

    @Query("select c from CommentEntity c where c.ticketId=:ticketId and c.type=:type")
    List<CommentEntity> findByTicketIdAndType(@Param("ticketId") int ticketId, @Param("type") byte type);

    @Query("select c from CommentEntity c where c.userName=:userName and c.ticketId=:ticketId and c.type=:type")
    List<CommentEntity> findByUserNameAndTicketIdAndType(@Param("userName") String userName,@Param("ticketId") int ticketId, @Param("type") byte type);
}
