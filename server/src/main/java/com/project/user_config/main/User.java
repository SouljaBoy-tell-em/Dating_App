package com.project.user_config.main;


import com.project.user_config.blacklist.BlackList;
import com.project.user_config.photos.Photo;
import com.project.user_config.swiper_config.like_config.Grade;
import jakarta.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
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
// REGISTRATION INFO:

    @Column(name = "email")
    @Id
    @Pattern(regexp = "^[A-Za-z][A-Za-z0-9.]*[@]{1}[a-z]+[.]{1}[a-z]{2,}$")
    private String email;

    @Column(name = "id")
    @Getter
    private long id;

    @Column(name = "password")
//    @Pattern(regexp = "^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z@$!%*?&]{8,}$")
    private String password;

    @Column(name = "userRole")
    @Getter
    @Setter
    private UserRole role;

    @Column(name = "isConfirm")
    @Getter
    @Setter
    private boolean isConfirm;

    @Column(name = "isProfileFilled")
    @Getter
    @Setter
    private boolean isProfileFilled;

    @Column(name = "isActive")
    @Getter
    @Setter
    private boolean isActive;

// ###################################################################################################
// GENERAL INFO:

    @Column(name = "firstname")
    @Getter
//    @Pattern(regexp = "^[A-ZА-Я][a-zа-я]*$")
    @Setter
    private String firstname;

    @Column(name = "lastname")
    @Getter
//    @Pattern(regexp = "^[A-ZА-Я][a-zа-я]*$")
    @Setter
    private String lastname;

    @Column(name = "gender")
    @Getter
    @Setter
    private boolean isMan;

    @Column(name = "birthday")
    @Getter
    @Setter
    private LocalDate birthday;

    @Column(name = "personalType")
    @Getter
    @Setter
    private PersonalType personalType;

    @Column(name = "description", length = 4096)
    @Getter
    private String description;

    @Column(name = "isPrivate")
    @Getter
    @Setter
    private boolean isPrivate;

    @Getter
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "email")
    private List<BlackList> blackList;

    @Getter
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "email")
    private List<Photo> photos;

    @Getter
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "email")
    private List<Grade> grades;

    @Column(name = "zodiacSign")
    @Getter
    @Setter
    private ZodiacSign zodiacSign;

    @Column(name = "city")
    @Getter
    @Setter
    private String city;
// ###################################################################################################

    public User() {
        this.role = UserRole.ROLE_USER;
    }

    public User(String email, String password, UserRole role) {
        this.email     = email;
        this.password  = password;
        this.role      = (role != null) ? role : UserRole.ROLE_USER;
        this.isConfirm = false;
        this.isPrivate = false;
    }

    public User(String email, String password, UserRole role, boolean isConfirm, boolean isPrivate) {
        this.email     = email;
        this.password  = password;
        this.role      =  (role != null) ? role : UserRole.ROLE_USER;
        this.isConfirm = isConfirm;
        this.isPrivate = isPrivate;
    }

    public User(User user) {
        this.email = user.getUsername();
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
        return email;
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

    public static long CheckUniqueBlacklist(List<BlackList> blockedUsers, String email) {
        for(int iBlockedUsers = 0; iBlockedUsers < blockedUsers.size(); iBlockedUsers++)
            if(blockedUsers.get(iBlockedUsers).getBlockedEmail().equals(email))
                return blockedUsers.get(iBlockedUsers).getId();
        return -1;
    }
}