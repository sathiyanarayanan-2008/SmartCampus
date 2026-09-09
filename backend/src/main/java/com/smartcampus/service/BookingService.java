package com.smartcampus.service;

import com.smartcampus.dto.BookingDto;
import com.smartcampus.dto.BookingRequest;
import com.smartcampus.entity.Booking;
import com.smartcampus.entity.BookingStatus;
import com.smartcampus.entity.User;
import com.smartcampus.exception.BadRequestException;
import com.smartcampus.exception.ResourceNotFoundException;
import com.smartcampus.mapper.BookingMapper;
import com.smartcampus.repository.BookingRepository;
import com.smartcampus.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final BookingMapper bookingMapper;
    private final UserRepository userRepository;

    public BookingService(BookingRepository bookingRepository, 
                          BookingMapper bookingMapper,
                          UserRepository userRepository) {
        this.bookingRepository = bookingRepository;
        this.bookingMapper = bookingMapper;
        this.userRepository = userRepository;
    }

    public Page<BookingDto> getAllBookings(Pageable pageable) {
        return bookingRepository.findAll(pageable).map(bookingMapper::toDto);
    }

    public Page<BookingDto> getUserBookings(String userEmail, Pageable pageable) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", userEmail));
        return bookingRepository.findByUserId(user.getId(), pageable).map(bookingMapper::toDto);
    }

    public BookingDto getBookingById(String id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking", "id", id));
        return bookingMapper.toDto(booking);
    }

    @Transactional
    public BookingDto createBooking(BookingRequest request, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", userEmail));

        // Check for conflicting bookings in the same room on the same date
        List<Booking> existingBookings = bookingRepository.findByRoomNameAndDateAndStatusNot(
                request.getRoomName(), request.getDate(), BookingStatus.REJECTED);

        for (Booking existing : existingBookings) {
            if (isTimeOverlap(request.getStartTime(), request.getEndTime(), 
                              existing.getStartTime(), existing.getEndTime())) {
                throw new BadRequestException("Room is already booked during this time slot.");
            }
        }

        Booking booking = bookingMapper.toEntity(request, user.getId(), user.getFullName());
        Booking savedBooking = bookingRepository.save(booking);
        return bookingMapper.toDto(savedBooking);
    }

    @Transactional
    public BookingDto updateBookingStatus(String id, BookingStatus status, String adminEmail, String reason) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking", "id", id));

        booking.setStatus(status);
        booking.setApprovedBy(adminEmail);
        
        if (status == BookingStatus.REJECTED) {
            booking.setRejectionReason(reason);
        }

        Booking updatedBooking = bookingRepository.save(booking);
        return bookingMapper.toDto(updatedBooking);
    }

    @Transactional
    public void deleteBooking(String id) {
        if (!bookingRepository.existsById(id)) {
            throw new ResourceNotFoundException("Booking", "id", id);
        }
        bookingRepository.deleteById(id);
    }

    private boolean isTimeOverlap(String start1, String end1, String start2, String end2) {
        // Simple string comparison works for "HH:mm" format (24-hour)
        // A overlaps B if A.start < B.end AND A.end > B.start
        return start1.compareTo(end2) < 0 && end1.compareTo(start2) > 0;
    }
}
