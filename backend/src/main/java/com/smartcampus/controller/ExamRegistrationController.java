package com.smartcampus.controller;

import com.smartcampus.entity.ExamRegistration;
import com.smartcampus.response.ApiResponse;
import com.smartcampus.security.CustomUserDetails;
import com.smartcampus.service.ExamRegistrationService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/exam-registration")
public class ExamRegistrationController {

    private final ExamRegistrationService examRegistrationService;

    public ExamRegistrationController(ExamRegistrationService examRegistrationService) {
        this.examRegistrationService = examRegistrationService;
    }

    @GetMapping("/my")
    public ResponseEntity<?> getMyRegistrations(@AuthenticationPrincipal CustomUserDetails userDetails) {
        return ResponseEntity.ok(ApiResponse.success(examRegistrationService.getStudentRegistrations(userDetails.getId())));
    }

    @PostMapping
    public ResponseEntity<?> register(@RequestBody ExamRegistration registration, @AuthenticationPrincipal CustomUserDetails userDetails) {
        registration.setStudentId(userDetails.getId());
        return ResponseEntity.ok(ApiResponse.success(examRegistrationService.register(registration)));
    }

    @GetMapping("/admin/all")
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(ApiResponse.success(examRegistrationService.getAll()));
    }
}
