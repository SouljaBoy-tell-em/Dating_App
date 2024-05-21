package com.project.project.WebSockets.services;


import com.project.project.WebSockets.dto.MessageDTO;
import com.project.project.WebSockets.dto.SenderDTO;
import com.project.project.WebSockets.models.ChatMessage;
import com.project.project.WebSockets.models.MessageFile;
import com.project.project.user_config.main.User;
import com.project.project.user_config.main.UserServiceManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MessageService {

    @Autowired
    UserServiceManager userServiceManager;
    @Autowired
    MessageFileService messageFileService;
    public MessageDTO getMessageDTO(ChatMessage message) {
        return MessageDTO.builder()
                .id(message.getId())
                .type(message.getType())
                .chatId(message.getChatId())
                .content(message.getContent())
                .sender(getSenderDTO(message))
                .time(message.getTime())
                .files(messageFileService.getMessageFileDTO(message.getFiles()))
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


    public List<MessageDTO> getMessageDTO(List<ChatMessage> message) {
        if (message != null){
            return message.stream()
                    .map(this::getMessageDTO).collect(Collectors.toList());
        } else {
            return null;
        }
    }
}