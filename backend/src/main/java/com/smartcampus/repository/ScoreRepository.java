package com.smartcampus.repository;

import com.smartcampus.entity.Score;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface ScoreRepository extends MongoRepository<Score, String> {
    List<Score> findByStudentId(String studentId);
    List<Score> findByStudentIdAndSemester(String studentId, int semester);
    List<Score> findByStudentIdAndCourseId(String studentId, String courseId);
    List<Score> findByCourseId(String courseId);
}
