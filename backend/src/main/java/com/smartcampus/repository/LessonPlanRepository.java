package com.smartcampus.repository;

import com.smartcampus.entity.LessonPlan;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface LessonPlanRepository extends MongoRepository<LessonPlan, String> {
    List<LessonPlan> findByCourseIdOrderByWeekNumber(String courseId);
    List<LessonPlan> findBySemester(int semester);
}
