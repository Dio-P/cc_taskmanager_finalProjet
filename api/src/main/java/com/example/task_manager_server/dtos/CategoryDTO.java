package com.example.task_manager_server.dtos;

import com.example.task_manager_server.models.Goal;
import com.example.task_manager_server.models.Task;
import com.example.task_manager_server.models.User;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.List;

public class CategoryDTO {

    private Long id;

    private String title;

    private String colour;

    private Goal goal;

    private int goalDuration;

    public CategoryDTO(Long id, String title, String colour, Goal goal, int goalDuration) {
        this.id = id;
        this.title = title;
        this.colour = colour;
        this.goal = goal;
        this.goalDuration = goalDuration;
    }

    public CategoryDTO() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getColour() {
        return colour;
    }

    public void setColour(String colour) {
        this.colour = colour;
    }

    public Goal getGoal() {
        return goal;
    }

    public void setGoal(Goal goal) {
        this.goal = goal;
    }

    public int getGoalDuration() {
        return goalDuration;
    }

    public void setGoalDuration(int goalDuration) {
        this.goalDuration = goalDuration;
    }
}
