package org.example.be.service;

import org.example.be.model.Account;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IAccountService {
    Page<Account> getAccountAndSearch(String name, Pageable pageable);

    Account findById(Long id);

    void save(Account account);

    List<Account> checkPhone(String phone);

    List<Account> checkEmail(String email);

    List<Account> checkUserName(String userName);
}
