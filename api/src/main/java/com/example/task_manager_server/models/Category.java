package com.example.task_manager_server.models;

import com.example.task_manager_server.dtos.CategoryDTO;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cascade;

import javax.persistence.*;
import java.util.ArrayList;
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

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private User user;

    @OneToMany(mappedBy = "category", fetch = FetchType.LAZY)
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

    public Category(String title, String colour, User user) {
        this.title = title;
        this.colour = colour;
        this.user = user;
        this.goals = new ArrayList<Goal>();
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

    public List<Goal> getGoals() {
        return goals;
    }

    public void setGoals(List<Goal> goals) {
        this.goals = goals;
    }

    public CategoryDTO createDTO(){
        CategoryDTO categoryDTO = new CategoryDTO(
                this.getId(),
                this.getTitle(),
                this.getColour()
        );
        return categoryDTO;
    }

}
