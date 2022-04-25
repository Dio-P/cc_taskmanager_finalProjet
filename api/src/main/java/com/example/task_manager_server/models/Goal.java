package com.example.task_manager_server.models;

import com.example.task_manager_server.dtos.CategoryDTO;
import com.example.task_manager_server.dtos.GoalDTO;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cascade;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="goals")
public class Goal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="active")
    private boolean active;

    @Column(name = "title")
    private String title;

    @Column(name="type")
    private GoalType type;

    @Column(name="start_date")
    private String startDate;

    @Column(name="target")
    private int target;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private User user;

    @ManyToMany
    @Cascade(org.hibernate.annotations.CascadeType.SAVE_UPDATE)
    @JoinTable(
            name="goals_categories",
            joinColumns = {@JoinColumn(name="goal_id",
                    nullable = false,
                    updatable = false)},
            inverseJoinColumns = {@JoinColumn(name="category_id",
                    nullable = false,
                    updatable = false)}
    )
    private List<Category> categories;

    public Goal(boolean active, String title, GoalType type, String startDate, int target, User user) {
        this.type = type;
        this.startDate = startDate;
        this.target = target;
        this.user = user;
        this.categories = new ArrayList<Category>();
    }

    public Goal(){

    }

    public GoalType getType() {
        return type;
    }

    public void setType(GoalType type) {
        this.type = type;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public int getTarget() {
        return target;
    }

    public void setTarget(int target) {
        this.target = target;
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

    public void addCategory(Category category) {
        this.categories.add(category);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public GoalDTO createDTO(List<CategoryDTO> category){
        GoalDTO goalDTO = new GoalDTO(
                this.getId(),
                this.isActive(),
                this.getTitle(),
                this.getType(),
                this.getStartDate(),
                this.getTarget(),
                category
        );
        return goalDTO;
    }
}
