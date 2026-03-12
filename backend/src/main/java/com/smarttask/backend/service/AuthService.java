package com.smarttask.backend.service;

import com.smarttask.backend.dto.AuthResponse;
import com.smarttask.backend.dto.RegisterRequest;
import com.smarttask.backend.model.User;
import com.smarttask.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

        private final UserRepository userRepository;
        private final PasswordEncoder passwordEncoder;

        public AuthResponse register(RegisterRequest request) {

            if(userRepository.existsByEmail(request.getEmail())) {

                throw new RuntimeException("Email already Registered");

            }

            User user = new User();
            user.setName(request.getName());
            user.setEmail(request.getEmail());
            user.setPassword(passwordEncoder.encode(request.getPassword()));

            userRepository.save(user);

            return new AuthResponse("Registration Succssful",user.getEmail(),user.getName());

        }



}
