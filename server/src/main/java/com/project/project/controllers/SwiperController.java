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

        userServiceManager.Grade(request.getLikedEmail(), request.isLike().toString().equals(TRUE_VALUE));
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
            next3Users = userRepository.GetNext3Users(lastLikedUser);
        swiperFormResponses = new ArrayList<>();
        for(int iUser = 0; iUser < next3Users.size(); iUser++) {
            User currentUser = next3Users.get(iUser);
            swiperFormResponses.add(new SwiperFormResponse(
                    currentUser.getUsername(),
                    currentUser.getFirstname(),
                    currentUser.getLastname(),
                    currentUser.getBirthday(),
                    userServiceManager.GetAvatarUrl(
                            currentUser.getUsername()
                    ),
                    currentUser.getDescription()));
        }
        return new ResponseEntity<>(swiperFormResponses, HttpStatus.OK);
    }
}
