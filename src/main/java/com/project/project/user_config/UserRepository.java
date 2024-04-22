package com.project.project.user_config;


import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;


@Repository
public interface UserRepository extends CrudRepository<User, String>,
                                         JpaRepository<User, String> {
    @Modifying
    @Query(value = "update users set is_active = ?1 where email = ?2", nativeQuery = true)
    @Transactional
    void ActiveUpdate(boolean isActive, String email);

    @Modifying
    @Query(value = "update users set birthday = ?1 where email = ?2", nativeQuery = true)
    @Transactional
    void BirthdayUpdate(LocalDate birthday, String email);

    @Modifying
    @Query(value = "update users set black_list_id = ?1 where email = ?2", nativeQuery = true)
    @Transactional
    void BlackListIdUpdate(String blackListId, String email);

    @Modifying
    @Query(value = "update users set is_confirm = ?1 where email = ?2", nativeQuery = true)
    @Transactional
    void ConfirmUpdate(boolean isConfirm, String email);

    @Modifying
    @Query(value = "update users set is_confirm = 1 where email = ?1", nativeQuery = true)
    @Transactional
    void Confirmed(String email);

    @Modifying
    @Query(value = "update users set firstname = ?1 where email = ?2", nativeQuery = true)
    @Transactional
    void FirstnameUpdate(String firstName, String email);

    @Modifying
    @Query(value = "update users set lastname = ?1 where email = ?2", nativeQuery = true)
    @Transactional
    void LastnameUpdate(String lastname,  String email);

    @Modifying
    @Query(value = "update users set liked_users_id = ?1 where email = ?2", nativeQuery = true)
    @Transactional
    void LikedUsersIdUpdate(String likedUsersId, String email);

    @Modifying
    @Query(value = "update users set password = ?1 where email = ?2", nativeQuery = true)
    @Transactional
    void PasswordUpdate(String password, String email);

    @Modifying
    @Query(value = "update users set is_private = ?1 where email = ?2", nativeQuery = true)
    @Transactional
    void ProfileAccessUpdate(boolean isPrivate, String email);

    @Modifying
    @Query(value = "update users set user_role = ?1 where email = ?2", nativeQuery = true)
    @Transactional
    void RoleUpdate(UserRole userRole, String email);
}