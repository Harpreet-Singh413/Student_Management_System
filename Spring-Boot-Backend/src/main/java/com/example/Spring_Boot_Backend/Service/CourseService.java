package com.example.Spring_Boot_Backend.Service;

import com.example.Spring_Boot_Backend.Model.Course;
import com.example.Spring_Boot_Backend.Repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseService {
    @Autowired
    private CourseRepository repo;
    public List<Course> getAllCourses() {
        return repo.findAll();
    }
}
