package com.example.task_manager_server;

import com.example.task_manager_server.models.*;
import com.example.task_manager_server.repositories.CategoryRepository;
import com.example.task_manager_server.repositories.TaskRepository;
import com.example.task_manager_server.repositories.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

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
		User user = new User("auth0");
		userRepository.save(user);
		Category category = new Category("Chores", "ffffff", Goal.DAILY,60,user);
		categoryRepository.save(category);
		Task task = new Task("Pay vehicle tax","","12/4/22", null, 10, TaskType.DO_ON,category,Priority.HIGH,false,null,user);
		taskRepository.save(task);
		assertEquals(1, taskRepository.findAll().size());
	}

	@Test
	public void canFindUserByAuthId(){
//		User user = new User("testing");
//		userRepository.save(user);
//		Optional foundUser = userRepository.findByAuthId("testing");
//		assertTrue(foundUser.isPresent());
//		assertEquals(user, foundUser.get());
	}

	@Test
	public void canFindTasksByAuthId(){

	}

}
