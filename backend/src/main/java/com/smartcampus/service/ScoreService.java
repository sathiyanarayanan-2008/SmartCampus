package com.smartcampus.service;

import com.smartcampus.entity.Score;
import com.smartcampus.repository.ScoreRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ScoreService {

    private final ScoreRepository scoreRepository;

    public ScoreService(ScoreRepository scoreRepository) {
        this.scoreRepository = scoreRepository;
    }

    public List<Score> getStudentScores(String studentId) {
        return scoreRepository.findByStudentId(studentId);
    }

    public List<Score> getStudentScoresBySemester(String studentId, int semester) {
        return scoreRepository.findByStudentIdAndSemester(studentId, semester);
    }

    public List<Score> getAllScores() {
        return scoreRepository.findAll();
    }

    public Score save(Score score) {
        return scoreRepository.save(score);
    }
}
