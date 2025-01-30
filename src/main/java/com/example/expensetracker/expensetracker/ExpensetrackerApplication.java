package com.example.expensetracker.expensetracker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan(basePackages = "com.example.expensetracker.expensetracker.Model")
@EnableJpaRepositories(basePackages = "com.example.expensetracker.expensetracker.Repository")
public class ExpensetrackerApplication {

    public static void main(String[] args) {
        SpringApplication.run(ExpensetrackerApplication.class, args);
    }
}
