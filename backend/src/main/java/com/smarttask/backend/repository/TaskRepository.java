package com.smarttask.backend.repository;

import com.smarttask.backend.model.Task;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface TaskRepository extends MongoRepository<Task,String> {

    List<Task> findByUserIdOrderByCreatedAtDesc(String userId);

    List<Task> findByUserIdAndStatus(String userId, String status);

    Optional<Task> findByIdAndUserId(String id, String userId);



}
