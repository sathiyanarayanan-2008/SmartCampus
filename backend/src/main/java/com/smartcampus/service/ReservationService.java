package com.smartcampus.service;

import com.smartcampus.dto.ReservationDto;
import com.smartcampus.dto.ReservationRequest;
import com.smartcampus.entity.Equipment;
import com.smartcampus.entity.Reservation;
import com.smartcampus.entity.ReservationStatus;
import com.smartcampus.entity.User;
import com.smartcampus.exception.BadRequestException;
import com.smartcampus.exception.ResourceNotFoundException;
import com.smartcampus.mapper.ReservationMapper;
import com.smartcampus.repository.EquipmentRepository;
import com.smartcampus.repository.ReservationRepository;
import com.smartcampus.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Service
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final EquipmentRepository equipmentRepository;
    private final UserRepository userRepository;
    private final ReservationMapper reservationMapper;

    public ReservationService(ReservationRepository reservationRepository,
                              EquipmentRepository equipmentRepository,
                              UserRepository userRepository,
                              ReservationMapper reservationMapper) {
        this.reservationRepository = reservationRepository;
        this.equipmentRepository = equipmentRepository;
        this.userRepository = userRepository;
        this.reservationMapper = reservationMapper;
    }

    public Page<ReservationDto> getAllReservations(Pageable pageable) {
        return reservationRepository.findAll(pageable).map(reservationMapper::toDto);
    }

    public Page<ReservationDto> getUserReservations(String userEmail, Pageable pageable) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", userEmail));
        return reservationRepository.findByUserId(user.getId(), pageable).map(reservationMapper::toDto);
    }

    public ReservationDto getReservationById(String id) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Reservation", "id", id));
        return reservationMapper.toDto(reservation);
    }

    @Transactional
    public ReservationDto createReservation(ReservationRequest request, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", userEmail));

        Equipment equipment = equipmentRepository.findById(request.getEquipmentId())
                .orElseThrow(() -> new ResourceNotFoundException("Equipment", "id", request.getEquipmentId()));

        if (equipment.getAvailableQuantity() < request.getQuantity()) {
            throw new BadRequestException("Not enough equipment available. Available: " 
                    + equipment.getAvailableQuantity() + ", Requested: " + request.getQuantity());
        }

        if (request.getReturnDate().isBefore(request.getReservedDate())) {
            throw new BadRequestException("Return date must be after reserved date");
        }

        // Decrease available quantity
        equipment.setAvailableQuantity(equipment.getAvailableQuantity() - request.getQuantity());
        equipmentRepository.save(equipment);

        Reservation reservation = reservationMapper.toEntity(request, user.getId(), user.getFullName(), equipment.getName());
        Reservation savedReservation = reservationRepository.save(reservation);
        return reservationMapper.toDto(savedReservation);
    }

    @Transactional
    public ReservationDto returnEquipment(String id) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Reservation", "id", id));

        if (reservation.getStatus() == ReservationStatus.RETURNED) {
            throw new BadRequestException("Equipment has already been returned");
        }

        // Increase available quantity
        Equipment equipment = equipmentRepository.findById(reservation.getEquipmentId())
                .orElseThrow(() -> new ResourceNotFoundException("Equipment", "id", reservation.getEquipmentId()));
        equipment.setAvailableQuantity(equipment.getAvailableQuantity() + reservation.getQuantity());
        equipmentRepository.save(equipment);

        reservation.setStatus(ReservationStatus.RETURNED);
        reservation.setActualReturnDate(LocalDate.now());

        Reservation updatedReservation = reservationRepository.save(reservation);
        return reservationMapper.toDto(updatedReservation);
    }

    @Transactional
    public void deleteReservation(String id) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Reservation", "id", id));

        // If not yet returned, restore equipment quantity
        if (reservation.getStatus() != ReservationStatus.RETURNED) {
            Equipment equipment = equipmentRepository.findById(reservation.getEquipmentId())
                    .orElseThrow(() -> new ResourceNotFoundException("Equipment", "id", reservation.getEquipmentId()));
            equipment.setAvailableQuantity(equipment.getAvailableQuantity() + reservation.getQuantity());
            equipmentRepository.save(equipment);
        }

        reservationRepository.deleteById(id);
    }
}
