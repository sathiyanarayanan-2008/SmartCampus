package com.smartcampus.controller;

import com.smartcampus.response.ApiResponse;
import com.smartcampus.service.ReportService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/reports")
@PreAuthorize("hasRole('ADMIN')")
public class ReportController {

    private final ReportService reportService;

    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @GetMapping("/export")
    public ResponseEntity<byte[]> exportReport(@RequestParam String type) {
        byte[] reportData;
        String filename;

        switch (type.toLowerCase()) {
            case "users":
                reportData = reportService.generateUserReport();
                filename = "users_report.csv";
                break;
            case "events":
                reportData = reportService.generateEventReport();
                filename = "events_report.csv";
                break;
            case "bookings":
                reportData = reportService.generateBookingReport();
                filename = "bookings_report.csv";
                break;
            case "complaints":
                reportData = reportService.generateComplaintReport();
                filename = "complaints_report.csv";
                break;
            case "reservations":
                reportData = reportService.generateReservationReport();
                filename = "reservations_report.csv";
                break;
            default:
                return ResponseEntity.badRequest().body(null);
        }

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename)
                .contentType(MediaType.parseMediaType("text/csv"))
                .body(reportData);
    }

    @GetMapping("/types")
    public ResponseEntity<ApiResponse<String[]>> getReportTypes() {
        String[] types = {"users", "events", "bookings", "complaints", "reservations"};
        return ResponseEntity.ok(ApiResponse.success(types));
    }
}
