package com.project.responses;


import com.project.user_config.main.PersonalType;
import com.project.user_config.main.UserRole;
import com.project.user_config.main.ZodiacSign;
import lombok.*;
import java.time.LocalDate;


@AllArgsConstructor
@Data
public class MainUserInfoRepsonse {
    private String username;
    private UserRole role;
    private boolean confirmed;
    private boolean profileFilled;
    private String firstName;
    private String lastName;
    private String city;
    private ZodiacSign zodiacSign;
    private LocalDate birthDate;
    private PersonalType personalType;
    private String description;

}
