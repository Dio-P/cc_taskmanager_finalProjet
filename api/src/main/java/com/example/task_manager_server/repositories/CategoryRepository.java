package com.example.task_manager_server.repositories;

import com.example.task_manager_server.models.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    List<Category> findByUserAuthId(String authId);

}
