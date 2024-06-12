package com.project.page.dto;

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

    public boolean isMan() {
        return isMan;
    }
    public void setMan(boolean man) {
        isMan = man;
    }
}
