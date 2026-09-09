package com.smartcampus.controller;

import com.smartcampus.dto.EventDto;
import com.smartcampus.dto.EventRequest;
import com.smartcampus.response.ApiResponse;
import com.smartcampus.response.PagedResponse;
import com.smartcampus.service.EventService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/events")
public class EventController {

    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<PagedResponse<EventDto>>> getAllEvents(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "date") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir) {

        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);

        Page<EventDto> eventsPage = eventService.getAllEvents(pageable);
        
        PagedResponse<EventDto> pagedResponse = PagedResponse.<EventDto>builder()
                .content(eventsPage.getContent())
                .page(eventsPage.getNumber())
                .size(eventsPage.getSize())
                .totalElements(eventsPage.getTotalElements())
                .totalPages(eventsPage.getTotalPages())
                .last(eventsPage.isLast())
                .build();

        return ResponseEntity.ok(ApiResponse.success(pagedResponse));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<EventDto>> getEventById(@PathVariable String id) {
        EventDto event = eventService.getEventById(id);
        return ResponseEntity.ok(ApiResponse.success(event));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<ApiResponse<EventDto>> createEvent(
            @Valid @RequestBody EventRequest request, 
            Authentication authentication) {
        
        EventDto event = eventService.createEvent(request, authentication.getName());
        return new ResponseEntity<>(ApiResponse.success("Event created successfully", event), HttpStatus.CREATED);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<EventDto>> updateEvent(
            @PathVariable String id, 
            @Valid @RequestBody EventRequest request) {
        
        EventDto event = eventService.updateEvent(id, request);
        return ResponseEntity.ok(ApiResponse.success("Event updated successfully", event));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteEvent(@PathVariable String id) {
        eventService.deleteEvent(id);
        return ResponseEntity.ok(ApiResponse.success("Event deleted successfully", null));
    }

    @PreAuthorize("hasRole('STUDENT')")
    @PostMapping("/{id}/register")
    public ResponseEntity<ApiResponse<EventDto>> registerForEvent(
            @PathVariable String id, 
            Authentication authentication) {
        
        // In a real scenario, you'd extract the user's ID from the JWT or DB based on email (authentication.getName())
        // For simplicity, assuming we have a method to get userId or using email as ID
        EventDto event = eventService.registerForEvent(id, authentication.getName());
        return ResponseEntity.ok(ApiResponse.success("Successfully registered for event", event));
    }
}
