package com.aerovault.repository;

import com.aerovault.model.Folder;
import com.aerovault.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FolderRepository extends JpaRepository<Folder, Long> {
    List<Folder> findByUserAndParentIsNull(User user);
    List<Folder> findByUserAndParent(User user, Folder parent);
}
