package com.example.backendglasses.config;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


@Configuration
@EnableMethodSecurity
@RequiredArgsConstructor
public class WebSecurityConfig {
    @Autowired
    private JwtTokenFilter jwtTokenFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .addFilterBefore(jwtTokenFilter, UsernamePasswordAuthenticationFilter.class)
                .authorizeHttpRequests(requests -> {
                    requests
                            .requestMatchers(("/account/registerr"),
                                    ("/account/login"))
                            .permitAll()
                            .requestMatchers(HttpMethod.GET, ("/booking")).hasAnyRole("USER", "ADMIN")
                            .requestMatchers(HttpMethod.GET, ("/booking/checkLiveCart")).hasAnyRole("USER", "ADMIN")
                            .requestMatchers(HttpMethod.GET, ("/account/findById")).hasAnyRole("USER", "ADMIN")
                            .requestMatchers(HttpMethod.GET, ("/booking/quantityCart/")).hasAnyRole("USER", "ADMIN")
                            .requestMatchers(HttpMethod.GET, ("/booking")).hasAnyRole("USER", "ADMIN")
                            .requestMatchers(HttpMethod.POST, ("/booking/**")).hasAnyRole("USER", "ADMIN")
                            .requestMatchers(HttpMethod.GET, ("/booking/**")).hasAnyRole("USER", "ADMIN")
                            .requestMatchers(HttpMethod.GET, ("/booking/price")).hasAnyRole("USER", "ADMIN")
                            .requestMatchers(HttpMethod.POST, ("/booking/setQuantity")).hasAnyRole("USER", "ADMIN")
                            .requestMatchers(HttpMethod.GET, ("/booking/checkPayment")).hasAnyRole("USER", "ADMIN")
                            .requestMatchers(HttpMethod.GET, ("/booking/waitPayment")).hasAnyRole("USER", "ADMIN")
                            .requestMatchers(HttpMethod.GET, ("/booking/**")).hasAnyRole("USER", "ADMIN")
                            .requestMatchers(HttpMethod.GET, ("/payment/**")).hasAnyRole("USER", "ADMIN")
                            .requestMatchers(HttpMethod.POST, ("/admin/**")).hasAnyRole("ADMIN")
                            .requestMatchers(HttpMethod.GET, ("/admin/**")).hasAnyRole("ADMIN")
                            .requestMatchers(HttpMethod.GET, ("/account/checkPassword")).hasAnyRole("USER", "ADMIN")
                            .requestMatchers(HttpMethod.POST, ("/account/changePassword")).hasAnyRole("USER", "ADMIN")
                            .anyRequest().permitAll()

                    ;
                })
        ;
        return http.build();
    }
}
