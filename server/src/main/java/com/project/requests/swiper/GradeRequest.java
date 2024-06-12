package com.project.requests.swiper;


import lombok.Data;
import lombok.Getter;
import lombok.Setter;


@Data
public class GradeRequest<T> {
    @Getter
    @Setter
    private String likedEmail;
    private T isLike;

    public T isLike() {
        return isLike;
    }

    public void setLike(T like) {
        isLike = like;
    }
}
