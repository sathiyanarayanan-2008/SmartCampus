package com.smartcampus.controller;

import com.smartcampus.entity.Feedback;
import com.smartcampus.response.ApiResponse;
import com.smartcampus.security.CustomUserDetails;
import com.smartcampus.service.FeedbackService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {

    private final FeedbackService feedbackService;

    public FeedbackController(FeedbackService feedbackService) {
        this.feedbackService = feedbackService;
    }

    @GetMapping("/my")
    public ResponseEntity<?> getMyFeedbacks(@AuthenticationPrincipal CustomUserDetails userDetails) {
        return ResponseEntity.ok(ApiResponse.success(feedbackService.getStudentFeedbacks(userDetails.getId())));
    }

    @PostMapping
    public ResponseEntity<?> submitFeedback(@RequestBody Feedback feedback, @AuthenticationPrincipal CustomUserDetails userDetails) {
        feedback.setStudentId(userDetails.getId());
        feedback.setStudentName(userDetails.getUsername());
        return ResponseEntity.ok(ApiResponse.success(feedbackService.submitFeedback(feedback)));
    }

    @GetMapping("/admin/all")
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(ApiResponse.success(feedbackService.getAll()));
    }
}
