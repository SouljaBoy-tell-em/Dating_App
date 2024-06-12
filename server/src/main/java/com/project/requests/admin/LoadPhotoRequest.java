package com.project.requests.admin;


import lombok.Data;
import org.springframework.web.multipart.MultipartFile;


@Data
public class LoadPhotoRequest {
    private MultipartFile multipartFile;
}
