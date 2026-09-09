package com.smartcampus.entity;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

/**
 * Complaint entity - represents complaints raised by students.
 */
@Document(collection = "complaints")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Complaint {

    @Id
    private String id;

    private String userId;

    private String userName;

    private String title;

    private String description;

    private ComplaintCategory category;

    private ComplaintPriority priority;

    @Builder.Default
    private ComplaintStatus status = ComplaintStatus.OPEN;

    private String resolution;

    private String resolvedBy;

    private LocalDateTime resolvedAt;

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;
}
