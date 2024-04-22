package com.project.project.user_config;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, String>,
                                        JpaRepository<User, String> {
    @Modifying
    @Query(value = "update users set confirmed = 1 where username = ?1", nativeQuery = true)
    @Transactional
    void Confirmed(String username);
}
