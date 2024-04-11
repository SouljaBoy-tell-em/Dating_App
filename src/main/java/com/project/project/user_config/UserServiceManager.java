package com.project.project.user_config;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;


@Service
public class UserServiceManager {

    @Autowired
    private UserRepository userRepository;

    public void Add(User user) {
        if(userRepository.existsById(user.getUsername()))
            return;
        userRepository.save(user);
    }

    public User GetById(String username) {
        return userRepository
                .findById(username)
                .get();
    }

    public UserDetailsService UserDetailsService() {
        return this::GetById;
    }

    public User GetAuthorizedUser() {
        Authentication authentication = SecurityContextHolder
                .getContext()
                .getAuthentication();
        return GetById(authentication.getName());
    }

    public void getAdmin() {
        var user = GetAuthorizedUser();
        user.setRole(UserRole.ROLE_ADMIN);
        Add(user);
    }
}
