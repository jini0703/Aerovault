package com.aerovault.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "folders")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Folder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "parent_id")
    private Folder parent;

    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
}
