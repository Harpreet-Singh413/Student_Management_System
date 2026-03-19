package com.example.Spring_Boot_Backend.Service;

import com.example.Spring_Boot_Backend.Model.Student;
import com.example.Spring_Boot_Backend.Repository.StudentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    @Autowired
    private StudentRepo repo;

    public Long countStudents(){
        return repo.count();
    }

    public List<Student> getAllStudents() {
        return repo.findAll();
    }

    public Student getStuById(int id) {
        return repo.findById(id).orElse(null);
    }


    public Student addStudent(Student student) {
        return repo.save(student);
    }

    public Student updateStudent(int id, Student student) {
        Student stu = repo.findById(id).orElse(addStudent(student));
        stu.setFirstName(student.getFirstName());
        stu.setLastName(student.getLastName());
        stu.setDob(student.getDob());
        stu.setCourse(student.getCourse());
        stu.setDepartment(student.getDepartment());
        return repo.save(stu);
    }


    public void deleteStudentById(int id) {
        repo.deleteById(id);
    }


    public List<Student> searchStudent(String keyword) {
        return repo.searchStudent(keyword);
    }
}
