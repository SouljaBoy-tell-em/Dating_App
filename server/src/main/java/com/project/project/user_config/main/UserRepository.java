package com.project.project.user_config.main;


import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;


@Repository
public interface UserRepository extends CrudRepository<User, String>,
                                         JpaRepository<User, String> {
    @Query(value = "select max(id) from users;", nativeQuery = true)
    long FindMaxId();

    @Query(value = "select id from users where email = ?1", nativeQuery = true)
    long GetIdByEmail(String email);

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
    @Query(value = "update users set gender = ?1 where email = ?2", nativeQuery = true)
    @Transactional
    void GenderUpdate(boolean isMan, String email);

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

    // SWIPER

    @Query(value = "select * from users " +
            "where exists (select * from likes  where likes.liked_email = ?1 and users.email = likes.email " +
            "and is_like = true) " +
            "and not exists (select * from likes  where likes.email = ?1 and users.email = likes.liked_email) " +
            "and DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(), birthday)), '%Y') between ?4 and ?5 " +
            "and users.gender != ?6 " +
            "limit ?2 offset ?3", nativeQuery = true)
    List<User> GetFilteredOwnLikedNUsers(String email, int quantity, int offset, int minage, int maxage, boolean gender);

    @Query(value = "select * from users " +
            "where not exists (select * from likes  where likes.email = ?1 and users.email = likes.liked_email)  " +
            "and DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(), birthday)), '%Y') between ?4 and ?5 " +
            "and users.gender != ?6 " +
            "limit ?2 offset ?3 ", nativeQuery = true)
    List<User> GetFilteredNextNUsers(String email, int quantity, int offset, int minage, int maxage, boolean gender);

    @Query(value = "select * from users " +
            "where exists (select * from likes  where likes.liked_email = ?1 and users.email = likes.email " +
            "and is_like = true) " +
            "and not exists (select * from likes  where likes.email = ?1 and users.email = likes.liked_email) " +
            "and users.gender != ?4 " +
            "limit ?2 offset ?3", nativeQuery = true)
    List<User> GetOwnLikedNUsers(String email, int quantity, int offset, boolean gender);

    @Query(value = "select * from users " +
            "where not exists (select * from likes  where likes.email = ?1 and users.email = likes.liked_email)" +
            "and users.gender != ?4 " +
            "limit ?2 offset ?3 ", nativeQuery = true)
    List<User> GetNextNUsers(String email, int quantity, int offset, boolean gender);

}