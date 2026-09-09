package com.smartcampus.repository;

import com.smartcampus.entity.FeeDetail;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface FeeDetailRepository extends MongoRepository<FeeDetail, String> {
    List<FeeDetail> findByStudentId(String studentId);
    List<FeeDetail> findByStudentIdAndSemester(String studentId, int semester);
}
