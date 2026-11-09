
package com.cartzee.controller;

import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class HealthController {

    @GetMapping("/health")
    public Map<String, String> checkHealth() {

        return Map.of(
            "status", "SUCCESS",
            "message", "Welcome to CARTZEE Backend!"
        );
    }
}
