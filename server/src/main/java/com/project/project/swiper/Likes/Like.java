package com.project.project.swiper.Likes;

import jakarta.persistence.*;
import jakarta.validation.constraints.Pattern;
import lombok.Data;
import lombok.Getter;

import java.time.LocalDate;


@Data
@Entity
@Table(name = "Likes")
public class Like {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;


    @Pattern(regexp = "^[A-Za-z][A-Za-z0-9.]*[@]{1}[a-z]+[.]{1}[a-z]{2,}$")
    @Column(name = "username")
    private String username;


    @Pattern(regexp = "^[A-Za-z][A-Za-z0-9.]*[@]{1}[a-z]+[.]{1}[a-z]{2,}$")
    @Column(name = "likedEmail")
    private String likedEmail;


    @Column(name = "isLike") // whether it is like(1) or dislike(0)
    private boolean isLike;

    @Column(name = "time")
    private LocalDate time;

}
