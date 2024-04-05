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

    @GetMapping("/findById")
    private ResponseEntity<User> findById(@RequestParam Long idAccount) { // tìm user theo id
        User user = iAccountService.findById(idAccount); // tìm user theo id
        return new ResponseEntity<>(user, HttpStatus.OK); // trả về user
    }

    @GetMapping("/checkUserName")
    private ResponseEntity<List<User>> checkUserName(@RequestParam String userName) { // kiểm tra tên tài khoản đã tồn tại chưa
        List<User> list = iAccountService.checkUserName(userName); // kiểm tra tên tài khoản đã tồn tại chưa
        return new ResponseEntity<>(list, HttpStatus.OK); // trả về list user
    }

    @GetMapping("/checkPhoneNumber")
    private ResponseEntity<List<User>> checkPhoneNumber(@RequestParam String phoneNumber) { // kiểm tra số điện thoại đã tồn tại chưa
        List<User> list = iAccountService.checkPhoneNumber(phoneNumber);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/checkEmail")
    private ResponseEntity<List<User>> checkEmail(@RequestParam String email) { // kiểm tra email đã tồn tại chưa
        List<User> list = iAccountService.checkEmail(email); // kiểm tra email đã tồn tại chưa
        return new ResponseEntity<>(list, HttpStatus.OK); // trả về list user
    }

    @GetMapping("/checkPassword")
    private ResponseEntity<Boolean> checkPasswordAccount(@RequestParam(value = "idAccount") Long idAccount, @RequestParam(value = "password") String password) { // kiểm tra password
        User user = iAccountService.findById(idAccount);
        Boolean flag = passwordEncoder.matches(password, user.getPassword());
        return new ResponseEntity<>(flag, HttpStatus.OK);
    }

    @GetMapping("/changePassword")
    private void changePassword(@RequestParam String password, @RequestParam Long idAccount) {
        User user = iAccountService.findById(idAccount);
        user.setPassword(passwordEncoder.encode(password));
        iAccountService.save(user);
        System.out.println(user.getPassword());
    }

    @PostMapping("/registerr")
    private void createAccount(@RequestBody User user) { // tạo tài khoản
        user.setRole(roleService.findById(2L)); // 2 là role user
        user.setPassword(passwordEncoder.encode(user.getPassword())); // mã hóa password
        iAccountService.save(user); // lưu user vào database
        iAccountService.sendMail(user); // gửi mail xác nhận
    }

    @GetMapping("/confirm")
    private ResponseEntity<String> confirmMail(@RequestParam Long id) { // xác nhận mail
        User user = iAccountService.findById(id); // tìm user theo id
        if (!user.getIsConfirm() && user.getId() == id) { // nếu chưa xác nhận và id trùng khớp
            user.setIsConfirm(true);// xác nhận
            iAccountService.save(user); // lưu vào database
            return new ResponseEntity<>("OK", HttpStatus.OK); // trả về OK
        } else {
            return new ResponseEntity<>("NO", HttpStatus.OK); // trả về NO
        }
    }

    @PostMapping("/register")
    public ResponseEntity<Object> createAccount(@RequestBody @Valid AccountDTO accountDTO, // tạo tài khoản
                                                BindingResult bindingResult) throws Exception { // kiểm tra lỗi
        Map<String, String> listError = new HashMap<>(); // tạo map lỗi
        if (bindingResult.hasFieldErrors()) { // nếu có lỗi
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST); // trả về lỗi
        } else {
            Optional<User> userEmail = iAccountService.findAccountByEmail(accountDTO.getEmail()); // kiểm tra email đã tồn tại chưa
            Optional<User> userPhone = iAccountService.findAccountByPhone(accountDTO.getPhoneNumber()); // kiểm tra số điện thoại đã tồn tại chưa
            Optional<User> userAccount = iAccountService.findAccountByAccountName(accountDTO.getNameAccount()); // kiểm tra tên tài khoản đã tồn tại chưa
            System.out.println(userAccount.isPresent() + " " + userEmail.isPresent() + "  " + userPhone.isPresent());// in ra kiểm tra

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
    public ResponseEntity<Object> loginAccount(HttpServletResponse response, @RequestBody AccountDTO accountDTO) { // đăng nhập
        ApiResponse<User> apiResponse = new ApiResponse<>(); // tạo apiResponse
        try {
            String token = iAccountService.login(accountDTO.getNameAccount(), accountDTO.getPassword()); // đăng nhập
            User user = iAccountService.findAccountByAccountName(accountDTO.getNameAccount()).get();// tìm user theo tên tài khoản

            apiResponse.setToken(token); // set token
            apiResponse.setDataRes(user); // set user
//            Cookie jwtCookie = new Cookie("JWT",token);
//            jwtCookie.setHttpOnly(true);
//            jwtCookie.setSecure(true);
//            jwtCookie.setPath("/");
//            jwtCookie.setMaxAge(7 * 24 * 60 * 60);
//            response.addCookie(jwtCookie);

            return ResponseEntity.ok(apiResponse); // trả về apiResponse

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage()); // trả về lỗi
        }


    }


}
