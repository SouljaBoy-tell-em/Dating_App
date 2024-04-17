package com.project.project.requests;


import lombok.Data;


@Data
public class AuthorizationRequest {
    private String username;
    private String password;
}
