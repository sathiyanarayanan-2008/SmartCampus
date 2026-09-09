package com.smartcampus.mapper;

import com.smartcampus.dto.EventDto;
import com.smartcampus.dto.EventRequest;
import com.smartcampus.entity.Event;
import com.smartcampus.entity.EventStatus;
import org.springframework.stereotype.Component;

@Component
public class EventMapper {

    public Event toEntity(EventRequest request, String username) {
        return Event.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .date(request.getDate())
                .time(request.getTime())
                .venue(request.getVenue())
                .capacity(request.getCapacity())
                .organizer(request.getOrganizer())
                .category(request.getCategory())
                .status(request.getStatus() != null ? request.getStatus() : EventStatus.UPCOMING)
                .image(request.getImage())
                .createdBy(username)
                .build();
    }

    public EventDto toDto(Event event) {
        return EventDto.builder()
                .id(event.getId())
                .title(event.getTitle())
                .description(event.getDescription())
                .date(event.getDate())
                .time(event.getTime())
                .venue(event.getVenue())
                .capacity(event.getCapacity())
                .registeredStudents(event.getRegisteredStudents())
                .availableSpots(event.getAvailableSpots())
                .organizer(event.getOrganizer())
                .category(event.getCategory())
                .status(event.getStatus())
                .image(event.getImage())
                .createdBy(event.getCreatedBy())
                .createdAt(event.getCreatedAt())
                .updatedAt(event.getUpdatedAt())
                .build();
    }
}
