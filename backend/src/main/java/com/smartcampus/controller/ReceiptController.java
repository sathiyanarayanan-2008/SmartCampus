package com.smartcampus.controller;

import com.smartcampus.response.ApiResponse;
import com.smartcampus.security.CustomUserDetails;
import com.smartcampus.service.ReceiptService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/receipts")
public class ReceiptController {

    private final ReceiptService receiptService;

    public ReceiptController(ReceiptService receiptService) {
        this.receiptService = receiptService;
    }

    @GetMapping("/my")
    public ResponseEntity<?> getMyReceipts(@AuthenticationPrincipal CustomUserDetails userDetails) {
        return ResponseEntity.ok(ApiResponse.success(receiptService.getStudentReceipts(userDetails.getId())));
    }

    @GetMapping("/admin/all")
    public ResponseEntity<?> getAllReceipts() {
        return ResponseEntity.ok(ApiResponse.success(receiptService.getAllReceipts()));
    }
}
