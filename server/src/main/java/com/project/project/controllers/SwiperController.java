package com.project.project.controllers;


import com.project.project.requests.swiper.GradeRequest;
import com.project.project.responses.SwiperFormResponse;
import com.project.project.user_config.main.User;
import com.project.project.user_config.main.UserRepository;
import com.project.project.user_config.main.UserServiceManager;
import com.project.project.user_config.photos.UserPhotoRepository;
import com.project.project.user_config.swiper_config.like_config.GradeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@PreAuthorize("hasAnyRole('ADMIN', 'USER')")
@RestController
@RequestMapping("/swiper")
public class SwiperController {

    private static final String TRUE_VALUE = "true";

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
        userServiceManager.Grade(request.getLikedEmail(), userServiceManager.GetIdByEmail(request.getLikedEmail()), request.isLike().toString().equals(TRUE_VALUE));
        return new ResponseEntity<>("Successfully.", HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<?> GetNext3Forms() {
        List<User> next3Users = null;
        List<SwiperFormResponse> swiperFormResponses;
        String lastLikedUser = userRepository.GetLastLikedEmail(userServiceManager.GetEmail());

        if(lastLikedUser == null)
            next3Users = userRepository.GetStart3Initialization();


        if(lastLikedUser != null && !userServiceManager.IsExist(lastLikedUser))
            return new ResponseEntity<>("Last liked user with email " + lastLikedUser + " doesn't exist.", HttpStatus.BAD_REQUEST);
//        if(lastLikedUser != null && gradeRepository.ExistsPair(userServiceManager.GetEmail(), lastLikedUser) > 0)
//            return new ResponseEntity<>("This users pair already exists.", HttpStatus.BAD_REQUEST);

        if(next3Users == null)
            next3Users = userRepository.GetNext3Users(lastLikedUser, userServiceManager.GetEmail());

        if(next3Users.size() == 0)
            return new ResponseEntity<>("You liked all users.", HttpStatus.NO_CONTENT);

        swiperFormResponses = new ArrayList<>();
        for(int iUser = 0; iUser < next3Users.size(); iUser++) {
            User currentUser = next3Users.get(iUser);
            swiperFormResponses.add(new SwiperFormResponse(
                    currentUser.getUsername(),
                    currentUser.getId(),
                    currentUser.getFirstname(),
                    currentUser.getLastname(),
//                    currentUser.getBirthday().getYear() - LocalDateTime.now().getYear(),
                    0,
                    userServiceManager.GetAvatarUrl(
                            currentUser.getUsername()
                    ),
                    currentUser.getDescription()));
        }

        System.out.println("CURRENT USER: " + userServiceManager.GetEmail());
        System.out.println("LAST LIKED USER: " + lastLikedUser);

        for(int i = 0; i < next3Users.size(); i++)
            System.out.printf("!!! %d: %s", (i+1), next3Users.get(i).getUsername());

        return new ResponseEntity<>(swiperFormResponses, HttpStatus.OK);
    }
}
