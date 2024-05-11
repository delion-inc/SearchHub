package com.example.backend.dto.response;

import com.example.backend.entity.constant.Gender;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RequestResponseDTO {
    private Long id;
    private String name;
    private String description;
    private String location;
    private Gender gender;
    private String createdAt;
    private UserDTO user;
}
