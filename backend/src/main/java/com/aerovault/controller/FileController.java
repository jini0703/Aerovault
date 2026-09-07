package com.aerovault.controller;

import com.aerovault.model.File;
import com.aerovault.security.CustomUserDetails;
import com.aerovault.service.FileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/files")
@RequiredArgsConstructor
public class FileController {

    private final FileService fileService;

    @PostMapping
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file,
                                           @RequestParam(required = false) Long folderId,
                                           @AuthenticationPrincipal CustomUserDetails userDetails) {
        if (userDetails == null || userDetails.getUser() == null) {
            return ResponseEntity.status(401).body("Unauthorized");
        }
        try {
            return ResponseEntity.ok(fileService.uploadFile(file, folderId, userDetails.getUser()));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> getFiles(@RequestParam(required = false) Long folderId,
                                      @RequestParam(required = false) Boolean isTrashed,
                                      @RequestParam(required = false) Boolean isStarred,
                                      @AuthenticationPrincipal CustomUserDetails userDetails) {
        if (userDetails == null || userDetails.getUser() == null) {
            return ResponseEntity.status(401).body("Unauthorized");
        }
        return ResponseEntity.ok(fileService.getFiles(userDetails.getUser(), folderId, isTrashed, isStarred));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteFile(@PathVariable Long id, @AuthenticationPrincipal CustomUserDetails userDetails) {
        if (userDetails == null || userDetails.getUser() == null) {
            return ResponseEntity.status(401).body("Unauthorized");
        }
        fileService.deleteFile(id, userDetails.getUser());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{id}/trash")
    public ResponseEntity<?> trashFile(@PathVariable Long id, @AuthenticationPrincipal CustomUserDetails userDetails) {
        if (userDetails == null || userDetails.getUser() == null) {
            return ResponseEntity.status(401).body("Unauthorized");
        }
        fileService.moveToTrash(id, userDetails.getUser());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{id}/restore")
    public ResponseEntity<?> restoreFile(@PathVariable Long id, @AuthenticationPrincipal CustomUserDetails userDetails) {
        if (userDetails == null || userDetails.getUser() == null) {
            return ResponseEntity.status(401).body("Unauthorized");
        }
        fileService.restoreFromTrash(id, userDetails.getUser());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{id}/star")
    public ResponseEntity<?> starFile(@PathVariable Long id, @AuthenticationPrincipal CustomUserDetails userDetails) {
        if (userDetails == null || userDetails.getUser() == null) {
            return ResponseEntity.status(401).body("Unauthorized");
        }
        fileService.toggleStar(id, userDetails.getUser(), true);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{id}/unstar")
    public ResponseEntity<?> unstarFile(@PathVariable Long id, @AuthenticationPrincipal CustomUserDetails userDetails) {
        if (userDetails == null || userDetails.getUser() == null) {
            return ResponseEntity.status(401).body("Unauthorized");
        }
        fileService.toggleStar(id, userDetails.getUser(), false);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}/rename")
    public ResponseEntity<?> renameFile(@PathVariable Long id, @RequestBody Map<String, String> payload, @AuthenticationPrincipal CustomUserDetails userDetails) {
        if (userDetails == null || userDetails.getUser() == null) {
            return ResponseEntity.status(401).body("Unauthorized");
        }
        fileService.renameFile(id, payload.get("name"), userDetails.getUser());
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}/move")
    public ResponseEntity<?> moveFile(@PathVariable Long id, @RequestBody Map<String, Long> payload, @AuthenticationPrincipal CustomUserDetails userDetails) {
        if (userDetails == null || userDetails.getUser() == null) {
            return ResponseEntity.status(401).body("Unauthorized");
        }
        fileService.moveFile(id, payload.get("folderId"), userDetails.getUser());
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}/download")
    public ResponseEntity<?> downloadFile(@PathVariable Long id, @AuthenticationPrincipal CustomUserDetails userDetails) {
        if (userDetails == null || userDetails.getUser() == null) {
            return ResponseEntity.status(401).body("Unauthorized");
        }
        try {
            File file = fileService.getFile(id, userDetails.getUser());
            java.io.InputStream is = fileService.downloadFile(id, userDetails.getUser());
            org.springframework.core.io.InputStreamResource resource = new org.springframework.core.io.InputStreamResource(is);
            return ResponseEntity.ok()
                    .header(org.springframework.http.HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getName() + "\"")
                    .contentType(org.springframework.http.MediaType.parseMediaType(file.getContentType()))
                    .body(resource);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
