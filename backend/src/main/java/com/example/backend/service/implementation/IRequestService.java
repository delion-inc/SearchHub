package com.example.backend.service.implementation;

import com.example.backend.dto.request.RequestDTO;
import com.example.backend.entity.Request;
import com.example.backend.entity.User;
import com.example.backend.repository.RequestRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.RequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import static com.fasterxml.jackson.datatype.jsr310.deser.JSR310StringParsableDeserializer.ZONE_ID;

@Service
@RequiredArgsConstructor
public class IRequestService implements RequestService {

    private static final String ZONE_ID = "Europe/Kiev";
    private static final String DATA_TIME_FORMAT = "yyyy-MM-dd HH:mm:ss";
    private final RequestRepository requestRepository;
    private final UserRepository userRepository;

    @Override
    public ResponseEntity<?> addRequest(RequestDTO requestDTO, String email) {
        User user = userRepository.findByEmail(email);
        Request request = Request.builder()
                .name(requestDTO.getName())
                .description(requestDTO.getDescription())
                .createdAt(createTime())
                .gender(requestDTO.getGender())
                .location(requestDTO.getLocation())
                .user(user)
                .build();
        return new ResponseEntity<>(requestRepository.save(request), HttpStatus.CREATED);
    }

    private String createTime() {
        ZonedDateTime now = ZonedDateTime.now(ZoneId.of(ZONE_ID));
        return now.format(DateTimeFormatter.ofPattern(DATA_TIME_FORMAT));
    }

    @Override
    public ResponseEntity<?> getRequestById(Long id) {
        Request request = requestRepository.findById(id).orElse(null);
        return new ResponseEntity<>(request, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<?> getAll() {
        List<Request> requests = requestRepository.findAll();
        return new ResponseEntity<>(requests, HttpStatus.OK);
    }
}
