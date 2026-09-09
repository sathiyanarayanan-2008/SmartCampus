package com.smartcampus.mapper;

import com.smartcampus.dto.ComplaintDto;
import com.smartcampus.dto.ComplaintRequest;
import com.smartcampus.entity.Complaint;
import com.smartcampus.entity.ComplaintStatus;
import org.springframework.stereotype.Component;

@Component
public class ComplaintMapper {

    public Complaint toEntity(ComplaintRequest request, String userId, String userName) {
        return Complaint.builder()
                .userId(userId)
                .userName(userName)
                .title(request.getTitle())
                .description(request.getDescription())
                .category(request.getCategory())
                .priority(request.getPriority())
                .status(ComplaintStatus.OPEN) // Default status
                .build();
    }

    public ComplaintDto toDto(Complaint complaint) {
        return ComplaintDto.builder()
                .id(complaint.getId())
                .userId(complaint.getUserId())
                .userName(complaint.getUserName())
                .title(complaint.getTitle())
                .description(complaint.getDescription())
                .category(complaint.getCategory())
                .priority(complaint.getPriority())
                .status(complaint.getStatus())
                .resolution(complaint.getResolution())
                .resolvedBy(complaint.getResolvedBy())
                .resolvedAt(complaint.getResolvedAt())
                .createdAt(complaint.getCreatedAt())
                .updatedAt(complaint.getUpdatedAt())
                .build();
    }
}
