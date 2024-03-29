package com.example.backendglasses.service.impl;

import com.example.backendglasses.model.User;
import org.hibernate.query.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
import java.util.zip.DataFormatException;

public interface IAccountService {
    Optional<User> findAccountByEmail(String email);


    Optional<User> findAccountByAccountName(String accountName);

    User registerAccount(User user) throws Exception;

    Optional<User> findAccountByPhone(String phoneNumber);

    String login(String nameAccount, String passWord) throws Exception;

    User findById(Long id);

    List<User> getAll(Pageable pageable);

    void save(User user);

    List<User> checkUserName(String userName);
    List<User> checkPhoneNumber(String phoneNumber);
    List<User> checkEmail(String email);
}
