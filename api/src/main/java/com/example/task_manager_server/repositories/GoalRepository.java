package com.example.task_manager_server.repositories;

import com.example.task_manager_server.models.Goal;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GoalRepository extends JpaRepository<Goal, Long> {
}
