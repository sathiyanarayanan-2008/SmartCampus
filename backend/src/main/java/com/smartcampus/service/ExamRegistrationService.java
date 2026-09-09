package com.smartcampus.service;

import com.smartcampus.entity.ExamRegistration;
import com.smartcampus.repository.ExamRegistrationRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class ExamRegistrationService {

    private final ExamRegistrationRepository examRegistrationRepository;

    public ExamRegistrationService(ExamRegistrationRepository examRegistrationRepository) {
        this.examRegistrationRepository = examRegistrationRepository;
    }

    public List<ExamRegistration> getStudentRegistrations(String studentId) {
        return examRegistrationRepository.findByStudentId(studentId);
    }

    public ExamRegistration register(ExamRegistration registration) {
        if (examRegistrationRepository.existsByStudentIdAndCourseIdAndExamType(
                registration.getStudentId(), registration.getCourseId(), registration.getExamType())) {
            throw new RuntimeException("Already registered for this exam");
        }
        registration.setRegisteredAt(LocalDateTime.now());
        registration.setStatus("REGISTERED");
        return examRegistrationRepository.save(registration);
    }

    public List<ExamRegistration> getAll() {
        return examRegistrationRepository.findAll();
    }
}
