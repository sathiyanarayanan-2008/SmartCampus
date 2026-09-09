package com.smartcampus.service;

import com.smartcampus.entity.Course;
import com.smartcampus.repository.CourseRepository;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
public class CourseService {

    private final CourseRepository courseRepository;

    public CourseService(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    public List<Course> getEnrolledCourses(String studentId) {
        return courseRepository.findByEnrolledStudentIdsContaining(studentId);
    }

    public List<Course> getCoursesByDepartment(String department) {
        return courseRepository.findByDepartment(department);
    }

    public Course enrollStudent(String courseId, String studentId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));
        if (course.getEnrolledStudentIds() == null) {
            course.setEnrolledStudentIds(new ArrayList<>());
        }
        if (!course.getEnrolledStudentIds().contains(studentId)) {
            course.getEnrolledStudentIds().add(studentId);
        }
        return courseRepository.save(course);
    }

    public Course saveCourse(Course course) {
        return courseRepository.save(course);
    }
}
