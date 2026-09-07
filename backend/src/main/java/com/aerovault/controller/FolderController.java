package com.aerovault.controller;

import com.aerovault.model.Folder;
import com.aerovault.security.CustomUserDetails;
import com.aerovault.service.FolderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/folders")
@RequiredArgsConstructor
public class FolderController {

    private final FolderService folderService;

    @PostMapping
    public ResponseEntity<?> createFolder(@RequestBody Map<String, String> payload,
                                               @AuthenticationPrincipal CustomUserDetails userDetails) {
        if (userDetails == null || userDetails.getUser() == null) {
            return ResponseEntity.status(401).body("Unauthorized");
        }
        String name = payload.get("name");
        String parentIdStr = payload.get("parentId");
        Long parentId = parentIdStr != null ? Long.parseLong(parentIdStr) : null;
        return ResponseEntity.ok(folderService.createFolder(name, parentId, userDetails.getUser()));
    }

    @GetMapping
    public ResponseEntity<?> getFolders(@RequestParam(required = false) Long parentId,
                                                   @AuthenticationPrincipal CustomUserDetails userDetails) {
        if (userDetails == null || userDetails.getUser() == null) {
            return ResponseEntity.status(401).body("Unauthorized");
        }
        return ResponseEntity.ok(folderService.getFolders(userDetails.getUser(), parentId));
    }

    @PutMapping("/{id}/rename")
    public ResponseEntity<?> renameFolder(@PathVariable Long id, @RequestBody Map<String, String> payload, @AuthenticationPrincipal CustomUserDetails userDetails) {
        if (userDetails == null || userDetails.getUser() == null) {
            return ResponseEntity.status(401).body("Unauthorized");
        }
        return ResponseEntity.ok(folderService.renameFolder(id, payload.get("name"), userDetails.getUser()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteFolder(@PathVariable Long id, @AuthenticationPrincipal CustomUserDetails userDetails) {
        if (userDetails == null || userDetails.getUser() == null) {
            return ResponseEntity.status(401).body("Unauthorized");
        }
        folderService.deleteFolder(id, userDetails.getUser());
        return ResponseEntity.ok().build();
    }
}
