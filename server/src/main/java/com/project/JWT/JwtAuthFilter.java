package com.project.JWT;


import org.apache.commons.lang3.StringUtils;
import com.project.user_config.main.UserServiceManager;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;


@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

    @Value("${jwt.access.key}")
    private String JwtAccessKey;
    @Value("${jwt.refresh.key}")
    private String JwtRefreshKey;

    private final String BEARER = "Bearer ";
    private final String AUTHORIZATION = "Authorization";

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserServiceManager userServiceManager;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {
        String header = request.getHeader(AUTHORIZATION);

        //For WebSocket
        if (header == null) {
            try {
                header = request.getParameter("Authorization");
            } catch (Exception e) {

            }
        }

        if(StringUtils.isEmpty(header) ||
                !StringUtils.startsWith(header, BEARER)) {
            filterChain.doFilter(request, response);
            return;
        }

        String jwt = header.substring(BEARER.length());
        String username = jwtService.UsernameExtraction(jwt, JwtAccessKey);
        if(StringUtils.isNotEmpty(username) &&
                SecurityContextHolder
                        .getContext()
                        .getAuthentication() == null) {
            UserDetails userDetails = userServiceManager
                    .UserDetailsService()
                    .loadUserByUsername(username);

            if(jwtService.IsTokenValid(jwt, JwtAccessKey, userDetails)) {
                SecurityContext context = SecurityContextHolder
                        .createEmptyContext();
                UsernamePasswordAuthenticationToken token =
                        new UsernamePasswordAuthenticationToken(
                                userDetails,
                                null,
                                userDetails.getAuthorities()
                        );
                token.setDetails(new WebAuthenticationDetailsSource()
                        .buildDetails(request));
                context.setAuthentication(token);
                SecurityContextHolder.setContext(context);
            }

            else {
                System.out.println("TOKEN is INVALID");
            }
        }
        filterChain.doFilter(request, response);
    }
}