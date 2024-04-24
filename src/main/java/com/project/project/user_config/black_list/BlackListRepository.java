package com.project.project.user_config.black_list;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface BlackListRepository extends CrudRepository<BlackList, Long>,
                                              JpaRepository<BlackList, Long> {
}
