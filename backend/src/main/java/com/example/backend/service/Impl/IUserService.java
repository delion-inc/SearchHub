package com.example.backend.service.Impl;

import com.example.backend.dto.request.AuthRequest;
import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.UserService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class IUserService implements UserService {

    private final UserRepository userRepository;

    @Override
    public ResponseEntity<?> registration(User recipient) {

    }

    @Override
    public ResponseEntity<?> authorization(AuthRequest authRequest, HttpServletResponse response) {
        return null;
    }

    @Override
    public ResponseEntity<?> refreshAuthToken(String refreshToken, HttpServletResponse response) {
        return null;
    }

    @Override
    public ResponseEntity<?> logout(String refreshToken, HttpServletResponse response) {
        return null;
    }
}
