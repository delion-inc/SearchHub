package com.example.backend.service.implementation;

import com.example.backend.dto.request.AuthRequest;
import com.example.backend.entity.User;
import com.example.backend.entity.constant.Role;
import com.example.backend.repository.UserRepository;
import com.example.backend.security.JwtTokenService;
import com.example.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserDetailsService, UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtTokenService tokenService;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email);
        List<SimpleGrantedAuthority> authorities = user.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority(role.name()))
                .collect(Collectors.toList());
        return new org.springframework.security.core.userdetails.User(user.getName(), user.getPassword(), authorities);
    }

    @Override
    public Map<String, Object> registration(User user, HttpServletResponse response) {
        validateUser(user);
        if(userRepository.findByEmail(user.getEmail()) != null) {
            return Map.of("message", "User with email " + user.getEmail() + " already exist");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRoles(Collections.singletonList(Role.fromValue(2001)));

        UserDetails userDetails = createUserDetails(user);
        String accessToken = tokenService.generateToken(userDetails);
        String refreshToken = tokenService.generateRefreshToken(userDetails);
        user.setRefreshToken(refreshToken);
        userRepository.save(user);

        tokenService.setTokenCookies(response, refreshToken);
        return createResponseBody(user, accessToken);
    }

    @Override
    public Map<String, Object> authorization(AuthRequest authRequest, HttpServletResponse response) {
        User user = userRepository.findByEmail(authRequest.getEmail());
        if (!passwordEncoder.matches(authRequest.getPassword(), user.getPassword())) {
            return Map.of("message", "Invalid password");
        }

        UserDetails userDetails = createUserDetails(user);
        String accessToken = tokenService.generateToken(userDetails);
        String refreshToken = tokenService.generateRefreshToken(userDetails);
        user.setRefreshToken(refreshToken);
        userRepository.save(user);

        tokenService.setTokenCookies(response, refreshToken);
        return createResponseBody(user, accessToken);
    }

    @Override
    public Map<String, Object> refreshAuthToken(String refreshToken, HttpServletResponse response) {
        User user = userRepository.findByRefreshToken(refreshToken);
        if (user == null) {
            return Map.of("message", "Invalid refreshToken");
        }

        UserDetails userDetails = loadUserByUsername(user.getEmail());
        String accessToken = tokenService.generateToken(userDetails);

        tokenService.setTokenCookies(response, refreshToken);
        Map<String, Object> responseBody = createResponseBody(user, accessToken);
        userRepository.save(user);
        return responseBody;
    }

    private void validateUser(User user) {
        if(user.getEmail() == null || user.getPassword() == null || user.getName() == null || user.getSurname() == null || user.getPhone() == null) {
            throw new IllegalArgumentException("All fields must be filled");
        }
    }

    private UserDetails createUserDetails(User user) {
        List<GrantedAuthority> authorities = user.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority(role.name()))
                .collect(Collectors.toList());
        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), authorities);
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

    @Override
    public void logout(String refreshToken, HttpServletResponse response) {
        User user = userRepository.findByRefreshToken(refreshToken);
        if (user == null) {
            throw new IllegalArgumentException("Invalid refreshToken");
        }
        user.setRefreshToken("");
        userRepository.save(user);
        response.setHeader("Set-Cookie", "refreshToken=; HttpOnly; SameSite=None; Secure; Max-age=0");
    }
}
