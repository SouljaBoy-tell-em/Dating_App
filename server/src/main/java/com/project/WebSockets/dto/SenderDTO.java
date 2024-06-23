package com.project.WebSockets.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SenderDTO {
    private String email;
    private String avatarURL;
}
