package com.project.project.WebSockets.repositories;



import com.project.project.WebSockets.models.Chat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatRepository extends JpaRepository<Chat, Long> {
    Chat findByUser1AndUser2(String user1, String user2);

    List<Chat> findAllByUser1(String user1);

    List<Chat> findAllByUser1OrUser2(String user1, String user2);
}
