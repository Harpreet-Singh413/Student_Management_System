package com.example.Spring_Boot_Backend.Controller;

import com.example.Spring_Boot_Backend.Model.Department;
import com.example.Spring_Boot_Backend.Service.DepartmentService;
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
public class DepartmentController {

    @Autowired
    private DepartmentService service;

   @GetMapping("/departments")
   public ResponseEntity<List<Department>> getDepartments(){
       return new ResponseEntity<>(service.getAllStudents(), HttpStatus.OK);
   }
}
