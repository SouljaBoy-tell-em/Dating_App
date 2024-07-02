package com.project.requests.admin;


import com.project.user_config.main.ZodiacSign;
import lombok.AllArgsConstructor;
import lombok.Data;
import java.time.LocalDate;


@AllArgsConstructor
@Data
public class SecondaryInfoUserUpdateRequest {
    private String firstname;
    private String lastname;
    private String city;
    private ZodiacSign zodiacSign;
    private LocalDate birthday;
    private boolean isPrivate;
}
