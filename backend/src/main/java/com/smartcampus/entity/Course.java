package com.smartcampus.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "courses")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Course {

    @Id
    private String id;
    private String courseCode;
    private String courseName;
    private String department;
    private int credits;
    private int semester;
    private String instructor;
    private String schedule;
    private String description;
    private List<String> enrolledStudentIds;
}
