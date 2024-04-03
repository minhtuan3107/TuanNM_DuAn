package com.example.backendglasses.controller;

import com.example.backendglasses.model.Role;
import com.example.backendglasses.model.User;
import com.example.backendglasses.model.dto.AccountDTO;
import com.example.backendglasses.model.dto.ApiResponse;
import com.example.backendglasses.service.impl.IAccountService;
import com.example.backendglasses.service.impl.IRoleService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/account")
public class AccountRESTController {
    @Autowired
    private IAccountService iAccountService;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private IRoleService roleService;

    @GetMapping("findById")
    private ResponseEntity<User> findById(@RequestParam Long idAccount) {
        User user = iAccountService.findById(idAccount);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping("checkUserName")
    private ResponseEntity<List<User>> checkUserName(@RequestParam String userName) {
        List<User> list = iAccountService.checkUserName(userName);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("checkPhoneNumber")
    private ResponseEntity<List<User>> checkPhoneNumber(@RequestParam String phoneNumber) {
        List<User> list = iAccountService.checkPhoneNumber(phoneNumber);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("checkEmail")
    private ResponseEntity<List<User>> checkEmail(@RequestParam String email) {
        List<User> list = iAccountService.checkEmail(email);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @PostMapping("registerr")
    private void createAccount(@RequestBody User user) {
        user.setRole(roleService.findById(2L));
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        iAccountService.save(user);
        iAccountService.sendMail(user);
    }

    @GetMapping("confirm")
    private ResponseEntity<String> confirmMail(@RequestParam Long id) {
        User user = iAccountService.findById(id);
        if (!user.getIsConfirm() && user.getId() == id) {
            user.setIsConfirm(true);
            iAccountService.save(user);
            return new ResponseEntity<>("OK", HttpStatus.OK);
        }
        return new ResponseEntity<>("NO", HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<Object> createAccount(@RequestBody @Valid AccountDTO accountDTO,
                                                BindingResult bindingResult) throws Exception {
        Map<String, String> listError = new HashMap<>();
        if (bindingResult.hasFieldErrors()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } else {
            Optional<User> userEmail = iAccountService.findAccountByEmail(accountDTO.getEmail());
            Optional<User> userPhone = iAccountService.findAccountByPhone(accountDTO.getPhoneNumber());
            Optional<User> userAccount = iAccountService.findAccountByAccountName(accountDTO.getNameAccount());
            System.out.println(userAccount.isPresent() + " " + userEmail.isPresent() + "  " + userPhone.isPresent());

            if (userEmail.isPresent()) {
                System.out.println(iAccountService.findAccountByEmail(accountDTO.getEmail()));
                listError.put("email", "Email Đã Tồn Tại");
            }
            if (userPhone.isPresent()) {
                listError.put("phoneNumber", "Số Điện Thoại Đã Tồn Tại");
            }
            if (userAccount.isPresent()) {
                listError.put("accountName", "Tài Khoản Đã Tồn Tại");
            }
            if (!listError.isEmpty()) {
                return new ResponseEntity<>(listError, HttpStatus.BAD_REQUEST);
            }

            String encode = passwordEncoder.encode(accountDTO.getPassword());

            User user = new User();
            BeanUtils.copyProperties(accountDTO, user);
            user.setPassword(encode);
            user.setPassword(encode);
            Role role = new Role(3L);
            user.setRole(role);
            User userTemp = iAccountService.registerAccount(user);
            return new ResponseEntity<>(user, HttpStatus.OK);
        }
    }


    @PostMapping("/login")
    public ResponseEntity<Object> loginAccount(HttpServletResponse response, @RequestBody AccountDTO accountDTO) {
        ApiResponse<User> apiResponse = new ApiResponse<>();
        try {
            String token = iAccountService.login(accountDTO.getNameAccount(), accountDTO.getPassword());
            User user = iAccountService.findAccountByAccountName(accountDTO.getNameAccount()).get();

            apiResponse.setToken(token);
            apiResponse.setDataRes(user);
//            Cookie jwtCookie = new Cookie("JWT",token);
//            jwtCookie.setHttpOnly(true);
//            jwtCookie.setSecure(true);
//            jwtCookie.setPath("/");
//            jwtCookie.setMaxAge(7 * 24 * 60 * 60);
//            response.addCookie(jwtCookie);

            return ResponseEntity.ok(apiResponse);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }


    }


}
