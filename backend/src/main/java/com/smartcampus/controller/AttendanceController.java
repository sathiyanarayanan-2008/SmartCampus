package com.smartcampus.controller;

import com.smartcampus.response.ApiResponse;
import com.smartcampus.security.CustomUserDetails;
import com.smartcampus.service.AttendanceService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/attendance")
public class AttendanceController {

    private final AttendanceService attendanceService;

    public AttendanceController(AttendanceService attendanceService) {
        this.attendanceService = attendanceService;
    }

    @GetMapping("/my")
    public ResponseEntity<?> getMyAttendance(@AuthenticationPrincipal CustomUserDetails userDetails) {
        return ResponseEntity.ok(ApiResponse.success(attendanceService.getSubjectWiseAttendance(userDetails.getId())));
    }

    @GetMapping("/my/all")
    public ResponseEntity<?> getMyAllAttendance(@AuthenticationPrincipal CustomUserDetails userDetails) {
        return ResponseEntity.ok(ApiResponse.success(attendanceService.getStudentAttendance(userDetails.getId())));
    }

    @GetMapping("/admin/all")
    public ResponseEntity<?> getAllAttendance() {
        return ResponseEntity.ok(ApiResponse.success(attendanceService.getAllAttendance()));
    }
}
