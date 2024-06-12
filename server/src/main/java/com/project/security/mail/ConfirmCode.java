package com.project.security.mail;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;


@AllArgsConstructor
@Data
@Entity
@Table(name = "confirms")
@NoArgsConstructor
public class ConfirmCode {
    @Column(name = "username")
    @Id
    private String username;

    @Column(name = "confirm_code")
    private long confirmCode;

    @Column(name = "expired_time")
    private Date expiredTime;
}
