import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';

import AdminDashboard from './pages/AdminDashboard';
import StudentDashboard from './pages/StudentDashboard';
import EventsPage from './pages/EventsPage';
import BookingsPage from './pages/BookingsPage';
import EquipmentPage from './pages/EquipmentPage';
import ComplaintsPage from './pages/ComplaintsPage';
import NotificationsPage from './pages/NotificationsPage';
import ProfilePage from './pages/ProfilePage';
import AnnouncementsPage from './pages/AnnouncementsPage';
import UsersPage from './pages/UsersPage';
import ReportsPage from './pages/ReportsPage';
import AuditLogsPage from './pages/AuditLogsPage';

// New ERP Pages
import CourseEnrollmentPage from './pages/CourseEnrollmentPage';
import TimetablePage from './pages/TimetablePage';
import AttendancePage from './pages/AttendancePage';
import LessonPlanPage from './pages/LessonPlanPage';
import ScorePage from './pages/ScorePage';
import FeeDetailsPage from './pages/FeeDetailsPage';
import ExamRegistrationPage from './pages/ExamRegistrationPage';
import ResultPage from './pages/ResultPage';
import FeedbackPage from './pages/FeedbackPage';
import ReceiptsPage from './pages/ReceiptsPage';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="app-wrapper">
            <Navbar />
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />

              {/* Student Routes */}
              <Route path="/student/dashboard" element={
                <ProtectedRoute roles={['STUDENT']}><StudentDashboard /></ProtectedRoute>
              } />

              {/* Shared Protected Routes */}
              <Route path="/events" element={
                <ProtectedRoute><EventsPage /></ProtectedRoute>
              } />
              <Route path="/bookings" element={
                <ProtectedRoute><BookingsPage /></ProtectedRoute>
              } />
              <Route path="/equipment" element={
                <ProtectedRoute><EquipmentPage /></ProtectedRoute>
              } />
              <Route path="/complaints" element={
                <ProtectedRoute><ComplaintsPage /></ProtectedRoute>
              } />
              <Route path="/notifications" element={
                <ProtectedRoute><NotificationsPage /></ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute><ProfilePage /></ProtectedRoute>
              } />

              {/* ERP Academic Routes */}
              <Route path="/courses" element={
                <ProtectedRoute><CourseEnrollmentPage /></ProtectedRoute>
              } />
              <Route path="/timetable" element={
                <ProtectedRoute><TimetablePage /></ProtectedRoute>
              } />
              <Route path="/attendance" element={
                <ProtectedRoute><AttendancePage /></ProtectedRoute>
              } />
              <Route path="/lesson-plans" element={
                <ProtectedRoute><LessonPlanPage /></ProtectedRoute>
              } />
              <Route path="/scores" element={
                <ProtectedRoute><ScorePage /></ProtectedRoute>
              } />
              <Route path="/fee-details" element={
                <ProtectedRoute><FeeDetailsPage /></ProtectedRoute>
              } />
              <Route path="/exam-registration" element={
                <ProtectedRoute><ExamRegistrationPage /></ProtectedRoute>
              } />
              <Route path="/results" element={
                <ProtectedRoute><ResultPage /></ProtectedRoute>
              } />
              <Route path="/feedback" element={
                <ProtectedRoute><FeedbackPage /></ProtectedRoute>
              } />
              <Route path="/receipts" element={
                <ProtectedRoute><ReceiptsPage /></ProtectedRoute>
              } />

              {/* Admin Routes */}
              <Route path="/admin/dashboard" element={
                <ProtectedRoute roles={['ADMIN']}><AdminDashboard /></ProtectedRoute>
              } />
              <Route path="/admin/announcements" element={
                <ProtectedRoute roles={['ADMIN']}><AnnouncementsPage /></ProtectedRoute>
              } />
              <Route path="/admin/users" element={
                <ProtectedRoute roles={['ADMIN']}><UsersPage /></ProtectedRoute>
              } />
              <Route path="/admin/reports" element={
                <ProtectedRoute roles={['ADMIN']}><ReportsPage /></ProtectedRoute>
              } />
              <Route path="/admin/audit-logs" element={
                <ProtectedRoute roles={['ADMIN']}><AuditLogsPage /></ProtectedRoute>
              } />

              {/* 404 */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
          <ToastContainer position="top-right" autoClose={3000} theme="colored" />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
