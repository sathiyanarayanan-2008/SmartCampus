package com.smartcampus.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Document(collection = "fee_details")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FeeDetail {

    @Id
    private String id;
    private String studentId;
    private int semester;
    private FeeType feeType;
    private double amount;
    private LocalDate dueDate;
    private LocalDate paidDate;
    private FeeStatus status;
    private String transactionId;
}
