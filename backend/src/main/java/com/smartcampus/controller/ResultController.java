package com.smartcampus.controller;

import com.smartcampus.response.ApiResponse;
import com.smartcampus.security.CustomUserDetails;
import com.smartcampus.service.ResultService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/results")
public class ResultController {

    private final ResultService resultService;

    public ResultController(ResultService resultService) {
        this.resultService = resultService;
    }

    @GetMapping("/my")
    public ResponseEntity<?> getMyResults(@AuthenticationPrincipal CustomUserDetails userDetails) {
        return ResponseEntity.ok(ApiResponse.success(resultService.getStudentResults(userDetails.getId())));
    }

    @GetMapping("/admin/all")
    public ResponseEntity<?> getAllResults() {
        return ResponseEntity.ok(ApiResponse.success(resultService.getAllResults()));
    }
}
