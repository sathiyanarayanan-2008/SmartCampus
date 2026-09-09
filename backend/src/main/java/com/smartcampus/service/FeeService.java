package com.smartcampus.service;

import com.smartcampus.entity.FeeDetail;
import com.smartcampus.repository.FeeDetailRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class FeeService {

    private final FeeDetailRepository feeDetailRepository;

    public FeeService(FeeDetailRepository feeDetailRepository) {
        this.feeDetailRepository = feeDetailRepository;
    }

    public List<FeeDetail> getStudentFees(String studentId) {
        return feeDetailRepository.findByStudentId(studentId);
    }

    public List<FeeDetail> getStudentFeesBySemester(String studentId, int semester) {
        return feeDetailRepository.findByStudentIdAndSemester(studentId, semester);
    }

    public List<FeeDetail> getAllFees() {
        return feeDetailRepository.findAll();
    }

    public FeeDetail save(FeeDetail feeDetail) {
        return feeDetailRepository.save(feeDetail);
    }
}
