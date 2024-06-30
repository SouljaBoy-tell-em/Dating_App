package com.project.JWT;


import com.project.requests.AuthorizationRequest;
import com.project.requests.JwtAuthResponse;
import com.project.requests.RefreshRequest;
import com.project.requests.RegisterRequest;
import com.project.user_config.main.*;
import com.project.utilits.RandomFieldGenerator;
import jakarta.security.auth.message.AuthException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.util.zip.Deflater;


@RequiredArgsConstructor
@Service
public class JwtAuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserServiceManager userServiceManager;

    /**
     * The Login(LoginRequest) authorizes the user.
     * @param request request for authorization.
     * @return response, that contains jwt token.
     */
    public JwtAuthResponse Login(AuthorizationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                ));
        UserDetails user = userServiceManager
                .UserDetailsService()
                .loadUserByUsername(request.getEmail());

        return new JwtAuthResponse(jwtService.GenerateTokenValue(user),
                                   jwtService.GenerateRefreshToken(user),
                                   user.getUsername());
    }

    /**
     * The Refresh(RefreshRequest) refreshes old equations of tokens.
     * @param request request for refreshing.
     * @return response, that contains a new pair of jwt tokens.
     */
    public JwtAuthResponse Refresh(RefreshRequest request) {
        String jwtRefreshToken = request.getJwtRefreshToken();
        String username = jwtService.UsernameExtraction(jwtRefreshToken,
                                              jwtService.JwtRefreshKey);
        UserDetails user = userServiceManager.GetById(username);

        return new JwtAuthResponse(jwtService.GenerateTokenValue(user),
                                   jwtService.GenerateRefreshToken(user),
                                   user.getUsername());
    }

    /**
     * The Register(RegisterRequest) registers the user.
     * @param request request for registration.
     * @return response, that contains jwt token.
     */
    public JwtAuthResponse Register(RegisterRequest request) throws AuthException, IOException {

        if(userServiceManager.IsExist(request.getEmail()))
            throw new AuthException("So user already exists.");

        long id = 0;
        try {
            id = userServiceManager.FindMaxId() + 1;
        } catch (Exception exception) {
            id = 1;
        }

        User user = User
                .builder()
                .email(request.getEmail())
                .id(id)
                .password(passwordEncoder.encode(request.getPassword()))
                .role(UserRole.ROLE_USER)
                .isConfirm(false)
                .isActive(true)
                .firstname(null)
                .lastname(null)
                .isMan(true)
                .personalType(PersonalType.NONE)
                .birthday(LocalDate.of(2003, 11, 11))
                .description(RandomFieldGenerator.GenerateRandomDescription())
                .isPrivate(false)
                .zodiacSign(ZodiacSign.NONE)
                .city(null)
                .build();
        userServiceManager.Add(user);

        return new JwtAuthResponse(jwtService.GenerateTokenValue(user),
                                   jwtService.GenerateRefreshToken(user),
                                   user.getUsername());
    }

    public byte[] compressImage(byte[] data) throws IOException {
        Deflater deflater = new Deflater();
        deflater.setLevel(Deflater.BEST_COMPRESSION);
        deflater.setInput(data);
        deflater.finish();

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] tmp = new byte[6000];

        while(!deflater.finished()) {
            int size = deflater.deflate(tmp);
            outputStream.write(tmp,0, size);
        }

        outputStream.close();
        return outputStream.toByteArray();
    }
}
