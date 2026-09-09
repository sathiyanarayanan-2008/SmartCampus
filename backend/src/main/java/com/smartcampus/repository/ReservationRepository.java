package com.smartcampus.repository;

import com.smartcampus.entity.Reservation;
import com.smartcampus.entity.ReservationStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository for Reservation entity.
 */
@Repository
public interface ReservationRepository extends MongoRepository<Reservation, String> {

    Page<Reservation> findByUserId(String userId, Pageable pageable);

    Page<Reservation> findByStatus(ReservationStatus status, Pageable pageable);

    List<Reservation> findByEquipmentIdAndStatus(String equipmentId, ReservationStatus status);

    long countByStatus(ReservationStatus status);

    long countByUserId(String userId);
}
