package org.example.be.service;

import org.example.be.model.Account;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IAccountService {
    Page<Account> getAccountAndSearch(String name, Pageable pageable);
}
