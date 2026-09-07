package com.aerovault.repository;

import com.aerovault.model.Share;
import com.aerovault.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ShareRepository extends JpaRepository<Share, Long> {
    List<Share> findBySharedWith(User sharedWith);
    List<Share> findBySharedBy(User sharedBy);
}
