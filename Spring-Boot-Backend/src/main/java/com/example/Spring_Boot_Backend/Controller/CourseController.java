package com.example.Spring_Boot_Backend.Controller;

import com.example.Spring_Boot_Backend.Model.Course;
import com.example.Spring_Boot_Backend.Service.CourseService;
import jakarta.persistence.Entity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CourseController {
    @Autowired
    private CourseService service;
    @GetMapping("/course")
    public ResponseEntity<List<Course>> getAllCourse(){
        return new ResponseEntity<>(service.getAllCourses(), HttpStatus.OK);
    }
}
