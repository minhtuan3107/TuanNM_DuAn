package com.example.backendglasses.service;

import com.example.backendglasses.config.JwtTokenUtil;
import com.example.backendglasses.model.User;
import com.example.backendglasses.repository.AccountRepository;
import com.example.backendglasses.service.impl.IAccountService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.util.List;
import java.util.Optional;
import java.util.zip.DataFormatException;

@RequiredArgsConstructor
@Service
public class AccountService implements IAccountService {
    @Autowired
    private final JwtTokenUtil jwtTokenUtil;
    @Autowired
    private final AuthenticationManager authenticationManager;
    @Autowired
    private final PasswordEncoder passwordEncoder;
    @Autowired
    private final AccountRepository accountRepository;
    @Autowired
    private JavaMailSender mailSender;
    @Autowired
    private TemplateEngine templateEngine;
    @Override
    public Optional<User> findAccountByEmail(String email) {

        return accountRepository.findByEmail(email);
    }


    @Override
    public Optional<User> findAccountByAccountName(String accountName) {
        return accountRepository.findByNameAccount(accountName);
    }

    @Override
    public User registerAccount(User user) throws Exception {
        return accountRepository.save(user);
    }

    @Override
    public Optional<User> findAccountByPhone(String phoneNumber) {
        return accountRepository.findByPhoneNumber(phoneNumber);
    }

    @Override
    public String login(String nameAccount, String passWord) throws DataFormatException {
        Optional<User> optionalUser = accountRepository.findByNameAccount(nameAccount);
        if (optionalUser.isEmpty()) {
            throw new DataFormatException("Sai tai khoan hoac mat khau ");
        }
        User existingUser = optionalUser.get();

        // chua dang nhap google
        if (!passwordEncoder.matches(passWord, existingUser.getPassword())) {
            throw new BadCredentialsException("sai toan khoan hoac mat khau");
        }

        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                nameAccount, passWord, existingUser.getAuthorities()
        );
        authenticationManager.authenticate(authenticationToken);
        return jwtTokenUtil.generateToken(optionalUser.get());
    }

    @Override
    public User findById(Long id) {
        return accountRepository.findById(id).get();
    }

    @Override
    public List<User> getAll(Pageable pageable) {
        return accountRepository.findAll();
    }

    @Override
    public void save(User user) {
        accountRepository.save(user);
    }

    @Override
    public List<User> checkUserName(String userName) {
        return accountRepository.checkUserName(userName);
    }

    @Override
    public List<User> checkPhoneNumber(String phoneNumber) {
        return accountRepository.checkPhoneNumber(phoneNumber);
    }

    @Override
    public List<User> checkEmail(String email) {
        return accountRepository.checkEmail(email);
    }

    @Override
    public void sendMail(User user) {
        String to = user.getEmail();
        String subject = "Kích hoạt tài khoản khách hàng";
        String templateName = "mail";
        Context context = new Context();
        context.setVariable("id", user.getId());
        sendEmailWithHtmlTemplate(to, subject, templateName, context);
    }

    public void sendEmailWithHtmlTemplate(String to, String subject, String templateName, Context context) {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "UTF-8");
        try {
            helper.setTo(to);
            helper.setSubject(subject);
            String htmlContent = templateEngine.process(templateName, context);
            helper.setText(htmlContent, true);
            mailSender.send(mimeMessage);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }

}
