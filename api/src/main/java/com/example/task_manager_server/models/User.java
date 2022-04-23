package com.example.task_manager_server.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name="user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="auth_id")
    private String authId;

    @Column(name="first_name")
    private String firstName;

    @Column(name="last_name")
    private String lastName;


    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
//    @JsonBackReference(value = "user-category")
    @JsonIgnoreProperties("user")
    private List<Category> categories;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
//    @JsonBackReference(value = "user-task")
    @JsonIgnoreProperties("user")
    private List<Task> tasks;

//    add many to many for collaborations
//    private List<Task> collabTasks;


    public User(String authId, String firstName, String lastName ) {

        this.authId = authId;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public User(){

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAuthId() {
        return authId;
    }

    public void setAuthId(String authId) {
        this.authId = authId;
    }

    public List<Category> getCategories() {
        return categories;
    }

    public void setCategories(List<Category> categories) {
        this.categories = categories;
    }

    public List<Task> getTasks() {
        return tasks;
    }

    public void setTasks(List<Task> tasks) {
        this.tasks = tasks;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
}
