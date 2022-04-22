package com.example.task_manager_server.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name="goals")
public class Goal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="frequency")
    private GoalType frequency;

    @Column(name="start_date")
    private String startDate;

    @Column(name="percentage")
    private int percentage;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private User user;

    @OneToMany(mappedBy = "goal", fetch = FetchType.LAZY)
    @JsonIgnoreProperties("goal")
    private List<Category> categories;

    @OneToMany(mappedBy = "goal", fetch = FetchType.LAZY)
    @JsonIgnoreProperties("goal")
    private List<TaskType> taskTypes;

    public Goal(GoalType frequency, String startDate, int percentage, User user, List<Category> categories, List<TaskType> taskTypes) {
        this.frequency = frequency;
        this.startDate = startDate;
        this.percentage = percentage;
        this.user = user;
        this.categories = categories;
        this.taskTypes = taskTypes;
    }

    public GoalType getFrequency() {
        return frequency;
    }

    public void setFrequency(GoalType type) {
        this.frequency = type;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public int getPercentage() {
        return percentage;
    }

    public void setPercentage(int percentage) {
        this.percentage = percentage;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<Category> getCategories() {
        return categories;
    }

    public void setCategories(List<Category> categories) {
        this.categories = categories;
    }

    public List<TaskType> getTaskTypes() {
        return taskTypes;
    }

    public void setTaskTypes(List<TaskType> taskTypes) {
        this.taskTypes = taskTypes;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
