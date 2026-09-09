package com.smartcampus.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "exam_registrations")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ExamRegistration {

    @Id
    private String id;
    private String studentId;
    private String courseId;
    private String courseCode;
    private String courseName;
    private ExamType examType;
    private int semester;
    private LocalDateTime registeredAt;
    private String status;
}
