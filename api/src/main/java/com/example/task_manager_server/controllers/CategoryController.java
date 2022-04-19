package com.example.task_manager_server.controllers;

import com.example.task_manager_server.models.Category;
import com.example.task_manager_server.repositories.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("*")
public class CategoryController {

    @Autowired
    CategoryRepository categoryRepository;

    @GetMapping(value="/categories")
    public ResponseEntity<List<Category>> getCategories(){
        String userId = SecurityContextHolder.getContext().getAuthentication().getName();
        return new ResponseEntity<>(categoryRepository.findByUserAuthId(userId), HttpStatus.OK);
    }

}
