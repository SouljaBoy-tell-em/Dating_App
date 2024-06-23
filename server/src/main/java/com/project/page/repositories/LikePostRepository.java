package com.project.page.repositories;

import com.project.page.models.LikePost;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LikePostRepository extends JpaRepository<LikePost, Long> {
    Optional<LikePost> findByEmailAndPostId(String email, long post_id);
    void deleteAllByEmailAndPostId(String email, long post_id);
}
