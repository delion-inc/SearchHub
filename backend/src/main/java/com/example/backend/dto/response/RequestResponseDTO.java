package com.example.backend.dto.response;

import com.example.backend.entity.Comment;
import com.example.backend.entity.constant.Gender;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class RequestResponseDTO {
    private Long id;
    private String name;
    private String description;
    private String location;
    private Gender gender;
    private String createdAt;
    private byte[] image;
    private String info;
    private UserDTO user;
    private List<CommentDTO> comments;
}
