package com.smartcampus.mapper;

import com.smartcampus.dto.BookingDto;
import com.smartcampus.dto.BookingRequest;
import com.smartcampus.entity.Booking;
import com.smartcampus.entity.BookingStatus;
import org.springframework.stereotype.Component;

@Component
public class BookingMapper {

    public Booking toEntity(BookingRequest request, String userId, String userName) {
        return Booking.builder()
                .userId(userId)
                .userName(userName)
                .roomType(request.getRoomType())
                .roomName(request.getRoomName())
                .date(request.getDate())
                .startTime(request.getStartTime())
                .endTime(request.getEndTime())
                .purpose(request.getPurpose())
                .status(BookingStatus.PENDING) // Default status
                .build();
    }

    public BookingDto toDto(Booking booking) {
        return BookingDto.builder()
                .id(booking.getId())
                .userId(booking.getUserId())
                .userName(booking.getUserName())
                .roomType(booking.getRoomType())
                .roomName(booking.getRoomName())
                .date(booking.getDate())
                .startTime(booking.getStartTime())
                .endTime(booking.getEndTime())
                .purpose(booking.getPurpose())
                .status(booking.getStatus())
                .approvedBy(booking.getApprovedBy())
                .rejectionReason(booking.getRejectionReason())
                .createdAt(booking.getCreatedAt())
                .updatedAt(booking.getUpdatedAt())
                .build();
    }
}
