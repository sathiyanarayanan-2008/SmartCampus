package com.smartcampus.repository;

import com.smartcampus.entity.Receipt;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface ReceiptRepository extends MongoRepository<Receipt, String> {
    List<Receipt> findByStudentId(String studentId);
    List<Receipt> findByStudentIdOrderByPaymentDateDesc(String studentId);
}
