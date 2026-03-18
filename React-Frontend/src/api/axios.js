import axios from "axios";

// 1. Create the Axios instance
const API = axios.create({
  baseURL: "http://localhost:8080/api", // Your Spring Boot base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// 2. Request Interceptor: Automatically add JWT to every outgoing request
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      // Standard Bearer token format for Spring Security
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// // 3. Response Interceptor: Handle global errors (like 401 Unauthorized)
// API.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     // If backend returns 401, the token is likely expired or invalid
//     if (error.response && error.response.status === 401) {
//       console.warn("Token expired or unauthorized. Logging out...");
//       localStorage.removeItem("token");
//       window.location.href = "/login"; // Redirect to login page
//     }
//     return Promise.reject(error);
//   }
// );

// --- API Endpoints ---

// Auth
export const loginAdmin = (credentials) => API.post("/auth/login", credentials);

// Student CRUD Operations
export const getStudents = () => API.get("/students");
export const getStudentById = (id) => API.get(`/students/${id}`);
export const addStudent = (studentData) => API.post("/students", studentData);
export const updateStudent = (id, studentData) => API.put(`/students/${id}`, studentData);
export const deleteStudent = (id) => API.delete(`/students/${id}`);

// Search & Filter
export const searchStudents = (name) => API.get(`/students/search?name=${name}`);
export const filterByDept = (dept, course) => 
  API.get(`/students/filter?dept=${dept}&course=${course}`);

export default API;