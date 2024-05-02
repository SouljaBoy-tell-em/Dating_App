package com.project.project.user_config;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends CrudRepository<User, String>,
                                        JpaRepository<User, String> {
    @Modifying
    @Query(value = "update users set confirmed = 1 where username = ?1", nativeQuery = true)
    @Transactional
    void Confirmed(String username);

    @Modifying
    @Transactional
    @Query(value = "SELECT * \n" +
            "FROM users \n" +
            "WHERE users.username != ?1 and  NOT EXISTS \n" +
            "    (SELECT * \n" +
            "     FROM likes \n" +
            "     WHERE users.username = likes.liked_email and likes.username = ?1) \n" +
            "order by rand() limit ?2", nativeQuery = true)

    List<User> getAnkets(String param, int anketPacketSize);
}
