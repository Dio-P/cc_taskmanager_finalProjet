package com.example.task_manager_server.dtos;

import com.example.task_manager_server.models.GoalType;

import java.util.List;

public class GoalDTO {

    private Long id;

    private GoalType frequency;

    private String startDate;

    private int percentage;

    private List<CategoryDTO> categories;

    public GoalDTO(Long id, GoalType frequency, String startDate, int percentage, List<CategoryDTO> categories) {
        this.id = id;
        this.frequency = frequency;
        this.startDate = startDate;
        this.percentage = percentage;
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

    public GoalType getFrequency() {
        return frequency;
    }

    public void setFrequency(GoalType frequency) {
        this.frequency = frequency;
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

    public List<CategoryDTO> getCategories() {
        return categories;
    }

    public void setCategories(List<CategoryDTO> categories) {
        this.categories = categories;
    }
}
