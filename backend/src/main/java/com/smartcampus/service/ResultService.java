package com.smartcampus.service;

import com.smartcampus.entity.Result;
import com.smartcampus.repository.ResultRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ResultService {

    private final ResultRepository resultRepository;

    public ResultService(ResultRepository resultRepository) {
        this.resultRepository = resultRepository;
    }

    public List<Result> getStudentResults(String studentId) {
        return resultRepository.findByStudentId(studentId);
    }

    public Result getResultBySemester(String studentId, int semester) {
        return resultRepository.findByStudentIdAndSemester(studentId, semester).orElse(null);
    }

    public List<Result> getAllResults() {
        return resultRepository.findAll();
    }

    public Result save(Result result) {
        return resultRepository.save(result);
    }
}
