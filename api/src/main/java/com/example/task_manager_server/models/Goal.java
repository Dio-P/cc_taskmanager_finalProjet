package com.example.task_manager_server.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
//    @JsonIgnoreProperties("goal")
    private List<Category> categories;

    public Goal(GoalType frequency, String startDate, int percentage, User user) {
        this.frequency = frequency;
        this.startDate = startDate;
        this.percentage = percentage;
        this.user = user;
        this.categories = new ArrayList<Category>();
    }

    public Goal(){

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

    public void addCategory(Category category) {
        this.categories.add(category);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
