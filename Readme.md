# 🎓 Student Management System (Full Stack)

A comprehensive full-stack application for managing student records, departments, and authentication, built with a modern tech stack.

## 🚀 Tech Stack

**Frontend:** React.js, Tailwind CSS (or your CSS choice), Axios
**Backend:** Java, Spring Boot, Spring Security, JWT
**Database:** MySQL
**Tools:** Maven, Git, REST API

---

## ✨ Features
* **Secure Authentication:** JWT-based login and signup.
* **Student Management:** Full CRUD (Create, Read, Update, Delete) operations.
* **Department Mapping:** Organize students by their respective departments.
* **Search & Filter:** Quickly find students by name or ID and filter students by departments.


---

## 🛠️ Installation & Setup

### 1. Backend (Spring Boot)
* Navigate to the `Spring-Boot-Backend` folder.
* Ensure you have **Java 17** and **Maven** installed.
* Create `src/main/resources/application.properties` and add:
  ```properties
  spring.datasource.url=jdbc:mysql://localhost:3306/student_db
  spring.datasource.username=your_username
  spring.datasource.password=your_password
  service.jwt.secret=your_secret_key

### 2. Frontend Setup (React + Vite)
* Open a new terminal and navigate to the frontend directory:
   cd React-Frontend
* Install dependencies:
   npm install
* Start the development server:
   npm run dev
* The application will launch (typically at http://localhost:5173 for   Vite).