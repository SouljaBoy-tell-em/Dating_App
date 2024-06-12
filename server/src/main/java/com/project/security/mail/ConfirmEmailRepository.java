package com.project.security.mail;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ConfirmEmailRepository extends CrudRepository<ConfirmCode, String>,
                                                JpaRepository<ConfirmCode, String> {
}
