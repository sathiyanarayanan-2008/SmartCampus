package com.smartcampus.repository;

import com.smartcampus.entity.Result;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;
import java.util.Optional;

public interface ResultRepository extends MongoRepository<Result, String> {
    List<Result> findByStudentId(String studentId);
    Optional<Result> findByStudentIdAndSemester(String studentId, int semester);
}
