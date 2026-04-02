import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard'; // You'll create this next
import ProtectedRoute from './Components/ProtectedRoute';
import AddStudent from './Components/AddStudent';
import StudentList from './Components/StudentList';
import EditStudent from './Components/EditStudent';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/students" 
          element={
            <ProtectedRoute>
              <StudentList/>
            </ProtectedRoute>
          } 
        />

        {/* Redirect logic: If a user hits the base URL, send them to dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        <Route 
          path="/add-student" 
          element={
            <ProtectedRoute>
              <AddStudent />
            </ProtectedRoute>
          } 
        />

        <Route
          path="/edit-student/:id"
          element={
            <ProtectedRoute>
              <EditStudent/>
            </ProtectedRoute>
          }
        />
        
        {/* 404 Catch-all */}
        <Route path="*" element={<div className="p-10 text-center">404 - Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;