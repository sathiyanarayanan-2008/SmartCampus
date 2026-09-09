package com.smartcampus.controller;

import com.smartcampus.dto.DashboardStats;
import com.smartcampus.response.ApiResponse;
import com.smartcampus.service.DashboardService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin")
    public ResponseEntity<ApiResponse<DashboardStats>> getAdminDashboard() {
        DashboardStats stats = dashboardService.getAdminDashboardStats();
        return ResponseEntity.ok(ApiResponse.success(stats));
    }

    @GetMapping("/student")
    public ResponseEntity<ApiResponse<DashboardStats>> getStudentDashboard(Authentication authentication) {
        DashboardStats stats = dashboardService.getStudentDashboardStats(authentication.getName());
        return ResponseEntity.ok(ApiResponse.success(stats));
    }
}
