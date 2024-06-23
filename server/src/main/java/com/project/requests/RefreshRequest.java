package com.project.requests;


import lombok.Data;


@Data
public class RefreshRequest {
    private String jwtRefreshToken;
}
