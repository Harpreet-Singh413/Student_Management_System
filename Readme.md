# Student Management Full Stack Project

## 🚀 Getting Started
This is the backend for the Student Management System built with **Spring Boot**, **MySQL**, and **JWT**.

### Prerequisites
* Java 17 or higher
* MySQL Server
* Maven

### Local Setup
1. Clone the repository.
2. Create a file named `src/main/resources/application.properties`.
3. Add your MySQL credentials:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/student_db
   spring.datasource.username=root
   spring.datasource.password=your_password
   service.jwt.secret=your_long_base64_secret_here
