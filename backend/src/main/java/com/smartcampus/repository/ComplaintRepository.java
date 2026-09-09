package com.smartcampus.repository;

import com.smartcampus.entity.Complaint;
import com.smartcampus.entity.ComplaintStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository for Complaint entity.
 */
@Repository
public interface ComplaintRepository extends MongoRepository<Complaint, String> {

    Page<Complaint> findByUserId(String userId, Pageable pageable);

    Page<Complaint> findByStatus(ComplaintStatus status, Pageable pageable);

    Page<Complaint> findByTitleContainingIgnoreCase(String title, Pageable pageable);

    long countByStatus(ComplaintStatus status);

    long countByUserId(String userId);
}
