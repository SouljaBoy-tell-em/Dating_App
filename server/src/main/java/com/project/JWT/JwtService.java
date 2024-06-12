package com.project.JWT;


import com.project.user_config.main.User;
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
    private final Long ACCESS_EXPIRED_IN = (long) (1000 * 1000);
    private final Long REFRESH_EXPIRED_IN = ACCESS_EXPIRED_IN * 10;

    @Value("${jwt.access.key}")
    public String JwtAccessKey;
    public String JwtRefreshKey = "53A73E5F1C4E0A2D3B5F2D784E6A1B423D6F247D1F6E5C3A596D63000000000";

    /**
     * The DateExpiration(String) extracts the date expiration.
     * @param token access token.
     * @return extraction date.
     */
    private Date DateExpiration(String token, String jwtKey) {
        return ExtractClaim(token, Claims::getExpiration, jwtKey);
    }

    /**
     * The ExtractAll(String) extracts all data from access token.
     * @param token access token.
     * @return all data, that extract.
     */
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

    /**
     * The ExtractClaim(String, Function) extracts all data from access token.
     * @param token access token.
     * @param claimsResolvers
     * @return all data, that extract.
     */
    private <T> T ExtractClaim(String token,
                               Function<Claims, T> claimsResolvers,
                               String jwtKey) {
        final Claims claims = ExtractAll(token, jwtKey);
        return claimsResolvers.apply(claims);
    }

    /**
     * The GetTimeExpiration(String, String) gets date of JWT-token expiration.
     * @param token JWT token.
     * @param jwtKey JWT key.
     * @return date of expiration.
     */
    public Date GetTimeExpiration(String token, String jwtKey) {
        return ExtractClaim(token, Claims::getExpiration, jwtKey);
    }

    /**
     * The GenerateToken(Map, UserDetails) generates token.
     * @param additionalData secondary data.
     * @param userDetails main data.
     * @return jwt token.
     */
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

    /**
     * The GenerateToken(UserDetails) generates token.
     * @param userDetails main data.
     * @return JWT refresh-token.
     */
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

    /**
     * The GenerateTokenValue(UserDetails) generates token.
     * @param userDetails main data.
     * @return jwt token.
     */
    public String GenerateTokenValue(UserDetails userDetails) {
        Map<String, Object> additionalDataMap = new HashMap<>();
        if(userDetails instanceof User user) {
            additionalDataMap.put("role", user.getRole());
            additionalDataMap.put("confirmed", user.isConfirm());
        }

        return GenerateToken(additionalDataMap, userDetails);
    }

    /**
     * The Handler() sets the generation key.
     * @return jwt key.
     */
    private Key Handler(String JwtKey) {
        return Keys
                .hmacShaKeyFor(Decoders
                        .BASE64
                        .decode(JwtKey)
                );
    }

    /**
     * The IsTokenExpired(String) checks if token is expired.
     * @param token access token.
     * @return true, if token expired.
     */
    private boolean IsTokenExpired(String token) {
        return DateExpiration(token, JwtAccessKey)
                .before(new Date());
    }

    /**
     * The IsTokenValid(Map, UserDetails) checks validation of the token.
     * @param token access token.
     * @param userDetails main user data.
     * @return true, if token is valid.
     */
    public boolean IsTokenValid(String token, String jwtKey, UserDetails userDetails) {
        return (UsernameExtraction(token, jwtKey)
                .equals(userDetails
                        .getUsername())) &&
                !IsTokenExpired(token);
    }

    /**
     * The UsernameExtraction(token) extracts username from token.
     * @param token access token.
     * @return username.
     */
    public String UsernameExtraction(String token, String jwtKey) {
        return ExtractClaim(token, Claims::getSubject, jwtKey);
    }
}
