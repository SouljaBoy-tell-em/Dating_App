package com.project.project.WebSockets.controllers;

import com.project.project.WebSockets.models.Chat;
import com.project.project.WebSockets.models.ChatMessage;
import com.project.project.WebSockets.models.MessageType;
import com.project.project.WebSockets.repositories.ChatRepository;
import com.project.project.WebSockets.repositories.MessageRepository;
import com.project.project.WebSockets.services.ChatService;
import com.project.project.user_config.User;
import com.project.project.user_config.UserServiceManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

@RestController
public class ChatController {

    @Autowired
    MessageRepository messageRepository;
    @Autowired
    ChatRepository chatRepository;
    @Autowired
    UserServiceManager userServiceManager;
    @Autowired
    ChatService chatService;

    private SimpMessagingTemplate template;

    @Autowired
    public void GreetingController(SimpMessagingTemplate template) {
        this.template = template;
    }

    @PostMapping("/chat/send/{chatId}")
    @CrossOrigin
    public ResponseEntity<?> sendMessage(@PathVariable Long chatId, @RequestBody ChatMessage message, Principal principal) {


        Optional<Chat> chatOptional = chatRepository.findById(chatId);

        if (chatOptional.isPresent()) {
            Chat chat = chatOptional.get();

            if (chatService.isUserInChat(principal.getName(), chatId)) {

                message.setChatId(chat.getId());
                message.setSender(principal.getName());
                message.setType(MessageType.CHAT);
                ChatMessage savedMessage = messageRepository.save(message);

                this.template.convertAndSend("/user/" + chat.getUser1() + "/queue/position-updates", savedMessage);
                this.template.convertAndSend("/user/" + chat        .getUser2() + "/queue/position-updates", savedMessage);


                return ResponseEntity.ok().build();
            } else {
                return ResponseEntity.badRequest().body("You don not consist in this chat");
            }

        } else {
            return ResponseEntity.badRequest().body("Chat with this id " + chatId.toString() + " does not exist");
        }

    }

    @PostMapping("/chat/delete/{messageId}")
    @CrossOrigin
    public ResponseEntity<?> deleteMessage(@PathVariable Long messageId, Principal principal) {

        Optional<ChatMessage> optionalMessage = messageRepository.findById(messageId);

        if (optionalMessage.isPresent()) {
            ChatMessage message = optionalMessage.get();

            if (!Objects.equals(message.getSender(), principal.getName())) {
                return ResponseEntity.badRequest().body("You did not send this message");
            } else {
                String receiverEmail;
                message.setType(MessageType.DELETE);
                this.template.convertAndSend("/user/" + message.getChat().getUser1() + "/queue/position-updates", message);
                this.template.convertAndSend("/user/" + message.getChat().getUser2() + "/queue/position-updates", message);
                messageRepository.deleteById(messageId);
                return ResponseEntity.ok().build();
            }

        } else {
            return ResponseEntity.badRequest().body("Message with this id " + messageId + " does not exist");
        }

    }

    @GetMapping("/chat/getAllMessages/{chatId}")
    @CrossOrigin
    public @ResponseBody ResponseEntity<?> getAllMessage(@PathVariable Long chatId, Principal principal) {

        Optional<Chat> chatOptional = chatRepository.findById(chatId);

        if (chatOptional.isPresent()) {
            Chat chat = chatOptional.get();

            if (chatService.isUserInChat(principal.getName(), chatId)) {
                return ResponseEntity.ok(messageRepository.findAllByChatId(chatId));
            } else {
                return ResponseEntity.badRequest().body("You don not consist in this chat");
            }

        } else {
            return ResponseEntity.badRequest().body("Chat with this id " + chatId.toString() + " does not exist");
        }
    }

    @PostMapping("/chat/createNewChat")
    @CrossOrigin
    public ResponseEntity<?> createNewChat(@RequestBody Map<String, String> requestData) {

        String userEmail = requestData.get("email");
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        User user1 = userServiceManager.GetById(auth.getName());

        User user2;

        try {
            user2 = userServiceManager.GetById(userEmail);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User with email " + userEmail + " does not exist");
        }

        if (user2 == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User with email " + userEmail + " does not exist");
        }

        if (user1.getUsername().equals(user2.getUsername())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Cannot create chat with yourself");
        }

        // Проверяем, существует ли чат между этими пользователями
        Chat existingChat = chatRepository.findByUser1AndUser2(user1.getUsername(), user2.getUsername());

        if (existingChat != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Chat between these users already exists");
        }

        Chat chat = new Chat();
        chat.setUser1(user1.getUsername());
        chat.setUser2(user2.getUsername());
        chat.generateChatKey();

        // Сохраняем чат в базу данных
        chatRepository.save(chat);

        return ResponseEntity.ok("Chat created successfully");
    }

    @GetMapping("/chat/getAllMyChats")
    @CrossOrigin
    public List<Chat> getAllMyChats() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user1 = userServiceManager.GetById(auth.getName());

        return chatService.getAllChatsByUser(user1);

    }
}
