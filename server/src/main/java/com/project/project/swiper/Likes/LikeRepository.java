package com.project.project.swiper.Likes;

import com.project.project.user_config.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LikeRepository extends CrudRepository<Like, String>,
                                        JpaRepository<Like, String> {
    
}
