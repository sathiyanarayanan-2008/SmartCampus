package com.smartcampus.dto;

import com.smartcampus.entity.NotificationType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NotificationDto {
    private String id;
    private String userId;
    private String title;
    private String message;
    private NotificationType type;
    private boolean read;
    private String link;
    private LocalDateTime createdAt;
}
