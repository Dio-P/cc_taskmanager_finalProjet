package com.example.task_manager_server.controllers;

import com.example.task_manager_server.dtos.UserDTO;
import com.example.task_manager_server.models.User;
import com.example.task_manager_server.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/auth0")
public class UserController {

    @Autowired
    UserRepository userRepository;

    @PostMapping(value="/users")
    public ResponseEntity createUser(){

        String userId = SecurityContextHolder.getContext().getAuthentication().getName();

        Optional foundUser = userRepository.findByAuthId(userId);

        if ( !foundUser.isPresent() ){
            User newUser = new User(userId, "", "");
            userRepository.save(newUser);
        }
        HashMap<String, Boolean> response = new HashMap<>();
        response.put("userExists", foundUser.isPresent());
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

//    create update route to add first name / last name


    @GetMapping(value="/users")
    public ResponseEntity<List<UserDTO>> getCollaborators(){
        List<User> users = userRepository.findAll();
        List<UserDTO> userDTOS = users.stream().map((user)->{
            UserDTO userDTO = new UserDTO(
                    user.getId(),
                    user.getFirstName(),
                    user.getLastName()
            );
            return userDTO;
        }).toList();

        return new ResponseEntity<>(userDTOS, HttpStatus.OK);
    }
}
