package com.project.user_config.swiper_config.like_config;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface GradeRepository extends CrudRepository<Grade, Long>,
                                          JpaRepository<Grade, Long> {
    @Query(value = "select exists(select * from likes where email = ?1 and liked_email = ?2 and is_like = true)", nativeQuery = true)
    long ExistsPair(String email, String likedEmail);
}
