package iffoff.production.reactspringsecurity.repositories;


import iffoff.production.reactspringsecurity.models.RefreshToken;
import iffoff.production.reactspringsecurity.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    RefreshToken findByToken(String token);
    void deleteByToken(String token);
}