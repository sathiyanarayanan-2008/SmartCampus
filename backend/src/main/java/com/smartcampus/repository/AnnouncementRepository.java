package com.smartcampus.repository;

import com.smartcampus.entity.Announcement;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Repository for Announcement entity.
 */
@Repository
public interface AnnouncementRepository extends MongoRepository<Announcement, String> {

    Page<Announcement> findByActiveTrueOrderByCreatedAtDesc(Pageable pageable);

    List<Announcement> findByActiveTrueAndExpiresAtAfterOrderByCreatedAtDesc(LocalDateTime now);

    Page<Announcement> findByTitleContainingIgnoreCase(String title, Pageable pageable);
}
