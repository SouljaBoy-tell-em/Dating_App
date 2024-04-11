package com.project.project.JWT;


import com.project.project.requests.AuthorizationRequest;
import com.project.project.requests.JwtAuthResponse;
import com.project.project.requests.RefreshRequest;
import com.project.project.requests.RegisterRequest;
import com.project.project.user_config.User;
import com.project.project.user_config.UserRole;
import com.project.project.user_config.UserServiceManager;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@RequiredArgsConstructor
@Service
public class AuthService {

    @Autowired
    private UserServiceManager userServiceManager;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    public JwtAuthResponse Authorization(AuthorizationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                ));
        UserDetails user = userServiceManager
                .UserDetailsService()
                .loadUserByUsername(request.getUsername());

        return new JwtAuthResponse(jwtService.GenerateTokenValue(user),
                                   jwtService.GenerateRefreshToken(user));
    }

    public JwtAuthResponse Refresh(RefreshRequest request) {
        String jwtRefreshToken = request.getJwtRefreshToken();
        String username = jwtService.UsernameExtraction(jwtRefreshToken, jwtService.JwtRefreshKey);
        UserDetails user = userServiceManager.GetById(username);

        return new JwtAuthResponse(jwtService.GenerateTokenValue(user),
                                   jwtService.GenerateRefreshToken(user));
    }

    public JwtAuthResponse Register(RegisterRequest request) {
        User user = User
                .builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(UserRole.ROLE_USER)
                .build();
        userServiceManager.Add(user);

        return new JwtAuthResponse(jwtService.GenerateTokenValue(user),
                                   jwtService.GenerateRefreshToken(user));
    }
}
