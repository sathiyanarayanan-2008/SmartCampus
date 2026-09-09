package com.smartcampus.dto;

import com.smartcampus.entity.EquipmentType;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EquipmentRequest {

    @NotBlank(message = "Equipment name is required")
    private String name;

    @NotNull(message = "Equipment type is required")
    private EquipmentType type;

    @Min(value = 1, message = "Total quantity must be at least 1")
    private int totalQuantity;

    private String description;

    private String condition;

    private String location;
}
