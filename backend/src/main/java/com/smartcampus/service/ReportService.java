package com.smartcampus.service;

import com.smartcampus.entity.*;
import com.smartcampus.repository.*;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.PrintWriter;
import java.util.List;

/**
 * Service for generating reports in CSV format.
 * PDF and Excel export can be enhanced with iText and Apache POI in Phase 2.
 */
@Service
public class ReportService {

    private final UserRepository userRepository;
    private final EventRepository eventRepository;
    private final BookingRepository bookingRepository;
    private final ComplaintRepository complaintRepository;
    private final ReservationRepository reservationRepository;

    public ReportService(UserRepository userRepository,
                         EventRepository eventRepository,
                         BookingRepository bookingRepository,
                         ComplaintRepository complaintRepository,
                         ReservationRepository reservationRepository) {
        this.userRepository = userRepository;
        this.eventRepository = eventRepository;
        this.bookingRepository = bookingRepository;
        this.complaintRepository = complaintRepository;
        this.reservationRepository = reservationRepository;
    }

    /**
     * Generate a CSV report for users.
     */
    public byte[] generateUserReport() {
        List<User> users = userRepository.findAll();
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        PrintWriter writer = new PrintWriter(baos);

        writer.println("ID,First Name,Last Name,Email,Role,Department,Phone,Enabled,Created At");
        for (User user : users) {
            writer.printf("%s,%s,%s,%s,%s,%s,%s,%s,%s%n",
                    user.getId(),
                    user.getFirstName(),
                    user.getLastName(),
                    user.getEmail(),
                    user.getRole(),
                    user.getDepartment() != null ? user.getDepartment() : "",
                    user.getPhone() != null ? user.getPhone() : "",
                    user.isEnabled(),
                    user.getCreatedAt());
        }
        writer.flush();
        return baos.toByteArray();
    }

    /**
     * Generate a CSV report for events.
     */
    public byte[] generateEventReport() {
        List<Event> events = eventRepository.findAll();
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        PrintWriter writer = new PrintWriter(baos);

        writer.println("ID,Title,Date,Time,Venue,Capacity,Registered Count,Status,Organizer,Created At");
        for (Event event : events) {
            writer.printf("%s,%s,%s,%s,%s,%d,%d,%s,%s,%s%n",
                    event.getId(),
                    escapeCsv(event.getTitle()),
                    event.getDate(),
                    event.getTime(),
                    escapeCsv(event.getVenue()),
                    event.getCapacity(),
                    event.getRegisteredStudents() != null ? event.getRegisteredStudents().size() : 0,
                    event.getStatus(),
                    escapeCsv(event.getOrganizer()),
                    event.getCreatedAt());
        }
        writer.flush();
        return baos.toByteArray();
    }

    /**
     * Generate a CSV report for bookings.
     */
    public byte[] generateBookingReport() {
        List<Booking> bookings = bookingRepository.findAll();
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        PrintWriter writer = new PrintWriter(baos);

        writer.println("ID,User Name,Room Type,Room Name,Date,Start Time,End Time,Purpose,Status,Created At");
        for (Booking booking : bookings) {
            writer.printf("%s,%s,%s,%s,%s,%s,%s,%s,%s,%s%n",
                    booking.getId(),
                    escapeCsv(booking.getUserName()),
                    booking.getRoomType(),
                    escapeCsv(booking.getRoomName()),
                    booking.getDate(),
                    booking.getStartTime(),
                    booking.getEndTime(),
                    escapeCsv(booking.getPurpose()),
                    booking.getStatus(),
                    booking.getCreatedAt());
        }
        writer.flush();
        return baos.toByteArray();
    }

    /**
     * Generate a CSV report for complaints.
     */
    public byte[] generateComplaintReport() {
        List<Complaint> complaints = complaintRepository.findAll();
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        PrintWriter writer = new PrintWriter(baos);

        writer.println("ID,User Name,Title,Category,Priority,Status,Resolution,Resolved By,Created At,Resolved At");
        for (Complaint complaint : complaints) {
            writer.printf("%s,%s,%s,%s,%s,%s,%s,%s,%s,%s%n",
                    complaint.getId(),
                    escapeCsv(complaint.getUserName()),
                    escapeCsv(complaint.getTitle()),
                    complaint.getCategory(),
                    complaint.getPriority(),
                    complaint.getStatus(),
                    complaint.getResolution() != null ? escapeCsv(complaint.getResolution()) : "",
                    complaint.getResolvedBy() != null ? complaint.getResolvedBy() : "",
                    complaint.getCreatedAt(),
                    complaint.getResolvedAt() != null ? complaint.getResolvedAt() : "");
        }
        writer.flush();
        return baos.toByteArray();
    }

    /**
     * Generate a CSV report for reservations.
     */
    public byte[] generateReservationReport() {
        List<Reservation> reservations = reservationRepository.findAll();
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        PrintWriter writer = new PrintWriter(baos);

        writer.println("ID,User Name,Equipment Name,Quantity,Reserved Date,Return Date,Actual Return Date,Status,Purpose,Created At");
        for (Reservation reservation : reservations) {
            writer.printf("%s,%s,%s,%d,%s,%s,%s,%s,%s,%s%n",
                    reservation.getId(),
                    escapeCsv(reservation.getUserName()),
                    escapeCsv(reservation.getEquipmentName()),
                    reservation.getQuantity(),
                    reservation.getReservedDate(),
                    reservation.getReturnDate(),
                    reservation.getActualReturnDate() != null ? reservation.getActualReturnDate() : "",
                    reservation.getStatus(),
                    reservation.getPurpose() != null ? escapeCsv(reservation.getPurpose()) : "",
                    reservation.getCreatedAt());
        }
        writer.flush();
        return baos.toByteArray();
    }

    private String escapeCsv(String value) {
        if (value == null) return "";
        if (value.contains(",") || value.contains("\"") || value.contains("\n")) {
            return "\"" + value.replace("\"", "\"\"") + "\"";
        }
        return value;
    }
}
