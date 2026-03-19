package com.example.Spring_Boot_Backend.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class StatsService {
    @Autowired
    private StudentService studentService;
    @Autowired
    private DepartmentService departmentService;
    @Autowired
    private CourseService courseService;

    public Map<String, Long> getStats(){
        Map<String, Long> stats = new HashMap<>();
        stats.put("totalStudents", studentService.countStudents());
        stats.put("departments", departmentService.countDepartments());
        stats.put("activeCourses", courseService.countCourses()); // adjust if you track active/inactive
        return stats;
    }
}
