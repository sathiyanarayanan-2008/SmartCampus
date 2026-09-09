package com.smartcampus.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "feedbacks")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Feedback {

    @Id
    private String id;
    private String studentId;
    private String studentName;
    private String courseId;
    private String courseCode;
    private String courseName;
    private int rating;
    private String comments;
    private int semester;
    private LocalDateTime submittedAt;
}
