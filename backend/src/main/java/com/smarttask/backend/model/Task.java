package com.smarttask.backend.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Data
@Document(collection = "tasks")
public class Task {

    @Id
    private String id;

    private String title;

    private String description;

    private String status = "TODO";

    private String priority = "MEDIUM";

    private String userId;

    private LocalDateTime dueDate;

    private LocalDateTime createdAt = LocalDateTime.now();

    private boolean aiSuggested = false;
}
