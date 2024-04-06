package iffoff.production.reactspringsecurity.models;

import iffoff.production.reactspringsecurity.models.User;
import jakarta.persistence.*;



import java.time.LocalDateTime;

@Entity
@Table(name="refresh_token")
public class RefreshToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String token;

    @Column(name="expirationDate")
    private LocalDateTime expirationDate;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    public RefreshToken() {
        // Конструктор без параметров
    }

    public RefreshToken(String token, LocalDateTime expirationDate, User user) {
        this.token = token;
        this.expirationDate = expirationDate;
        this.user = user;
    }

    // Геттеры и сеттеры
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public LocalDateTime getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(LocalDateTime expirationDate) {
        this.expirationDate = expirationDate;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}