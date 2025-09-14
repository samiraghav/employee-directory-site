package com.example.employee.model;

import java.time.LocalDate;

public class Employee {
    private Long id;
    private String name;
    private String department;
    private String email;
    private LocalDate joinDate;

    public Employee() {}

    public Employee(Long id, String name, String department, String email, LocalDate joinDate) {
        this.id = id; this.name = name; this.department = department; this.email = email; this.joinDate = joinDate;
    }

    // getters & setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public LocalDate getJoinDate() { return joinDate; }
    public void setJoinDate(LocalDate joinDate) { this.joinDate = joinDate; }
}
