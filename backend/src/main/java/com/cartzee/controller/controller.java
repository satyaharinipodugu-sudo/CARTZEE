
package com.cartzee.controller;

import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {
    "http://127.0.0.1:5500",
    "http://localhost:5500"
})
public class AuthController {

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Map<String, String> data) {

        String email = data.get("email");
        String password = data.get("password");

        if (email == null || password == null ||
            email.isBlank() || password.isBlank()) {
            return Map.of(
                "success", false,
                "message", "Please enter email and password"
            );
        }

        return Map.of(
            "success", true,
            "message", "CARTZEE login API connected successfully!",
            "email", email
        );
    }
}
