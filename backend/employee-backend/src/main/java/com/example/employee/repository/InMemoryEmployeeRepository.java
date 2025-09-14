package com.example.employee.repository;

import com.example.employee.model.Employee;
import org.springframework.stereotype.Repository;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;

@Repository
public class InMemoryEmployeeRepository {
    private final Map<Long, Employee> store = new ConcurrentHashMap<>();
    private final AtomicLong idGen = new AtomicLong(0);

    public Employee save(Employee e) {
        if (e.getId() == null) e.setId(idGen.incrementAndGet());
        store.put(e.getId(), e);
        return e;
    }

    public Optional<Employee> findById(Long id) { return Optional.ofNullable(store.get(id)); }
    public List<Employee> findAll() { return new ArrayList<>(store.values()); }
    public void delete(Long id) { store.remove(id); }

    public List<Employee> search(Optional<String> dept, Optional<String> name) {
        return store.values().stream()
                .filter(emp -> dept.map(d -> emp.getDepartment()!=null && emp.getDepartment().toLowerCase().contains(d.toLowerCase())).orElse(true))
                .filter(emp -> name.map(n -> emp.getName()!=null && emp.getName().toLowerCase().contains(n.toLowerCase())).orElse(true))
                .collect(Collectors.toList());
    }
}
