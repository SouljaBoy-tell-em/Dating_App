package com.project.project.page.dto;

import jakarta.persistence.Column;
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
    private long likeNumber;

    private boolean isLiked;

    public boolean isLiked() {
        return isLiked;
    }
    public void setLiked(boolean liked) {
        isLiked = liked;
    }
}
