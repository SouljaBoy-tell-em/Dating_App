package com.project.project.JWT;


import com.project.project.requests.AuthorizationRequest;
import com.project.project.requests.JwtAuthResponse;
import com.project.project.requests.RefreshRequest;
import com.project.project.requests.RegisterRequest;
import com.project.project.user_config.User;
import com.project.project.user_config.UserRole;
import com.project.project.user_config.UserServiceManager;
import jakarta.security.auth.message.AuthException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@RequiredArgsConstructor
@Service
public class JwtAuthService {

    @Autowired
    private UserServiceManager userServiceManager;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

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
    public JwtAuthResponse Register(RegisterRequest request) throws AuthException {

        if(userServiceManager.IsExist(request.getEmail()))
            throw new AuthException("So user already exists.");

        User user = User
                .builder()
                .username(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(UserRole.ROLE_USER)
                .build();
        userServiceManager.Add(user);

        return new JwtAuthResponse(jwtService.GenerateTokenValue(user),
                                   jwtService.GenerateRefreshToken(user),
                                   user.getUsername());
    }
}