package com.smartcampus.controller;

import com.smartcampus.dto.AnnouncementDto;
import com.smartcampus.dto.AnnouncementRequest;
import com.smartcampus.response.ApiResponse;
import com.smartcampus.response.PagedResponse;
import com.smartcampus.service.AnnouncementService;
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

import java.util.List;

@RestController
@RequestMapping("/api/announcements")
public class AnnouncementController {

    private final AnnouncementService announcementService;

    public AnnouncementController(AnnouncementService announcementService) {
        this.announcementService = announcementService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<PagedResponse<AnnouncementDto>>> getAllAnnouncements(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir) {

        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);

        Page<AnnouncementDto> announcementsPage = announcementService.getActiveAnnouncements(pageable);

        PagedResponse<AnnouncementDto> pagedResponse = PagedResponse.<AnnouncementDto>builder()
                .content(announcementsPage.getContent())
                .page(announcementsPage.getNumber())
                .size(announcementsPage.getSize())
                .totalElements(announcementsPage.getTotalElements())
                .totalPages(announcementsPage.getTotalPages())
                .last(announcementsPage.isLast())
                .build();

        return ResponseEntity.ok(ApiResponse.success(pagedResponse));
    }

    @GetMapping("/current")
    public ResponseEntity<ApiResponse<List<AnnouncementDto>>> getCurrentAnnouncements() {
        List<AnnouncementDto> announcements = announcementService.getCurrentAnnouncements();
        return ResponseEntity.ok(ApiResponse.success(announcements));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<AnnouncementDto>> getAnnouncementById(@PathVariable String id) {
        AnnouncementDto announcement = announcementService.getAnnouncementById(id);
        return ResponseEntity.ok(ApiResponse.success(announcement));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<ApiResponse<AnnouncementDto>> createAnnouncement(
            @Valid @RequestBody AnnouncementRequest request,
            Authentication authentication) {

        AnnouncementDto announcement = announcementService.createAnnouncement(request, authentication.getName());
        return new ResponseEntity<>(ApiResponse.success("Announcement created successfully", announcement), HttpStatus.CREATED);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<AnnouncementDto>> updateAnnouncement(
            @PathVariable String id,
            @Valid @RequestBody AnnouncementRequest request) {

        AnnouncementDto announcement = announcementService.updateAnnouncement(id, request);
        return ResponseEntity.ok(ApiResponse.success("Announcement updated successfully", announcement));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}/toggle")
    public ResponseEntity<ApiResponse<AnnouncementDto>> toggleAnnouncementActive(@PathVariable String id) {
        AnnouncementDto announcement = announcementService.toggleAnnouncementActive(id);
        return ResponseEntity.ok(ApiResponse.success("Announcement toggled successfully", announcement));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteAnnouncement(@PathVariable String id) {
        announcementService.deleteAnnouncement(id);
        return ResponseEntity.ok(ApiResponse.success("Announcement deleted successfully", null));
    }
}
