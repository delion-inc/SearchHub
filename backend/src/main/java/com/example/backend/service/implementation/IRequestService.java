package com.example.backend.service.implementation;

import com.example.backend.dto.request.RequestDTO;
import com.example.backend.dto.response.RequestResponseDTO;
import com.example.backend.dto.response.UserDTO;
import com.example.backend.entity.Request;
import com.example.backend.entity.User;
import com.example.backend.repository.RequestRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.RequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class IRequestService implements RequestService {

    private static final String ZONE_ID = "Europe/Kiev";
    private static final String DATA_TIME_FORMAT = "yyyy-MM-dd HH:mm:ss";
    private final RequestRepository requestRepository;
    private final UserRepository userRepository;

    @Override
    public ResponseEntity<?> addRequest(RequestDTO requestDTO, MultipartFile image, String email) {
        if(requestDTO.getName() == null || requestDTO.getDescription() == null || requestDTO.getGender() == null || requestDTO.getLocation() == null) {
            return new ResponseEntity<>("Please fill in all fields", HttpStatus.BAD_REQUEST);
        }
        User user = userRepository.findByEmail(email);
        Request request;
        try {
            request = Request.builder()
                    .name(requestDTO.getName())
                    .description(requestDTO.getDescription())
                    .createdAt(createTime())
                    .image(image.getBytes())
                    .gender(requestDTO.getGender())
                    .location(requestDTO.getLocation())
                    .user(user)
                    .build();
        }
        catch (Exception e) {
            return new ResponseEntity<>("Error while saving request", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(requestRepository.save(request), HttpStatus.CREATED);
    }

    private String createTime() {
        ZonedDateTime now = ZonedDateTime.now(ZoneId.of(ZONE_ID));
        return now.format(DateTimeFormatter.ofPattern(DATA_TIME_FORMAT));
    }

    @Override
    public ResponseEntity<?> getRequestById(Long id) {
        Request request = requestRepository.findById(id).orElse(null);
        RequestResponseDTO requestResponseDTO = getRequestResponseDTO(request);
        return new ResponseEntity<>(requestResponseDTO, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<?> getAll() {
        List<Request> requests = requestRepository.findAll();
        List<RequestResponseDTO> requestResponseDTOList = new ArrayList<>();
        for (Request request : requests) {
            RequestResponseDTO requestResponseDTO = getRequestResponseDTO(request);
            requestResponseDTOList.add(requestResponseDTO);
        }
        return new ResponseEntity<>(requestResponseDTOList, HttpStatus.OK);
    }

    private static RequestResponseDTO getRequestResponseDTO(Request request) {
        UserDTO userDTO = UserDTO.builder()
                .email(request.getUser().getEmail())
                .name(request.getUser().getName())
                .surname(request.getUser().getSurname())
                .phone(request.getUser().getPhone())
                .build();
        RequestResponseDTO requestResponseDTO = RequestResponseDTO.builder()
                .id(request.getId())
                .name(request.getName())
                .createdAt(request.getCreatedAt())
                .description(request.getDescription())
                .gender(request.getGender())
                .location(request.getLocation())
                .image(request.getImage())
                .user(userDTO)
                .build();
        return requestResponseDTO;
    }
}
