package com.example.task_manager_server.components;

import com.example.task_manager_server.models.*;
import com.example.task_manager_server.repositories.CategoryRepository;
import com.example.task_manager_server.repositories.GoalRepository;
import com.example.task_manager_server.repositories.TaskRepository;
import com.example.task_manager_server.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class DataLoader implements ApplicationRunner {

    @Autowired
    TaskRepository taskRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    GoalRepository goalRepository;

    public DataLoader(){

    }

    public void run(ApplicationArguments args){

        User user1 = new User("google-oauth2|115148861114920303466", "Steph", "Paterson");
        userRepository.save(user1);

        User user2 = new User("google-oauth2|100172415311420940348", "Dio", "Papadopoulos");
        userRepository.save(user2);

        User user3 = new User("auth0|625d60ed379bfd006f275c70", "Rachel", "McDonald");
        userRepository.save(user3);

        Category category1 = new Category("Project","#800080",user1);
        categoryRepository.save(category1);

        Category category4 = new Category("Social","#800080",user1);
        categoryRepository.save(category4);

        Category category2 = new Category("Project", "#800080", user2);
        categoryRepository.save(category2);

        Category category5 = new Category("Social", "#FF0000", user2);
        categoryRepository.save(category5);

        Category category3 = new Category("Project", "#800080", user3);
        categoryRepository.save(category3);

        Category category6 = new Category("Social", "#FF0000", user3);
        categoryRepository.save(category6);

        Goal goal1 = new Goal(true, "My goal", GoalType.DAILY, "30-04-22", 20, user1);
        goalRepository.save(goal1);
        goal1.addCategory(category1);
        goalRepository.save(goal1);

        Goal goal4 = new Goal(true, "My other goal", GoalType.WEEKLY, "20-04-22", 40, user1);
        goalRepository.save(goal4);
        goal4.addCategory(category4);
        goalRepository.save(goal4);

        Goal goal2 = new Goal(true, "My goal",GoalType.WEEKLY, "28-05-22", 10, user2);
        goalRepository.save(goal2);
        goal2.addCategory(category2);
        goalRepository.save(goal2);

        Goal goal5 = new Goal(true, "My other goal",GoalType.DAILY, "23-04-22", 80, user2);
        goalRepository.save(goal5);
        goal5.addCategory(category2);
        goal5.addCategory(category5);
        goalRepository.save(goal5);

        Goal goal3 = new Goal(true, "My goal",GoalType.DAILY, "10-06-22", 30, user3);
        goalRepository.save(goal3);
        goal3.addCategory(category3);
        goalRepository.save(goal3);

        Goal goal6 = new Goal(true, "My other goal",GoalType.WEEKLY, "20-04-22", 30, user3);
        goalRepository.save(goal6);
        goal6.addCategory(category3);
        goal6.addCategory(category6);
        goalRepository.save(goal6);

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
        task1.addCollaborator(user2);
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
        task3.addCollaborator(user3);
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
                "1650967205000",
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
                "1650967205000",
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
        task7.addCollaborator(user1);
        taskRepository.save(task7);
    }

}
