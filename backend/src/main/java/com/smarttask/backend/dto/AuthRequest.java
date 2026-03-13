package com.smarttask.backend.dto;

import lombok.Data;

import java.time.LocalDateTime;

public class AuthRequest {

    @Data
    public class TaskRequest {
        private String title;
        private String description;
        private String status;
        private String priority;
        private LocalDateTime dueDate;
    }

}
