package com.smartcampus.mapper;

import com.smartcampus.dto.AnnouncementDto;
import com.smartcampus.dto.AnnouncementRequest;
import com.smartcampus.entity.Announcement;
import org.springframework.stereotype.Component;

@Component
public class AnnouncementMapper {

    public Announcement toEntity(AnnouncementRequest request, String createdBy) {
        return Announcement.builder()
                .title(request.getTitle())
                .content(request.getContent())
                .priority(request.getPriority())
                .targetAudience(request.getTargetAudience())
                .createdBy(createdBy)
                .expiresAt(request.getExpiresAt())
                .active(true)
                .build();
    }

    public AnnouncementDto toDto(Announcement announcement) {
        return AnnouncementDto.builder()
                .id(announcement.getId())
                .title(announcement.getTitle())
                .content(announcement.getContent())
                .priority(announcement.getPriority())
                .targetAudience(announcement.getTargetAudience())
                .createdBy(announcement.getCreatedBy())
                .expiresAt(announcement.getExpiresAt())
                .active(announcement.isActive())
                .createdAt(announcement.getCreatedAt())
                .updatedAt(announcement.getUpdatedAt())
                .build();
    }
}
