package com.smartcampus.dto;

import com.smartcampus.entity.EventStatus;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EventRequest {
    
    @NotBlank(message = "Title is required")
    private String title;
    
    @NotBlank(message = "Description is required")
    private String description;
    
    @NotNull(message = "Date is required")
    @FutureOrPresent(message = "Event date cannot be in the past")
    private LocalDate date;
    
    @NotNull(message = "Time is required")
    private LocalTime time;
    
    @NotBlank(message = "Venue is required")
    private String venue;
    
    @Min(value = 1, message = "Capacity must be at least 1")
    private int capacity;
    
    @NotBlank(message = "Organizer is required")
    private String organizer;
    
    private String category;
    
    private EventStatus status;
    
    private String image;
}
