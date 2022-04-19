package com.example.task_manager_server.controllers;

import com.example.task_manager_server.models.Category;
import com.example.task_manager_server.models.Task;
import com.example.task_manager_server.repositories.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class TaskController {

    @Autowired
    TaskRepository taskRepository;

    @GetMapping(value="/tasks")
    public ResponseEntity<List<Task>> getTasksForUser(){
        String userId = SecurityContextHolder.getContext().getAuthentication().getName();
        return new ResponseEntity<>(taskRepository.findByUserAuthId(userId), HttpStatus.OK);
    }


}
