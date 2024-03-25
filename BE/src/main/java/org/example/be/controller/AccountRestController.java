package org.example.be.controller;

import org.example.be.model.Account;
import org.example.be.model.MotobikeAccessory;
import org.example.be.service.IAccountService;
import org.example.be.service.IRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin("*")
@RequestMapping("/account")
public class AccountRestController {
    @Autowired
    private IAccountService accountService;
    @Autowired
    private IRoleService roleService;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping("getAll")
    private ResponseEntity<?> getAll(@RequestParam(defaultValue = "") String name,
                                     @RequestParam(defaultValue = "0") int page) {
        Pageable pageable = PageRequest.of(page, 5);
        Page<Account> getList = accountService.getAccountAndSearch(name, pageable);
        return new ResponseEntity<>(getList, HttpStatus.OK);
    }


    @PostMapping("register")
    private void register(@RequestBody Account account) {
        System.out.println("OK");
        account.setRole(roleService.findById(2L));
        String encode = passwordEncoder.encode(account.getPassword());
        account.setPassword(encode);
        accountService.save(account);
    }

    @GetMapping("checkUserName")
    private ResponseEntity<String> checkUserName(@RequestParam String userName) {
        if (!accountService.checkUserName(userName).isEmpty()) {
            return new ResponseEntity<>("NO", HttpStatus.OK);
        }
        return new ResponseEntity<>("OK", HttpStatus.OK);
    }

    @GetMapping("checkPhone")
    private ResponseEntity<String> checkPhone(@RequestParam String phone) {
        if (!accountService.checkPhone(phone).isEmpty()) {
            return new ResponseEntity<>("NO", HttpStatus.OK);
        }
        return new ResponseEntity<>("OK", HttpStatus.OK);
    }

    @GetMapping("checkEmail")
    private ResponseEntity<String> checkEmail(@RequestParam String email) {
        if (!accountService.checkEmail(email).isEmpty()) {
            return new ResponseEntity<>("NO", HttpStatus.OK);
        }
        return new ResponseEntity<>("OK", HttpStatus.OK);
    }
}
