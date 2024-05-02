package com.project.project.user_config;


import com.project.project.swiper.Likes.Like;
import jakarta.persistence.*;
import java.io.Serializable;
import java.util.*;
import jakarta.validation.constraints.Pattern;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;


@AllArgsConstructor
@Builder
@Entity
@Table(name = "Users")
public class User implements Serializable, UserDetails {


    @Column(name = "username")
    @Id
    @Pattern(regexp = "^[A-Za-z][A-Za-z0-9.]+[@]{1}[a-z]+[.]{1}[a-z]{2,}$")
    private String username;

    @Column(name = "password")
//    @Pattern(regexp = "^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z@$!%*?&]{8,}$")
    private String password;

    @Column(name = "user_role")
    @Getter
    @Setter
    private UserRole role;

    @Column(name = "confirmed")
    @Getter
    @Setter
    private boolean confirmed;


    @Getter
    @Setter
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "username")
    private List<Like> anketList;

    public User() {
        this.role = UserRole.ROLE_USER;
    }

    public User(String username, String password, UserRole role) {
        this.username  = username;
        this.password  = password;
        this.role      =  (role != null) ? role : UserRole.ROLE_USER;
        this.confirmed = false;
    }

    public User(String username, String password, UserRole role, boolean confirmed) {
        this.username  = username;
        this.password  = password;
        this.role      =  (role != null) ? role : UserRole.ROLE_USER;
        this.confirmed = confirmed;
    }


    public User(User user) {
        this.username = user.getUsername();
        this.password = user.getPassword();
        this.role     = (user.getRole() != null) ? role : UserRole.ROLE_USER;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}