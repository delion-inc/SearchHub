package com.example.backend.service.implementation;

import com.example.backend.entity.Comment;
import com.example.backend.entity.Request;
import com.example.backend.entity.User;
import com.example.backend.repository.CommentRepository;
import com.example.backend.repository.RequestRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.CommentService;
import com.example.backend.service.RequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

@Service
@RequiredArgsConstructor
public class ICommentService implements CommentService {

    private static final String ZONE_ID = "Europe/Kiev";
    private static final String DATA_TIME_FORMAT = "yyyy-MM-dd HH:mm:ss";
    private final CommentRepository commentRepository;
    private final RequestRepository requestRepository;
    private final UserRepository userRepository;

    @Override
    public Comment addComment(Comment comment, Long id, String name) {
        comment.setCreatedAt(createTime());
        comment.setRequest(requestRepository.findById(id).get());
        return commentRepository.save(comment);
    }

    private String createTime() {
        ZonedDateTime now = ZonedDateTime.now(ZoneId.of(ZONE_ID));
        return now.format(DateTimeFormatter.ofPattern(DATA_TIME_FORMAT));
    }
}
