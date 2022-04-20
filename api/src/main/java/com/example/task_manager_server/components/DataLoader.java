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

        User user1 = new User("auth0|625d433147a7f7006f3d12b4");
        userRepository.save(user1);

        User user2 = new User("auth0|625d60ed379bfd006f275c70");
        userRepository.save(user2);

        Category category1 = new Category("Family","#800080", Goal.NONE,0,user1);
        categoryRepository.save(category1);

        Category category2 = new Category("Chores", "#FF0000", Goal.WEEKLY, 2,user2 );

        Task task1 = new Task(
                "Buy birthday present",
                "Get the blue bike that Iris wants from Halfords",
                "27/04/22",
                "10:00",
                30,
                TaskType.DO_ON,
                category1,
                Priority.HIGH,
                false,
                "",
                user1
                );
        taskRepository.save(task1);

        Task task2 = new Task(
                "Go shopping",
                "milk, bread, cheese",
                "22/04/22",
                "17:00",
                60,
                TaskType.DO_ON,
                category2,
                Priority.MEDIUM,
                false,
                "",
                user1
        );
        taskRepository.save(task2);
    }

}
