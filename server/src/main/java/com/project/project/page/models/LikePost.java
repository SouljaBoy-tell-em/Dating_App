package com.project.project.page.models;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name="like_post")
public class LikePost {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column
    private long id;

    @Column
    private long postId;

    @Column
    private String email;

//    @ManyToOne
//    //@JoinColumn(name = "postId")
//    private Post post;
}
