package com.project.project.page.controllers;

import com.project.project.WebSockets.models.Chat;
import com.project.project.WebSockets.models.ChatMessage;
import com.project.project.WebSockets.models.MessageFile;
import com.project.project.WebSockets.models.MessageType;
import com.project.project.WebSockets.services.MessageFileService;
import com.project.project.WebSockets.services.MessageService;
import com.project.project.page.dto.ProfileDTO;
import com.project.project.page.models.Post;
import com.project.project.page.models.PostFile;
import com.project.project.page.repositories.PostRepository;
import com.project.project.page.services.PostFileService;
import com.project.project.page.services.PostService;
import com.project.project.user_config.main.User;
import com.project.project.user_config.main.UserRepository;
import com.project.project.user_config.main.UserServiceManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
public class PostController {
    @Autowired
    PostRepository postRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    PostService postService;
    @Autowired
    PostFileService postFileService;
    @Autowired
    UserServiceManager userServiceManager;

    @GetMapping("/post/getProfile/{email}")
    public @ResponseBody ResponseEntity<?> getProfile(@PathVariable String email, Principal principal) {
        if (!userServiceManager.IsExist(principal.getName())) {
            return ResponseEntity.badRequest().body("Your profile is not available");
        }
        Optional<User> userOpt = userRepository.findById(email);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            ProfileDTO profile = new ProfileDTO();
            profile.setFirstname(user.getFirstname());
            profile.setLastname(user.getLastname());
            profile.setMan(user.isMan());
            profile.setDescription(user.getDescription());
            profile.setBirthday(user.getBirthday());
            return ResponseEntity.ok(profile);
        } else {
            return ResponseEntity.badRequest().body("This page is not available");
        }
    }

    @GetMapping("/post/getAllPosts/{email}")
    @CrossOrigin
    public @ResponseBody ResponseEntity<?> getAllPosts(@PathVariable String email, Principal principal) {

        if (!userServiceManager.IsExist(email)) {
            return ResponseEntity.badRequest().body("This page doesn't exist");
        }
        if (!userServiceManager.IsExist(principal.getName())) {
            return ResponseEntity.badRequest().body("Your profile is not available");
        }
        //return ResponseEntity.ok(postRepository.findAllByEmail(email));
        return ResponseEntity.ok(postService.getPostDTO(postRepository.findAllByEmail(email)));

    }
    @PostMapping("/post/makePost")
    @CrossOrigin
    public ResponseEntity<?> makePost(@RequestParam(value = "content", required = false) String content,
                                         Principal principal, @RequestParam(value = "file", required = false) List<MultipartFile> files) {
        if (!userServiceManager.IsExist(principal.getName())) {
            return ResponseEntity.badRequest().body("Your profile is not available");
        }
        Post post = new Post();
        Post savedPost;
        LocalDateTime currentTime = LocalDateTime.now();

        post.setContent(content);
        post.setEmail(principal.getName());
        post.setTime(currentTime);

        if (files != null && !files.isEmpty()) {
            List<PostFile> postFiles = new ArrayList<>();
            for (MultipartFile file : files) {
                PostFile postFile = new PostFile();
                postFile.setFileName(file.getOriginalFilename());
                postFile.setFileType(file.getContentType());
                try {
                    postFile.setFileContent(file.getBytes());
                } catch (IOException e) {
                    e.printStackTrace();
                }
                postFiles.add(postFile);
            }

            post.setFiles(postFiles);
            savedPost = postRepository.save(post);

            for (PostFile file : postFiles) {
                file.setPost(savedPost);
                postFileService.saveFile(file);
            }
        } else {
            savedPost = postRepository.save(post);
        }
        return ResponseEntity.ok().build();
    }
}
