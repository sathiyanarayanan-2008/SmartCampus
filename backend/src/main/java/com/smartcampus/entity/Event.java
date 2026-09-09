package com.smartcampus.entity;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

/**
 * Event entity - represents campus events such as workshops, seminars, and fests.
 */
@Document(collection = "events")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Event {

    @Id
    private String id;

    private String title;

    private String description;

    private LocalDate date;

    private LocalTime time;

    private String venue;

    private int capacity;

    @Builder.Default
    private List<String> registeredStudents = new ArrayList<>();

    private String organizer;

    private String category;

    private EventStatus status;

    private String image;

    private String createdBy;

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;

    /**
     * Returns the number of available spots for registration.
     */
    public int getAvailableSpots() {
        return capacity - (registeredStudents != null ? registeredStudents.size() : 0);
    }
}
