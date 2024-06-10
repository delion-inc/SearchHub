package com.example.backend.service;


import com.example.backend.dto.request.RequestDTO;
import com.example.backend.dto.response.RequestResponseDTO;
import com.example.backend.entity.Request;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public interface RequestService {

    Request addRequest(RequestDTO request, MultipartFile image, String name);

    RequestResponseDTO getRequestById(Long id);

    List<RequestResponseDTO> getAll();
}