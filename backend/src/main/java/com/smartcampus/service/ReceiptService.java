package com.smartcampus.service;

import com.smartcampus.entity.Receipt;
import com.smartcampus.repository.ReceiptRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ReceiptService {

    private final ReceiptRepository receiptRepository;

    public ReceiptService(ReceiptRepository receiptRepository) {
        this.receiptRepository = receiptRepository;
    }

    public List<Receipt> getStudentReceipts(String studentId) {
        return receiptRepository.findByStudentIdOrderByPaymentDateDesc(studentId);
    }

    public List<Receipt> getAllReceipts() {
        return receiptRepository.findAll();
    }

    public Receipt save(Receipt receipt) {
        return receiptRepository.save(receipt);
    }
}
