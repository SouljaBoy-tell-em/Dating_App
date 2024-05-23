package com.project.project.page.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PostFileDTO {
    private Long id;

    private String fileName;

    private String fileType;

    private String fileURL;

}
