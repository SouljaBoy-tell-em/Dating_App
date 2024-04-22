package iffoff.production.reactspringsecurity.controllers;

import iffoff.production.reactspringsecurity.dto.LikeDto;
import iffoff.production.reactspringsecurity.dto.ProfileDto;
import iffoff.production.reactspringsecurity.services.LikeService;
import iffoff.production.reactspringsecurity.services.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/likes")
public class LikeController {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    @Autowired
    private LikeService likeService;
    @PostMapping("/push_like")
    public ResponseEntity<?> pushLike(@RequestBody LikeDto likeDto) {

        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            jdbcTemplate.execute("insert likes_" + auth.getName() + " (likedUserId) values (" + likeDto.getLikedUserId() + ");");
            System.out.println("1\n");
            //likeService.saveLike(likeDto);
            return ResponseEntity.status(HttpStatus.OK).body(likeDto);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("CANNOT PUSH LIKE");
        }

    }
}
