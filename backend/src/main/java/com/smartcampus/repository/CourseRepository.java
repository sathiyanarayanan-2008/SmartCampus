package com.smartcampus.repository;

import com.smartcampus.entity.Course;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface CourseRepository extends MongoRepository<Course, String> {
    List<Course> findByDepartment(String department);
    List<Course> findBySemester(int semester);
    List<Course> findByEnrolledStudentIdsContaining(String studentId);
    List<Course> findByDepartmentAndSemester(String department, int semester);
}
