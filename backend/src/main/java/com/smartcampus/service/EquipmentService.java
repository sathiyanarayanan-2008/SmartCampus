package com.smartcampus.service;

import com.smartcampus.dto.EquipmentDto;
import com.smartcampus.dto.EquipmentRequest;
import com.smartcampus.entity.Equipment;
import com.smartcampus.exception.ResourceNotFoundException;
import com.smartcampus.mapper.EquipmentMapper;
import com.smartcampus.repository.EquipmentRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class EquipmentService {

    private final EquipmentRepository equipmentRepository;
    private final EquipmentMapper equipmentMapper;

    public EquipmentService(EquipmentRepository equipmentRepository, EquipmentMapper equipmentMapper) {
        this.equipmentRepository = equipmentRepository;
        this.equipmentMapper = equipmentMapper;
    }

    public Page<EquipmentDto> getAllEquipments(Pageable pageable) {
        return equipmentRepository.findAll(pageable).map(equipmentMapper::toDto);
    }

    public Page<EquipmentDto> searchEquipments(String name, Pageable pageable) {
        return equipmentRepository.findByNameContainingIgnoreCase(name, pageable).map(equipmentMapper::toDto);
    }

    public EquipmentDto getEquipmentById(String id) {
        Equipment equipment = equipmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Equipment", "id", id));
        return equipmentMapper.toDto(equipment);
    }

    @Transactional
    public EquipmentDto createEquipment(EquipmentRequest request) {
        Equipment equipment = equipmentMapper.toEntity(request);
        Equipment savedEquipment = equipmentRepository.save(equipment);
        return equipmentMapper.toDto(savedEquipment);
    }

    @Transactional
    public EquipmentDto updateEquipment(String id, EquipmentRequest request) {
        Equipment equipment = equipmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Equipment", "id", id));

        equipment.setName(request.getName());
        equipment.setType(request.getType());
        
        int quantityDiff = request.getTotalQuantity() - equipment.getTotalQuantity();
        equipment.setTotalQuantity(request.getTotalQuantity());
        equipment.setAvailableQuantity(Math.max(0, equipment.getAvailableQuantity() + quantityDiff));
        
        if (request.getDescription() != null) equipment.setDescription(request.getDescription());
        if (request.getCondition() != null) equipment.setCondition(request.getCondition());
        if (request.getLocation() != null) equipment.setLocation(request.getLocation());

        Equipment updatedEquipment = equipmentRepository.save(equipment);
        return equipmentMapper.toDto(updatedEquipment);
    }

    @Transactional
    public void deleteEquipment(String id) {
        if (!equipmentRepository.existsById(id)) {
            throw new ResourceNotFoundException("Equipment", "id", id);
        }
        equipmentRepository.deleteById(id);
    }
}
