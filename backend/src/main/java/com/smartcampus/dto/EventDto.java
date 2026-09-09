package com.smartcampus.dto;

import com.smartcampus.entity.EventStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EventDto {
    private String id;
    private String title;
    private String description;
    private LocalDate date;
    private LocalTime time;
    private String venue;
    private int capacity;
    private List<String> registeredStudents;
    private int availableSpots;
    private String organizer;
    private String category;
    private EventStatus status;
    private String image;
    private String createdBy;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
