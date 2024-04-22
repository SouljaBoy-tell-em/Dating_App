package iffoff.production.reactspringsecurity.controllers;

import iffoff.production.reactspringsecurity.dto.ProfileDto;
import iffoff.production.reactspringsecurity.dto.SignupRequest;
import iffoff.production.reactspringsecurity.dto.UserDto;
import iffoff.production.reactspringsecurity.models.Profile;
import iffoff.production.reactspringsecurity.models.User;
import iffoff.production.reactspringsecurity.repositories.UserRepository;
import iffoff.production.reactspringsecurity.services.ProfileService;
import iffoff.production.reactspringsecurity.services.UserService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;
import java.io.BufferedOutputStream;
import java.io.FileOutputStream;
import java.util.Optional;

@RestController
@RequestMapping("/profile")
public class ProfileController {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    @Autowired
    private ProfileService profileService;
    @PostMapping("/create")
    public ResponseEntity<?> createProfile(@ModelAttribute ProfileDto profileDto) {
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            // ToDo: create table fro liked people
////            jdbcTemplate.execute("create table likes_" + auth.getName() + "(likedUserId int not null PRIMARY KEY);");

            profileService.saveProfile(profileDto);
            return ResponseEntity.status(HttpStatus.OK).body("great");
            //return ResponseEntity.status(HttpStatus.OK).body(profileDto);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("CANNOT CREATE THE PROFILE");
        }

    }

    @GetMapping("/showImage/{username}")
    //@ResponseBody
    void showImage(@PathVariable String username, HttpServletResponse response)
            throws ServletException, IOException {
        //log.info("Id :: " + id);
        Profile profile = profileService.findByUsername(username).get();
        response.setContentType("image/jpeg, image/jpg, image/png, image/gif"); //("image/jpg");
        response.getOutputStream().write(profile.getImage());
        response.getOutputStream().close();
    }

    @PostMapping("/edit")
    public ResponseEntity<?> editProfile(@RequestBody ProfileDto profileDto) {
        try {
            profileService.saveProfile(profileDto);
            return ResponseEntity.status(HttpStatus.OK).body(profileDto);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("CANNOT EDIT THE PROFILE");
        }

    }
}
