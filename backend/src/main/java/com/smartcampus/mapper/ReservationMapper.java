package com.smartcampus.mapper;

import com.smartcampus.dto.ReservationDto;
import com.smartcampus.dto.ReservationRequest;
import com.smartcampus.entity.Reservation;
import com.smartcampus.entity.ReservationStatus;
import org.springframework.stereotype.Component;

@Component
public class ReservationMapper {

    public Reservation toEntity(ReservationRequest request, String userId, String userName, String equipmentName) {
        return Reservation.builder()
                .equipmentId(request.getEquipmentId())
                .equipmentName(equipmentName)
                .userId(userId)
                .userName(userName)
                .reservedDate(request.getReservedDate())
                .returnDate(request.getReturnDate())
                .quantity(request.getQuantity())
                .purpose(request.getPurpose())
                .status(ReservationStatus.RESERVED)
                .build();
    }

    public ReservationDto toDto(Reservation reservation) {
        return ReservationDto.builder()
                .id(reservation.getId())
                .equipmentId(reservation.getEquipmentId())
                .equipmentName(reservation.getEquipmentName())
                .userId(reservation.getUserId())
                .userName(reservation.getUserName())
                .reservedDate(reservation.getReservedDate())
                .returnDate(reservation.getReturnDate())
                .actualReturnDate(reservation.getActualReturnDate())
                .quantity(reservation.getQuantity())
                .purpose(reservation.getPurpose())
                .status(reservation.getStatus())
                .createdAt(reservation.getCreatedAt())
                .updatedAt(reservation.getUpdatedAt())
                .build();
    }
}
