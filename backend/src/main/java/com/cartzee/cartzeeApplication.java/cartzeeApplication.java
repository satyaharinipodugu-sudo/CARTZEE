package com.cartzee;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class CartzeeApplication {

    public static void main(String[] args) {
        SpringApplication.run(CartzeeApplication.class, args);

        System.out.println("=================================");
        System.out.println("       CARTZEE BACKEND STARTED   ");
        System.out.println("=================================");
        System.out.println("Server: http://localhost:8080");
    }
}
