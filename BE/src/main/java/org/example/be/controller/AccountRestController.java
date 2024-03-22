package org.example.be.controller;

import org.example.be.model.Account;
import org.example.be.model.MotobikeAccessory;
import org.example.be.service.IAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/account")
public class AccountRestController {
    @Autowired
    private IAccountService accountService;

    @GetMapping("getAll")
    private ResponseEntity<?> getAll(@RequestParam(defaultValue = "") String name,
                                     @RequestParam(defaultValue = "0") int page) {
        Pageable pageable = PageRequest.of(page, 5);
        Page<Account> getList = accountService.getAccountAndSearch(name, pageable);
        return new ResponseEntity<>(getList, HttpStatus.OK);
    }
}
