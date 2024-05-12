package com.example.backend.dto.request;

import com.example.backend.entity.constant.Gender;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class RequestDTO {
    private String name;
    private String description;
    private String location;
    private Gender gender;
}
