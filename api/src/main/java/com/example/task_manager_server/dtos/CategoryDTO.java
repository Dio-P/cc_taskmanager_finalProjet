package com.example.task_manager_server.dtos;

import com.example.task_manager_server.models.GoalType;

public class CategoryDTO {

    private Long id;

    private String title;

    private String colour;


    public CategoryDTO(Long id, String title, String colour) {
        this.id = id;
        this.title = title;
        this.colour = colour;
    }

    public CategoryDTO() {
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
}
