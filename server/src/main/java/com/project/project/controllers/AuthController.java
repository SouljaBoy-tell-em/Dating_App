package com.project.project.controllers;


import com.project.project.JWT.JwtAuthService;
import com.project.project.requests.*;
import com.project.project.requests.admin.SecondaryInfoUserUpdateRequest;
import com.project.project.responses.MainUserInfoRepsonse;
import com.project.project.security.mail.ConfirmCode;
import com.project.project.security.mail.ConfirmEmailConfig;
import com.project.project.security.mail.ConfirmEmailRepository;
import com.project.project.user_config.main.User;
import com.project.project.user_config.main.UserRepository;
import com.project.project.user_config.main.UserServiceManager;
import com.project.project.user_config.blacklist.BlackListRepository;
import com.project.project.user_config.photos.UserPhotoRepository;
import com.project.project.utilits.RandomStringGenerator;
import jakarta.security.auth.message.AuthException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@RequestMapping("/auth")
@RequiredArgsConstructor
@RestController
public class AuthController {

    @Autowired
    private BlackListRepository blackListRepository;

    @Autowired
    private JwtAuthService authenticationService;

    @Autowired
    private ConfirmEmailConfig confirmEmailConfig;

    @Autowired
    private ConfirmEmailRepository confirmEmailRepository;

    @Autowired
    private UserPhotoRepository userPhotoRepository;

    @Autowired
    private UserRepository userRepository;

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
            return new ResponseEntity<>("You have been verified",
                                                        HttpStatus.OK);
        } catch (Exception exception) {
            return new ResponseEntity<>("Incorrect code",
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
            return new ResponseEntity<>("Incorrect email",
                                        HttpStatus.BAD_REQUEST);
        }
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
//            confirmEmailConfig.GenerateCode(request.getEmail());
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

    @PostMapping("/register/{size}")
    public ResponseEntity<?> RegisterNUsers(@PathVariable("size") int size) throws IOException {
        RestTemplate restTemplate = new RestTemplate();
        for(int iRequest = 0; iRequest < size; iRequest++) {
            String email = RandomStringGenerator.GenerateRandomMail(10);
            RegisterRequest registerRequest =
                    new RegisterRequest(email, "p");
            restTemplate.postForEntity("http://localhost:8081/auth/register", registerRequest, RegisterRequest.class);

            userRepository.FirstnameUpdate(RandomStringGenerator.GenerateRandomFirstname(), email);
            userRepository.LastnameUpdate(RandomStringGenerator.GenerateRandomLastname(), email);
            userRepository.BirthdayUpdate(LocalDate.now(), email);
            userRepository.ProfileAccessUpdate(false, email);
            userServiceManager.TestAddPhoto(true, email, "photo" + RandomStringGenerator.GenerateRandomInteger(1, 10) + ".jpg");
        }
        return new ResponseEntity<>("Generated successfully", HttpStatus.OK);
    }

    @GetMapping("/test")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public String TEST() {
        System.out.println(userServiceManager.GetAuthorizedUser().getGrades());
        return "TEST";
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
                    currentUser.getFirstname(),
                    currentUser.getLastname(),
                    currentUser.getBirthday()),
                    HttpStatus.OK);
    }
}