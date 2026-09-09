package com.smartcampus.controller;

import com.smartcampus.response.ApiResponse;
import com.smartcampus.service.LessonPlanService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/lesson-plans")
public class LessonPlanController {

    private final LessonPlanService lessonPlanService;

    public LessonPlanController(LessonPlanService lessonPlanService) {
        this.lessonPlanService = lessonPlanService;
    }

    @GetMapping("/{courseId}")
    public ResponseEntity<?> getLessonPlansByCourse(@PathVariable String courseId) {
        return ResponseEntity.ok(ApiResponse.success(lessonPlanService.getLessonPlansByCourse(courseId)));
    }

    @GetMapping
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(ApiResponse.success(lessonPlanService.getAll()));
    }
}
