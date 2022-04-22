package com.example.task_manager_server.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cascade;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name="categories")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="title")
    private String title;

    @Column(name="colour")
    private String colour;

    @Column(name="goal")
    private GoalType goalType;

    @Column(name="goal_duration")
    private int goalDuration;

    @ManyToOne
//    @JsonManagedReference(value = "user-category")
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private User user;

    @OneToMany(mappedBy = "category", fetch = FetchType.LAZY)
//    @JsonBackReference(value = "task-category")
    @JsonIgnoreProperties("category")
    private List<Task> tasks;

    @ManyToMany
    @Cascade(org.hibernate.annotations.CascadeType.SAVE_UPDATE)
    @JoinTable(
            name="goals_categories",
            joinColumns = {@JoinColumn(name="category_id",
                    nullable = false,
                    updatable = false)},
            inverseJoinColumns = {@JoinColumn(name="goal_id",
                    nullable = false,
                    updatable = false)}
    )
    @JsonIgnoreProperties("category")
    private List<Goal> goals;

    public Category(String title, String colour, GoalType goalType, int goalDuration, User user) {
        this.title = title;
        this.colour = colour;
        this.goalType = goalType;
        this.goalDuration = goalDuration;
        this.user = user;
    }

    public Category(){

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

    public GoalType getGoal() {
        return goalType;
    }

    public void setGoal(GoalType goalType) {
        this.goalType = goalType;
    }

    public int getGoalDuration() {
        return goalDuration;
    }

    public void setGoalDuration(int goalDuration) {
        this.goalDuration = goalDuration;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<Task> getTasks() {
        return tasks;
    }

    public void setTasks(List<Task> tasks) {
        this.tasks = tasks;
    }
}
