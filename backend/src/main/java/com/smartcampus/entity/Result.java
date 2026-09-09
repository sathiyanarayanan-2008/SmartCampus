package com.smartcampus.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "results")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Result {

    @Id
    private String id;
    private String studentId;
    private int semester;
    private double sgpa;
    private double cgpa;
    private int totalCredits;
    private List<CourseResult> courseResults;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class CourseResult {
        private String courseCode;
        private String courseName;
        private int credits;
        private String grade;
        private double gradePoint;
    }
}
