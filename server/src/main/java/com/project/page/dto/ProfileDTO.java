package com.project.page.dto;

import com.project.user_config.main.PersonalType;
import com.project.user_config.main.ZodiacSign;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
public class ProfileDTO {
    private String firstname;
    private String lastname;
    private boolean isMan;
    private LocalDate birthday;
    private String description;
    private String photoURL;
    private String city;
    private PersonalType personalType;
    private ZodiacSign zodiacSign;

    public boolean isMan() {
        return isMan;
    }
    public void setMan(boolean man) {
        isMan = man;
    }
}
