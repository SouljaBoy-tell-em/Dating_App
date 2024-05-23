package com.project.project.page.repositories;

import com.project.project.WebSockets.models.MessageFile;
import com.project.project.page.models.PostFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostFileRepository extends JpaRepository<PostFile, Long> {
}
