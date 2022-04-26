package com.example.task_manager_server.dtos;

import com.example.task_manager_server.models.GoalType;

import java.util.List;

public class GoalDTO {

    private Long id;

    private boolean active;

    private String title;

    private GoalType type;

    private String startDate;

    private int target;

    private List<CategoryDTO> categories;

    public GoalDTO(Long id, boolean active, String title, GoalType type, String startDate, int target, List<CategoryDTO> categories) {
        this.id = id;
        this.active = active;
        this.title = title;
        this.type = type;
        this.startDate = startDate;
        this.target = target;
        this.categories = categories;
    }

    public GoalDTO() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public List<CategoryDTO> getCategories() {
        return categories;
    }

    public void setCategories(List<CategoryDTO> categories) {
        this.categories = categories;
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
}
