package com.project.project.configs;


import com.project.project.repositories.UserRepository;
import com.project.project.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;


@Configuration
public class UserConfig {

    @Autowired
    UserRepository userRepository;

    @Bean
    public List<UserDetails> GET_USERS() {
        Iterator<User> iterator = userRepository.findAll().iterator();
        List<UserDetails> userDetailsList = new ArrayList<>();
        while(iterator.hasNext())  {
            User user = iterator.next();
            System.out.println(user.getUsername());
            userDetailsList.add(user);
        }

        return userDetailsList;
    }
}
