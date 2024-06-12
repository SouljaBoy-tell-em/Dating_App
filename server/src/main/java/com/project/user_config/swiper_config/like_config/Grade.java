package com.project.user_config.swiper_config.like_config;


import jakarta.persistence.*;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;


@Entity
@Table(name = "likes")
@NoArgsConstructor
public class Grade {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String email;
    private String likedEmail;
    private long gradedUserId;
    private boolean isLike;
    private LocalDateTime gradeTime;

    public Grade(String email, String likedEmail, long gradedUserId, boolean isLike, LocalDateTime gradeTime) {
        this.email = email;
        this.likedEmail = likedEmail;
        this.gradedUserId = gradedUserId;
        this.isLike = isLike;
        this.gradeTime = gradeTime;
    }
}
