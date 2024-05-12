package com.example.backend.dto.response;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class CommentDTO {
    private Long id;
    private String text;
    private String createdAt;
    private UserDTO user;
}
