package com.example.backend.controller;

import com.example.backend.dto.request.RequestDTO;
import com.example.backend.service.RequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/request")
@RequiredArgsConstructor
public class RequestController {

    private final RequestService requestService;

    @PostMapping("/add")
    public ResponseEntity<?> addRequest(@RequestBody RequestDTO request, Principal principal) {
        return requestService.addRequest(request, principal.getName());
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<?> getRequestById(@PathVariable Long id) {
        return requestService.getRequestById(id);
    }

    @GetMapping("/get-all")
    public ResponseEntity<?> getAllRequest() {
        return requestService.getAll();
    }
}
