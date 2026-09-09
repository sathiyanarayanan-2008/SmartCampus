package com.smartcampus.service;

import com.smartcampus.dto.EventDto;
import com.smartcampus.dto.EventRequest;
import com.smartcampus.entity.Event;
import com.smartcampus.exception.BadRequestException;
import com.smartcampus.exception.ResourceNotFoundException;
import com.smartcampus.mapper.EventMapper;
import com.smartcampus.repository.EventRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
public class EventService {

    private final EventRepository eventRepository;
    private final EventMapper eventMapper;

    public EventService(EventRepository eventRepository, EventMapper eventMapper) {
        this.eventRepository = eventRepository;
        this.eventMapper = eventMapper;
    }

    public Page<EventDto> getAllEvents(Pageable pageable) {
        return eventRepository.findAll(pageable).map(eventMapper::toDto);
    }

    public EventDto getEventById(String id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Event", "id", id));
        return eventMapper.toDto(event);
    }

    @Transactional
    public EventDto createEvent(EventRequest request, String username) {
        Event event = eventMapper.toEntity(request, username);
        Event savedEvent = eventRepository.save(event);
        return eventMapper.toDto(savedEvent);
    }

    @Transactional
    public EventDto updateEvent(String id, EventRequest request) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Event", "id", id));

        event.setTitle(request.getTitle());
        event.setDescription(request.getDescription());
        event.setDate(request.getDate());
        event.setTime(request.getTime());
        event.setVenue(request.getVenue());
        event.setCapacity(request.getCapacity());
        event.setOrganizer(request.getOrganizer());
        
        if(request.getCategory() != null) event.setCategory(request.getCategory());
        if(request.getStatus() != null) event.setStatus(request.getStatus());
        if(request.getImage() != null) event.setImage(request.getImage());

        Event updatedEvent = eventRepository.save(event);
        return eventMapper.toDto(updatedEvent);
    }

    @Transactional
    public void deleteEvent(String id) {
        if (!eventRepository.existsById(id)) {
            throw new ResourceNotFoundException("Event", "id", id);
        }
        eventRepository.deleteById(id);
    }

    @Transactional
    public EventDto registerForEvent(String id, String userId) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Event", "id", id));

        if (event.getRegisteredStudents().contains(userId)) {
            throw new BadRequestException("User is already registered for this event");
        }

        if (event.getAvailableSpots() <= 0) {
            throw new BadRequestException("Event is full");
        }

        event.getRegisteredStudents().add(userId);
        Event updatedEvent = eventRepository.save(event);
        return eventMapper.toDto(updatedEvent);
    }
}
