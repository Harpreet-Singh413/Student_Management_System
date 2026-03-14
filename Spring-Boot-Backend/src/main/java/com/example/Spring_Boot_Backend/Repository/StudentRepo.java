package com.example.Spring_Boot_Backend.Repository;

import com.example.Spring_Boot_Backend.Model.Student;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface StudentRepo extends JpaRepository<Student, Integer> {
    @Query("SELECT s FROM Student s WHERE " +
            "s.firstName LIKE %:keyword% OR " +
            "s.lastName LIKE %:keyword% OR " +
            "s.email LIKE %:keyword% OR " +
            "s.department.dName LIKE %:keyword%")
    List<Student> searchStudent(@Param("keyword") String keyword);
}
