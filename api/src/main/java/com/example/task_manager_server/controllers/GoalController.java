package com.example.task_manager_server.controllers;

import com.example.task_manager_server.dtos.CategoryDTO;
import com.example.task_manager_server.dtos.GoalDTO;
import com.example.task_manager_server.models.Category;
import com.example.task_manager_server.models.Goal;
import com.example.task_manager_server.models.User;
import com.example.task_manager_server.repositories.GoalRepository;
import com.example.task_manager_server.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
        List<Goal> foundGoals = goalRepository.findByUserAuthId(userId);
        List<GoalDTO> goalDTOS = new ArrayList<>();
        for(Goal goal: foundGoals) {
            List<CategoryDTO> categoryDTOS = new ArrayList<>();
            for(Category category: goal.getCategories()) {
//                CategoryDTO categoryDTO = new CategoryDTO(
//                        category.getId(), category.getTitle(), category.getColour()
//                );
                CategoryDTO categoryDTO = category.createDTO();
                categoryDTOS.add(categoryDTO);
            }
//            GoalDTO goalDTO = new GoalDTO(
//                    goal.getId(),
//                    goal.isActive(),
//                    goal.getTitle(),
//                    goal.getType(),
//                    goal.getStartDate(),
//                    goal.getTarget(),
//                    categoryDTOS
//            );
            GoalDTO goalDTO = goal.createDTO(categoryDTOS);
            goalDTOS.add(goalDTO);
        }
        return new ResponseEntity<>(goalDTOS, HttpStatus.OK);
    }

    @PostMapping(value="/goals")
    public ResponseEntity<Goal> createGoal(@RequestBody Goal goal){
        String userId = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<User> user = userRepository.findByAuthId(userId);
        if (user.isPresent()){
            goal.setUser(user.get());
            goalRepository.save(goal);
            return new ResponseEntity<>(goal, HttpStatus.CREATED);
        }
        return new ResponseEntity<>(goal, HttpStatus.UNAUTHORIZED);

    }

    @PutMapping(value="/goals/{id}", consumes = {"*/*"})
    public ResponseEntity<Goal> updateTask(@PathVariable Long id, @RequestBody Goal goal){
        String userId = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<User> user = userRepository.findByAuthId(userId);
        if (user.isPresent()){
            goal.setUser(user.get());
            goal.setId(id);
            goalRepository.save(goal);
            return new ResponseEntity<>(goal, HttpStatus.CREATED);
        }
        return new ResponseEntity<>(goal, HttpStatus.UNAUTHORIZED);
    }

    @DeleteMapping(value="/goals/{id}", consumes = {"*/*"})
    public ResponseEntity<Long> deleteGoals(@PathVariable Long id) {
        goalRepository.deleteById(id);
        return new ResponseEntity<>(id, HttpStatus.OK);
    }
}
