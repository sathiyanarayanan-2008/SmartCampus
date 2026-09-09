package com.smartcampus.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Document(collection = "lesson_plans")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LessonPlan {

    @Id
    private String id;
    private String courseId;
    private String courseCode;
    private String courseName;
    private int weekNumber;
    private String topic;
    private String description;
    private String resources;
    private LocalDate completedDate;
    private int semester;
    private boolean completed;
}
