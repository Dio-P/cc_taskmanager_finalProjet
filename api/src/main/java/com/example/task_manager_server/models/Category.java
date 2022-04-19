package com.example.task_manager_server.models;

import javax.persistence.*;

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
    private Goal goal;

    @Column(name="goal_duration")
    private int goalDuration;

    public Category(String title, String colour, Goal goal, int goalDuration) {
        this.title = title;
        this.colour = colour;
        this.goal = goal;
        this.goalDuration = goalDuration;
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
