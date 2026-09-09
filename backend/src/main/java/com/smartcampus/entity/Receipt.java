package com.smartcampus.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Document(collection = "receipts")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Receipt {

    @Id
    private String id;
    private String studentId;
    private String receiptNumber;
    private double amount;
    private LocalDate paymentDate;
    private PaymentMethod paymentMethod;
    private String description;
    private String feeType;
    private int semester;
}
