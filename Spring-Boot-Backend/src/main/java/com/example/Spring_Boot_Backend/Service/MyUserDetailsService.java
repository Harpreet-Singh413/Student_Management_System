package com.example.Spring_Boot_Backend.Service;

import com.example.Spring_Boot_Backend.Model.UserPrinciples;
import com.example.Spring_Boot_Backend.Model.Users;
import com.example.Spring_Boot_Backend.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MyUserDetailsService implements UserDetailsService {
    @Autowired
    private UserRepo repo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Users user = repo.findUserByUsername(username);
        if(user == null){
            System.out.println("User not found!");
            throw new UsernameNotFoundException("user not found!!");
        }
        return new UserPrinciples(user);
    }
}
