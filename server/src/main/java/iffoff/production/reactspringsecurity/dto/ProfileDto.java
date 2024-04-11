package iffoff.production.reactspringsecurity.dto;

import jakarta.persistence.Column;
import lombok.Data;

@Data
public class ProfileDto {
    private String firstname;

    private String lastname;

    private int age;

    private String country;

    private String sex;

    private String description;
}
