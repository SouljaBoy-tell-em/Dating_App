package iffoff.production.reactspringsecurity.repositories;

import iffoff.production.reactspringsecurity.models.Like;
import iffoff.production.reactspringsecurity.models.Profile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LikeRepository extends JpaRepository<Like, Long> {
}
