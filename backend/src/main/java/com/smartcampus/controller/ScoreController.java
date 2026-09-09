package com.smartcampus.controller;

import com.smartcampus.response.ApiResponse;
import com.smartcampus.security.CustomUserDetails;
import com.smartcampus.service.ScoreService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/scores")
public class ScoreController {

    private final ScoreService scoreService;

    public ScoreController(ScoreService scoreService) {
        this.scoreService = scoreService;
    }

    @GetMapping("/my")
    public ResponseEntity<?> getMyScores(@AuthenticationPrincipal CustomUserDetails userDetails) {
        return ResponseEntity.ok(ApiResponse.success(scoreService.getStudentScores(userDetails.getId())));
    }

    @GetMapping("/my/semester/{semester}")
    public ResponseEntity<?> getMyScoresBySemester(@AuthenticationPrincipal CustomUserDetails userDetails, @PathVariable int semester) {
        return ResponseEntity.ok(ApiResponse.success(scoreService.getStudentScoresBySemester(userDetails.getId(), semester)));
    }

    @GetMapping("/admin/all")
    public ResponseEntity<?> getAllScores() {
        return ResponseEntity.ok(ApiResponse.success(scoreService.getAllScores()));
    }
}
