package com.example.backend.security;

import com.example.backend.entity.constant.Role;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.SignatureException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class JwtTokenFilter extends OncePerRequestFilter {

    private final JwtTokenService jwtTokenService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String jwt = extractToken(request);
        if (jwt != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            authenticateUser(jwt);
        }
        filterChain.doFilter(request, response);
    }

    private String extractToken(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        String jwt = null;
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            jwt = authHeader.substring(7);
        }
        return jwt;
    }

    private void authenticateUser(String jwt) {
        try {
            String email = jwtTokenService.getEmail(jwt);
            List<Role> roles = jwtTokenService.getRoles(jwt);
            List<SimpleGrantedAuthority> authorities = roles.stream()
                    .map(role -> new SimpleGrantedAuthority(role.toString()))
                    .collect(Collectors.toList());
            UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
                    email,
                    null,
                    authorities
            );
            SecurityContextHolder.getContext().setAuthentication(token);
        } catch (ExpiredJwtException e) {
            logger.debug("Time of token expired");
        } catch (SignatureException e) {
            logger.debug("Invalid token signature");
        }
    }
}
