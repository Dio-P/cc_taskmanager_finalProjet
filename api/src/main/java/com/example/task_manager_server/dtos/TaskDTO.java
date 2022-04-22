package com.example.task_manager_server.dtos;

import com.example.task_manager_server.models.Category;
import com.example.task_manager_server.models.Priority;
import com.example.task_manager_server.models.TaskType;
import com.example.task_manager_server.models.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

public class TaskDTO {

    private Long id;

    private String title;

    private String description;

    private String date;

    private String time;

    private int duration;

    private TaskType type;

    private CategoryDTO category;

    private Priority priority;

    private boolean completed;

    private String completedTimeStamp;

    public TaskDTO(Long id, String title, String description, String date, String time, int duration, TaskType type, CategoryDTO category, Priority priority, boolean completed, String completedTimeStamp) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.date = date;
        this.time = time;
        this.duration = duration;
        this.type = type;
        this.category = category;
        this.priority = priority;
        this.completed = completed;
        this.completedTimeStamp = completedTimeStamp;
    }

    public TaskDTO() {
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public TaskType getType() {
        return type;
    }

    public void setType(TaskType type) {
        this.type = type;
    }

    public CategoryDTO getCategory() {
        return category;
    }

    public void setCategory(CategoryDTO category) {
        this.category = category;
    }

    public Priority getPriority() {
        return priority;
    }

    public void setPriority(Priority priority) {
        this.priority = priority;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    public String getCompletedTimeStamp() {
        return completedTimeStamp;
    }

    public void setCompletedTimeStamp(String completedTimeStamp) {
        this.completedTimeStamp = completedTimeStamp;
    }
}
