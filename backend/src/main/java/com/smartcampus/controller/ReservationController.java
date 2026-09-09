package com.smartcampus.controller;

import com.smartcampus.dto.ReservationDto;
import com.smartcampus.dto.ReservationRequest;
import com.smartcampus.response.ApiResponse;
import com.smartcampus.response.PagedResponse;
import com.smartcampus.service.ReservationService;
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
@RequestMapping("/api/reservations")
public class ReservationController {

    private final ReservationService reservationService;

    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public ResponseEntity<ApiResponse<PagedResponse<ReservationDto>>> getAllReservations(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir) {

        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);

        Page<ReservationDto> reservationsPage = reservationService.getAllReservations(pageable);

        PagedResponse<ReservationDto> pagedResponse = PagedResponse.<ReservationDto>builder()
                .content(reservationsPage.getContent())
                .page(reservationsPage.getNumber())
                .size(reservationsPage.getSize())
                .totalElements(reservationsPage.getTotalElements())
                .totalPages(reservationsPage.getTotalPages())
                .last(reservationsPage.isLast())
                .build();

        return ResponseEntity.ok(ApiResponse.success(pagedResponse));
    }

    @GetMapping("/my-reservations")
    public ResponseEntity<ApiResponse<PagedResponse<ReservationDto>>> getMyReservations(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir,
            Authentication authentication) {

        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);

        Page<ReservationDto> reservationsPage = reservationService.getUserReservations(authentication.getName(), pageable);

        PagedResponse<ReservationDto> pagedResponse = PagedResponse.<ReservationDto>builder()
                .content(reservationsPage.getContent())
                .page(reservationsPage.getNumber())
                .size(reservationsPage.getSize())
                .totalElements(reservationsPage.getTotalElements())
                .totalPages(reservationsPage.getTotalPages())
                .last(reservationsPage.isLast())
                .build();

        return ResponseEntity.ok(ApiResponse.success(pagedResponse));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ReservationDto>> getReservationById(@PathVariable String id) {
        ReservationDto reservation = reservationService.getReservationById(id);
        return ResponseEntity.ok(ApiResponse.success(reservation));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<ReservationDto>> createReservation(
            @Valid @RequestBody ReservationRequest request,
            Authentication authentication) {

        ReservationDto reservation = reservationService.createReservation(request, authentication.getName());
        return new ResponseEntity<>(ApiResponse.success("Equipment reserved successfully", reservation), HttpStatus.CREATED);
    }

    @PutMapping("/{id}/return")
    public ResponseEntity<ApiResponse<ReservationDto>> returnEquipment(@PathVariable String id) {
        ReservationDto reservation = reservationService.returnEquipment(id);
        return ResponseEntity.ok(ApiResponse.success("Equipment returned successfully", reservation));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteReservation(@PathVariable String id) {
        reservationService.deleteReservation(id);
        return ResponseEntity.ok(ApiResponse.success("Reservation deleted successfully", null));
    }
}
