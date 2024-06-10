package com.example.backend.service.implementation;

import com.example.backend.entity.Comment;
import com.example.backend.repository.CommentRepository;
import com.example.backend.repository.RequestRepository;
import com.example.backend.service.CommentService;
import com.example.backend.utils.TimeProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final RequestRepository requestRepository;
    private final TimeProvider timeProvider;

    @Override
    public Comment addComment(Comment comment, Long id) {
        comment.setCreatedAt(timeProvider.getCurrentTime());
        comment.setRequest(requestRepository.findById(id).orElse(null));
        return commentRepository.save(comment);
    }
}
