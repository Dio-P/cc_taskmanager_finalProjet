package com.example.task_manager_server.controllers;

import com.example.task_manager_server.dtos.CategoryDTO;
import com.example.task_manager_server.dtos.GoalDTO;
import com.example.task_manager_server.models.Category;
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

import java.util.ArrayList;
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
    public ResponseEntity<List<GoalDTO>> getGoalsForUser() {
        String userId = SecurityContextHolder.getContext().getAuthentication().getName();
        List<Goal> foundgoals = goalRepository.findByUserAuthId(userId);
        List<GoalDTO> goalDTOS = new ArrayList<>();
        for(Goal goal: foundgoals) {
            List<CategoryDTO> categoryDTOS = new ArrayList<>();
            for(Category category: goal.getCategories()) {
                CategoryDTO categoryDTO = new CategoryDTO(
                        category.getId(), category.getTitle(), category.getColour()
                );
                categoryDTOS.add(categoryDTO);
            }
            GoalDTO goalDTO = new GoalDTO(
                    goal.getId(),
                    goal.getFrequency(),
                    goal.getStartDate(),
                    goal.getPercentage(),
                    categoryDTOS
            );
            goalDTOS.add(goalDTO);
        }
        return new ResponseEntity<>(goalDTOS, HttpStatus.OK);
    }
}
