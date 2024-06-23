package com.project.requests.admin;


import lombok.AllArgsConstructor;
import lombok.Data;
import java.time.LocalDate;


@AllArgsConstructor
@Data
public class SecondaryInfoUserUpdateRequest {
    private String firstname;
    private String lastname;
    private LocalDate birthday;
    private boolean isPrivate;
}
