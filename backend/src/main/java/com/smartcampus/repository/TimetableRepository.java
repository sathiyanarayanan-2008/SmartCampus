package com.smartcampus.repository;

import com.smartcampus.entity.Timetable;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface TimetableRepository extends MongoRepository<Timetable, String> {
    List<Timetable> findByDepartmentAndSemester(String department, int semester);
    List<Timetable> findByCourseIdIn(List<String> courseIds);
    List<Timetable> findByDayOfWeek(String dayOfWeek);
}
