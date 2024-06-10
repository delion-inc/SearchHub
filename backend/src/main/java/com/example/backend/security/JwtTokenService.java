package com.example.backend.security;

import com.example.backend.entity.constant.Role;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Service
public class JwtTokenService {

    private static final String JWT_TYPE = "JWT";
    private static final String SIGNING_ALGORITHM = "HS256";

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.accessToken.lifetime}")
    private Duration jwtAccessTokenLifetime;

    @Value("${jwt.refreshToken.lifetime}")
    private Duration jwtRefreshTokenLifetime;

    public String getEmail(String token) {
        return getAllClaimsFromToken(token).getSubject();
    }

    public List<Role> getRoles(String token) {
        List<String> roleStrings = getAllClaimsFromToken(token).get("roles", List.class);
        return roleStrings.stream().map(Role::valueOf).collect(Collectors.toList());
    }

    private Claims getAllClaimsFromToken(String token) {
        return Jwts.parser()
                .setSigningKey(secret)
                .parseClaimsJws(token)
                .getBody();
    }

    public String generateToken(UserDetails userDetails) {
        return generateJwt(userDetails, jwtAccessTokenLifetime);
    }

    public String generateRefreshToken(UserDetails userDetails) {
        return generateJwt(userDetails, jwtRefreshTokenLifetime);
    }

    public void setTokenCookies(HttpServletResponse response, String refreshToken) {
        String cookieValue = String.format("jwt=%s; Path=/; HttpOnly; Secure; SameSite=None; Max-Age=%s", refreshToken, 24 * 60 * 60);
        response.setHeader("Set-Cookie", cookieValue);
    }

    private Map<String, Object> createJwtHeader() {
        Map<String, Object> header = new ConcurrentHashMap<>();
        header.put("typ", JWT_TYPE);
        header.put("alg", SIGNING_ALGORITHM);
        return header;
    }

    private String generateJwt(UserDetails userDetails, Duration lifetime) {
        Map<String, Object> header = createJwtHeader();

        Map<String, Object> claims = new ConcurrentHashMap<>();
        List<Role> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .map(Role::valueOf)
                .collect(Collectors.toList());
        claims.put("roles", roles);

        Instant issuedDate = Instant.now();
        Instant expiredDate = issuedDate.plus(lifetime);
        return Jwts.builder()
                .setHeader(header)
                .setClaims(claims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(Date.from(issuedDate))
                .setExpiration(Date.from(expiredDate))
                .signWith(SignatureAlgorithm.HS256, secret)
                .compact();
    }
}
