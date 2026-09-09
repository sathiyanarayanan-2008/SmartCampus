package com.smartcampus.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Dashboard statistics DTO for admin and student dashboards.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DashboardStats {
    private long totalUsers;
    private long totalStudents;
    private long totalAdmins;
    private long totalEvents;
    private long upcomingEvents;
    private long totalBookings;
    private long pendingBookings;
    private long approvedBookings;
    private long totalEquipments;
    private long totalReservations;
    private long activeReservations;
    private long totalComplaints;
    private long openComplaints;
    private long resolvedComplaints;
    private long totalAnnouncements;
    private long unreadNotifications;
}
