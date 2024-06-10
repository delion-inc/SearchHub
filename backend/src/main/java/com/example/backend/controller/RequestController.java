package com.example.backend.controller;

import com.example.backend.dto.request.RequestDTO;
import com.example.backend.dto.response.RequestResponseDTO;
import com.example.backend.entity.Request;
import com.example.backend.entity.constant.Gender;
import com.example.backend.service.RequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/request")
@RequiredArgsConstructor
public class RequestController {

    private final RequestService requestService;

    @PostMapping("/add")
    public ResponseEntity<?> addRequest(
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("location") String location,
            @RequestParam("gender") Gender gender,
            @RequestParam("image") MultipartFile image,
            Principal principal) {
        RequestDTO request = RequestDTO.builder()
                .name(name)
                .description(description)
                .location(location)
                .gender(gender)
                .build();
        try {
            Request requestEntity = requestService.addRequest(request, image, principal.getName());
            return new ResponseEntity<>(requestEntity, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<?> getRequestById(@PathVariable Long id) {
        try {
            RequestResponseDTO requestResponseDTO = requestService.getRequestById(id);
            return new ResponseEntity<>(requestResponseDTO, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/get-all")
    public ResponseEntity<?> getAllRequest() {
        List<RequestResponseDTO> requestResponseDTOList = requestService.getAll();
        return new ResponseEntity<>(requestResponseDTOList, HttpStatus.OK);
    }
}
