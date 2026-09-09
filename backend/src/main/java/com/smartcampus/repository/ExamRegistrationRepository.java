package com.smartcampus.repository;

import com.smartcampus.entity.ExamRegistration;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface ExamRegistrationRepository extends MongoRepository<ExamRegistration, String> {
    List<ExamRegistration> findByStudentId(String studentId);
    List<ExamRegistration> findByStudentIdAndSemester(String studentId, int semester);
    boolean existsByStudentIdAndCourseIdAndExamType(String studentId, String courseId, com.smartcampus.entity.ExamType examType);
}
