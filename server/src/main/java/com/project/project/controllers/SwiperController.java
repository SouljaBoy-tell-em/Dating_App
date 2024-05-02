package com.project.project.controllers;

import com.project.project.requests.LikeRequest;
import com.project.project.swiper.SwiperService;
import com.project.project.user_config.User;
import com.project.project.user_config.UserRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static java.lang.Math.floor;
import static java.lang.Math.random;

@RestController
@RequestMapping("/ankets")
public class SwiperController {

    private static final int anketsPacketSize = 5;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SwiperService swiperService;

    @PostMapping("/add-like")
    public ResponseEntity<?> pushLike(@RequestBody LikeRequest likeRequest) {
        Authentication auth;
        try {
            auth = SecurityContextHolder.getContext().getAuthentication();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authentication fail.");
        }

        if (!userRepository.existsById(auth.getName()))
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User doesn't exist.");
        if (!userRepository.existsById(likeRequest.getLikedEmail()))
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Liked/disliked user doesn't exist.");
        if (likeRequest.getTime() == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Like's time is not set.");

        try {
            swiperService.addLike(likeRequest);
            return ResponseEntity.status(HttpStatus.OK).body("ok");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("CANNOT CREATE THE PROFILE.");
        }

    }

    @GetMapping("/get-ankets")
    public ResponseEntity<?> getAnketsPacket() {
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            List<User> users = userRepository.getAnkets(auth.getName(), anketsPacketSize); //auth.getName()
            return ResponseEntity.status(HttpStatus.OK).body(users);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cannot find " + anketsPacketSize + " ankets");
        }
    }

    @GetMapping("/get-one-anket")
    public ResponseEntity<?> getOneAnket() {
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            List<User> users = userRepository.getAnkets(auth.getName(), 1); //auth.getName()
            return ResponseEntity.status(HttpStatus.OK).body(users);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cannot find one ankets");
        }
    }



//    @PostMapping("/delete-like")
//    public ResponseEntity<?> deleteLike(@RequestBody LikeRequest likeRequest) {
//        userRepository.deleteById("laska228666@mail.ru");
//        return ResponseEntity.status(HttpStatus.OK).body("ok");
//    }


}
