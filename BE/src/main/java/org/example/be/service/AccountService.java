package org.example.be.service;

import org.example.be.model.Account;
import org.example.be.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccountService implements IAccountService {
    @Autowired
    private AccountRepository accountRepository;

    @Override
    public Page<Account> getAccountAndSearch(String name, Pageable pageable) {
        return accountRepository.getAccountAndSearch("%" + name.trim() + "%", pageable);
    }

    @Override
    public Account findById(Long id) {
        return accountRepository.findById(id).get();
    }

    @Override
    public void save(Account account) {
        accountRepository.save(account);
    }

    @Override
    public List<Account> checkPhone(String phone) {
        return accountRepository.checkPhone(phone);
    }

    @Override
    public List<Account> checkEmail(String email) {
        return accountRepository.checkEmail(email);
    }

    @Override
    public List<Account> checkUserName(String userName) {
        return accountRepository.checkUserName(userName);
    }


}
