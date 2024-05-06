package com.project.project.controllers;

import com.project.project.JWT.JwtAuthService;
import com.project.project.requests.RegisterRequest;
import com.project.project.security.mail.ConfirmEmailConfig;
import com.project.project.security.mail.ConfirmEmailRepository;
import com.project.project.user_config.blacklist.BlackListRepository;
import com.project.project.user_config.main.UserRepository;
import com.project.project.user_config.main.UserServiceManager;
import com.project.project.user_config.photos.UserPhotoRepository;
import com.project.project.user_config.swiper_config.like_config.Grade;
import com.project.project.user_config.swiper_config.like_config.GradeRepository;
import com.project.project.utilits.RandomFieldGenerator;
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
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@RequestMapping("/test")
@RestController
public class TestAppController {
    @Autowired
    private GradeRepository gradeRepository;

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
            userRepository.BirthdayUpdate(LocalDate.now(), email);
            userRepository.ProfileAccessUpdate(false, email);
            userServiceManager.TestAddPhoto(true, email, "src/main/resources/static/images/photo" + RandomFieldGenerator.GenerateRandomInteger(1, 10) + ".jpg");
        }
        return new ResponseEntity<>("Generated successfully", HttpStatus.OK);
    }
    @PostMapping("/like/{size}")
    public ResponseEntity<?> LikeNUsers(@PathVariable("size") int size) throws IOException {
        RestTemplate restTemplate = new RestTemplate();
        List<String> emails = new ArrayList<>();
        for(int iRequest = 0; iRequest < size; iRequest++) {
            String email = RandomFieldGenerator.GenerateRandomMail(10);
            emails.add(email);
            RegisterRequest registerRequest =
                    new RegisterRequest(email, "p");
            restTemplate.postForEntity("http://localhost:8081/auth/register", registerRequest, RegisterRequest.class);

            userRepository.FirstnameUpdate(RandomFieldGenerator.GenerateRandomFirstname(), email);
            userRepository.LastnameUpdate(RandomFieldGenerator.GenerateRandomLastname(), email);
            userRepository.BirthdayUpdate(LocalDate.of(2000 + iRequest, 1, 1), email);
            userRepository.ProfileAccessUpdate(false, email);
            userRepository.ConfirmUpdate(true, email);
            userRepository.GenderUpdate(iRequest % 3 == 0, email);
            userServiceManager.TestAddPhoto(true, email, "src/main/resources/static/images/photo" + RandomFieldGenerator.GenerateRandomInteger(1, 10) + ".jpg");
        }
        for (int iRequest = 3; iRequest < 6; iRequest++) {
            gradeRepository.save(new Grade(emails.get(iRequest), emails.get((0) % emails.size()),
                    userRepository.GetIdByEmail(emails.get((0)% emails.size())), true, LocalDateTime.now()));
        }

        return new ResponseEntity<>("Generated successfully", HttpStatus.OK);
    }
}
