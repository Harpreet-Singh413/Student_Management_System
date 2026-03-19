package com.example.Spring_Boot_Backend.Controller;

import com.example.Spring_Boot_Backend.Service.StatsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
@CrossOrigin(origins = "http://localhost:5173/")
@RestController
@RequestMapping("/api")
public class StatsController {
    @Autowired
    private StatsService service;
    @GetMapping("/stats")
    public ResponseEntity<Map<String,Long>> getStats(){
        return new ResponseEntity<>(service.getStats(), HttpStatus.OK);
    }
}
