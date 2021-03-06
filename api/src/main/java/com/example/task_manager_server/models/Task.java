package com.example.task_manager_server.models;

import com.example.task_manager_server.dtos.CategoryDTO;
import com.example.task_manager_server.dtos.TaskDTO;
import com.example.task_manager_server.dtos.UserDTO;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import org.hibernate.annotations.Cascade;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="tasks")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="name")
    private String title;

    @Column(name="description")
    private String description;

    @Column(name="date")
    private String date;

    @Column(name="time")
    private String time;

    @Column(name="duration")
    private int duration;

    @Column(name="task_type")
    private TaskType type;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @Column(name="priority")
    private Priority priority;

    @Column(name="completed")
    private boolean completed;

    @Column(name="completed_timestamp")
    private String completedTimeStamp;

    @ManyToMany
    @Cascade(org.hibernate.annotations.CascadeType.SAVE_UPDATE)
    @JoinTable(
            name = "collaborators",
            joinColumns = {@JoinColumn( name="task_id",
                                        nullable = false,
                                        updatable = false)},
            inverseJoinColumns = {@JoinColumn(  name="user_id",
                                                nullable = false,
                                                updatable = false)}
    )
    @JsonIgnoreProperties("collabTasks")
    private List<User> collaborators;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private User user;

    public Task(String title, String description, String date, String time, int duration, TaskType type, Category category, Priority priority, boolean completed, String completedTimeStamp, User user) {
        this.title = title;
        this.description = description;
        this.date = date;
        this.time = time;
        this.duration = duration;
        this.type = type;
        this.category = category;
        this.priority = priority;
        this.completed = completed;
        this.completedTimeStamp = completedTimeStamp;
        this.collaborators = new ArrayList<User>();
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

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
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

    public TaskType getType() {
        return type;
    }

    public void setType(TaskType type) {
        this.type = type;
    }

    public Priority getPriority() {
        return priority;
    }

    public void setPriority(Priority priority) {
        this.priority = priority;
    }

    public List<User> getCollaborators() {
        return collaborators;
    }

    public void setCollaborators(List<User> collaborators) {
        this.collaborators = collaborators;
    }

    public void addCollaborator(User user){
        this.collaborators.add(user);
    }

    public TaskDTO createDTO(CategoryDTO category, List<UserDTO> collaborators){
        TaskDTO taskDTO = new TaskDTO(
                this.getId(),
                this.getTitle(),
                this.getDescription(),
                this.getDate(),
                this.getTime(),
                this.getDuration(),
                this.getType(),
                category,
                this.getPriority(),
                this.isCompleted(),
                this.getCompletedTimeStamp(),
                collaborators
        );
        return taskDTO;
    }
}
