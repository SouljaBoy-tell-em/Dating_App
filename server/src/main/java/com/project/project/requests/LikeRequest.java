package com.project.project.requests;

import jakarta.persistence.Column;
import jakarta.validation.constraints.Pattern;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;


@Data
public class LikeRequest {
    private String likedEmail;

    public void setLike(boolean like) {
        isLike = like;
    }

    public boolean isLike() {
        return isLike;
    }

    private boolean isLike;
    private LocalDate time;
}
