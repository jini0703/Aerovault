package com.aerovault.service;

import org.springframework.stereotype.Service;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;
import java.io.FileInputStream;

@Service
public class S3Service {

    private final Path storageLocation;

    public S3Service() throws Exception {
        this.storageLocation = Paths.get(System.getProperty("java.io.tmpdir"), "aerovault-uploads");
        if (!Files.exists(storageLocation)) {
            Files.createDirectories(storageLocation);
        }
    }

    public String uploadFile(String originalFilename, String contentType, InputStream inputStream, long size) {
        try {
            String key = UUID.randomUUID().toString() + "_" + originalFilename;
            Path targetLocation = this.storageLocation.resolve(key);
            Files.copy(inputStream, targetLocation, StandardCopyOption.REPLACE_EXISTING);
            return key;
        } catch (Exception ex) {
            throw new RuntimeException("Could not store file", ex);
        }
    }

    public InputStream downloadFile(String key) {
        try {
            Path file = this.storageLocation.resolve(key);
            return new FileInputStream(file.toFile());
        } catch (Exception ex) {
            throw new RuntimeException("Could not read file", ex);
        }
    }
}
