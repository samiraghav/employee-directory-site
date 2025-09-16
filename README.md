# Employee Directory — Spring Boot + Angular

A simple full-stack application that manages employees and supports CRUD operations with search and filter functionality. The project demonstrates a **Spring Boot backend(Maven)** and an **Angular frontend** working together.

---

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Backend (Spring Boot)](#backend-spring-boot)
5. [Frontend (Angular)](#frontend-angular)
6. [Validation & Error Handling](#validation--error-handling)
7. [How to Run](#how-to-run)
8. [Sample API Usage](#sample-api-usage)
9. [Project Structure](#project-structure)
10. [Deliverables](#deliverables)
11. [Author](#author)

---

## Overview

The **Employee Directory** application allows users to create, view, update, delete, and search employee records. It provides a clean REST API built with **Spring Boot** and a responsive web UI built with **Angular**.

---

## Features

* Employee CRUD (Create, Read, Update, Delete)
* Search employees by department and/or name (case-insensitive)
* In-memory storage (with optional H2 + Spring Data JPA)
* Angular UI with table view and reactive forms
* Real-time UI updates after add/edit/delete
* Input validation and error handling

---

## Tech Stack

**Backend**

* Spring Boot (Maven)
* Java 17+
* In-memory `Map<Long, Employee>` storage (bonus: H2 database + Spring Data JPA)

**Frontend**

* Angular CLI
* TypeScript
* HTML/CSS with Angular Forms

---

## Backend (Spring Boot)

### Entity

```java
Employee {
  Long id,
  String name,
  String department,
  String email,
  LocalDate joinDate
}
```

### REST Endpoints

* `POST   /api/employees` → Create employee
* `GET    /api/employees` → List all employees
* `GET    /api/employees/{id}` → Get employee by ID
* `PUT    /api/employees/{id}` → Update employee
* `DELETE /api/employees/{id}` → Delete employee
* `GET    /api/employees/search?dept={dept}&name={name}` → Filter by department and/or name

---

## Frontend (Angular)

* **Employee Table**: displays employee list
* **Employee Form**: add/edit employees
* **Search Box**: filter by department or name
* **Angular Service**: centralizes HTTP calls to backend
* UI updates dynamically without page reload

---

## Validation & Error Handling

* **Validation**:

  * Required fields: `name`, `department`, `email`
  * Email must be in valid format
* **HTTP Status Codes**:

  * `201 Created` → successful create
  * `200 OK` → successful read/update
  * `204 No Content` → successful delete
  * `400 Bad Request` → invalid inputs
  * `404 Not Found` → resource not found

---

## How to Run

### Backend (Spring Boot)

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

Backend will run on: `http://localhost:8080`

### Frontend (Angular)

```bash
cd frontend
npm install
ng serve -o
```

Frontend will run on: `http://localhost:4200`

---

## Sample API Usage

### Create Employee

```bash
curl -X POST http://localhost:8080/api/employees \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","department":"IT","email":"john@example.com","joinDate":"2025-09-14"}'
```

### Get All Employees

```bash
curl http://localhost:8080/api/employees
```

### Search by Department

```bash
curl http://localhost:8080/api/employees/search?dept=IT
```

### Update Employee

```bash
curl -X PUT http://localhost:8080/api/employees/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"John Smith","department":"HR","email":"smith@example.com","joinDate":"2025-09-14"}'
```

### Delete Employee

```bash
curl -X DELETE http://localhost:8080/api/employees/1
```

---

## Project Structure

```
/EmployeeDirectory
├── backend/          # Spring Boot project
│   ├── src/main/java/com/example/employees
│   │   ├── controller/EmployeeController.java
│   │   ├── model/Employee.java
│   │   ├── service/EmployeeService.java
│   │   └── ...
│   └── pom.xml
│
└── frontend/         # Angular project
    ├── src/app/
    │   ├── components/employee-list/
    │   ├── components/employee-form/
    │   └── services/employee.service.ts
    └── package.json
```

---

## Deliverables

* Spring Boot project (Maven)
* Angular project (CLI)
* Single GitHub repository / ZIP
* README with setup steps + curl examples

---

## Author

Maintainer: **samiraghav24**
Email: `samiraghav24@gmail.com`

---
