package com.example.Spring_Boot_Backend.Repository;

import com.example.Spring_Boot_Backend.Model.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DepartmentRepo extends JpaRepository<Department,Integer> {

}
