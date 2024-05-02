package com.project.project.controllers;


import com.project.project.user_config.main.UserServiceManager;
import com.project.project.user_config.photos.Photo;
import com.project.project.user_config.photos.UserPhotoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.io.IOException;


@RequestMapping("/photo")
@RestController
public class ExecutePhotoController {

    @Autowired
    private UserPhotoRepository userPhotoRepository;

    @Autowired
    private UserServiceManager userServiceManager;

//    @PostMapping("/add")
//    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
//    public ResponseEntity<?> AddPhoto(@RequestParam("file") MultipartFile multipartFile,
//                                      @RequestParam(value = "avatar", required = false) boolean isAvatar)
//                                      throws IOException {
//        return userServiceManager.AddPhoto(multipartFile, isAvatar);
//    }

    @PostMapping("/add")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<?> AddPhoto(@RequestParam(value = "avatar", required = false) boolean isAvatar)
            throws IOException {
        return userServiceManager.TestAddPhoto(isAvatar, userServiceManager.GetEmail(), "image.png");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> DeletePhotoById(@PathVariable("id") long id) {
        return userServiceManager.DeletePhoto(id);
    }

    @GetMapping
    public ResponseEntity<?> GetAllPhotos() {
        return userServiceManager.GetAllPhoto();
    }

    @GetMapping("/ids")
    public ResponseEntity<?> GetAllPhotoIds() {
        return new ResponseEntity<>(userServiceManager.GetAllPhotoIds(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> GetPhotoById(@PathVariable long id) {
        Photo photo = userPhotoRepository.getReferenceById(id);
        return new ResponseEntity<>(photo.getContent(), HttpStatus.OK);
    }
}
