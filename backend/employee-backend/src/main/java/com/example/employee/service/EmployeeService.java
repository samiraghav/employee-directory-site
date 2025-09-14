package com.example.employee.service;

import com.example.employee.dto.EmployeeDto;
import com.example.employee.model.Employee;
import com.example.employee.repository.InMemoryEmployeeRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {
    private final InMemoryEmployeeRepository repo;
    public EmployeeService(InMemoryEmployeeRepository repo) { this.repo = repo; }

    public Employee create(EmployeeDto dto) {
        LocalDate jd = dto.getJoinDate() == null ? LocalDate.now() : dto.getJoinDate();
        Employee e = new Employee(null, dto.getName(), dto.getDepartment(), dto.getEmail(), jd);
        return repo.save(e);
    }

    public List<Employee> list() { return repo.findAll(); }
    public Optional<Employee> get(Long id) { return repo.findById(id); }

    public Optional<Employee> update(Long id, EmployeeDto dto) {
        return repo.findById(id).map(existing -> {
            existing.setName(dto.getName());
            existing.setDepartment(dto.getDepartment());
            existing.setEmail(dto.getEmail());
            existing.setJoinDate(dto.getJoinDate() == null ? existing.getJoinDate() : dto.getJoinDate());
            return repo.save(existing);
        });
    }

    public boolean delete(Long id) {
        if (repo.findById(id).isPresent()) { repo.delete(id); return true; }
        return false;
    }

    public List<Employee> search(Optional<String> dept, Optional<String> name) { return repo.search(dept, name); }
}
