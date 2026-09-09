package com.smartcampus.entity;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * Booking entity - represents room bookings (classrooms, labs, auditoriums, meeting rooms).
 */
@Document(collection = "bookings")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Booking {

    @Id
    private String id;

    private String userId;

    private String userName;

    private RoomType roomType;

    private String roomName;

    private LocalDate date;

    private String startTime;

    private String endTime;

    private String purpose;

    @Builder.Default
    private BookingStatus status = BookingStatus.PENDING;

    private String approvedBy;

    private String rejectionReason;

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;
}
