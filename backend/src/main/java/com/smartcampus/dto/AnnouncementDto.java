package com.smartcampus.dto;

import com.smartcampus.entity.AnnouncementPriority;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AnnouncementDto {
    private String id;
    private String title;
    private String content;
    private AnnouncementPriority priority;
    private String targetAudience;
    private String createdBy;
    private LocalDateTime expiresAt;
    private boolean active;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
