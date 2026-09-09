package com.smartcampus.config;

import com.smartcampus.entity.*;
import com.smartcampus.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

/**
 * Seeds default Admin account and sample academic data on startup.
 */
@Component
public class AdminDataSeeder implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(AdminDataSeeder.class);

    private static final String ADMIN_EMAIL = "admin@smartcampus.com";
    private static final String ADMIN_PASSWORD = "admin123";

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final CourseRepository courseRepository;
    private final TimetableRepository timetableRepository;
    private final AttendanceRepository attendanceRepository;
    private final LessonPlanRepository lessonPlanRepository;
    private final ScoreRepository scoreRepository;
    private final FeeDetailRepository feeDetailRepository;
    private final ExamRegistrationRepository examRegistrationRepository;
    private final ResultRepository resultRepository;
    private final FeedbackRepository feedbackRepository;
    private final ReceiptRepository receiptRepository;

    public AdminDataSeeder(UserRepository userRepository, PasswordEncoder passwordEncoder,
                           CourseRepository courseRepository, TimetableRepository timetableRepository,
                           AttendanceRepository attendanceRepository, LessonPlanRepository lessonPlanRepository,
                           ScoreRepository scoreRepository, FeeDetailRepository feeDetailRepository,
                           ExamRegistrationRepository examRegistrationRepository, ResultRepository resultRepository,
                           FeedbackRepository feedbackRepository, ReceiptRepository receiptRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.courseRepository = courseRepository;
        this.timetableRepository = timetableRepository;
        this.attendanceRepository = attendanceRepository;
        this.lessonPlanRepository = lessonPlanRepository;
        this.scoreRepository = scoreRepository;
        this.feeDetailRepository = feeDetailRepository;
        this.examRegistrationRepository = examRegistrationRepository;
        this.resultRepository = resultRepository;
        this.feedbackRepository = feedbackRepository;
        this.receiptRepository = receiptRepository;
    }

    @Override
    public void run(String... args) {
        // 1. Create or Update Admin
        Optional<User> existingAdmin = userRepository.findByEmail(ADMIN_EMAIL);
        if (existingAdmin.isEmpty()) {
            User admin = User.builder()
                    .firstName("Admin").lastName("User")
                    .email(ADMIN_EMAIL).password(passwordEncoder.encode(ADMIN_PASSWORD))
                    .role(Role.ADMIN).phone("0000000000").department("Administration").enabled(true)
                    .build();
            userRepository.save(admin);
            log.info("✅ Default Admin account created: {}", ADMIN_EMAIL);
        } else {
            User admin = existingAdmin.get();
            admin.setPassword(passwordEncoder.encode(ADMIN_PASSWORD));
            userRepository.save(admin);
            log.info("✅ Default Admin account password reset: {}", ADMIN_EMAIL);
        }

        // 2. Seed sample data only if courses are empty
        if (courseRepository.count() > 0) {
            log.info("ℹ️ Sample data already exists, skipping seed.");
            return;
        }

        log.info("🌱 Seeding sample academic data...");

        // Get all students for linking
        List<User> students = userRepository.findAll().stream()
                .filter(u -> u.getRole() == Role.STUDENT).toList();
        List<String> studentIds = students.stream().map(User::getId).toList();

        // ========== COURSES ==========
        List<Course> courses = List.of(
            Course.builder().courseCode("CS101").courseName("Data Structures & Algorithms").department("Computer Science").credits(4).semester(3).instructor("Dr. Ramesh Kumar").schedule("Mon, Wed, Fri 9:00-10:00").enrolledStudentIds(new ArrayList<>(studentIds)).build(),
            Course.builder().courseCode("CS102").courseName("Database Management Systems").department("Computer Science").credits(4).semester(3).instructor("Dr. Priya Sharma").schedule("Tue, Thu 10:00-11:30").enrolledStudentIds(new ArrayList<>(studentIds)).build(),
            Course.builder().courseCode("CS103").courseName("Object Oriented Programming").department("Computer Science").credits(3).semester(3).instructor("Prof. Anand Singh").schedule("Mon, Wed 11:00-12:00").enrolledStudentIds(new ArrayList<>(studentIds)).build(),
            Course.builder().courseCode("CS104").courseName("Computer Networks").department("Computer Science").credits(3).semester(3).instructor("Dr. Meena Iyer").schedule("Tue, Thu 14:00-15:30").enrolledStudentIds(new ArrayList<>(studentIds)).build(),
            Course.builder().courseCode("CS105").courseName("Operating Systems").department("Computer Science").credits(4).semester(3).instructor("Dr. Suresh Babu").schedule("Mon, Wed, Fri 14:00-15:00").enrolledStudentIds(new ArrayList<>(studentIds)).build(),
            Course.builder().courseCode("MA201").courseName("Discrete Mathematics").department("Computer Science").credits(3).semester(3).instructor("Dr. Lakshmi Narayanan").schedule("Tue, Thu 9:00-10:30").enrolledStudentIds(new ArrayList<>(studentIds)).build(),
            Course.builder().courseCode("EN101").courseName("Technical English").department("Computer Science").credits(2).semester(3).instructor("Prof. Sarah Thomas").schedule("Fri 11:00-13:00").enrolledStudentIds(new ArrayList<>(studentIds)).build(),
            Course.builder().courseCode("CS106").courseName("Web Technologies").department("Computer Science").credits(3).semester(3).instructor("Prof. Karthik Rajan").schedule("Wed, Fri 10:00-11:00").enrolledStudentIds(new ArrayList<>(studentIds)).build()
        );
        courses = courseRepository.saveAll(courses);
        log.info("  📚 {} courses seeded", courses.size());

        // ========== TIMETABLE ==========
        List<Timetable> timetables = new ArrayList<>();
        String[][] schedule = {
            {"Monday", "09:00", "10:00", "CS101", "Data Structures & Algorithms", "Room 301", "Dr. Ramesh Kumar"},
            {"Monday", "11:00", "12:00", "CS103", "Object Oriented Programming", "Room 202", "Prof. Anand Singh"},
            {"Monday", "14:00", "15:00", "CS105", "Operating Systems", "Room 401", "Dr. Suresh Babu"},
            {"Tuesday", "09:00", "10:30", "MA201", "Discrete Mathematics", "Room 105", "Dr. Lakshmi Narayanan"},
            {"Tuesday", "10:30", "12:00", "CS102", "Database Management Systems", "Lab 2", "Dr. Priya Sharma"},
            {"Tuesday", "14:00", "15:30", "CS104", "Computer Networks", "Room 303", "Dr. Meena Iyer"},
            {"Wednesday", "09:00", "10:00", "CS101", "Data Structures & Algorithms", "Room 301", "Dr. Ramesh Kumar"},
            {"Wednesday", "10:00", "11:00", "CS106", "Web Technologies", "Lab 3", "Prof. Karthik Rajan"},
            {"Wednesday", "11:00", "12:00", "CS103", "Object Oriented Programming", "Room 202", "Prof. Anand Singh"},
            {"Wednesday", "14:00", "15:00", "CS105", "Operating Systems", "Room 401", "Dr. Suresh Babu"},
            {"Thursday", "09:00", "10:30", "MA201", "Discrete Mathematics", "Room 105", "Dr. Lakshmi Narayanan"},
            {"Thursday", "10:30", "12:00", "CS102", "Database Management Systems", "Lab 2", "Dr. Priya Sharma"},
            {"Thursday", "14:00", "15:30", "CS104", "Computer Networks", "Room 303", "Dr. Meena Iyer"},
            {"Friday", "09:00", "10:00", "CS101", "Data Structures & Algorithms", "Room 301", "Dr. Ramesh Kumar"},
            {"Friday", "10:00", "11:00", "CS106", "Web Technologies", "Lab 3", "Prof. Karthik Rajan"},
            {"Friday", "11:00", "13:00", "EN101", "Technical English", "Room 101", "Prof. Sarah Thomas"},
            {"Friday", "14:00", "15:00", "CS105", "Operating Systems", "Room 401", "Dr. Suresh Babu"},
        };
        for (String[] s : schedule) {
            String cId = courses.stream().filter(c -> c.getCourseCode().equals(s[3])).findFirst().map(Course::getId).orElse("");
            timetables.add(Timetable.builder().courseId(cId).courseCode(s[3]).courseName(s[4]).dayOfWeek(s[0]).startTime(s[1]).endTime(s[2]).room(s[5]).instructor(s[6]).semester(3).department("Computer Science").build());
        }
        timetableRepository.saveAll(timetables);
        log.info("  📅 {} timetable entries seeded", timetables.size());

        // ========== ATTENDANCE (for each student) ==========
        Random random = new Random(42);
        AttendanceStatus[] statuses = {AttendanceStatus.PRESENT, AttendanceStatus.PRESENT, AttendanceStatus.PRESENT, AttendanceStatus.PRESENT, AttendanceStatus.ABSENT, AttendanceStatus.LATE};
        List<Attendance> allAttendance = new ArrayList<>();
        for (String sid : studentIds) {
            for (Course c : courses) {
                for (int day = 1; day <= 60; day++) {
                    LocalDate date = LocalDate.of(2026, 7, 1).plusDays(day);
                    if (date.getDayOfWeek().getValue() > 5) continue;
                    allAttendance.add(Attendance.builder().studentId(sid).courseId(c.getId()).courseCode(c.getCourseCode()).courseName(c.getCourseName()).date(date).status(statuses[random.nextInt(statuses.length)]).semester(3).build());
                }
            }
        }
        attendanceRepository.saveAll(allAttendance);
        log.info("  📊 {} attendance records seeded", allAttendance.size());

        // ========== LESSON PLANS ==========
        List<LessonPlan> lessonPlans = new ArrayList<>();
        for (Course c : courses) {
            String[][] topics = getLessonTopics(c.getCourseCode());
            for (int w = 0; w < topics.length; w++) {
                lessonPlans.add(LessonPlan.builder().courseId(c.getId()).courseCode(c.getCourseCode()).courseName(c.getCourseName())
                        .weekNumber(w + 1).topic(topics[w][0]).description(topics[w][1]).resources("Textbook Chapter " + (w + 1))
                        .semester(3).completed(w < 6).completedDate(w < 6 ? LocalDate.of(2026, 7, 7).plusWeeks(w) : null).build());
            }
        }
        lessonPlanRepository.saveAll(lessonPlans);
        log.info("  📝 {} lesson plans seeded", lessonPlans.size());

        // ========== SCORES ==========
        List<Score> allScores = new ArrayList<>();
        String[] grades = {"O", "A+", "A", "B+", "B", "C"};
        for (String sid : studentIds) {
            for (Course c : courses) {
                double internal = 15 + random.nextInt(10);
                double external = 40 + random.nextInt(35);
                double assignment = 7 + random.nextInt(4);
                allScores.add(Score.builder().studentId(sid).courseId(c.getId()).courseCode(c.getCourseCode()).courseName(c.getCourseName()).examType(ExamType.INTERNAL).marks(internal).maxMarks(25).semester(3).grade(grades[random.nextInt(grades.length)]).build());
                allScores.add(Score.builder().studentId(sid).courseId(c.getId()).courseCode(c.getCourseCode()).courseName(c.getCourseName()).examType(ExamType.EXTERNAL).marks(external).maxMarks(75).semester(3).grade(grades[random.nextInt(grades.length)]).build());
                allScores.add(Score.builder().studentId(sid).courseId(c.getId()).courseCode(c.getCourseCode()).courseName(c.getCourseName()).examType(ExamType.ASSIGNMENT).marks(assignment).maxMarks(10).semester(3).grade(grades[random.nextInt(grades.length)]).build());
            }
        }
        scoreRepository.saveAll(allScores);
        log.info("  🏆 {} score records seeded", allScores.size());

        // ========== FEE DETAILS ==========
        List<FeeDetail> fees = new ArrayList<>();
        for (String sid : studentIds) {
            fees.add(FeeDetail.builder().studentId(sid).semester(3).feeType(FeeType.TUITION).amount(75000).dueDate(LocalDate.of(2026, 6, 30)).paidDate(LocalDate.of(2026, 6, 25)).status(FeeStatus.PAID).transactionId("TXN" + UUID.randomUUID().toString().substring(0, 8).toUpperCase()).build());
            fees.add(FeeDetail.builder().studentId(sid).semester(3).feeType(FeeType.HOSTEL).amount(35000).dueDate(LocalDate.of(2026, 6, 30)).paidDate(LocalDate.of(2026, 6, 28)).status(FeeStatus.PAID).transactionId("TXN" + UUID.randomUUID().toString().substring(0, 8).toUpperCase()).build());
            fees.add(FeeDetail.builder().studentId(sid).semester(3).feeType(FeeType.TRANSPORT).amount(15000).dueDate(LocalDate.of(2026, 7, 15)).status(FeeStatus.UNPAID).build());
            fees.add(FeeDetail.builder().studentId(sid).semester(3).feeType(FeeType.LAB).amount(10000).dueDate(LocalDate.of(2026, 7, 15)).paidDate(LocalDate.of(2026, 7, 10)).status(FeeStatus.PAID).transactionId("TXN" + UUID.randomUUID().toString().substring(0, 8).toUpperCase()).build());
            fees.add(FeeDetail.builder().studentId(sid).semester(3).feeType(FeeType.EXAM).amount(5000).dueDate(LocalDate.of(2026, 9, 30)).status(FeeStatus.UNPAID).build());
        }
        feeDetailRepository.saveAll(fees);
        log.info("  💰 {} fee records seeded", fees.size());

        // ========== EXAM REGISTRATIONS ==========
        List<ExamRegistration> regs = new ArrayList<>();
        for (String sid : studentIds) {
            for (Course c : courses) {
                regs.add(ExamRegistration.builder().studentId(sid).courseId(c.getId()).courseCode(c.getCourseCode()).courseName(c.getCourseName()).examType(ExamType.FINAL).semester(3).registeredAt(LocalDateTime.of(2026, 8, 1, 10, 0)).status("REGISTERED").build());
            }
        }
        examRegistrationRepository.saveAll(regs);
        log.info("  📋 {} exam registrations seeded", regs.size());

        // ========== RESULTS ==========
        double[] gradePoints = {10.0, 9.0, 8.0, 7.0, 6.0, 5.0};
        List<Result> results = new ArrayList<>();
        for (String sid : studentIds) {
            List<Result.CourseResult> courseResults = new ArrayList<>();
            double totalGP = 0;
            int totalCredits = 0;
            for (Course c : courses) {
                int gi = random.nextInt(grades.length);
                courseResults.add(Result.CourseResult.builder().courseCode(c.getCourseCode()).courseName(c.getCourseName()).credits(c.getCredits()).grade(grades[gi]).gradePoint(gradePoints[gi]).build());
                totalGP += gradePoints[gi] * c.getCredits();
                totalCredits += c.getCredits();
            }
            double sgpa = totalCredits > 0 ? Math.round(totalGP / totalCredits * 100.0) / 100.0 : 0;
            results.add(Result.builder().studentId(sid).semester(3).sgpa(sgpa).cgpa(sgpa).totalCredits(totalCredits).courseResults(courseResults).build());
        }
        resultRepository.saveAll(results);
        log.info("  📈 {} result records seeded", results.size());

        // ========== RECEIPTS ==========
        List<Receipt> receipts = new ArrayList<>();
        for (String sid : studentIds) {
            receipts.add(Receipt.builder().studentId(sid).receiptNumber("RCP-2026-" + UUID.randomUUID().toString().substring(0, 6).toUpperCase()).amount(75000).paymentDate(LocalDate.of(2026, 6, 25)).paymentMethod(PaymentMethod.ONLINE).description("Tuition Fee - Semester 3").feeType("TUITION").semester(3).build());
            receipts.add(Receipt.builder().studentId(sid).receiptNumber("RCP-2026-" + UUID.randomUUID().toString().substring(0, 6).toUpperCase()).amount(35000).paymentDate(LocalDate.of(2026, 6, 28)).paymentMethod(PaymentMethod.UPI).description("Hostel Fee - Semester 3").feeType("HOSTEL").semester(3).build());
            receipts.add(Receipt.builder().studentId(sid).receiptNumber("RCP-2026-" + UUID.randomUUID().toString().substring(0, 6).toUpperCase()).amount(10000).paymentDate(LocalDate.of(2026, 7, 10)).paymentMethod(PaymentMethod.CARD).description("Lab Fee - Semester 3").feeType("LAB").semester(3).build());
        }
        receiptRepository.saveAll(receipts);
        log.info("  🧾 {} receipts seeded", receipts.size());

        log.info("✅ All sample academic data seeded successfully!");
    }

    private String[][] getLessonTopics(String courseCode) {
        return switch (courseCode) {
            case "CS101" -> new String[][]{
                {"Arrays & Linked Lists", "Introduction to linear data structures"},
                {"Stacks & Queues", "LIFO and FIFO structures with applications"},
                {"Trees", "Binary trees, BST, AVL trees"},
                {"Graphs", "BFS, DFS, shortest path algorithms"},
                {"Sorting Algorithms", "Quick sort, merge sort, heap sort"},
                {"Hashing", "Hash tables, collision resolution"},
                {"Dynamic Programming", "Memoization and tabulation"},
                {"Greedy Algorithms", "Activity selection, Huffman coding"},
            };
            case "CS102" -> new String[][]{
                {"Introduction to DBMS", "Database concepts and architectures"},
                {"ER Model", "Entity-Relationship diagrams"},
                {"Relational Model", "Relations, keys, constraints"},
                {"SQL Basics", "DDL, DML, SELECT queries"},
                {"Advanced SQL", "Joins, subqueries, views"},
                {"Normalization", "1NF, 2NF, 3NF, BCNF"},
                {"Transaction Management", "ACID properties, concurrency"},
                {"NoSQL Databases", "MongoDB, document stores"},
            };
            default -> new String[][]{
                {"Introduction", "Course overview and fundamentals"},
                {"Core Concepts", "Key principles and terminology"},
                {"Intermediate Topics", "Building on fundamentals"},
                {"Advanced Topics", "Complex problem solving"},
                {"Practical Applications", "Real-world use cases"},
                {"Review & Practice", "Problem sets and revision"},
                {"Case Studies", "Industry examples"},
                {"Summary", "Course wrap-up and exam prep"},
            };
        };
    }
}
