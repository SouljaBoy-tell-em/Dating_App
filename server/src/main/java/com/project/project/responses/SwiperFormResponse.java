package com.project.project.responses;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;


@AllArgsConstructor
@Data
@NoArgsConstructor
public class SwiperFormResponse {
    private String email;
    private String firstname;
    private String lastname;
    private LocalDate birthday;
    private String imageAvatarUrl;
    private String description;
}
