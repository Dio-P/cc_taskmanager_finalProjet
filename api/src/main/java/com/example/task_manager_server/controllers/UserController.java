package com.example.task_manager_server.controllers;

import com.example.task_manager_server.models.User;
import com.example.task_manager_server.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
public class UserController {

    @Autowired
    UserRepository userRepository;

    @PostMapping(value="/users")
    public ResponseEntity createUser(){

        String userId = SecurityContextHolder.getContext().getAuthentication().getName();

        Optional foundUser = userRepository.findByAuthId(userId);

        if ( !foundUser.isPresent() ){
            User newUser = new User(userId);
            userRepository.save(newUser);
        }
        return new ResponseEntity<>(userId, HttpStatus.CREATED);
    }
}
