package com.example.Spring_Boot_Backend.Repository;

import com.example.Spring_Boot_Backend.Model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends JpaRepository<Users,Integer> {

    Users findUserByUsername(String username);
}
