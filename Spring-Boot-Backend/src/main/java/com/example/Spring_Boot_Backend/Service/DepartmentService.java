package com.example.Spring_Boot_Backend.Service;

import com.example.Spring_Boot_Backend.Model.Department;
import com.example.Spring_Boot_Backend.Repository.DepartmentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepartmentService {
    @Autowired
    private DepartmentRepo repo;
    public List<Department> getAllStudents() {
        return repo.findAll();
    }
}
