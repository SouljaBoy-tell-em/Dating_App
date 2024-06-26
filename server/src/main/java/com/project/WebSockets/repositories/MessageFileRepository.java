package com.project.WebSockets.repositories;

import com.project.WebSockets.models.MessageFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MessageFileRepository extends JpaRepository<MessageFile, Long> {
}
