package com.aerovault.controller;

import com.aerovault.model.Share;
import com.aerovault.security.CustomUserDetails;
import com.aerovault.service.ShareService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.List;

@RestController
@RequestMapping("/api/shares")
@RequiredArgsConstructor
public class ShareController {

    private final ShareService shareService;

    @PostMapping("/file/{fileId}")
    public ResponseEntity<?> shareFile(@PathVariable Long fileId,
                                           @RequestBody Map<String, String> payload,
                                           @AuthenticationPrincipal CustomUserDetails userDetails) {
        if (userDetails == null || userDetails.getUser() == null) {
            return ResponseEntity.status(401).body("Unauthorized");
        }
        String email = payload.get("email");
        String permission = payload.get("permission");
        return ResponseEntity.ok(shareService.shareFile(fileId, email, permission, userDetails.getUser()));
    }

    @GetMapping("/me")
    public ResponseEntity<?> getSharedWithMe(@AuthenticationPrincipal CustomUserDetails userDetails) {
        if (userDetails == null || userDetails.getUser() == null) {
            return ResponseEntity.status(401).body("Unauthorized");
        }
        return ResponseEntity.ok(shareService.getSharedWithMe(userDetails.getUser()));
    }

    @DeleteMapping("/{shareId}")
    public ResponseEntity<?> revokeShare(@PathVariable Long shareId, @AuthenticationPrincipal CustomUserDetails userDetails) {
        if (userDetails == null || userDetails.getUser() == null) {
            return ResponseEntity.status(401).body("Unauthorized");
        }
        shareService.revokeShare(shareId, userDetails.getUser());
        return ResponseEntity.ok().build();
    }
}
