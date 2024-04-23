package com.project.project.WebSockets.models;


import jakarta.persistence.*;
import lombok.Data;

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

    @Column
    private long chatId;

    @ManyToOne
    @JoinColumn(name = "chatId", referencedColumnName = "id", insertable = false, updatable = false)
    private Chat chat;
}
