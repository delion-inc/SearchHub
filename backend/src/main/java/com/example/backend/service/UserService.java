package com.example.backend.service;

import com.example.backend.dto.request.AuthRequest;
import com.example.backend.entity.User;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public interface UserService {
    ResponseEntity<?> registration(User recipient, HttpServletResponse response);

    ResponseEntity<?> authorization(AuthRequest authRequest, HttpServletResponse response);

    ResponseEntity<?> refreshAuthToken(String refreshToken, HttpServletResponse response);

    ResponseEntity<?> logout(String refreshToken, HttpServletResponse response);
}
