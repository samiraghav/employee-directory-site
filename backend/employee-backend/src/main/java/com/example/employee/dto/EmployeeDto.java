package com.example.employee.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import java.time.LocalDate;

public class EmployeeDto {
    @NotBlank(message = "name is required")
    private String name;

    @NotBlank(message = "department is required")
    private String department;

    @NotBlank(message = "email is required")
    @Email(message = "email must be valid")
    private String email;

    private LocalDate joinDate;

    // getters & setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public LocalDate getJoinDate() { return joinDate; }
    public void setJoinDate(LocalDate joinDate) { this.joinDate = joinDate; }
}
