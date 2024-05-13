package com.example.backend.controller;

import com.example.backend.dto.request.RequestDTO;
import com.example.backend.entity.Comment;
import com.example.backend.entity.constant.Gender;
import com.example.backend.service.CommentService;
import com.example.backend.service.RequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/comment")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @PostMapping("/add/{id}")
    public ResponseEntity<?> addRequest (@RequestBody Comment comment,@PathVariable Long id, Principal principal) {
        return ResponseEntity.status(HttpStatus.CREATED).body(commentService.addComment(comment, id, principal.getName()));
    }
}
