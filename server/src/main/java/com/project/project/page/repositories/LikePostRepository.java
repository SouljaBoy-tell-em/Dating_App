package com.project.project.page.repositories;

import com.project.project.page.models.LikePost;
import com.project.project.page.models.Post;
import com.project.project.page.models.PostFile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface LikePostRepository extends JpaRepository<LikePost, Long> {
    Optional<LikePost> findByEmailAndPostId(String email, long post_id);
    void deleteAllByEmailAndPostId(String email, long post_id);
}
