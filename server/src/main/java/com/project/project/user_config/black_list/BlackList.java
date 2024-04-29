package com.project.project.user_config.black_list;


import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Entity
@NoArgsConstructor
public class BlackList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String email;
    private String blockedEmail;

    public BlackList(String email, String blockedEmail) {
        this.email = email;
        this.blockedEmail = blockedEmail;
    }
}
