package com.project.project.user_config.swiper_config.like_config;


import jakarta.persistence.*;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
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
    private boolean isLike;
    private LocalDateTime gradeTime;

    public Grade(String email, String likedEmail, boolean isLike, LocalDateTime gradeTime) {
        this.email = email;
        this.likedEmail = likedEmail;
        this.isLike = isLike;
        this.gradeTime = gradeTime;
    }
}
