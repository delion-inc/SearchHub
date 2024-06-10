
package com.example.backend.service;

import com.example.backend.dto.request.AuthRequest;
import com.example.backend.entity.User;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public interface UserService {

    Map<String, Object> registration(User user, HttpServletResponse response);

    Map<String, Object> authorization(AuthRequest authRequest, HttpServletResponse response);

    Map<String, Object> refreshAuthToken(String refreshToken, HttpServletResponse response);

    void logout(String refreshToken, HttpServletResponse response);
}

