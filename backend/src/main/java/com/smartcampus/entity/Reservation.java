package com.smartcampus.entity;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * Reservation entity - represents equipment reservations by students.
 */
@Document(collection = "reservations")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Reservation {

    @Id
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

    @Builder.Default
    private ReservationStatus status = ReservationStatus.RESERVED;

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;
}
