package com.smartcampus.dto;

import com.smartcampus.entity.RoomType;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookingRequest {

    @NotNull(message = "Room type is required")
    private RoomType roomType;

    @NotBlank(message = "Room name is required")
    private String roomName;

    @NotNull(message = "Date is required")
    @FutureOrPresent(message = "Booking date cannot be in the past")
    private LocalDate date;

    @NotBlank(message = "Start time is required")
    private String startTime;

    @NotBlank(message = "End time is required")
    private String endTime;

    @NotBlank(message = "Purpose is required")
    private String purpose;
}
