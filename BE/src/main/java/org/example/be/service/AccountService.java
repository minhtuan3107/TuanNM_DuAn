package org.example.be.service;

import org.example.be.model.Account;
import org.example.be.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class AccountService implements IAccountService {
    @Autowired
    private AccountRepository accountRepository;

    @Override
    public Page<Account> getAccountAndSearch(String name, Pageable pageable) {
        return accountRepository.getAccountAndSearch("%" + name.trim() + "%", pageable);
    }
}
