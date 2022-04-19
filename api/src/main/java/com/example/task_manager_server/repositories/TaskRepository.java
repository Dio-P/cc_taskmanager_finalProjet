package com.example.task_manager_server.repositories;

import com.example.task_manager_server.models.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {
}
