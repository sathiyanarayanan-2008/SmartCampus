package com.smartcampus.controller;

import com.smartcampus.dto.ComplaintDto;
import com.smartcampus.dto.ComplaintRequest;
import com.smartcampus.entity.ComplaintStatus;
import com.smartcampus.response.ApiResponse;
import com.smartcampus.response.PagedResponse;
import com.smartcampus.service.ComplaintService;
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
@RequestMapping("/api/complaints")
public class ComplaintController {

    private final ComplaintService complaintService;

    public ComplaintController(ComplaintService complaintService) {
        this.complaintService = complaintService;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public ResponseEntity<ApiResponse<PagedResponse<ComplaintDto>>> getAllComplaints(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir) {

        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);

        Page<ComplaintDto> complaintsPage = complaintService.getAllComplaints(pageable);

        PagedResponse<ComplaintDto> pagedResponse = PagedResponse.<ComplaintDto>builder()
                .content(complaintsPage.getContent())
                .page(complaintsPage.getNumber())
                .size(complaintsPage.getSize())
                .totalElements(complaintsPage.getTotalElements())
                .totalPages(complaintsPage.getTotalPages())
                .last(complaintsPage.isLast())
                .build();

        return ResponseEntity.ok(ApiResponse.success(pagedResponse));
    }

    @GetMapping("/my-complaints")
    public ResponseEntity<ApiResponse<PagedResponse<ComplaintDto>>> getMyComplaints(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir,
            Authentication authentication) {

        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);

        Page<ComplaintDto> complaintsPage = complaintService.getUserComplaints(authentication.getName(), pageable);

        PagedResponse<ComplaintDto> pagedResponse = PagedResponse.<ComplaintDto>builder()
                .content(complaintsPage.getContent())
                .page(complaintsPage.getNumber())
                .size(complaintsPage.getSize())
                .totalElements(complaintsPage.getTotalElements())
                .totalPages(complaintsPage.getTotalPages())
                .last(complaintsPage.isLast())
                .build();

        return ResponseEntity.ok(ApiResponse.success(pagedResponse));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ComplaintDto>> getComplaintById(@PathVariable String id) {
        ComplaintDto complaint = complaintService.getComplaintById(id);
        return ResponseEntity.ok(ApiResponse.success(complaint));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<ComplaintDto>> createComplaint(
            @Valid @RequestBody ComplaintRequest request,
            Authentication authentication) {

        ComplaintDto complaint = complaintService.createComplaint(request, authentication.getName());
        return new ResponseEntity<>(ApiResponse.success("Complaint submitted successfully", complaint), HttpStatus.CREATED);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}/status")
    public ResponseEntity<ApiResponse<ComplaintDto>> updateComplaintStatus(
            @PathVariable String id,
            @RequestParam ComplaintStatus status,
            @RequestParam(required = false) String resolution,
            Authentication authentication) {

        ComplaintDto complaint = complaintService.updateComplaintStatus(id, status, resolution, authentication.getName());
        return ResponseEntity.ok(ApiResponse.success("Complaint status updated successfully", complaint));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteComplaint(@PathVariable String id) {
        complaintService.deleteComplaint(id);
        return ResponseEntity.ok(ApiResponse.success("Complaint deleted successfully", null));
    }
}
