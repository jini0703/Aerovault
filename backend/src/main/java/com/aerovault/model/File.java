package com.aerovault.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "files")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class File {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private Long size;
    private String contentType;

    @Column(nullable = false)
    private String s3Key;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "folder_id")
    private Folder folder;

    @Builder.Default
    private LocalDateTime uploadedAt = LocalDateTime.now();

    @Builder.Default
    private boolean isTrashed = false;

    @Builder.Default
    private boolean isStarred = false;
}
