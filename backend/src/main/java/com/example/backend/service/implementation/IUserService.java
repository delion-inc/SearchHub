package com.example.backend.service.implementation;

import com.example.backend.dto.request.AuthRequest;
import com.example.backend.dto.response.UserDTO;
import com.example.backend.entity.User;
import com.example.backend.entity.constant.Role;
import com.example.backend.repository.UserRepository;
import com.example.backend.security.JwtTokenService;
import com.example.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class IUserService implements UserDetailsService, UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final JwtTokenService jwtTokenService;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email);
        List<Role> roles = user.getRoles();
        List<SimpleGrantedAuthority> authorities = roles.stream()
                .map(role -> new SimpleGrantedAuthority(role.name()))
                .collect(Collectors.toList());
        return new org.springframework.security.core.userdetails.User(user.getName(), user.getPassword(), authorities);
    }

    @Override
    public ResponseEntity<?> registration(User user, HttpServletResponse response) {
        if(user.getEmail() == null || user.getPassword() == null || user.getName() == null || user.getSurname() == null || user.getPhone() == null) {
            return new ResponseEntity<>("All fields must be filled", HttpStatus.BAD_REQUEST);
        }
        if(userRepository.findByEmail(user.getEmail()) != null) {
            return new ResponseEntity<>("User with email " + user.getEmail() + " already exist", HttpStatus.UNAUTHORIZED);
        }

        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        user.setRoles(Collections.singletonList(Role.fromValue(2001)));

        List<GrantedAuthority> authorities = user.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority(role.name()))
                .collect(Collectors.toList());
        UserDetails userDetails = new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), authorities);
        String accessToken = jwtTokenService.generateToken(userDetails);
        String refreshToken = jwtTokenService.generateRefreshToken(userDetails);
        user.setRefreshToken(refreshToken);
        userRepository.save(user);

        jwtTokenService.setTokenCookies(response, refreshToken);
        Map<String, Object> responseBody = createResponseBody(user, accessToken);
        return new ResponseEntity<>(responseBody, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<?> authorization(AuthRequest authRequest, HttpServletResponse response) {
        User user = userRepository.findByEmail(authRequest.getEmail());
        if (!bCryptPasswordEncoder.matches(authRequest.getPassword(), user.getPassword())) {
            return new ResponseEntity<>("Invalid password", HttpStatus.UNAUTHORIZED);
        }

        List<GrantedAuthority> authorities = user.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority(role.name()))
                .collect(Collectors.toList());
        UserDetails userDetails = new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), authorities);
        String accessToken = jwtTokenService.generateToken(userDetails);
        String refreshToken = jwtTokenService.generateRefreshToken(userDetails);
        user.setRefreshToken(refreshToken);
        userRepository.save(user);

        jwtTokenService.setTokenCookies(response, refreshToken);
        Map<String, Object> responseBody = createResponseBody(user, accessToken);
        return new ResponseEntity<>(responseBody, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<?> refreshAuthToken(String refreshToken, HttpServletResponse response) {
        User user = userRepository.findByRefreshToken(refreshToken);
        if (user == null) {
            return new ResponseEntity<>("Invalid refreshToken", HttpStatus.BAD_REQUEST);
        }

        UserDetails userDetails = loadUserByUsername(user.getEmail());
        String accessToken = jwtTokenService.generateToken(userDetails);

        jwtTokenService.setTokenCookies(response, refreshToken);
        Map<String, Object> responseBody = createResponseBody(user, accessToken);
        userRepository.save(user);
        return new ResponseEntity<>(responseBody, HttpStatus.OK);
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
    public ResponseEntity<?> logout(String refreshToken, HttpServletResponse response) {
        User user = userRepository.findByRefreshToken(refreshToken);
        if (user == null) {
            return new ResponseEntity<>("Invalid refreshToken", HttpStatus.BAD_REQUEST);
        }
        user.setRefreshToken("");
        userRepository.save(user);
        response.setHeader("Set-Cookie", "refreshToken=; HttpOnly; SameSite=None; Secure; Max-age=0");
        return ResponseEntity.noContent().build();
    }
}
