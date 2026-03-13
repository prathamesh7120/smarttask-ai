package com.smarttask.backend.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class TaskResponse {
    private String id;
    private String title;
    private String description;
    private String status;
    private String priority;
    private LocalDateTime dueDate;
    private LocalDateTime createdAt;
    private boolean aiSuggested;
}