package com.project.project.page.models;
import com.project.project.WebSockets.models.MessageFile;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;


@Data
@Entity
@Table(name="post")
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column
    private long id;

    @Column
    private String content;

    @Column
    private String email;


    @Column LocalDateTime time;


    @OneToMany(cascade = CascadeType.ALL)
    private List<PostFile> files;
}