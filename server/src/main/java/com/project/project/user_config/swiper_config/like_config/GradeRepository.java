package com.project.project.user_config.swiper_config.like_config;


import com.project.project.user_config.main.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface GradeRepository extends CrudRepository<Grade, Long>,
                                          JpaRepository<Grade, Long> {
    @Query(value = "select exists(select * from likes where email = ?1 and liked_email = ?2 and is_like = true)", nativeQuery = true)
    long ExistsPair(String email, String likedEmail);
}
