package com.smartcampus.service;

import com.smartcampus.entity.LessonPlan;
import com.smartcampus.repository.LessonPlanRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class LessonPlanService {

    private final LessonPlanRepository lessonPlanRepository;

    public LessonPlanService(LessonPlanRepository lessonPlanRepository) {
        this.lessonPlanRepository = lessonPlanRepository;
    }

    public List<LessonPlan> getLessonPlansByCourse(String courseId) {
        return lessonPlanRepository.findByCourseIdOrderByWeekNumber(courseId);
    }

    public List<LessonPlan> getAll() {
        return lessonPlanRepository.findAll();
    }

    public LessonPlan save(LessonPlan lessonPlan) {
        return lessonPlanRepository.save(lessonPlan);
    }
}
