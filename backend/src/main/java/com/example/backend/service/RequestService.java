package com.example.backend.service;

import com.example.backend.dto.request.AuthRequest;
import com.example.backend.dto.request.RequestDTO;
import com.example.backend.entity.Request;
import com.example.backend.entity.User;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public interface RequestService {

    ResponseEntity<?> addRequest(RequestDTO request, String name);

    ResponseEntity<?> getRequestById(Long id);

    ResponseEntity<?> getAll();
}
