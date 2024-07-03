package com.project.controllers;


import com.project.JWT.JwtAuthService;
import com.project.requests.AuthorizationRequest;
import com.project.requests.ConfirmMailRequest;
import com.project.requests.RefreshRequest;
import com.project.requests.RegisterRequest;
import com.project.responses.MainUserInfoRepsonse;
import com.project.security.mail.ConfirmCode;
import com.project.security.mail.ConfirmEmailConfig;
import com.project.security.mail.ConfirmEmailRepository;
import com.project.user_config.main.User;
import com.project.user_config.main.UserServiceManager;
import jakarta.security.auth.message.AuthException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.Date;


@RequestMapping("/auth")
@RequiredArgsConstructor
@RestController
public class AuthController {

    @Autowired
    private JwtAuthService authenticationService;

    @Autowired
    private ConfirmEmailConfig confirmEmailConfig;

    @Autowired
    private ConfirmEmailRepository confirmEmailRepository;

    @Autowired
    private UserServiceManager userServiceManager;

    /**
     * The Confirm(ConfirmMailRequest) uses for authorize user by confirm code.
     * @param request request, that contains confirm code.
     * @return confirm status.
     */
    @PostMapping("/confirm")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<?> Confirm(@RequestBody ConfirmMailRequest request) {
        try {
            User currentUser = userServiceManager.GetAuthorizedUser();
            ConfirmCode confirmCode = confirmEmailRepository
                    .findById(currentUser.getUsername())
                    .get();

            if(currentUser.isConfirm() == true)
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

            currentUser.setConfirm(true);
            confirmEmailRepository.deleteById(currentUser.getUsername());
            userServiceManager.ConfirmUser(currentUser.getUsername());
            confirmEmailConfig.Send(currentUser.getUsername(),
                    ConfirmEmailConfig.WELCOME_MESSAGE_SUBJECT,
                    ConfirmEmailConfig.WELCOME_MESSAGE_BODY);
            return new ResponseEntity<>("You have been verified.",
                                                        HttpStatus.OK);
        } catch (Exception exception) {
            return new ResponseEntity<>("Incorrect code.",
                                       HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * The Login(RegisterRequest) logins an existing user.
     * @param request request for authorization.
     * @return an object with a JWT-token.
     */
    @PostMapping("/login")
    public ResponseEntity<?> Login(@RequestBody @Valid AuthorizationRequest request) {
        try {
            if(userServiceManager
                    .GetById(request.getEmail())
                    .isConfirm() == false)
                confirmEmailConfig.GenerateCode(request.getEmail());
            return new ResponseEntity<>(authenticationService.Login(request),
                                                              HttpStatus.OK);
        } catch (Throwable exception) {
            return new ResponseEntity<>("Incorrect email.", HttpStatus.BAD_REQUEST);
        }
//        return new ResponseEntity<>("Incorrect email.", HttpStatus.BAD_REQUEST);
    }

    /**
     * The ReConfirm() reconfirm confirm code.
     * @return request status.
     */
    @GetMapping("/reconfirm")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
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
     * The Refresh(RefreshRequest) gets a new pair of tokens.
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
            return new ResponseEntity<>("Incorrect email.",
                                        HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(value = "/info")
    public ResponseEntity<?> UserInfo() {
        if(userServiceManager.GetAuthorizedUser() == null)
            return new ResponseEntity<>("UNAUTHORIZED",
                                    HttpStatus.UNAUTHORIZED);
        User currentUser = userServiceManager
                .GetById(userServiceManager
                        .GetAuthorizedUser()
                        .getUsername());

        return new ResponseEntity<>(new MainUserInfoRepsonse(
                    currentUser.getUsername(),
                    currentUser.getRole(),
                    currentUser.isConfirm(),
                    currentUser.isProfileFilled(),
                    currentUser.getFirstname(),
                    currentUser.getLastname(),
                    currentUser.getCity(),
                    currentUser.getZodiacSign(),
                    currentUser.getBirthday(),
                    currentUser.getPersonalType(),
                    currentUser.getDescription()
        ),
                    HttpStatus.OK);
    }
}