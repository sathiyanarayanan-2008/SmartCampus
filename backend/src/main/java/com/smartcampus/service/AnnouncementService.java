package com.smartcampus.service;

import com.smartcampus.dto.AnnouncementDto;
import com.smartcampus.dto.AnnouncementRequest;
import com.smartcampus.entity.Announcement;
import com.smartcampus.exception.ResourceNotFoundException;
import com.smartcampus.mapper.AnnouncementMapper;
import com.smartcampus.repository.AnnouncementRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AnnouncementService {

    private final AnnouncementRepository announcementRepository;
    private final AnnouncementMapper announcementMapper;

    public AnnouncementService(AnnouncementRepository announcementRepository,
                               AnnouncementMapper announcementMapper) {
        this.announcementRepository = announcementRepository;
        this.announcementMapper = announcementMapper;
    }

    public Page<AnnouncementDto> getAllAnnouncements(Pageable pageable) {
        return announcementRepository.findAll(pageable).map(announcementMapper::toDto);
    }

    public Page<AnnouncementDto> getActiveAnnouncements(Pageable pageable) {
        return announcementRepository.findByActiveTrueOrderByCreatedAtDesc(pageable)
                .map(announcementMapper::toDto);
    }

    public List<AnnouncementDto> getCurrentAnnouncements() {
        return announcementRepository.findByActiveTrueAndExpiresAtAfterOrderByCreatedAtDesc(LocalDateTime.now())
                .stream().map(announcementMapper::toDto).collect(Collectors.toList());
    }

    public AnnouncementDto getAnnouncementById(String id) {
        Announcement announcement = announcementRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Announcement", "id", id));
        return announcementMapper.toDto(announcement);
    }

    @Transactional
    public AnnouncementDto createAnnouncement(AnnouncementRequest request, String adminEmail) {
        Announcement announcement = announcementMapper.toEntity(request, adminEmail);
        Announcement saved = announcementRepository.save(announcement);
        return announcementMapper.toDto(saved);
    }

    @Transactional
    public AnnouncementDto updateAnnouncement(String id, AnnouncementRequest request) {
        Announcement announcement = announcementRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Announcement", "id", id));

        announcement.setTitle(request.getTitle());
        announcement.setContent(request.getContent());
        announcement.setPriority(request.getPriority());
        if (request.getTargetAudience() != null) announcement.setTargetAudience(request.getTargetAudience());
        if (request.getExpiresAt() != null) announcement.setExpiresAt(request.getExpiresAt());

        Announcement updated = announcementRepository.save(announcement);
        return announcementMapper.toDto(updated);
    }

    @Transactional
    public AnnouncementDto toggleAnnouncementActive(String id) {
        Announcement announcement = announcementRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Announcement", "id", id));
        announcement.setActive(!announcement.isActive());
        Announcement updated = announcementRepository.save(announcement);
        return announcementMapper.toDto(updated);
    }

    @Transactional
    public void deleteAnnouncement(String id) {
        if (!announcementRepository.existsById(id)) {
            throw new ResourceNotFoundException("Announcement", "id", id);
        }
        announcementRepository.deleteById(id);
    }
}
