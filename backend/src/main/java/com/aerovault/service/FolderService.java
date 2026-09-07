package com.aerovault.service;

import com.aerovault.model.Folder;
import com.aerovault.model.User;
import com.aerovault.repository.FolderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class FolderService {

    private final FolderRepository folderRepository;
    private final FileService fileService;

    public Folder createFolder(String name, Long parentId, User user) {
        Folder parent = null;
        if (parentId != null) {
            parent = folderRepository.findById(parentId).orElseThrow(() -> new RuntimeException("Parent folder not found"));
            if (!Objects.equals(parent.getUser().getId(), user.getId())) {
                throw new RuntimeException("Unauthorized");
            }
        }
        Folder folder = Folder.builder()
                .name(name)
                .user(user)
                .parent(parent)
                .build();
        return folderRepository.save(folder);
    }

    public List<Folder> getFolders(User user, Long parentId) {
        if (parentId == null) {
            return folderRepository.findByUserAndParentIsNull(user);
        } else {
            Folder parent = folderRepository.findById(parentId).orElseThrow();
            if (!Objects.equals(parent.getUser().getId(), user.getId())) {
                throw new RuntimeException("Unauthorized");
            }
            return folderRepository.findByUserAndParent(user, parent);
        }
    }

    public Folder renameFolder(Long id, String newName, User user) {
        Folder folder = folderRepository.findById(id).orElseThrow(() -> new RuntimeException("Folder not found"));
        if (!Objects.equals(folder.getUser().getId(), user.getId())) {
            throw new RuntimeException("Unauthorized");
        }
        folder.setName(newName);
        return folderRepository.save(folder);
    }

    public void deleteFolder(Long id, User user) {
        Folder folder = folderRepository.findById(id).orElseThrow(() -> new RuntimeException("Folder not found"));
        if (!Objects.equals(folder.getUser().getId(), user.getId())) {
            throw new RuntimeException("Unauthorized");
        }
        
        // Delete child folders recursively
        List<Folder> children = folderRepository.findByUserAndParent(user, folder);
        for (Folder child : children) {
            deleteFolder(child.getId(), user);
        }
        
        // Delete files in this folder
        fileService.deleteFilesInFolder(folder, user);
        
        folderRepository.delete(folder);
    }
}
