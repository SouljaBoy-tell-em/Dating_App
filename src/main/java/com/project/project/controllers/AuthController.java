package com.project.project.controllers;


import com.project.project.JWT.AuthService;
import com.project.project.requests.AuthorizationRequest;
import com.project.project.requests.JwtAuthResponse;
import com.project.project.requests.RefreshRequest;
import com.project.project.requests.RegisterRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    @Autowired
    private AuthService authenticationService;

    @PostMapping("/sign-up")
    public JwtAuthResponse signUp(@RequestBody @Valid RegisterRequest request) {
        return authenticationService.Register(request);
    }

    @PostMapping("/refresh")
    public JwtAuthResponse Refresh(@RequestBody RefreshRequest request) {
        return authenticationService.Refresh(request);
    }

    @PostMapping("/sign-in")
    public JwtAuthResponse signIn(@RequestBody @Valid AuthorizationRequest request) {
        return authenticationService.Authorization(request);
    }
}

