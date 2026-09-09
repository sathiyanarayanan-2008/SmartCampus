package com.smartcampus.repository;

import com.smartcampus.entity.Equipment;
import com.smartcampus.entity.EquipmentType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository for Equipment entity.
 */
@Repository
public interface EquipmentRepository extends MongoRepository<Equipment, String> {

    Page<Equipment> findByType(EquipmentType type, Pageable pageable);

    Page<Equipment> findByNameContainingIgnoreCase(String name, Pageable pageable);

    List<Equipment> findByAvailableQuantityGreaterThan(int quantity);
}
