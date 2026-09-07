package com.aerovault.repository;

import com.aerovault.model.File;
import com.aerovault.model.Folder;
import com.aerovault.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FileRepository extends JpaRepository<File, Long> {
    List<File> findByUserAndFolderIsNullAndIsTrashedFalse(User user);
    List<File> findByUserAndFolderAndIsTrashedFalse(User user, Folder folder);
    List<File> findByUserAndIsTrashedTrue(User user);
    List<File> findByUserAndIsStarredTrueAndIsTrashedFalse(User user);
    List<File> findByFolder(Folder folder);
    java.util.Optional<File> findByIdAndUser(Long id, User user);
}
