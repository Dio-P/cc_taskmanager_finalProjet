package com.example.task_manager_server.controllers;

import com.example.task_manager_server.models.Category;
import com.example.task_manager_server.models.Task;
import com.example.task_manager_server.models.User;
import com.example.task_manager_server.repositories.TaskRepository;
import com.example.task_manager_server.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
public class TaskController {

    @Autowired
    TaskRepository taskRepository;

    @Autowired
    UserRepository userRepository;

    @GetMapping(value="/tasks")
    public ResponseEntity<List<Task>> getTasksForUser(){
        String userId = SecurityContextHolder.getContext().getAuthentication().getName();
        return new ResponseEntity<>(taskRepository.findByUserAuthId(userId), HttpStatus.OK);
    }

    @PostMapping(value="/tasks")
    public ResponseEntity<Task> createTask(@RequestBody Task task){
        String userId = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<User> user = userRepository.findByAuthId(userId);
        if (user.isPresent()){
            task.setUser(user.get());
            taskRepository.save(task);
            return new ResponseEntity<>(task, HttpStatus.CREATED);
        }
        return new ResponseEntity<>(task, HttpStatus.UNAUTHORIZED);

    }

//    @PostMapping(value="/tasks/{id}")
//    public ResponseEntity<Task> updateTask(@RequestBody Task task){
//        taskRepository.
//    }

}
