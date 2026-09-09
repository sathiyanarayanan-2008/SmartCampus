package com.smartcampus.service;

import com.smartcampus.entity.Feedback;
import com.smartcampus.repository.FeedbackRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class FeedbackService {

    private final FeedbackRepository feedbackRepository;

    public FeedbackService(FeedbackRepository feedbackRepository) {
        this.feedbackRepository = feedbackRepository;
    }

    public List<Feedback> getStudentFeedbacks(String studentId) {
        return feedbackRepository.findByStudentId(studentId);
    }

    public List<Feedback> getCourseFeedbacks(String courseId) {
        return feedbackRepository.findByCourseId(courseId);
    }

    public Feedback submitFeedback(Feedback feedback) {
        if (feedbackRepository.existsByStudentIdAndCourseId(feedback.getStudentId(), feedback.getCourseId())) {
            throw new RuntimeException("Feedback already submitted for this course");
        }
        feedback.setSubmittedAt(LocalDateTime.now());
        return feedbackRepository.save(feedback);
    }

    public List<Feedback> getAll() {
        return feedbackRepository.findAll();
    }
}
