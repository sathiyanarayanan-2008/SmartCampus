package com.smartcampus.service;

import com.smartcampus.dto.ComplaintDto;
import com.smartcampus.dto.ComplaintRequest;
import com.smartcampus.entity.Complaint;
import com.smartcampus.entity.ComplaintStatus;
import com.smartcampus.entity.User;
import com.smartcampus.exception.ResourceNotFoundException;
import com.smartcampus.mapper.ComplaintMapper;
import com.smartcampus.repository.ComplaintRepository;
import com.smartcampus.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class ComplaintService {

    private final ComplaintRepository complaintRepository;
    private final ComplaintMapper complaintMapper;
    private final UserRepository userRepository;

    public ComplaintService(ComplaintRepository complaintRepository, 
                            ComplaintMapper complaintMapper,
                            UserRepository userRepository) {
        this.complaintRepository = complaintRepository;
        this.complaintMapper = complaintMapper;
        this.userRepository = userRepository;
    }

    public Page<ComplaintDto> getAllComplaints(Pageable pageable) {
        return complaintRepository.findAll(pageable).map(complaintMapper::toDto);
    }

    public Page<ComplaintDto> getUserComplaints(String userEmail, Pageable pageable) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", userEmail));
        return complaintRepository.findByUserId(user.getId(), pageable).map(complaintMapper::toDto);
    }

    public ComplaintDto getComplaintById(String id) {
        Complaint complaint = complaintRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Complaint", "id", id));
        return complaintMapper.toDto(complaint);
    }

    @Transactional
    public ComplaintDto createComplaint(ComplaintRequest request, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", userEmail));

        Complaint complaint = complaintMapper.toEntity(request, user.getId(), user.getFullName());
        Complaint savedComplaint = complaintRepository.save(complaint);
        return complaintMapper.toDto(savedComplaint);
    }

    @Transactional
    public ComplaintDto updateComplaintStatus(String id, ComplaintStatus status, String resolution, String adminEmail) {
        Complaint complaint = complaintRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Complaint", "id", id));

        complaint.setStatus(status);
        
        if (status == ComplaintStatus.RESOLVED || status == ComplaintStatus.CLOSED) {
            complaint.setResolution(resolution);
            complaint.setResolvedBy(adminEmail);
            complaint.setResolvedAt(LocalDateTime.now());
        }

        Complaint updatedComplaint = complaintRepository.save(complaint);
        return complaintMapper.toDto(updatedComplaint);
    }

    @Transactional
    public void deleteComplaint(String id) {
        if (!complaintRepository.existsById(id)) {
            throw new ResourceNotFoundException("Complaint", "id", id);
        }
        complaintRepository.deleteById(id);
    }
}
