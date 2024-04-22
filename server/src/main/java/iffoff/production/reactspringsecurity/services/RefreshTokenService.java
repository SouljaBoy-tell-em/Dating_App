package iffoff.production.reactspringsecurity.services;

import iffoff.production.reactspringsecurity.models.RefreshToken;
import iffoff.production.reactspringsecurity.models.User;
import iffoff.production.reactspringsecurity.repositories.RefreshTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class RefreshTokenService {

    @Autowired
    private RefreshTokenRepository refreshTokenRepository;

    public RefreshToken generateRefreshToken(User user) {
        RefreshToken refreshToken = new RefreshToken();
        refreshToken.setUser(user);
        refreshToken.setToken(UUID.randomUUID().toString());
        refreshToken.setExpirationDate(LocalDateTime.now().plusDays(30));

        return refreshTokenRepository.save(refreshToken);
    }

    public RefreshToken findByToken(String token) {
        return refreshTokenRepository.findByToken(token);
    }

    public void deleteRefreshToken(String token) {
        refreshTokenRepository.deleteByToken(token);
    }

    public RefreshToken updateRefreshToken(RefreshToken refreshToken) {
        refreshToken.setExpirationDate(LocalDateTime.now().plusDays(30));

        return refreshTokenRepository.save(refreshToken);
    }
}