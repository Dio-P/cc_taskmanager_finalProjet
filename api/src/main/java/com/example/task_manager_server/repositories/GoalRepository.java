package com.example.task_manager_server.repositories;

import com.example.task_manager_server.models.Category;
import com.example.task_manager_server.models.Goal;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GoalRepository extends JpaRepository<Goal, Long> {
    List<Goal> findByUserAuthId(String authId);
}
