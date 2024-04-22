package iffoff.production.reactspringsecurity.services;

import iffoff.production.reactspringsecurity.dto.LikeDto;
import iffoff.production.reactspringsecurity.dto.ProfileDto;
import iffoff.production.reactspringsecurity.models.Like;
import iffoff.production.reactspringsecurity.models.Profile;
import iffoff.production.reactspringsecurity.models.User;
import iffoff.production.reactspringsecurity.repositories.LikeRepository;
import iffoff.production.reactspringsecurity.repositories.ProfileRepository;
import iffoff.production.reactspringsecurity.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LikeService {
    @Autowired(required = true)
    private AuthenticationManager authenticationManager;
    private LikeRepository likeRepository;
    private UserRepository userRepository;

    @Autowired
    public void setUserRepository(iffoff.production.reactspringsecurity.repositories.UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Autowired
    public void setLikeRepository(LikeRepository likeRepository) {
        this.likeRepository = likeRepository;
    }

    public ResponseEntity<?> saveLike(LikeDto likeDto) {
        Authentication auth;
        Like like;
        try {
            auth = SecurityContextHolder.getContext().getAuthentication();
            like = new Like();
            User user = userRepository.findByUsername(auth.getName()).get();
            like.setUserId(user.getId());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("USER NOT FOUND");
        }

        like.setLikedUserId(likeDto.getLikedUserId());
        likeRepository.save(like);
        return ResponseEntity.status(HttpStatus.OK).body(like);
    }
}
