package com.smartcampus.mapper;

import com.smartcampus.dto.EquipmentDto;
import com.smartcampus.dto.EquipmentRequest;
import com.smartcampus.entity.Equipment;
import org.springframework.stereotype.Component;

@Component
public class EquipmentMapper {

    public Equipment toEntity(EquipmentRequest request) {
        return Equipment.builder()
                .name(request.getName())
                .type(request.getType())
                .totalQuantity(request.getTotalQuantity())
                .availableQuantity(request.getTotalQuantity())
                .description(request.getDescription())
                .condition(request.getCondition())
                .location(request.getLocation())
                .build();
    }

    public EquipmentDto toDto(Equipment equipment) {
        return EquipmentDto.builder()
                .id(equipment.getId())
                .name(equipment.getName())
                .type(equipment.getType())
                .totalQuantity(equipment.getTotalQuantity())
                .availableQuantity(equipment.getAvailableQuantity())
                .description(equipment.getDescription())
                .condition(equipment.getCondition())
                .location(equipment.getLocation())
                .createdAt(equipment.getCreatedAt())
                .updatedAt(equipment.getUpdatedAt())
                .build();
    }
}
