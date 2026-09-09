package com.smartcampus.controller;

import com.smartcampus.dto.EquipmentDto;
import com.smartcampus.dto.EquipmentRequest;
import com.smartcampus.response.ApiResponse;
import com.smartcampus.response.PagedResponse;
import com.smartcampus.service.EquipmentService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/equipments")
public class EquipmentController {

    private final EquipmentService equipmentService;

    public EquipmentController(EquipmentService equipmentService) {
        this.equipmentService = equipmentService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<PagedResponse<EquipmentDto>>> getAllEquipments(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir,
            @RequestParam(required = false) String search) {

        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);

        Page<EquipmentDto> equipmentPage;
        if (search != null && !search.isEmpty()) {
            equipmentPage = equipmentService.searchEquipments(search, pageable);
        } else {
            equipmentPage = equipmentService.getAllEquipments(pageable);
        }

        PagedResponse<EquipmentDto> pagedResponse = PagedResponse.<EquipmentDto>builder()
                .content(equipmentPage.getContent())
                .page(equipmentPage.getNumber())
                .size(equipmentPage.getSize())
                .totalElements(equipmentPage.getTotalElements())
                .totalPages(equipmentPage.getTotalPages())
                .last(equipmentPage.isLast())
                .build();

        return ResponseEntity.ok(ApiResponse.success(pagedResponse));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<EquipmentDto>> getEquipmentById(@PathVariable String id) {
        EquipmentDto equipment = equipmentService.getEquipmentById(id);
        return ResponseEntity.ok(ApiResponse.success(equipment));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<ApiResponse<EquipmentDto>> createEquipment(
            @Valid @RequestBody EquipmentRequest request) {

        EquipmentDto equipment = equipmentService.createEquipment(request);
        return new ResponseEntity<>(ApiResponse.success("Equipment created successfully", equipment), HttpStatus.CREATED);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<EquipmentDto>> updateEquipment(
            @PathVariable String id,
            @Valid @RequestBody EquipmentRequest request) {

        EquipmentDto equipment = equipmentService.updateEquipment(id, request);
        return ResponseEntity.ok(ApiResponse.success("Equipment updated successfully", equipment));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteEquipment(@PathVariable String id) {
        equipmentService.deleteEquipment(id);
        return ResponseEntity.ok(ApiResponse.success("Equipment deleted successfully", null));
    }
}
