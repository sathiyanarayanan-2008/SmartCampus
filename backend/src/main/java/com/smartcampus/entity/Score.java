package com.smartcampus.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "scores")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Score {

    @Id
    private String id;
    private String studentId;
    private String courseId;
    private String courseCode;
    private String courseName;
    private ExamType examType;
    private double marks;
    private double maxMarks;
    private int semester;
    private String grade;
}
