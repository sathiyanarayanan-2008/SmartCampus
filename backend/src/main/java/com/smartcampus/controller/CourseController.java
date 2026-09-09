package com.smartcampus.controller;

import com.smartcampus.entity.Course;
import com.smartcampus.response.ApiResponse;
import com.smartcampus.security.CustomUserDetails;
import com.smartcampus.service.CourseService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/courses")
public class CourseController {

    private final CourseService courseService;

    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @GetMapping
    public ResponseEntity<?> getAllCourses() {
        return ResponseEntity.ok(ApiResponse.success(courseService.getAllCourses()));
    }

    @GetMapping("/enrolled")
    public ResponseEntity<?> getEnrolledCourses(@AuthenticationPrincipal CustomUserDetails userDetails) {
        return ResponseEntity.ok(ApiResponse.success(courseService.getEnrolledCourses(userDetails.getId())));
    }

    @PostMapping("/{courseId}/enroll")
    public ResponseEntity<?> enrollInCourse(@PathVariable String courseId, @AuthenticationPrincipal CustomUserDetails userDetails) {
        return ResponseEntity.ok(ApiResponse.success(courseService.enrollStudent(courseId, userDetails.getId())));
    }
}
