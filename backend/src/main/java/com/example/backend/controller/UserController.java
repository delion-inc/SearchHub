package com.example.backend.controller;

import com.example.backend.dto.request.AuthRequest;
import com.example.backend.entity.User;
import com.example.backend.service.UserService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/registration")
    public ResponseEntity<?> registrationRecipient(@RequestBody User recipient) {
        return userService.registration(recipient);
    }

    @PostMapping("/authorization")
    public ResponseEntity<?> authorization(@RequestBody AuthRequest authRequest, HttpServletResponse response) {
        return userService.authorization(authRequest, response);
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refreshAuthToken(@CookieValue("jwt") String refreshToken, HttpServletResponse response) {
        return userService.refreshAuthToken(refreshToken, response);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@CookieValue("jwt") String refreshToken, HttpServletResponse response) {
        return userService.logout(refreshToken, response);
    }
}