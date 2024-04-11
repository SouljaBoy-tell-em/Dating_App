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

    /**
     * The Add(User) adds a new user in the DB.
     * @param user user.
     */
    public void Add(User user) {
        if(userRepository.existsById(user.getUsername()))
            return;
        userRepository.save(user);
    }

    /**
     * The GetAuthorizedUser() is a method, that checks user authorization.
     * @return link to the UserDetailsService method.
     */
    public User GetAuthorizedUser() {
        Authentication authentication = SecurityContextHolder
                .getContext()
                .getAuthentication();
        return GetById(authentication.getName());
    }

    /**
     * The GetById(String) gets a user by id.
     * @param username username.
     * @return user, if user exists in the DB.
     */
    public User GetById(String username) {
        return userRepository
                .findById(username)
                .get();
    }

    /**
     * The UserDetailsService() is a service data explorer.
     * @return link to the UserDetailsService method.
     */
    public UserDetailsService UserDetailsService() {
        return this::GetById;
    }

}
