package com.project.project.page.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class PostDTO {
    private Long id;
    private String content;
    private String email;
    private LocalDateTime time;
    private List<PostFileDTO> files;
}
