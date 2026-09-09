package com.smartcampus.service;

import com.smartcampus.entity.Timetable;
import com.smartcampus.entity.Course;
import com.smartcampus.repository.TimetableRepository;
import com.smartcampus.repository.CourseRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TimetableService {

    private final TimetableRepository timetableRepository;
    private final CourseRepository courseRepository;

    public TimetableService(TimetableRepository timetableRepository, CourseRepository courseRepository) {
        this.timetableRepository = timetableRepository;
        this.courseRepository = courseRepository;
    }

    public List<Timetable> getStudentTimetable(String studentId) {
        List<Course> enrolledCourses = courseRepository.findByEnrolledStudentIdsContaining(studentId);
        List<String> courseIds = enrolledCourses.stream().map(Course::getId).collect(Collectors.toList());
        return timetableRepository.findByCourseIdIn(courseIds);
    }

    public List<Timetable> getTimetableByDepartment(String department, int semester) {
        return timetableRepository.findByDepartmentAndSemester(department, semester);
    }

    public List<Timetable> getAll() {
        return timetableRepository.findAll();
    }

    public Timetable save(Timetable timetable) {
        return timetableRepository.save(timetable);
    }
}
