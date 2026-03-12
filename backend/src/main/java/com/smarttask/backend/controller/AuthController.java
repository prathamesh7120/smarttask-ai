package com.smarttask.backend.controller;

import com.smarttask.backend.dto.AuthResponse;
import com.smarttask.backend.dto.RegisterRequest;
import com.smarttask.backend.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {

        AuthResponse response = authService.register(request);

        return ResponseEntity.ok(response);



    }

    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("SmartTask API is running!");
    }

}
