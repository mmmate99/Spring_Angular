package com.matemazlo.portfolio_backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(authz -> authz
                        // Minden kérés engedélyezése (fejlesztéshez)
                        .anyRequest().permitAll()
                )
                // CSRF letiltása H2 konzolhoz
                .csrf(csrf -> csrf.disable())
                // H2 konzol frame-jeinek engedélyezése (frissített verzió)
                .headers(headers -> headers
                        .frameOptions(HeadersConfigurer.FrameOptionsConfig::disable)
                );

        return http.build();
    }
}