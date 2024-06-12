package com.project.page.models;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;


@Data
@Entity
@Table(name="post")
public class Post {
    private static final long MAX_LIKE_VALUE = 100000;
    private static final long MIN_LIKE_VALUE = 0;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column
    private long id;

    @Column
    private String content;

    @Column
    private String email;

    @Column
    LocalDateTime time;
    @Column
    private long likeNumber;
    {
        likeNumber = 0;
    }

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PostFile> files;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "postId")
    private List<LikePost> likes;

    public boolean incLikes() {
        if (likeNumber < MAX_LIKE_VALUE) {
            likeNumber++;
            return true;
        }
        return false;
    }
    public boolean decLikes() {
        if (likeNumber > MIN_LIKE_VALUE) {
            likeNumber--;
            return true;
        }
        return false;
    }
}