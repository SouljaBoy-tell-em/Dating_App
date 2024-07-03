package com.project.user_config.main;


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
    @Query(value = "update users set is_profile_filled = ?1 where email = ?2", nativeQuery = true)
    @Transactional
    void ProfileFilledUpdate(boolean isConfirm, String email);

    @Modifying
    @Query(value = "update users set city = ?1 where email = ?2", nativeQuery = true)
    @Transactional
    void CityUpdate(String city, String email);

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
    @Query(value = "update users set personal_type = ?1 where email = ?2", nativeQuery = true)
    @Transactional
    void PersonalTypeUpdate(PersonalType personalType, String email);

    @Modifying
    @Query(value = "update users set is_private = ?1 where email = ?2", nativeQuery = true)
    @Transactional
    void ProfileAccessUpdate(boolean isPrivate, String email);

    @Modifying
    @Query(value = "update users set user_role = ?1 where email = ?2", nativeQuery = true)
    @Transactional
    void RoleUpdate(UserRole userRole, String email);

    @Modifying
    @Query(value = "update users set zodiac_sign = ?1 where email = ?2", nativeQuery = true)
    @Transactional
    void ZodiacSignUpdate(ZodiacSign zodiacSign, String email);

    @Modifying
    @Query(value = "update users set description = ?1 where email = ?2", nativeQuery = true)
    @Transactional
    void DescriptionUpdate(String description, String email);

    // SWIPER
//    @Query(value = "select liked_email from likes where email = ?1 order by grade_time desc limit 1;", nativeQuery = true)
//    String GetLastLikedEmail(String email);
//
//    @Query(value = "SELECT * from users where id > (select graded_user_id from likes where liked_email = ?1 and email = ?2 order by id desc limit 1) order by id limit 3;", nativeQuery = true)
//    List<User> GetNext3Users(String lastLikedEmail, String email);
//
//    @Query(value = "SELECT * from users order by id limit 3;", nativeQuery = true)
//    List<User> GetStart3Initialization();

    @Query(value = "select * from users where not exists(select liked_email from likes where likes.liked_email = users.email and email = ?1) and users.email != ?1 order by id limit 3;", nativeQuery = true)
    List<User> GetNext3Users(String email);

    @Query(value = "select * from users where not exists(select liked_email from likes where likes.liked_email = users.email and email = ?1) and users.email != ?1 and (SELECT YEAR(CURDATE()) - YEAR(users.birthday)) > ?2 && (SELECT YEAR(CURDATE()) - YEAR(users.birthday)) < ?3 and gender = ?4 order by id limit 3", nativeQuery = true)
    List<User> GetNext3UsersFilteredByAge(String email, int startAge, int endAge, boolean gender);
}