package com.project.project.page.services;


import com.project.project.WebSockets.dto.MessageDTO;
import com.project.project.WebSockets.dto.SenderDTO;
import com.project.project.WebSockets.models.ChatMessage;
import com.project.project.page.dto.PostDTO;
import com.project.project.page.models.Post;
import com.project.project.user_config.main.User;
import com.project.project.user_config.main.UserServiceManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PostService {

    @Autowired
    UserServiceManager userServiceManager;
    @Autowired
    PostFileService postFileService;
    public PostDTO getPostDTO(Post post) {
        return PostDTO.builder()
                .id(post.getId())
                .content(post.getContent())
                .email(post.getEmail())
                .time(post.getTime())
                .files(postFileService.getPostFileDTO(post.getFiles()))
                .build();
    }

    public SenderDTO getSenderDTO(ChatMessage message){


        User user = userServiceManager.GetById(message.getSender());

        if (user!=null){
            String avatarURL = "";
            try{
                avatarURL = "http://localhost:8081/photo/"+user.getPhotos().get(0).getId();
            }   catch (Exception e) {
                avatarURL = "";
            }
            return SenderDTO.builder()
                    .email(message.getSender())
                    .avatarURL(avatarURL)
                    .build();
        } else {
            return null;
        }
    }


    public List<PostDTO> getPostDTO(List<Post> post) {
        if (post != null){
            return post.stream()
                    .map(this::getPostDTO).collect(Collectors.toList());
        } else {
            return null;
        }
    }
}