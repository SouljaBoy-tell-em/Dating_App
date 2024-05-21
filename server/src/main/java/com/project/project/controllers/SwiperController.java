package com.project.project.controllers;


import com.project.project.WebSockets.repositories.ChatRepository;
import com.project.project.requests.swiper.GradeRequest;
import com.project.project.responses.SwiperFormResponse;
import com.project.project.user_config.main.User;
import com.project.project.user_config.main.UserRepository;
import com.project.project.user_config.main.UserServiceManager;
import com.project.project.user_config.photos.UserPhotoRepository;
import com.project.project.user_config.swiper_config.like_config.GradeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;


@PreAuthorize("hasAnyRole('ADMIN', 'USER')")
@RestController
@RequestMapping("/swiper")
public class SwiperController {

    private static final String TRUE_VALUE = "true";

    @Autowired
    private ChatRepository chatRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private GradeRepository gradeRepository;

    @Autowired
    private UserPhotoRepository userPhotoRepository;

    @Autowired
    private UserServiceManager userServiceManager;

    @PostMapping("/grade")
    public ResponseEntity<String> Grade(@RequestBody GradeRequest request) {
        if(!userServiceManager.IsExist(request.getLikedEmail()))
            return new ResponseEntity<>("Liked user with email "+ request.getLikedEmail() + " doesn't exist.", HttpStatus.BAD_REQUEST);
        if(gradeRepository.ExistsPair(userServiceManager.GetEmail(), request.getLikedEmail()) > 0)
            return new ResponseEntity<>("So liked pair already exists.", HttpStatus.BAD_GATEWAY);

        userServiceManager.Grade(request.getLikedEmail(), userServiceManager.GetIdByEmail(request.getLikedEmail()), request.isLike().toString().equals(TRUE_VALUE));
        return new ResponseEntity<>("Successfully.", HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<?> GetNext3Forms(@RequestParam(value = "startAge") int startAge, @RequestParam(value = "endAge") int endAge, @RequestParam(value = "gender") boolean gender) {
        List<User> next3Users;
        List<SwiperFormResponse> swiperFormResponses = new ArrayList<>();

        System.out.println("TRIGGER 1");
        if(startAge > 0 && endAge > 0 && startAge < endAge)
            next3Users = userRepository.GetNext3UsersFilteredByAge(userServiceManager.GetEmail(), startAge, endAge, gender);
        else
            next3Users = userRepository.GetNext3Users(userServiceManager.GetEmail());

        System.out.println("TRIGGER 2");

        for(int iUser = 0; iUser < next3Users.size(); iUser++) {
            User currentUser = next3Users.get(iUser);
            swiperFormResponses.add(new SwiperFormResponse(
                    currentUser.getUsername(),
                    currentUser.getId(),
                    currentUser.getFirstname(),
                    currentUser.getLastname(),
                    (int) currentUser.getBirthday().until(LocalDate.now(), ChronoUnit.YEARS),
                    userServiceManager.GetAvatarUrl(currentUser.getUsername()),
                    currentUser.getDescription()));
        }

        return new ResponseEntity<>(swiperFormResponses, HttpStatus.OK);
    }
}
