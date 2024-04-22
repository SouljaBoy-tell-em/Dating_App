package iffoff.production.reactspringsecurity.repositories;

import iffoff.production.reactspringsecurity.models.Profile;
import iffoff.production.reactspringsecurity.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ProfileRepository extends JpaRepository<Profile, Long> {
    boolean existsByUsername(String username);
    Optional<Profile> findByUsername(String username);
    @Query(value = "select * from profiles where profiles.firstName = ?1 and profiles.lastName = ?2", nativeQuery = true)
    Profile findByFirstName(String firstName, String lastName);
}
