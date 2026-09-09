package com.smartcampus.repository;

import com.smartcampus.entity.Attendance;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface AttendanceRepository extends MongoRepository<Attendance, String> {
    List<Attendance> findByStudentId(String studentId);
    List<Attendance> findByStudentIdAndCourseId(String studentId, String courseId);
    List<Attendance> findByStudentIdAndSemester(String studentId, int semester);
    List<Attendance> findByCourseId(String courseId);
}
