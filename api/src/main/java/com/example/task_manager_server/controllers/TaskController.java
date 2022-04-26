package com.example.task_manager_server.controllers;

import com.example.task_manager_server.dtos.CategoryDTO;
import com.example.task_manager_server.dtos.TaskDTO;
import com.example.task_manager_server.dtos.UserDTO;
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

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins="*", methods={RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT})
@RequestMapping("/auth0")
public class TaskController {

    @Autowired
    TaskRepository taskRepository;

    @Autowired
    UserRepository userRepository;

    @GetMapping(value="/tasks")
    public ResponseEntity<List<TaskDTO>> getTasksForUser(){
        String userId = SecurityContextHolder.getContext().getAuthentication().getName();

        List<Task> foundTasks = taskRepository.findByUserAuthId(userId);


        List<TaskDTO> taskDTOS = foundTasks.stream().map((task) -> {

            CategoryDTO categoryDTO = task.getCategory().createDTO();

            List<UserDTO> collaborators = new ArrayList<>();
            for(User user : task.getCollaborators()){
                UserDTO userDTO = user.createDTO();
                collaborators.add(userDTO);
            }

            return task.createDTO(categoryDTO, collaborators);
        }).toList();


        return new ResponseEntity<>(taskDTOS, HttpStatus.OK);
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

    @PutMapping(value="/tasks/{id}", consumes = {"*/*"})
    public ResponseEntity<Task> updateTask(@PathVariable Long id, @RequestBody Task task){
        String userId = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<User> user = userRepository.findByAuthId(userId);
        Optional<Task> existingTask = taskRepository.findById(id);
        if (user.isPresent() && existingTask.isPresent() && user.get().compareUser(existingTask.get().getUser())){
            Task updatedTask = existingTask.get();
            updatedTask.setTitle(task.getTitle());
            updatedTask.setDescription(task.getDescription());
            updatedTask.setDate(task.getDate());
            updatedTask.setTime(task.getTime());
            updatedTask.setDuration(task.getDuration());
            updatedTask.setType(task.getType());
            updatedTask.setCategory(task.getCategory());
            updatedTask.setPriority(task.getPriority());
            updatedTask.setCompleted(task.isCompleted());
            updatedTask.setCompletedTimeStamp(task.getCompletedTimeStamp());
            updatedTask.setCollaborators(task.getCollaborators());

            taskRepository.save(updatedTask);
            return new ResponseEntity<>(updatedTask, HttpStatus.CREATED);
        }
        return new ResponseEntity<>(task, HttpStatus.UNAUTHORIZED);
    }

    @DeleteMapping(value="/tasks/{id}", consumes = {"*/*"})
    public ResponseEntity<Long> deleteTasks(@PathVariable Long id) {
        taskRepository.deleteById(id);
        return new ResponseEntity<>(id, HttpStatus.OK);
    }


}
