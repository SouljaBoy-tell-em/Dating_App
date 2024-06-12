package com.project.WebSockets.dto;

import com.project.WebSockets.models.MessageType;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class MessageDTO {
    private Long id;
    private String content;
    private SenderDTO sender;
    private LocalDateTime time;
    private MessageType type;
    private Long chatId;
    private List<MessageFileDTO> files;
}
