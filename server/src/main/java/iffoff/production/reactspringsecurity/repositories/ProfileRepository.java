package iffoff.production.reactspringsecurity.repositories;

import iffoff.production.reactspringsecurity.models.Profile;
import iffoff.production.reactspringsecurity.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProfileRepository extends JpaRepository<Profile, Long> {
    boolean existsByUsername(String username);
    Optional<Profile> findByUsername(String username);
}
