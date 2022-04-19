package com.example.task_manager_server.repositories;

import com.example.task_manager_server.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
