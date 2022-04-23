package com.example.task_manager_server.controllers;

import com.example.task_manager_server.models.Goal;
import com.example.task_manager_server.repositories.GoalRepository;
import com.example.task_manager_server.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/auth0")
public class GoalController {

    @Autowired
    GoalRepository goalRepository;

    @Autowired
    UserRepository userRepository;

    @GetMapping(value = "/goals")
    public ResponseEntity<List<Goal>> getGoalsForUser() {
        String userId = SecurityContextHolder.getContext().getAuthentication().getName();
        List<Goal> foundgoals = goalRepository.findByUserAuthId(userId);
        return new ResponseEntity<>(foundgoals, HttpStatus.OK);
    }
}
