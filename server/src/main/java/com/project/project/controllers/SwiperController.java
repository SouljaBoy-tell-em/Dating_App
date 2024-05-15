package com.project.project.controllers;


import com.project.project.requests.swiper.FilterRequest;
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

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;
import java.util.ArrayList;
import java.util.List;


@PreAuthorize("hasAnyRole('ADMIN', 'USER')")
@RestController
@RequestMapping("/swiper")
public class SwiperController {
    private static final int ANKET_LIST_SIZE = 3;
    private static final int ROW_LIST_SIZE = ANKET_LIST_SIZE * 2;
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

    @GetMapping("/get-next-users")
    public ResponseEntity<?> GetNextNNonFilteredForms() {
        User curUser;
        try {
            curUser = userRepository.findById(userServiceManager.GetEmail()).get();
        } catch (Exception e) {
            return new ResponseEntity<>("User doesn't exist.", HttpStatus.BAD_REQUEST);
        }

        List<User> nextNUsers = null;
        List<User> nextOwnLikedNUsers = null;
        List<SwiperFormResponse> swiperFormResponses;
        swiperFormResponses = new ArrayList<>();
        try {
            nextOwnLikedNUsers = userRepository.GetOwnLikedNUsers(userServiceManager.GetEmail(),
                    ANKET_LIST_SIZE, 0, curUser.isMan());
            addUsersToResponse(swiperFormResponses, nextOwnLikedNUsers);
            if (swiperFormResponses.size() < ANKET_LIST_SIZE) {
                nextNUsers = userRepository.GetNextNUsers(userServiceManager.GetEmail(),
                        ANKET_LIST_SIZE - swiperFormResponses.size(), 0, curUser.isMan());
                addUsersToResponse(swiperFormResponses, nextNUsers);
            }
            if (swiperFormResponses.isEmpty())
                return new ResponseEntity<>("You liked all users.", HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>("Cannot find ankets.", HttpStatus.BAD_REQUEST);
        }
        System.out.println("CURRENT USER: " + userServiceManager.GetEmail());

        for(int i = 0; i < swiperFormResponses.size(); i++)
            System.out.printf("!!! %d: %s", (i+1), swiperFormResponses.get(i).getEmail());

        return new ResponseEntity<>(swiperFormResponses, HttpStatus.OK);
    }
    @PostMapping("/get-next-filtered-users")
    public ResponseEntity<?> GetNextNFilteredForms(@RequestBody FilterRequest filterRequest) {
        User curUser;
        try {
            curUser = userRepository.findById(userServiceManager.GetEmail()).get();
        } catch (Exception e) {
            return new ResponseEntity<>("User doesn't exist.", HttpStatus.BAD_REQUEST);
        }

        List<User> nextNUsers = null;
        List<User> nextOwnLikedNUsers = null;
        List<SwiperFormResponse> swiperFormResponses;
        swiperFormResponses = new ArrayList<>();

        int minAge = filterRequest.getMinAge() < filterRequest.MAX_AGE ||
                filterRequest.getMinAge() > filterRequest.MAX_AGE ? filterRequest.MIN_AGE : filterRequest.getMinAge();
        int maxAge = filterRequest.getMaxAge() < filterRequest.MIN_AGE ||
                filterRequest.getMaxAge() > filterRequest.MAX_AGE ? filterRequest.MAX_AGE : filterRequest.getMaxAge();
        try {
            nextOwnLikedNUsers = userRepository.GetFilteredOwnLikedNUsers(userServiceManager.GetEmail(),
                    ANKET_LIST_SIZE, 0, minAge, maxAge, curUser.isMan());
            addUsersToResponse(swiperFormResponses, nextOwnLikedNUsers);
            if (swiperFormResponses.size() < ANKET_LIST_SIZE) {
                nextNUsers = userRepository.GetFilteredNextNUsers(userServiceManager.GetEmail(),
                        ANKET_LIST_SIZE - swiperFormResponses.size(), 0, minAge, maxAge, curUser.isMan());
                addUsersToResponse(swiperFormResponses, nextNUsers);
            }
            if (swiperFormResponses.isEmpty())
                return new ResponseEntity<>("You liked all users.", HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>("Cannot find ankets.", HttpStatus.BAD_REQUEST);
        }
        System.out.println("CURRENT USER: " + userServiceManager.GetEmail());

        for(int i = 0; i < swiperFormResponses.size(); i++)
            System.out.printf("!!! %d: %s", (i+1), swiperFormResponses.get(i).getEmail());

        return new ResponseEntity<>(swiperFormResponses, HttpStatus.OK);
    }

    private void addUsersToResponse(List<SwiperFormResponse> responseList, List<User> listToMerge) {
        for(int iUser = 0; iUser < listToMerge.size() && responseList.size() < ANKET_LIST_SIZE; iUser++) {
            User currentUser = listToMerge.get(iUser);
            responseList.add(new SwiperFormResponse(
                    currentUser.getUsername(),
                    currentUser.getId(),
                    currentUser.getFirstname(),
                    currentUser.getLastname(),
                    Period.between(currentUser.getBirthday(), LocalDate.now()).getYears(),
                    userServiceManager.GetAvatarUrl(
                            currentUser.getUsername()
                    ),
                    currentUser.getDescription()));
        }
    }

}
