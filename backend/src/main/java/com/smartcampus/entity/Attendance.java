package com.smartcampus.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Document(collection = "attendance")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Attendance {

    @Id
    private String id;
    private String studentId;
    private String courseId;
    private String courseCode;
    private String courseName;
    private LocalDate date;
    private AttendanceStatus status;
    private int semester;
}
