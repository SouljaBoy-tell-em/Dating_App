package com.project.project.WebSockets.models;


import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;


@Data
@Entity
@Table(name="messages")
public class ChatMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column
    private long id;

    @Column
    private String content;

    @Column
    private String sender;

    @Column
    private MessageType type;

    @Column LocalDateTime time;

    @Column
    private long chatId;

    @ManyToOne
    @JoinColumn(name = "chatId", referencedColumnName = "id", insertable = false, updatable = false)
    private Chat chat;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "message")
    private List<MessageFile> files;
}
