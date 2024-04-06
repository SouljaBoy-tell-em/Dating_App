package iffoff.production.reactspringsecurity.services;

import iffoff.production.reactspringsecurity.models.User;
import iffoff.production.reactspringsecurity.utils.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class AccessTokenService {

    private static final long ACCESS_TOKEN_EXPIRATION_TIME = 600; // Время жизни access token (в секундах)

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    public String generateJWT(User user) {
        LocalDateTime expiryDate = LocalDateTime.now().plusSeconds(ACCESS_TOKEN_EXPIRATION_TIME); // Устанавливаем время истечения срока действия токена
        String jwt = jwtTokenProvider.generateToken(user.getUsername()); // Генерируем JWT токен

        return jwt;
    }
}