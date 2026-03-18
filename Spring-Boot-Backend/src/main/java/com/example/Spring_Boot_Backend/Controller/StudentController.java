package com.example.Spring_Boot_Backend.Controller;

import com.example.Spring_Boot_Backend.Model.Student;
import com.example.Spring_Boot_Backend.Service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5175")
public class StudentController {
    @Autowired
    StudentService service;

    @GetMapping("/students")
    public ResponseEntity<List<Student>> getAllStudents(){
        return new ResponseEntity<>(service.getAllStudents(), HttpStatus.OK);
    }

    @GetMapping("/students/{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable int id){
        Student stu = service.getStuById(id);
        if(stu != null){
            return new ResponseEntity<>(stu,HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/students")
    public ResponseEntity<?> addStudent(@RequestBody Student student){
        try{
            Student st = service.addStudent(student);
            return new ResponseEntity<>(HttpStatus.CREATED);
        }
        catch(Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/students/{id}")
    public ResponseEntity<String> updateStudent(@PathVariable int id , @RequestBody Student student){
        Student stu1 = null;
        try{
            stu1 = service.updateStudent(id,student);
            return new ResponseEntity<>(HttpStatus.CREATED);
        }
        catch(Exception e){
            return new ResponseEntity(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
//        if(stu1 != null){
//            return new ResponseEntity("Updated",HttpStatus.OK);
//        }
//        else {
//            return new ResponseEntity("not updated",HttpStatus.BAD_REQUEST);
//        }
    }

    @DeleteMapping("/students/{id}")
    public ResponseEntity<String> deleteStudent(@PathVariable int id){
        Student stu = service.getStuById(id);
        if(stu != null){
            service.deleteStudentById(id);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/students/search")
    public ResponseEntity<List<Student>> searchStudent(String keyword){
        List<Student> student = service.searchStudent(keyword);
        return new ResponseEntity<>(student , HttpStatus.OK);
    }
}
