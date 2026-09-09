package com.smartcampus.repository;

import com.smartcampus.entity.User;
import com.smartcampus.entity.Role;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repository for User entity with custom query methods.
 */
@Repository
public interface UserRepository extends MongoRepository<User, String> {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    Page<User> findByRole(Role role, Pageable pageable);

    long countByRole(Role role);

    Page<User> findByRoleAndFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(
            Role role, String firstName, String lastName, Pageable pageable);
}
