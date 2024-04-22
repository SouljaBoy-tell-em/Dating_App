package com.project.project.controllers;


import com.project.project.JWT.JwtAuthService;
import com.project.project.requests.*;
import com.project.project.security.mail.ConfirmCode;
import com.project.project.security.mail.ConfirmEmailConfig;
import com.project.project.security.mail.ConfirmEmailRepository;
import com.project.project.user_config.User;
import com.project.project.user_config.UserServiceManager;
import jakarta.security.auth.message.AuthException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.NoSuchAlgorithmException;
import java.util.Date;


@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthRestController {

    @Autowired
    private JwtAuthService authenticationService;

    @Autowired
    private ConfirmEmailConfig confirmEmailConfig;

    @Autowired
    private UserServiceManager userServiceManager;

    @Autowired
    private ConfirmEmailRepository confirmEmailRepository;

    @PostMapping("/confirm")
    public ResponseEntity<?> Confirm(@RequestBody ConfirmMailRequest request) {
        try {
            User currentUser = userServiceManager.GetAuthorizedUser();
            ConfirmCode confirmCode = confirmEmailRepository
                    .findById(currentUser.getUsername())
                    .get();

            if(currentUser.isConfirmed() == true)
                return new ResponseEntity<>("This user already confirmed.",
                        HttpStatus.BAD_REQUEST);
            if(confirmCode.getExpiredTime().getTime() - (new Date()).getTime() < 0) {
                confirmEmailRepository.deleteById(currentUser.getUsername());
                return new ResponseEntity<>("Code confirmation time has expired.",
                        HttpStatus.BAD_REQUEST);
            }
            if(confirmCode.getConfirmCode() != request.getConfirmCode())
                return new ResponseEntity<>("Incorrect confirm code.",
                        HttpStatus.BAD_REQUEST);

            currentUser.setConfirmed(true);
            confirmEmailRepository.deleteById(currentUser.getUsername());
            userServiceManager.ConfirmUser(currentUser.getUsername());
            confirmEmailConfig.Send(currentUser.getUsername(),
                    ConfirmEmailConfig.WELCOME_MESSAGE_SUBJECT,
                    ConfirmEmailConfig.WELCOME_MESSAGE_BODY);
            return new ResponseEntity<>("You have been verified",
                    HttpStatus.OK);
        } catch (Exception exception) {
            return new ResponseEntity<>("Incorrect code", HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * The Login(RegisterRequest) login an existing user.
     * @param request request for authorization.
     * @return an object with a JWT-token.
     */
    @PostMapping("/login")
    public ResponseEntity<?> Login(@RequestBody @Valid AuthorizationRequest request) {
        try {
            if(userServiceManager
                    .GetById(request.getEmail())
                    .isConfirmed() == false)
                confirmEmailConfig.GenerateCode(request.getEmail());
            return new ResponseEntity<>(authenticationService.Login(request),
                                                              HttpStatus.OK);
        } catch (Throwable exception) {
            return new ResponseEntity<>("Incorrect email",
                                        HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/reconfirm")
    public ResponseEntity<?> ReConfirm() {
        User currentUser = userServiceManager.GetAuthorizedUser();
        if(confirmEmailRepository.existsById(currentUser.getUsername()) == false) {
            confirmEmailConfig.GenerateCode(currentUser.getUsername());
            return new ResponseEntity<>("New confirmation code was sent.",
                    HttpStatus.OK);
        }

        else {
            if(confirmEmailRepository
                    .findById(currentUser.getUsername())
                    .get()
                    .getExpiredTime()
                    .getTime() - (new Date()).getTime() < 0) {
                confirmEmailRepository.deleteById(currentUser.getUsername());
                confirmEmailConfig.GenerateCode(currentUser.getUsername());
                return new ResponseEntity<>("New confirmation code was sent.",
                        HttpStatus.OK);
            }
            return new ResponseEntity<>("Confirmation code already exists.",
                    HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * The Refresh(RefreshRequest) get a new pair of tokens.
     * @param request request for token refreshing.
     * @return a new pair of JWT tokens.
     */
    @PostMapping("/refresh")
    public ResponseEntity<?> Refresh(@RequestBody RefreshRequest request) {
        return new ResponseEntity<>(authenticationService.Refresh(request),
                                                            HttpStatus.OK);
    }

    /**
     * The Register(RegisterRequest) registers a new user.
     * @param request request for registration.
     * @return an object with a JWT-token.
     */
    @PostMapping("/register")
    public ResponseEntity<?> Register(@RequestBody @Valid RegisterRequest request) {
        try {
            confirmEmailConfig.GenerateCode(request.getEmail());
            return new ResponseEntity<>(authenticationService.Register(request),
                                        HttpStatus.OK);
        } catch (AuthException exception) {
            return new ResponseEntity<>(exception.getMessage(),
                                       HttpStatus.BAD_REQUEST);
        } catch (Exception exception) {
            return new ResponseEntity<>("Incorrect email",
                                        HttpStatus.BAD_REQUEST);
        }
    }
}