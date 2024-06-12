package com.project.requests.admin;


import lombok.Data;


@Data
public class GeneralUpdateRequest<T> {
    private String email;
    private T field;
    private UserUpdateField type;
}
