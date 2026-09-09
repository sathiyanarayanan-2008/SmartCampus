package com.smartcampus.controller;

import com.smartcampus.response.ApiResponse;
import com.smartcampus.security.CustomUserDetails;
import com.smartcampus.service.FeeService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/fees")
public class FeeController {

    private final FeeService feeService;

    public FeeController(FeeService feeService) {
        this.feeService = feeService;
    }

    @GetMapping("/my")
    public ResponseEntity<?> getMyFees(@AuthenticationPrincipal CustomUserDetails userDetails) {
        return ResponseEntity.ok(ApiResponse.success(feeService.getStudentFees(userDetails.getId())));
    }

    @GetMapping("/admin/all")
    public ResponseEntity<?> getAllFees() {
        return ResponseEntity.ok(ApiResponse.success(feeService.getAllFees()));
    }
}
