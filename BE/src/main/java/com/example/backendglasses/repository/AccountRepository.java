package com.example.backendglasses.repository;

import com.example.backendglasses.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    Optional<User> findByNameAccount(String accountName);

    Optional<User> findByPhoneNumber(String phoneNumber);

    boolean existsByNameAccount(String nameAccount);

    @Query(value = "select * from user where user.email = :email", nativeQuery = true)
    List<User> checkEmail(@Param("email") String email);

    @Query(value = "select * from user where user.phone_number = :phoneNumber", nativeQuery = true)
    List<User> checkPhoneNumber(@Param("phoneNumber") String phoneNumber);

    @Query(value = "select * from user where user.name_account = :userName", nativeQuery = true)
    List<User> checkUserName(String userName);

}
