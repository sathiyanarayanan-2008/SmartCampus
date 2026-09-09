package com.smartcampus.dto;

import com.smartcampus.entity.ReservationStatus;
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
public class ReservationDto {
    private String id;
    private String equipmentId;
    private String equipmentName;
    private String userId;
    private String userName;
    private LocalDate reservedDate;
    private LocalDate returnDate;
    private LocalDate actualReturnDate;
    private int quantity;
    private String purpose;
    private ReservationStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
