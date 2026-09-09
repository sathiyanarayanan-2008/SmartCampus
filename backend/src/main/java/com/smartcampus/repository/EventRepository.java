package com.smartcampus.repository;

import com.smartcampus.entity.Event;
import com.smartcampus.entity.EventStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

/**
 * Repository for Event entity.
 */
@Repository
public interface EventRepository extends MongoRepository<Event, String> {

    Page<Event> findByStatus(EventStatus status, Pageable pageable);

    Page<Event> findByTitleContainingIgnoreCase(String title, Pageable pageable);

    List<Event> findByDateAfterAndStatus(LocalDate date, EventStatus status);

    List<Event> findByRegisteredStudentsContaining(String userId);

    long countByStatus(EventStatus status);
}
