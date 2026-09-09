package com.smartcampus.service;

import com.smartcampus.dto.DashboardStats;
import com.smartcampus.entity.*;
import com.smartcampus.exception.ResourceNotFoundException;
import com.smartcampus.repository.*;
import org.springframework.stereotype.Service;

@Service
public class DashboardService {

    private final UserRepository userRepository;
    private final EventRepository eventRepository;
    private final BookingRepository bookingRepository;
    private final EquipmentRepository equipmentRepository;
    private final ReservationRepository reservationRepository;
    private final ComplaintRepository complaintRepository;
    private final AnnouncementRepository announcementRepository;
    private final NotificationRepository notificationRepository;

    public DashboardService(UserRepository userRepository,
                            EventRepository eventRepository,
                            BookingRepository bookingRepository,
                            EquipmentRepository equipmentRepository,
                            ReservationRepository reservationRepository,
                            ComplaintRepository complaintRepository,
                            AnnouncementRepository announcementRepository,
                            NotificationRepository notificationRepository) {
        this.userRepository = userRepository;
        this.eventRepository = eventRepository;
        this.bookingRepository = bookingRepository;
        this.equipmentRepository = equipmentRepository;
        this.reservationRepository = reservationRepository;
        this.complaintRepository = complaintRepository;
        this.announcementRepository = announcementRepository;
        this.notificationRepository = notificationRepository;
    }

    /**
     * Get admin dashboard statistics - aggregated counts across all modules.
     */
    public DashboardStats getAdminDashboardStats() {
        return DashboardStats.builder()
                .totalUsers(userRepository.count())
                .totalStudents(userRepository.countByRole(Role.STUDENT))
                .totalAdmins(userRepository.countByRole(Role.ADMIN))
                .totalEvents(eventRepository.count())
                .upcomingEvents(eventRepository.countByStatus(EventStatus.UPCOMING))
                .totalBookings(bookingRepository.count())
                .pendingBookings(bookingRepository.countByStatus(BookingStatus.PENDING))
                .approvedBookings(bookingRepository.countByStatus(BookingStatus.APPROVED))
                .totalEquipments(equipmentRepository.count())
                .totalReservations(reservationRepository.count())
                .activeReservations(reservationRepository.countByStatus(ReservationStatus.RESERVED) 
                        + reservationRepository.countByStatus(ReservationStatus.IN_USE))
                .totalComplaints(complaintRepository.count())
                .openComplaints(complaintRepository.countByStatus(ComplaintStatus.OPEN) 
                        + complaintRepository.countByStatus(ComplaintStatus.IN_PROGRESS))
                .resolvedComplaints(complaintRepository.countByStatus(ComplaintStatus.RESOLVED))
                .totalAnnouncements(announcementRepository.count())
                .build();
    }

    /**
     * Get student dashboard statistics - personalized for the logged-in student.
     */
    public DashboardStats getStudentDashboardStats(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", userEmail));
        String userId = user.getId();

        return DashboardStats.builder()
                .totalEvents(eventRepository.count())
                .upcomingEvents(eventRepository.countByStatus(EventStatus.UPCOMING))
                .totalBookings(bookingRepository.countByUserId(userId))
                .pendingBookings(bookingRepository.countByStatus(BookingStatus.PENDING))
                .totalReservations(reservationRepository.countByUserId(userId))
                .totalComplaints(complaintRepository.countByUserId(userId))
                .openComplaints(complaintRepository.countByStatus(ComplaintStatus.OPEN))
                .unreadNotifications(notificationRepository.countByUserIdAndReadFalse(userId))
                .totalAnnouncements(announcementRepository.count())
                .build();
    }
}
