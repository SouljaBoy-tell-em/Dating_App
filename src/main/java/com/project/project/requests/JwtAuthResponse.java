package com.project.project.requests;


import com.project.project.user_config.User;
import lombok.*;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;


@AllArgsConstructor
@Builder
@Data
@NoArgsConstructor
public class JwtAuthResponse<T> {

    private final String AUTHORIZATION = "Authorization";
    private final String BEARER = "Bearer ";

    private String JwtToken;
    private String JwtRefreshToken;

    public ResponseEntity<T> GetElementByToken(String REST_API_AUTH_LINK,
                                               String REST_API_REQUEST_LINK,
                                               User user,
                                               HttpMethod requestType,
                                               Class objectType) {
        RestTemplate restTemplate = new RestTemplate();
        setJwtToken(restTemplate
                .postForObject(REST_API_AUTH_LINK,
                               user,
                               JwtAuthResponse.class)
                .getJwtToken()
        );

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.set(AUTHORIZATION, BEARER + JwtToken);
        HttpEntity<String> entity = new HttpEntity<>(httpHeaders);
        ResponseEntity<T> object = restTemplate.exchange(
                REST_API_REQUEST_LINK,
                requestType,
                entity,
                objectType);

        return object;
    }
}
