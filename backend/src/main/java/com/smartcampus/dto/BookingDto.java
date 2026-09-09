package com.smartcampus.dto;

import com.smartcampus.entity.BookingStatus;
import com.smartcampus.entity.RoomType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookingDto {
    private String id;
    private String userId;
    private String userName;
    private RoomType roomType;
    private String roomName;
    private LocalDate date;
    private String startTime;
    private String endTime;
    private String purpose;
    private BookingStatus status;
    private String approvedBy;
    private String rejectionReason;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
