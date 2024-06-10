package com.example.backend.service.implementation;

import com.example.backend.dto.request.RequestDTO;
import com.example.backend.dto.response.CommentDTO;
import com.example.backend.dto.response.RequestResponseDTO;
import com.example.backend.dto.response.UserDTO;
import com.example.backend.entity.Comment;
import com.example.backend.entity.Request;
import com.example.backend.entity.User;
import com.example.backend.repository.CommentRepository;
import com.example.backend.repository.RequestRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.RequestService;
import com.example.backend.utils.TimeProvider;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import java.util.ArrayList;
import java.util.List;


@Service
@RequiredArgsConstructor
public class RequestServiceImpl implements RequestService {

    private final RequestRepository requestRepository;
    private final UserRepository userRepository;
    private final CommentRepository commentRepository;
    private final RestTemplate restTemplate;
    private final TimeProvider timeProvider;

    @Value("${address.python.service}")
    private String adress;

    @Override
    public Request addRequest(RequestDTO requestDTO, MultipartFile image, String email) {
        if(requestDTO.getName() == null || requestDTO.getDescription() == null || requestDTO.getGender() == null || requestDTO.getLocation() == null) {
            throw new IllegalArgumentException("Please fill in all fields");
        }
        User user = userRepository.findByEmail(email);
        Request request;
        try {
            request = Request.builder()
                    .name(requestDTO.getName())
                    .description(requestDTO.getDescription())
                    .createdAt(timeProvider.getCurrentTime())
                    .image(image.getBytes())
                    .gender(requestDTO.getGender())
                    .location(requestDTO.getLocation())
                    .user(user)
                    .build();
        }
        catch (Exception e) {
            throw new RuntimeException("Error while saving request", e);
        }
        return requestRepository.save(request);
    }

    @Override
    public RequestResponseDTO getRequestById(Long id) {
        Request request = requestRepository.findById(id).orElse(null);
        if (request == null) {
            throw new IllegalArgumentException("Request not found");
        }
        return getRequestResponseDTO(request);
    }

    @Override
    public List<RequestResponseDTO> getAll() {
        List<Request> requests = requestRepository.findAll();
        List<RequestResponseDTO> requestResponseDTOList = new ArrayList<>();
        for (Request request : requests) {
            RequestResponseDTO requestResponseDTO = getRequestResponseDTO(request);
            requestResponseDTOList.add(requestResponseDTO);
        }
        return requestResponseDTOList;
    }

    private RequestResponseDTO getRequestResponseDTO(Request request) {
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
                .info(createRequestResponseDTO(request.getName()))
//                .info(null)
                .user(userDTO)
                .comments(mappedComments(request.getId(), userDTO))
                .build();
        return requestResponseDTO;
    }

    private List<CommentDTO> mappedComments(Long id, UserDTO userDTO) {
        List<Comment> commentList = commentRepository.findByRequestId(id);
        List<CommentDTO> commentDTOList = new ArrayList<>();
        for (Comment comment : commentList) {
            CommentDTO commentDTO = CommentDTO.builder()
                    .id(comment.getId())
                    .text(comment.getText())
                    .createdAt(comment.getCreatedAt())
                    .user(UserDTO.builder()
                            .email(userDTO.getEmail())
                            .name(userDTO.getName())
                            .surname(userDTO.getSurname())
                            .phone(userDTO.getPhone())
                            .build())
                    .build();
            commentDTOList.add(commentDTO);
        }
        return commentDTOList;
    }

    private String createRequestResponseDTO(String name) {
        String url = "http://" + adress + ":8081/api/v1/search/" + name;
        String urlResponse = "";
        try {
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, null, String.class);
            if (response.getStatusCode() == HttpStatus.OK) {
                String responseBody = response.getBody();
                ObjectMapper mapper = new ObjectMapper();
                JsonNode node = mapper.readTree(responseBody);
                urlResponse = node.get("url").asText();
            }
            return urlResponse;
        } catch (HttpClientErrorException.NotFound e) {
            throw new IllegalArgumentException("Not found", e);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

}