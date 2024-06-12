package com.project.page.repositories;

import com.project.page.models.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findAllByEmail(String email);
    //List<Post> findByEmailAnd(String email);
}
