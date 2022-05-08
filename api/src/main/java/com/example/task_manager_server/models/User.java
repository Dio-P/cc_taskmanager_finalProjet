package com.example.task_manager_server.models;

import com.example.task_manager_server.dtos.UserDTO;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cascade;

import javax.persistence.*;
import java.util.ArrayList;
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
    private List<Category> categories;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private List<Task> tasks;

    @ManyToMany
    @Cascade(org.hibernate.annotations.CascadeType.SAVE_UPDATE)
    @JoinTable(
            name="collaborators",
            joinColumns = {@JoinColumn( name="user_id",
                                        nullable = false,
                                        updatable = false)},
            inverseJoinColumns = {@JoinColumn( name="task_id",
                                                nullable = false,
                                                updatable = false)}
    )
    private List<Task> collabTasks;


    public User(String authId, String firstName, String lastName ) {

        this.authId = authId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.collabTasks = new ArrayList<Task>();
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

    public List<Task> getCollabTasks() {
        return collabTasks;
    }

    public void setCollabTasks(List<Task> collabTasks) {
        this.collabTasks = collabTasks;
    }

    public void addCollabTask(Task task){
        this.collabTasks.add(task);
    }

    public UserDTO createDTO(){
        UserDTO userDTO = new UserDTO(
                this.getId(),
                this.getFirstName(),
                this.getLastName()
        );
        return userDTO;
    }

    public Boolean compareUser(User user){
        return authId.equals(user.getAuthId());
    }
}
