package com.project.user_config.photos;


import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UserPhotoRepository extends CrudRepository<Photo, Long>,
                                              JpaRepository<Photo, Long> {
    @Query(value = "select id from photos where email = ?1 and is_avatar = true", nativeQuery = true)
    Long GetAvatarPhotoId(String email);

    @Modifying
    @Query(value = "update photos set is_avatar = false where id = ?1", nativeQuery = true)
    @Transactional
    void SetAvatarPhotoId(Long id);
}