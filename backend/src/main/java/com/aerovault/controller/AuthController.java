package com.aerovault.controller;

import com.aerovault.dto.LoginRequest;
import com.aerovault.dto.SignupRequest;
import com.aerovault.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        return ResponseEntity.ok(authService.authenticateUser(loginRequest));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody SignupRequest signUpRequest) {
        return ResponseEntity.ok(authService.registerUser(signUpRequest));
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(@org.springframework.security.core.annotation.AuthenticationPrincipal com.aerovault.security.CustomUserDetails userDetails) {
        if (userDetails == null || userDetails.getUser() == null) {
            return ResponseEntity.status(401).body("Unauthorized");
        }
        return ResponseEntity.ok(userDetails.getUser());
    }
}
