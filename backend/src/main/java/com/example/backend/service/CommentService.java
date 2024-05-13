package com.example.backend.service;

import com.example.backend.entity.Comment;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public interface CommentService {
    Comment addComment(Comment comment, Long id, String name);
}
