package com.example.task_manager_server.repositories;

import com.example.task_manager_server.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByAuthId(String authId);
}
