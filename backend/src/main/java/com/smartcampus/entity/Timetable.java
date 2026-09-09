package com.smartcampus.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "timetables")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Timetable {

    @Id
    private String id;
    private String courseId;
    private String courseCode;
    private String courseName;
    private String dayOfWeek;
    private String startTime;
    private String endTime;
    private String room;
    private String instructor;
    private int semester;
    private String department;
}
