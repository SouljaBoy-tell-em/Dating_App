package com.project.project.JWT;


import com.project.project.user_config.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.security.Key;
import java.util.function.Function;


@Service
public class JwtService {
    private final Long ACCESS_EXPIRED_IN = (long) (1000 * 10);
    private final Long REFRESH_EXPIRED_IN = ACCESS_EXPIRED_IN * 10;
    @Value("${jwt.access.key}")
    public String JwtAccessKey;
//    @Value("${jwt.refresh.key}")
    public String JwtRefreshKey = "53A73E5F1C4E0A2D3B5F2D784E6A1B423D6F247D1F6E5C3A596D63000000000";
    private Date DateExpiration(String token, String jwtKey) {
        return ExtractClaim(token, Claims::getExpiration, jwtKey);
    }

    public Claims ExtractAll(String token, String jwtKey) {
        try {
            return Jwts
                    .parser()
                    .setSigningKey(Handler(jwtKey))
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        } catch(ExpiredJwtException exception) {
            System.out.println("TOKEN IS INVALID");
        }

        return null;
    }

    private <T> T ExtractClaim(String token,
                               Function<Claims, T> claimsResolvers,
                               String jwtKey) {
        final Claims claims = ExtractAll(token, jwtKey);
        return claimsResolvers.apply(claims);
    }

    public Date GetTimeExpiration(String token, String jwtKey) {
        return ExtractClaim(token, Claims::getExpiration, jwtKey);
    }

    private String GenerateToken(Map<String, Object> additionalData,
                                     UserDetails userDetails) {
        return Jwts
                .builder()
                .setClaims(additionalData)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() +
                        ACCESS_EXPIRED_IN))
                .signWith(Handler(JwtAccessKey), SignatureAlgorithm.HS256)
                .compact();
    }

    public String GenerateRefreshToken(UserDetails userDetails) {
        return Jwts
                .builder()
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() +
                        REFRESH_EXPIRED_IN))
                .signWith(Handler(JwtRefreshKey), SignatureAlgorithm.HS256)
                .compact();
    }

    public String GenerateTokenValue(UserDetails userDetails) {
        Map<String, Object> additionalDataMap = new HashMap<>();
        if(userDetails instanceof User user) {
            additionalDataMap.put("role", user.getRole());
        }

        return GenerateToken(additionalDataMap, userDetails);
    }

    private Key Handler(String JwtKey) {
        return Keys
                .hmacShaKeyFor(Decoders
                        .BASE64
                        .decode(JwtKey)
                );
    }

    private boolean IsTokenExpired(String token) {
        return DateExpiration(token, JwtAccessKey)
                .before(new Date());
    }

    public boolean IsTokenValid(String token, String jwtKey, UserDetails userDetails) {
        return (UsernameExtraction(token, jwtKey)
                .equals(userDetails
                        .getUsername())) &&
                !IsTokenExpired(token);
    }

    public String UsernameExtraction(String token, String jwtKey) {
        return ExtractClaim(token, Claims::getSubject, jwtKey);
    }
}
