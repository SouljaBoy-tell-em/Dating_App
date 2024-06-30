package com.project.security;


import com.project.JWT.JwtAuthFilter;
import com.project.user_config.main.UserServiceManager;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import java.util.List;


@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    @Autowired
    private JwtAuthFilter jwtAuthFilter;

    @Autowired
    private UserServiceManager userServiceManager;

    /**
     * The AuthenticationManager() creates authentication manager bean
     * for further authorization.
     * @return authentication manager.
     */
    @Bean
    public AuthenticationManager AuthenticationManager(AuthenticationConfiguration config)
            throws Exception {
        return config.getAuthenticationManager();
    }

    /**
     * The AuthenticationProvider() creates authentication provider bean
     * for further authorization.
     * @return authentication provider.
     */
    @Bean
    public AuthenticationProvider AuthenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userServiceManager.UserDetailsService());
        provider.setPasswordEncoder(userServiceManager.PasswordEncoder());
        return provider;
    }

    /**
     * The SecurityFilterChin(HttpSecurity) is the context for configuring spring security.
     * @param http is the param for configuring spring security methods.
     * @return spring security configuration.
     */
    @Bean
    public SecurityFilterChain SecurityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .cors(cors -> cors.configurationSource(
                        request -> {
                            CorsConfiguration corsConfiguration =
                                    new CorsConfiguration();
                            corsConfiguration.setAllowedOriginPatterns(List
                                    .of("*"));
                            corsConfiguration.setAllowedMethods(List
                                    .of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
                            corsConfiguration.setAllowedHeaders(List
                                    .of("*"));
                            corsConfiguration.setAllowCredentials(true);

                            return corsConfiguration;
                        }
                ))
                .authorizeHttpRequests(request -> request
                        .requestMatchers("/confirm").permitAll()
                        .requestMatchers("/photo/**").permitAll()
//                        .requestMatchers("/auth/refresh").permitAll()
                        .requestMatchers("/test/register/**").permitAll()
                        .requestMatchers("/profile/update/photo/**").permitAll()
                        .requestMatchers("/login").permitAll()
                        .requestMatchers("/post/**").permitAll()
                        .requestMatchers("/profile").permitAll()
                        .requestMatchers("/auth/**").permitAll()
                        .requestMatchers("/chat/files/{id}").permitAll()
                        //.requestMatchers("/post/files/{id}").permitAll()
                        .requestMatchers("/swagger-ui/**",
                                "/swagger-resources/*",
                                "/v3/api-docs/**").permitAll()
                        .requestMatchers("/endpoint", "/admin/**").hasRole("ADMIN")
                        .anyRequest().authenticated())
                .sessionManagement(manager -> manager
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(AuthenticationProvider())
                .addFilterBefore(jwtAuthFilter,
                        UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
}