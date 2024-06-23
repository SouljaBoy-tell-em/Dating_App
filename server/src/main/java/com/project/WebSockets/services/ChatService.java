package com.project.WebSockets.services;





import com.project.WebSockets.models.Chat;
import com.project.WebSockets.repositories.ChatRepository;
import com.project.user_config.main.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatService {
    @Autowired
    private ChatRepository chatRepository;

    public void CreateChat(String username1, String username2) {
        Chat chat = new Chat();
        chat.setUser1(username1);
        chat.setUser2(username2);
        chat.generateChatKey();

        chatRepository.save(chat);
    }

    public List<Chat> getAllChatsByUser(User user) {
        return chatRepository.findAllByUser1OrUser2(user.getUsername(), user.getUsername());
    }

    public boolean isUserInChat(String username, Long chatId) {
        Chat chat = chatRepository.findById(chatId).orElse(null);

        if (chat != null) {
            String user1 = chat.getUser1();
            String user2 = chat.getUser2();

            return username.equals(user1) || username.equals(user2);
        }

        return false;
    }
    public Chat getChatByUserEmails(String email1, String email2){

        Chat chat = chatRepository.findByUser1AndUser2(email1, email2);
        if (chat == null) {
            chat = chatRepository.findByUser1AndUser2(email2, email1);
        }

        return chat;
    }
}
