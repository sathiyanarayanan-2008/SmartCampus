package com.smartcampus.dto;

import com.smartcampus.entity.EquipmentType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EquipmentDto {
    private String id;
    private String name;
    private EquipmentType type;
    private int totalQuantity;
    private int availableQuantity;
    private String description;
    private String condition;
    private String location;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
