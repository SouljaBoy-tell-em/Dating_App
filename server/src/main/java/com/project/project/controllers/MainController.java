package com.project.project.controllers;


import com.project.project.user_config.User;
import com.project.project.user_config.UserRole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


@Controller
@RequestMapping
@SessionAttributes("user")
public class MainController {

    @Value("${jwt.access.key}")
    public String jwtAccessKey;

    @Value("${jwt.refresh.key}")
    public String jwtRefreshKey;
    private final String REST_API_AUTHORIZATION_LINK = "http://localhost:8080/auth/login";
    private final String REST_API_REGISTRATION_LINK = "http://localhost:8080/auth/register";

    @Autowired
    private PasswordEncoder passwordEncoder;

    @ModelAttribute(name = "user")
    public User User() {
        return new User();
    }

    @GetMapping("/login")
    public String LOGIN() {
        return "login";
    }

    @PostMapping("/profile")
    public String LOGIN_POST(@ModelAttribute(name = "user") User user) {
        user.setRole(UserRole.ROLE_USER);
        USER_INFO(user);

//        JwtAuthResponse response = new JwtAuthResponse();
//        ResponseEntity<String> obj = response.GetElementByToken(
//                REST_API_AUTHORIZATION_LINK,
//                "http://localhost:8080/example",
//                user,
//                HttpMethod.GET,
//                String.class);
//        System.out.println("TOKEN: " + response.getJwtToken());
//        System.out.println("RESULT: " + obj.getBody());
//
//        JwtService service = new JwtService();
//        Date expiredDate = service.GetTimeExpiration(response.getJwtToken(), jwtAccessKey);
//        Date currentDate = new Date();
//        System.out.println(expiredDate);
//        System.out.println(currentDate);
//        System.out.println(expiredDate.getTime() - currentDate.getTime());


//        JwtService service1 = new JwtService();
//        String REFRESH_TOKEN = service.GenerateRefreshToken(user);
//        System.out.println("REFRESH TOKEN: " + REFRESH_TOKEN);
//        String username = service.UsernameExtraction(REFRESH_TOKEN, jwtRefreshKey);
//        System.out.println("USERNAME: " + username);
//        System.out.println("TIME: " + service.GetTimeExpiration(REFRESH_TOKEN, jwtRefreshKey));

        return "profile";
    }

    private void USER_INFO(User user) {
        System.out.println("USERNAME: " + user.getUsername());
        System.out.println("PASSWORD: " + user.getPassword());
        System.out.println("ROLE: "     + user.getRole());
    }
}
