package com.smartcampus.dto;

import jakarta.validation.constraints.Min;
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
public class ReservationRequest {

    @NotBlank(message = "Equipment ID is required")
    private String equipmentId;

    @NotNull(message = "Reserved date is required")
    private LocalDate reservedDate;

    @NotNull(message = "Return date is required")
    private LocalDate returnDate;

    @Min(value = 1, message = "Quantity must be at least 1")
    private int quantity;

    private String purpose;
}
