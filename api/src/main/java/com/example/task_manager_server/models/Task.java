package com.example.task_manager_server.models;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name="tasks")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="name")
    private String name;

    @Column(name="description")
    private String description;

    @Column(name="date")
    private String date;

    @Column(name="time")
    private String time;

    @Column(name="duration")
    private int duration;

    @Column(name="task_type")
    private TaskType taskType;

    @Column(name="category")
    private Category category;

    @Column(name="priority")
    private Priority priority;

    @Column(name="completed")
    private boolean completed;

    @Column(name="completed_timestamp")
    private String completedTimeStamp;

//    private List<User> collaborators;

    @Column(name="user")
    private User user;

    public Task(String name, String description, String date, String time, int duration, TaskType taskType, Category category, Priority priority, boolean completed, String completedTimeStamp, User user) {
        this.name = name;
        this.description = description;
        this.date = date;
        this.time = time;
        this.duration = duration;
        this.taskType = taskType;
        this.category = category;
        this.priority = priority;
        this.completed = completed;
        this.completedTimeStamp = completedTimeStamp;
//        this.collaborators = collaborators;
        this.user = user;
    }

    public Task(){

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public TaskType getTaskType() {
        return taskType;
    }

    public void setTaskType(TaskType taskType) {
        this.taskType = taskType;
    }

    public Priority getPriority() {
        return priority;
    }

    public void setPriority(Priority priority) {
        this.priority = priority;
    }
}
