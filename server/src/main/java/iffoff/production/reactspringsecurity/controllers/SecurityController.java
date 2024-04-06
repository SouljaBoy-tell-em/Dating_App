package iffoff.production.reactspringsecurity.controllers;

import iffoff.production.reactspringsecurity.dto.AuthRequest;
import iffoff.production.reactspringsecurity.dto.AuthResponse;
import iffoff.production.reactspringsecurity.dto.SignupRequest;

import iffoff.production.reactspringsecurity.dto.UserDto;
import iffoff.production.reactspringsecurity.models.RefreshToken;
import iffoff.production.reactspringsecurity.models.User;
import iffoff.production.reactspringsecurity.services.AccessTokenService;

import iffoff.production.reactspringsecurity.services.RefreshTokenService;
import iffoff.production.reactspringsecurity.services.UserService;
import iffoff.production.reactspringsecurity.utils.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import iffoff.production.reactspringsecurity.repositories.UserRepository;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping("/auth")
public class SecurityController {

    @Autowired(required = true)
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody SignupRequest signupRequest) {
        if (userRepository.existsByUsername(signupRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body("Ошибка: Логин уже используется!");
        }

        // Создаем нового пользователя
        User user = new User();

        userService.createNewUser(signupRequest);

        return ResponseEntity.ok("Пользователь успешно зарегистрирован!");
    }

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @PostMapping("/login")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthRequest authenticationRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        final String jwt = jwtTokenProvider.generateToken(authentication);

        // Генерируем refresh токен для пользователя
        String username = SecurityContextHolder.getContext().getAuthentication().getName();


        RefreshToken refreshToken = refreshTokenService.generateRefreshToken(userService.findByUsername(username).get());

        User user = userService.findByUsername(username).get();

        UserDto userDto = new UserDto();

        userDto.setId(user.getId());
        userDto.setUsername(user.getUsername());
        userDto.setEmail(user.getEmail());

        // Создаем объект с обоими токенами
        Map<String, Object> tokens = new HashMap<>();
        tokens.put("accessToken", jwt);
        tokens.put("refreshToken", refreshToken.getToken());
        tokens.put("user", userDto);

        return ResponseEntity.ok(tokens);
    }

    @Autowired
    private RefreshTokenService refreshTokenService;

    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(@RequestBody Map<String, String> refreshTokenRequest) {
        String refreshToken = refreshTokenRequest.get("refreshToken");

        RefreshToken existingRefreshToken = refreshTokenService.findByToken(refreshToken);

        if (existingRefreshToken != null) {
            RefreshToken updatedRefreshToken = refreshTokenService.updateRefreshToken(existingRefreshToken);

            // возвращаем обновленный токен
            return ResponseEntity.ok(updatedRefreshToken.getToken());
        } else {
            // обработка ошибки
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid refresh token");
        }
    }

    @Autowired
    AccessTokenService accessTokenService;

    @PostMapping("/refresh-access-token")
    public ResponseEntity<?> refreshAccessToken(@RequestBody Map<String, String> refreshTokenRequest) {
        String refreshToken = refreshTokenRequest.get("refreshToken");

        RefreshToken existingRefreshToken = refreshTokenService.findByToken(refreshToken);

        if (existingRefreshToken != null) {
            String jwt = accessTokenService.generateJWT(existingRefreshToken.getUser());

            Map<String, String> token = new HashMap<>();
            token.put("jwt", jwt);
            // возвращаем новый access token
            return ResponseEntity.ok(token);
        } else {
            // обработка ошибки
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid refresh token");
        }
    }
}