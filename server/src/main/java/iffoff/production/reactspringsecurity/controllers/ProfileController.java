package iffoff.production.reactspringsecurity.controllers;

import iffoff.production.reactspringsecurity.dto.ProfileDto;
import iffoff.production.reactspringsecurity.dto.SignupRequest;
import iffoff.production.reactspringsecurity.dto.UserDto;
import iffoff.production.reactspringsecurity.models.Profile;
import iffoff.production.reactspringsecurity.models.User;
import iffoff.production.reactspringsecurity.repositories.UserRepository;
import iffoff.production.reactspringsecurity.services.ProfileService;
import iffoff.production.reactspringsecurity.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/profile")
public class ProfileController {

    @Autowired
    private UserService userService;
    @Autowired
    private ProfileService profileService;
    @PostMapping("/create")
    public ResponseEntity<?> createProfile(@RequestBody ProfileDto profileDto) {
        try {
            profileService.saveProfile(profileDto);
            return ResponseEntity.status(HttpStatus.OK).body(profileDto);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("CANNOT CREATE THE PROFILE");
        }

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


//    @PostMapping("/create")
//    public ResponseEntity<?> createProfile(@RequestBody Profile profile ) {
//        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
//
//        //return userService.findByUsername(auth.getName());
//        // create new profile
//
//        //userService.createNewUser(signupRequest);
//        //Map<String, Object> profileInfo= new HashMap<>();
//        //profileInfo.put("image_url", "http://localhost:8189/Web_Resources/profile_images/");
//        profile.setUsername(auth.getName());
//        try {
//            return ResponseEntity.status(HttpStatus.OK).body("Profile is created");
//            // return profileService.saveProfile(profile);
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("error");
//        }
//
//    }
//    @PostMapping("/edit")
//    public Profile editProfile(@RequestBody Profile profile) {
//        // create new profile
//
//        //userService.createNewUser(signupRequest);
//        //Map<String, Object> profileInfo= new HashMap<>();
//        //profileInfo.put("image_url", "http://localhost:8189/Web_Resources/profile_images/");
//        return profileService.saveProfile(profile);
//    }

}
