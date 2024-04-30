package com.project.project.requests.admin;


import lombok.Data;
import java.time.LocalDate;


@Data
public class SecondaryInfoUserUpdateRequest {
    private String firstname;
    private String lastname;
    private LocalDate birthday;
    private boolean isPrivate;
}
