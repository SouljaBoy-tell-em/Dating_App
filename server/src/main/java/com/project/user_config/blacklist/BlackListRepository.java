package com.project.user_config.blacklist;


import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface BlackListRepository extends CrudRepository<BlackList, Long>,
                                              JpaRepository<BlackList, Long> {

    @Modifying
    @Query(value = "delete from black_list where id = ?1", nativeQuery = true)
    @Transactional
    void DeleteById(Long id);
}
