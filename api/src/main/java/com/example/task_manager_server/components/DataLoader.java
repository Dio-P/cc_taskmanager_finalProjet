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

        User user2 = new User("google-oauth2|100172415311420940348");
        userRepository.save(user2);

        User user3 = new User("auth0|625d60ed379bfd006f275c70");
        userRepository.save(user3);

        Category category1 = new Category("Project","#800080", GoalType.NONE,0,user1);
        categoryRepository.save(category1);

        Category category2 = new Category("Project", "#FF0000", GoalType.WEEKLY, 2,user2 );
        categoryRepository.save(category2);

        Category category3 = new Category("Project", "#FF0000", GoalType.WEEKLY, 2,user3 );
        categoryRepository.save(category3);

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

        Task task3 = new Task(
                "3setting the authorisation up",
                "finding a way to connect the users with the database",
                "26.05.2022",
                "15:14",
                70,
                TaskType.DO_ON,
                category1,
                Priority.HIGH,
                false,
                "",
                user2
        );
        taskRepository.save(task3);

        Task task4 = new Task(
                "1setting the authorisation up",
                "finding a way to connect the users with the database",
                "26.05.2022",
                "15:14",
                70,
                TaskType.DO_BY,
                category1,
                Priority.LOW,
                true,
                "",
                user2
        );
        taskRepository.save(task4);

        Task task5 = new Task(
                "2setting the authorisation up",
                "finding a way to connect the users with the database",
                "26.05.2022",
                "15:14",
                70,
                TaskType.SOMEDAY,
                category1,
                Priority.MEDIUM,
                true,
                "",
                user2
        );
        taskRepository.save(task5);

        Task task6 = new Task(
                "6setting the authorisation up",
                "finding a way to connect the users with the database",
                "26.05.2022",
                "15:14",
                70,
                TaskType.DO_BY,
                category1,
                Priority.LOW,
                false,
                "",
                user2
        );
        taskRepository.save(task6);

        Task task7 = new Task(
                "3setting the authorisation up",
                "finding a way to connect the users with the database",
                "26.05.2022",
                "15:14",
                70,
                TaskType.DO_ON,
                category1,
                Priority.HIGH,
                false,
                "",
                user3
        );
        taskRepository.save(task7);
    }

}
