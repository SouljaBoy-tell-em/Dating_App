package iffoff.production.reactspringsecurity.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "profiles")
public class Profile {
    @Id
    @Column(name = "username")
    private String username;

    @Column(name = "email")
    private String email;

    @Column(name = "firstname")
    private String firstname;

    @Column(name = "lastname")
    private String lastname;

    @Column(name = "age")
    private int age;

    @Column(name = "country")
    private String country;

    @Column(name = "sex")
    private String sex;

    @Column(name = "description")
    private String description;
}
