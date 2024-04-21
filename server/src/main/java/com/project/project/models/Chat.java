package com.project.project.models;


import jakarta.persistence.*;
import lombok.Data;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Data
@Entity
@Table(name="chats")
public class Chat {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column
    private long id;

    @Column
    private String user1;

    @Column
    private String user2;

    @Transient
    private String chatKey;
    
    public void generateChatKey() {
        List<String> userList = Arrays.asList(user1, user2);
        Collections.sort(userList);
        chatKey = String.join("-", userList);
    }
}
