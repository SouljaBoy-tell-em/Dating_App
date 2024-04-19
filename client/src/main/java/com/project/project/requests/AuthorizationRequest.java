package com.project.project.requests;


import lombok.Data;


@Data
public class AuthorizationRequest {
    private String email;
    private String password;
}
