package com.javatechie.google.auth.controllers;


import com.javatechie.google.auth.JWT.JwtService;
import com.javatechie.google.auth.SpringSsoGoogleApplication;
import com.javatechie.google.auth.google_user.GoogleUser;
import com.javatechie.google.auth.google_user.GoogleUserRepository;
import com.javatechie.google.auth.google_user.UserRole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


@RestController
public class OAuth2Controller {

    private static final String REGEX_PARSE_FIRSTNAME = "given_name=(?<=\\=)(\\S+[^,])(?=[^a-zA-Z0-9])";
    private static final String REGEX_PARSE_LASTNAME = "family_name=(?<=\\=)(\\S+[^,])(?=[^a-zA-Z0-9])";
    private static final String REGEX_PARSE_EMAIL = "email=(?<=\\=)([a-zA-Z@_.]+)(?=[^a-zA-Z0-9])";

    @Autowired
    private GoogleUserRepository googleUserRepository;

    @Autowired
    private JwtService jwtService;

    @GetMapping
    public String welcome() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        INFO(authentication);
//        return "Welcome to Google !!";
        return Parse(authentication.getPrincipal().toString());
    }

    @GetMapping({"/user"})
    public Principal user(Principal principal) {
        System.out.println("username : " + principal.getName());
        return principal;
    }

    public static void main(String[] args) {
        SpringApplication.run(SpringSsoGoogleApplication.class, args);
    }

    private void INFO(Authentication authentication) {
        System.out.println("NAME: " + authentication.getName());
        System.out.println("AUTHORITIES: " + authentication.getAuthorities());
        System.out.println("IS AUTH: " + authentication.isAuthenticated());
        System.out.println("CREDENTIALS: " + authentication.getCredentials());
        System.out.println("DETAILS: " + authentication.getDetails());
        System.out.println(authentication.getPrincipal());
        Parse(authentication.getPrincipal().toString());
    }

    private String Parse(String principal) {
        String username = null;
        String firstname = null;
        String lastname = null;
        Pattern pattern = Pattern.compile(REGEX_PARSE_FIRSTNAME);
        Matcher matcher = pattern.matcher(principal);
        if (matcher.find()) {
            firstname = matcher.group(1);
        }

        pattern = Pattern.compile(REGEX_PARSE_LASTNAME);
        matcher = pattern.matcher(principal);
        if (matcher.find()) {
            lastname = matcher.group(1);
        }

        pattern = Pattern.compile(REGEX_PARSE_EMAIL);
        matcher = pattern.matcher(principal);
        if (matcher.find()) {
            username = matcher.group(1);
        }

        System.out.println("FIRSTNAME: " + firstname);
        System.out.println("LASTNAME: " + lastname);
        System.out.println("USERNAME: " + username);

        GoogleUser user = new GoogleUser(username, UserRole.ROLE_USER);
        user.setConfirmed(true);

        if(!googleUserRepository.existsById(username))
            googleUserRepository.save(user);

        String accessToken = jwtService.GenerateTokenValue(user);
        System.out.println("TOKEN: " + accessToken);
        return accessToken;
    }
}
