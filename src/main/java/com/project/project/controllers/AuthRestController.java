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
public class AuthRestController {

    @Autowired
    private AuthService authenticationService;

    /**
     * The Refresh(RefreshRequest) get a new pair of tokens.
     * @param request request for token refreshing.
     * @return a new pair of JWT tokens.
     */
    @PostMapping("/refresh")
    public JwtAuthResponse Refresh(@RequestBody RefreshRequest request) {
        return authenticationService.Refresh(request);
    }

    /**
     * The SignIn(RegisterRequest) login an existing user.
     * @param request request for authorization.
     * @return an object with a JWT-token.
     */
    @PostMapping("/login")
    public JwtAuthResponse SignIn(@RequestBody @Valid AuthorizationRequest request) {
        return authenticationService.Authorization(request);
    }

    /**
     * The SignUp(RegisterRequest) registers a new user.
     * @param request request for registration.
     * @return an object with a JWT-token.
     */
    @PostMapping("/register")
    public JwtAuthResponse SignUp(@RequestBody @Valid RegisterRequest request) {
        return authenticationService.Register(request);
    }
}

