package com.aerovault.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "shares")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Share {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "file_id")
    private File file;

    @ManyToOne
    @JoinColumn(name = "folder_id")
    private Folder folder;

    @ManyToOne
    @JoinColumn(name = "shared_by", nullable = false)
    private User sharedBy;

    @ManyToOne
    @JoinColumn(name = "shared_with", nullable = false)
    private User sharedWith;

    private String permission; // e.g., READ, WRITE

    @Builder.Default
    private LocalDateTime sharedAt = LocalDateTime.now();
}
