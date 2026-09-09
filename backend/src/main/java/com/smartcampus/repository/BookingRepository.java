package com.smartcampus.repository;

import com.smartcampus.entity.Booking;
import com.smartcampus.entity.BookingStatus;
import com.smartcampus.entity.RoomType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

/**
 * Repository for Booking entity.
 */
@Repository
public interface BookingRepository extends MongoRepository<Booking, String> {

    Page<Booking> findByUserId(String userId, Pageable pageable);

    Page<Booking> findByStatus(BookingStatus status, Pageable pageable);

    List<Booking> findByRoomTypeAndDateAndStatus(RoomType roomType, LocalDate date, BookingStatus status);

    List<Booking> findByRoomNameAndDateAndStatusNot(String roomName, LocalDate date, BookingStatus status);

    long countByStatus(BookingStatus status);

    long countByUserId(String userId);
}
