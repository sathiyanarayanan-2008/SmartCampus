package com.smartcampus.service;

import com.smartcampus.entity.Attendance;
import com.smartcampus.entity.AttendanceStatus;
import com.smartcampus.repository.AttendanceRepository;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class AttendanceService {

    private final AttendanceRepository attendanceRepository;

    public AttendanceService(AttendanceRepository attendanceRepository) {
        this.attendanceRepository = attendanceRepository;
    }

    public List<Attendance> getStudentAttendance(String studentId) {
        return attendanceRepository.findByStudentId(studentId);
    }

    public List<Attendance> getStudentAttendanceBySemester(String studentId, int semester) {
        return attendanceRepository.findByStudentIdAndSemester(studentId, semester);
    }

    /**
     * Returns subject-wise attendance summary for a student.
     * Each map entry contains: courseCode, courseName, totalClasses, present, absent, late, percentage
     */
    public List<Map<String, Object>> getSubjectWiseAttendance(String studentId) {
        List<Attendance> records = attendanceRepository.findByStudentId(studentId);
        Map<String, List<Attendance>> grouped = records.stream()
                .collect(Collectors.groupingBy(Attendance::getCourseId));

        List<Map<String, Object>> result = new ArrayList<>();
        for (Map.Entry<String, List<Attendance>> entry : grouped.entrySet()) {
            List<Attendance> list = entry.getValue();
            long total = list.size();
            long present = list.stream().filter(a -> a.getStatus() == AttendanceStatus.PRESENT).count();
            long absent = list.stream().filter(a -> a.getStatus() == AttendanceStatus.ABSENT).count();
            long late = list.stream().filter(a -> a.getStatus() == AttendanceStatus.LATE).count();
            double percentage = total > 0 ? ((present + late) * 100.0 / total) : 0;

            Map<String, Object> summary = new LinkedHashMap<>();
            summary.put("courseId", entry.getKey());
            summary.put("courseCode", list.get(0).getCourseCode());
            summary.put("courseName", list.get(0).getCourseName());
            summary.put("totalClasses", total);
            summary.put("present", present);
            summary.put("absent", absent);
            summary.put("late", late);
            summary.put("percentage", Math.round(percentage * 100.0) / 100.0);
            result.add(summary);
        }
        return result;
    }

    public List<Attendance> getAllAttendance() {
        return attendanceRepository.findAll();
    }

    public Attendance save(Attendance attendance) {
        return attendanceRepository.save(attendance);
    }
}
