package com.project.responses;


import com.project.user_config.main.ZodiacSign;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@AllArgsConstructor
@Data
@NoArgsConstructor
public class SwiperFormResponse {
    private String email;
    private long id;
    private String firstname;
    private String lastname;
    private int age;
    private String imageAvatarUrl;
    private String description;
    private String city;
    private ZodiacSign zodiacSign;
}
