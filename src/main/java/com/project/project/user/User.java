package com.project.project.user;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;
import java.util.*;
import java.util.stream.Collectors;

import lombok.Data;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import javax.management.relation.Role;


//@Entity
//@JsonIgnoreProperties(ignoreUnknown=true)
//@Table(name = "Users")
//public class User implements Serializable, UserDetails {
//
//    @Column(name = "username")
//    @Id
//    @Setter
//
//    private String username;
//    @Column(name = "password")
//    @Setter
//    private String password;
//
//    public User() {
//    }
//
//    public User(String username, String password) {
//        this.username = username;
//        this.password = password;
//    }
//
//    public User(User user) {
//        this.username = user.getUsername();
//        this.password = user.getPassword();
//    }
//
//    @Override
//    public Collection<? extends GrantedAuthority> getAuthorities() {
//        return Arrays.asList(new SimpleGrantedAuthority("ROLE_USER"),
//                             new SimpleGrantedAuthority("ROLE_ADMIN"));
////        return null;
////        return Collections.singleton(new SimpleGrantedAuthority("ROLE_USER"));
//
//    }
//
//    @Override
//    public String getPassword() {
//        return password;
//    }
//
//    @Override
//    public String getUsername() {
//        return username;
//    }
//
//    @Override
//    public boolean isAccountNonExpired() {
//        return true;
//    }
//
//    @Override
//    public boolean isAccountNonLocked() {
//        return true;
//    }
//
//    @Override
//    public boolean isCredentialsNonExpired() {
//        return true;
//    }
//
//    @Override
//    public boolean isEnabled() {
//        return true;
//    }
//}










@Data
@Entity
@JsonIgnoreProperties(ignoreUnknown=true)
@Table(name = "Users")
public class User {

    @Column(name = "username")
    @Id
    @Setter

    private String username;
    @Column(name = "password")
    @Setter
    private String password;

    public User() {
    }

    public User(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public User(User user) {
        this.username = user.getUsername();
        this.password = user.getPassword();
    }
}