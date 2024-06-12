package com.project.WebSockets.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MessageFileDTO {
    private Long id;

    private String fileName;

    private String fileType;

    private String fileURL;

}
