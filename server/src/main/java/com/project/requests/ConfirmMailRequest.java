package com.project.requests;


import lombok.Data;


@Data
public class ConfirmMailRequest {
    private long confirmCode;
}
