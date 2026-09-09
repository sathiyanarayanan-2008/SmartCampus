package com.smartcampus.repository;

import com.smartcampus.entity.Feedback;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface FeedbackRepository extends MongoRepository<Feedback, String> {
    List<Feedback> findByStudentId(String studentId);
    List<Feedback> findByCourseId(String courseId);
    boolean existsByStudentIdAndCourseId(String studentId, String courseId);
}
