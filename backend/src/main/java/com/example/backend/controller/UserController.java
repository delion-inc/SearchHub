package com.example.backend.controller;

import com.example.backend.dto.request.AuthRequest;
import com.example.backend.entity.User;
import com.example.backend.service.UserService;
import jakarta.annotation.security.RolesAllowed;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/registration")
//    @RolesAllowed("ROLE_USER")
    public ResponseEntity<?> registrationRecipient(@RequestBody User user, HttpServletResponse response) {
        return userService.registration(user, response);
    }

    @PostMapping("/authorization")
//    @RolesAllowed("ROLE_USER")
    public ResponseEntity<?> authorization(@RequestBody AuthRequest authRequest, HttpServletResponse response) {
        return userService.authorization(authRequest, response);
    }

    @PostMapping("/refresh")
//    @RolesAllowed("ROLE_USER")
    public ResponseEntity<?> refreshAuthToken(@CookieValue("jwt") String refreshToken, HttpServletResponse response) {
        return userService.refreshAuthToken(refreshToken, response);
    }

    @PostMapping("/logout")
//    @RolesAllowed("ROLE_USER")
    public ResponseEntity<?> logout(@CookieValue("jwt") String refreshToken, HttpServletResponse response) {
        return userService.logout(refreshToken, response);
    }
}
