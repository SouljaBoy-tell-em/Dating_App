package com.project.project.swiper;

import com.project.project.requests.LikeRequest;
import com.project.project.swiper.Likes.Like;
import com.project.project.swiper.Likes.LikeRepository;
import com.project.project.user_config.User;
import com.project.project.user_config.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class SwiperService {
    @Autowired
    private LikeRepository likeRepository;

    public void addLike(LikeRequest likeRequest) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Like like = new Like();
        like.setUsername(auth.getName());
        like.setLikedEmail(likeRequest.getLikedEmail());
        like.setLike(likeRequest.isLike());
        like.setTime(likeRequest.getTime());

        likeRepository.save(like);
    }

}
