package com.aerovault.service;

import com.aerovault.model.File;
import com.aerovault.model.Folder;
import com.aerovault.model.User;
import com.aerovault.repository.FileRepository;
import com.aerovault.repository.FolderRepository;
import com.aerovault.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FileService {

    private final UserRepository userRepository;
    private final com.aerovault.repository.ShareRepository shareRepository;

    private final FileRepository fileRepository;
    private final FolderRepository folderRepository;
    private final S3Service s3Service;

    public File uploadFile(MultipartFile multipartFile, Long folderId, User user) throws Exception {
        Folder folder = null;
        if (folderId != null) {
            folder = folderRepository.findById(folderId).orElseThrow(() -> new RuntimeException("Folder not found"));
            if (!java.util.Objects.equals(folder.getUser().getId(), user.getId())) {
                throw new RuntimeException("Unauthorized");
            }
        }

        String s3Key = s3Service.uploadFile(multipartFile.getOriginalFilename(),
                multipartFile.getContentType(), multipartFile.getInputStream(), multipartFile.getSize());

        File file = File.builder()
                .name(multipartFile.getOriginalFilename())
                .size(multipartFile.getSize())
                .contentType(multipartFile.getContentType())
                .s3Key(s3Key)
                .user(user)
                .folder(folder)
                .build();

        return fileRepository.save(file);
    }

    public List<File> getFiles(User user, Long folderId, Boolean isTrashed, Boolean isStarred) {
        if (Boolean.TRUE.equals(isTrashed)) {
            return fileRepository.findByUserAndIsTrashedTrue(user);
        }
        if (Boolean.TRUE.equals(isStarred)) {
            return fileRepository.findByUserAndIsStarredTrueAndIsTrashedFalse(user);
        }
        if (folderId == null) {
            return fileRepository.findByUserAndFolderIsNullAndIsTrashedFalse(user);
        } else {
            Folder folder = folderRepository.findById(folderId).orElseThrow(() -> new RuntimeException("Folder not found"));
            if (!java.util.Objects.equals(folder.getUser().getId(), user.getId())) {
                throw new RuntimeException("Unauthorized");
            }
            return fileRepository.findByUserAndFolderAndIsTrashedFalse(user, folder);
        }
    }

    public void deleteFile(Long fileId, User user) {
        File file = fileRepository.findByIdAndUser(fileId, user).orElseThrow(() -> new RuntimeException("File not found"));
        fileRepository.delete(file);
    }

    public void moveToTrash(Long fileId, User user) {
        File file = fileRepository.findByIdAndUser(fileId, user).orElseThrow(() -> new RuntimeException("File not found"));
        file.setTrashed(true);
        fileRepository.save(file);
    }

    public void restoreFromTrash(Long fileId, User user) {
        File file = fileRepository.findByIdAndUser(fileId, user).orElseThrow(() -> new RuntimeException("File not found"));
        file.setTrashed(false);
        fileRepository.save(file);
    }

    public void toggleStar(Long fileId, User user, boolean isStarred) {
        File file = fileRepository.findByIdAndUser(fileId, user).orElseThrow(() -> new RuntimeException("File not found"));
        file.setStarred(isStarred);
        fileRepository.save(file);
    }

    public void renameFile(Long fileId, String newName, User user) {
        File file = fileRepository.findByIdAndUser(fileId, user).orElseThrow(() -> new RuntimeException("File not found"));
        file.setName(newName);
        fileRepository.save(file);
    }

    public void moveFile(Long fileId, Long folderId, User user) {
        File file = fileRepository.findByIdAndUser(fileId, user).orElseThrow(() -> new RuntimeException("File not found"));
        Folder folder = null;
        if (folderId != null) {
            folder = folderRepository.findById(folderId).orElseThrow(() -> new RuntimeException("Folder not found"));
            if (!java.util.Objects.equals(folder.getUser().getId(), user.getId())) {
                throw new RuntimeException("Unauthorized");
            }
        }
        file.setFolder(folder);
        fileRepository.save(file);
    }

    public java.io.InputStream downloadFile(Long fileId, User user) {
        File file = fileRepository.findByIdAndUser(fileId, user).orElseThrow(() -> new RuntimeException("File not found"));
        return s3Service.downloadFile(file.getS3Key());
    }

    public File getFile(Long fileId, User user) {
        return fileRepository.findByIdAndUser(fileId, user).orElseThrow(() -> new RuntimeException("File not found"));
    }

    public void deleteFilesInFolder(Folder folder, User user) {
        List<File> files = fileRepository.findByFolder(folder);
        for (File f : files) {
            deleteFile(f.getId(), user);
        }
    }
}
