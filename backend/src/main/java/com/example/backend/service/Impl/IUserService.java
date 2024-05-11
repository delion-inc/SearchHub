package com.example.backend.service.Impl;

import com.example.backend.dto.request.AuthRequest;
import com.example.backend.entity.User;
import com.example.backend.entity.constant.Role;
import com.example.backend.repository.UserRepository;
import com.example.backend.security.JwtTokenService;
import com.example.backend.service.UserService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class IUserService implements UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final JwtTokenService jwtTokenService;

    @Override
    public ResponseEntity<?> registration(User user, HttpServletResponse response) {
        if(user.getEmail() == null || user.getPassword() == null || user.getName() == null || user.getSurname() == null) {
            return ResponseEntity.badRequest().body("All fields must be filled");
        }
        if(userRepository.findByEmail(user.getEmail())) {
            return ResponseEntity.badRequest().body("User with this email already exists");
        }

        List<GrantedAuthority> authorities = user.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority(role.name()))
                .collect(Collectors.toList());
        UserDetails userDetails = new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), authorities);
        String accessToken = jwtTokenService.generateToken(userDetails);
        String refreshToken = jwtTokenService.generateRefreshToken(userDetails);
        user.setRefreshToken(refreshToken);

        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        user.setRoles(Collections.singletonList(Role.fromValue(user.getRole())));
        userRepository.save(user);

        jwtTokenService.setTokenCookies(response, refreshToken);
        Map<String, Object> responseBody = createResponseBody(user, accessToken);
        return new ResponseEntity<>(responseBody, HttpStatus.OK);
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

    private Map<String, Object> createResponseBody(User user, String accessToken) {
        Map<String, Object> responseBody = new HashMap<>();
        List<Integer> roleValues = user.getRoles().stream()
                .map(Role::getValue)
                .toList();
        responseBody.put("roles", roleValues);
        responseBody.put("accessToken", accessToken);
        return responseBody;
    }
}
