package com.example.task_manager_server;

import com.example.task_manager_server.models.Category;
import com.example.task_manager_server.models.Goal;
import com.example.task_manager_server.models.User;
import com.example.task_manager_server.repositories.CategoryRepository;
import com.example.task_manager_server.repositories.TaskRepository;
import com.example.task_manager_server.repositories.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
class TaskManagerServerApplicationTests {

	@Autowired
	UserRepository userRepository;

	@Autowired
	TaskRepository taskRepository;

	@Autowired
	CategoryRepository categoryRepository;


	@Test
	void contextLoads() {
	}

	@Test
	public void canCreateUser(){
		User user = new User("auth0");
		userRepository.save(user);
		assertEquals(1, userRepository.findAll().size());
	}

	@Test
	public void canCreateCategory(){
		User user = new User("auth0");
		userRepository.save(user);
		Category category = new Category("Chores", "ffffff", Goal.DAILY,60,user);
		categoryRepository.save(category);
		assertEquals(1, categoryRepository.findAll().size());
	}

	
	@Test
	public void canCreateTask(){

	}

}
