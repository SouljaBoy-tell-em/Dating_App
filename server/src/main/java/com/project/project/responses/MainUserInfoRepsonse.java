package com.project.project.responses;


import com.project.project.user_config.UserRole;
import lombok.*;
import java.time.LocalDate;
import java.util.Date;


@AllArgsConstructor
@Data
public class MainUserInfoRepsonse {
    private String username;
    private UserRole role;
    private boolean confirmed;
    private String likedUsersId;
    private String firstName;
    private String lastName;
    private Date birthDate;
}
