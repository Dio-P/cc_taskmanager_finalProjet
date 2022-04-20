package com.example.task_manager_server.components;

import com.example.task_manager_server.models.*;
import com.example.task_manager_server.repositories.CategoryRepository;
import com.example.task_manager_server.repositories.TaskRepository;
import com.example.task_manager_server.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements ApplicationRunner {

    @Autowired
    TaskRepository taskRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    CategoryRepository categoryRepository;

    public DataLoader(){

    }

    public void run(ApplicationArguments args){

        User user1 = new User("google-oauth2|115148861114920303466");
        userRepository.save(user1);

        User user2 = new User("auth0|625d60ed379bfd006f275c70");
        userRepository.save(user2);

        Category category1 = new Category("Project","#800080", Goal.NONE,0,user1);
        categoryRepository.save(category1);

        Category category2 = new Category("Project", "#FF0000", Goal.WEEKLY, 2,user2 );
        categoryRepository.save(category2);

        Task task1 = new Task(
                "setting the authorisation up",
                "finding a way to connect the users with the database",
                "26.05.2022",
                "15:14",
                70,
                TaskType.DO_ON,
                category1,
                Priority.HIGH,
                false,
                "",
                user1
                );
        taskRepository.save(task1);

        Task task2 = new Task(
                "front end style",
                "starting with tailwind and css",
                null,
                null,
                60,
                TaskType.SOMEDAY,
                category2,
                Priority.HIGH,
                false,
                "",
                user1
        );
        taskRepository.save(task2);
    }

}
