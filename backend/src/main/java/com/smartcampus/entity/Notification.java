package com.smartcampus.entity;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

/**
 * Notification entity - represents in-app notifications for users.
 */
@Document(collection = "notifications")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Notification {

    @Id
    private String id;

    private String userId;

    private String title;

    private String message;

    private NotificationType type;

    @Builder.Default
    private boolean read = false;

    private String link;

    @CreatedDate
    private LocalDateTime createdAt;
}
