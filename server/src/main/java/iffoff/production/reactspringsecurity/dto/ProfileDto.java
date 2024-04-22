package iffoff.production.reactspringsecurity.dto;

import jakarta.persistence.Column;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class ProfileDto {
    private String firstname;

    private String lastname;

    private int age;

    private String country;

    private String sex;



    // private final String likedUsersId;

    private String description;
    // Map<String, String> paramList;

    private MultipartFile file;
}
