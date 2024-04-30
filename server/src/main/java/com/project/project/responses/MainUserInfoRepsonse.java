package com.project.project.responses;


import com.project.project.user_config.main.UserRole;
import lombok.*;
import java.time.LocalDate;


@AllArgsConstructor
@Data
public class MainUserInfoRepsonse {
    private String username;
    private UserRole role;
    private boolean confirmed;
    private String firstName;
    private String lastName;
    private LocalDate birthDate;
}
