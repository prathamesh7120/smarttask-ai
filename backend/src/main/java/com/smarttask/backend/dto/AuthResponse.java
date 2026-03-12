package com.smarttask.backend.dto;

import lombok.Data;
import lombok.AllArgsConstructor;

@Data
@AllArgsConstructor
public class AuthResponse {
    private String message;
    private String token;
    private String email;
    private String name;
}