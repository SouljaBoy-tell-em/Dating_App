package com.project.project;


import com.project.project.repositories.UserRepository;
import com.project.project.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


@Configuration
@Controller
@RequestMapping
@SessionAttributes(names = "user")
public class MainController {

    @Autowired
    private UserRepository userRepository;

    @ModelAttribute(name = "user")
    public User User() {
        Authentication authentication = SecurityContextHolder
                .getContext().getAuthentication();
        try {
            User user = userRepository.findById(authentication.getName()).get();
            return user;
        } catch (Exception exception) {
            return new User();
        }
    }

    @GetMapping
    public String PROFILE() {
        return "profile";
    }

    @GetMapping("/token_handler")
    public String TOKEN_HANDLER(@RequestParam("code") String code) {
        System.out.println("AUTHENTICATION CODE: " + code);
        return "token_handler";
    }
}
