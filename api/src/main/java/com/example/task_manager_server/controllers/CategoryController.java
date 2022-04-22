package com.example.task_manager_server.controllers;

import com.example.task_manager_server.dtos.CategoryDTO;
import com.example.task_manager_server.models.Category;
import com.example.task_manager_server.models.Task;
import com.example.task_manager_server.models.User;
import com.example.task_manager_server.repositories.CategoryRepository;
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
@RequestMapping("/auth0")
public class CategoryController {

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    UserRepository userRepository;

    @GetMapping(value="/categories")
    public ResponseEntity<List<CategoryDTO>> getCategories(){
        String userId = SecurityContextHolder.getContext().getAuthentication().getName();
        List<Category> foundCategories = categoryRepository.findByUserAuthId(userId);

        List<CategoryDTO> categoryDTOS = foundCategories.stream().map((category) -> {
            CategoryDTO categoryDTO = new CategoryDTO(
                    category.getId(),
                    category.getTitle(),
                    category.getColour(),
                    category.getGoal(),
                    category.getGoalDuration()
            );
            return categoryDTO;
        }).toList();
        return new ResponseEntity<>(categoryDTOS, HttpStatus.OK);
    }

    @PostMapping(value="/categories")
    public ResponseEntity<Category> createCategory(@RequestBody Category category){
        String userId = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<User> user = userRepository.findByAuthId(userId);
        if (user.isPresent()){
            category.setUser(user.get());
            categoryRepository.save(category);
            return new ResponseEntity<>(category, HttpStatus.CREATED);
        }
        return new ResponseEntity<>(category, HttpStatus.UNAUTHORIZED);

    }

}
