package com.project.project.controllers;


import com.project.project.requests.FilterRequest;
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

import java.time.DateTimeException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;
import java.util.ArrayList;
import java.util.List;
import java.util.function.Function;


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
        User curUser = userRepository.findById(userServiceManager.GetEmail()).get();
        Function<User, Boolean> filterFunc = user -> curUser.isMan() != user.isMan();
        return GetNextNForms(filterFunc);
    }
    @PostMapping("/get-next-filtered-users")
    public ResponseEntity<?> GetNextNFilteredForms(@RequestBody FilterRequest filterRequest) {
        if (filterRequest.getMinAge() >= filterRequest.MAX_AGE ||
                filterRequest.getMaxAge() <= filterRequest.MIN_AGE) {
            return new ResponseEntity<>("Filter age parameters are incorrect.",
                    HttpStatus.BAD_REQUEST);
        }
        try {
            LocalDate curDate = LocalDate.now();
            Function<User, Boolean> filterFunc = user ->
                    Period.between(user.getBirthday(), curDate).getYears() <= filterRequest.getMaxAge() &&
                            Period.between(user.getBirthday(), curDate).getYears() >= filterRequest.getMinAge() &&
                            filterRequest.PreferedIsMan() == user.isMan();

            return GetNextNForms(filterFunc);
        } catch (DateTimeException dateTimeException) {
            return new ResponseEntity<>("Date is incorrect.",
                    HttpStatus.BAD_REQUEST);
        }
    }


    public ResponseEntity<?> GetNextNForms(Function<User, Boolean> filterFunc) {
        List<User> nextNUsers = null;
        List<User> nextOwnLikedNUsers = null;
        List<SwiperFormResponse> swiperFormResponses;
        swiperFormResponses = new ArrayList<>();


        int DBoffset = 0;
        nextOwnLikedNUsers = userRepository.GetOwnLikedNUsers(userServiceManager.GetEmail(), ANKET_LIST_SIZE, DBoffset);
        while (swiperFormResponses.size() < ANKET_LIST_SIZE && !nextOwnLikedNUsers.isEmpty()) {
            addUsersToResponse(swiperFormResponses, nextOwnLikedNUsers, filterFunc);
            nextOwnLikedNUsers = userRepository.GetOwnLikedNUsers(userServiceManager.GetEmail(), ANKET_LIST_SIZE, DBoffset);
            DBoffset += ANKET_LIST_SIZE;
        }

        String lastLikedUser = userRepository.GetLastLikedEmail(userServiceManager.GetEmail());
        if(lastLikedUser == null)
            nextNUsers = userRepository.GetStartNUsers(userServiceManager.GetEmail(), ANKET_LIST_SIZE, 0);

        if(lastLikedUser != null && !userServiceManager.IsExist(lastLikedUser))
            return new ResponseEntity<>("Last liked user with email " + lastLikedUser + " doesn't exist.", HttpStatus.BAD_REQUEST);

        if(nextNUsers == null)
            nextNUsers = userRepository.GetNextNUsers(lastLikedUser, userServiceManager.GetEmail(), ANKET_LIST_SIZE, 0);

        DBoffset = 0;
        while (swiperFormResponses.size() < ANKET_LIST_SIZE && !nextNUsers.isEmpty()) {
            addUsersToResponse(swiperFormResponses, nextNUsers, filterFunc);
            if(lastLikedUser == null)
                nextNUsers = userRepository.GetStartNUsers(userServiceManager.GetEmail(), ANKET_LIST_SIZE, DBoffset);

            if(lastLikedUser != null && !userServiceManager.IsExist(lastLikedUser))
                return new ResponseEntity<>("Last liked user with email " + lastLikedUser + " doesn't exist.", HttpStatus.BAD_REQUEST);

            if(nextNUsers == null)
                nextNUsers = userRepository.GetNextNUsers(lastLikedUser, userServiceManager.GetEmail(), ANKET_LIST_SIZE, DBoffset);

            DBoffset += ANKET_LIST_SIZE;
        }
        if(swiperFormResponses.isEmpty())
            return new ResponseEntity<>("You liked all users.", HttpStatus.NO_CONTENT);

        System.out.println("CURRENT USER: " + userServiceManager.GetEmail());
        System.out.println("LAST LIKED USER: " + lastLikedUser);

        for(int i = 0; i < nextOwnLikedNUsers.size(); i++)
            System.out.printf("!!! %d: %s", (i+1), nextOwnLikedNUsers.get(i).getUsername());
        for(int i = 0; i < nextNUsers.size(); i++)
            System.out.printf("!!! %d: %s", (nextOwnLikedNUsers.size() + i+1), nextNUsers.get(i).getUsername());

        return new ResponseEntity<>(swiperFormResponses, HttpStatus.OK);
    }
    private void addUsersToResponse(List<SwiperFormResponse> responseList, List<User> listToMerge,
                                                        Function<User, Boolean> filterFunc) {
        //List<SwiperFormResponse> swiperFormResponses = new ArrayList<>();
        for(int iUser = 0; iUser < listToMerge.size() && responseList.size() < ANKET_LIST_SIZE; iUser++) {
            User currentUser = listToMerge.get(iUser);
            if (!filterFunc.apply(currentUser)) {
                continue;
            }
            responseList.add(new SwiperFormResponse(
                    currentUser.getUsername(),
                    currentUser.getId(),
                    currentUser.getFirstname(),
                    currentUser.getLastname(),
                    0,
                    userServiceManager.GetAvatarUrl(
                            currentUser.getUsername()
                    ),
                    currentUser.getDescription()));
        }
    }
}
