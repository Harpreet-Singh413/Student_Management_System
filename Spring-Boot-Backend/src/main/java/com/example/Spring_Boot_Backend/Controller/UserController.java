package com.example.Spring_Boot_Backend.Controller;

import com.example.Spring_Boot_Backend.Model.Users;
import com.example.Spring_Boot_Backend.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class UserController {
    @Autowired
    private UserService service;

    @PostMapping("/login")
    public String login(@RequestBody Users user){
        return service.verify(user);
    }
}
