package com.aerovault.service;

import com.aerovault.model.File;
import com.aerovault.model.Folder;
import com.aerovault.model.Share;
import com.aerovault.model.User;
import com.aerovault.repository.FileRepository;
import com.aerovault.repository.FolderRepository;
import com.aerovault.repository.ShareRepository;
import com.aerovault.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ShareService {

    private final ShareRepository shareRepository;
    private final FileRepository fileRepository;
    private final FolderRepository folderRepository;
    private final UserRepository userRepository;

    public Share shareFile(Long fileId, String email, String permission, User sharedBy) {
        File file = fileRepository.findById(fileId).orElseThrow(() -> new RuntimeException("File not found"));
        if (!java.util.Objects.equals(file.getUser().getId(), sharedBy.getId())) {
            throw new RuntimeException("Unauthorized");
        }
        User sharedWith = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));

        Share share = Share.builder()
                .file(file)
                .sharedBy(sharedBy)
                .sharedWith(sharedWith)
                .permission(permission)
                .build();
        return shareRepository.save(share);
    }

    public List<Share> getSharedWithMe(User sharedWith) {
        return shareRepository.findBySharedWith(sharedWith);
    }

    public void revokeShare(Long shareId, User user) {
        Share share = shareRepository.findById(shareId).orElseThrow(() -> new RuntimeException("Share not found"));
        if (!java.util.Objects.equals(share.getSharedBy().getId(), user.getId())) {
            throw new RuntimeException("Unauthorized");
        }
        shareRepository.delete(share);
    }
}
