package com.project.controllers;

import com.project.requests.RegisterRequest;
import com.project.user_config.main.UserRepository;
import com.project.user_config.main.UserServiceManager;
import com.project.utilits.RandomFieldGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.time.LocalDate;


@RequestMapping("/test")
@RestController
public class TestAppController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserServiceManager userServiceManager;

    @PostMapping("/register/{size}")
    public ResponseEntity<?> RegisterNUsers(@PathVariable("size") int size) throws IOException {
        RestTemplate restTemplate = new RestTemplate();
        for(int iRequest = 0; iRequest < size; iRequest++) {
            String email = RandomFieldGenerator.GenerateRandomMail(10);
            RegisterRequest registerRequest =
                    new RegisterRequest(email, "p");
            restTemplate.postForEntity("http://localhost:8081/auth/register", registerRequest, RegisterRequest.class);

            userRepository.FirstnameUpdate(RandomFieldGenerator.GenerateRandomFirstname(), email);
            userRepository.LastnameUpdate(RandomFieldGenerator.GenerateRandomLastname(), email);
            userRepository.BirthdayUpdate(LocalDate.of(1980 + RandomFieldGenerator.GenerateRandomInteger(0, 26), 11, 11), email);
            userRepository.ProfileAccessUpdate(false, email);
            userRepository.GenderUpdate(RandomFieldGenerator.GenerateRandomInteger(0, 1) > 0 ? true : false, email);
            userServiceManager.TestAddPhoto(true, email, "photo" + RandomFieldGenerator.GenerateRandomInteger(1, 10) + ".jpg");
        }
        return new ResponseEntity<>("Generated successfully", HttpStatus.OK);
    }
}
