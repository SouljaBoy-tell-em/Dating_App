package com.javatechie.google.auth.google_user;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface GoogleUserRepository extends CrudRepository<GoogleUser, String>,
                                              JpaRepository<GoogleUser, String> {
}
