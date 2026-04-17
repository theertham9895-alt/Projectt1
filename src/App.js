import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import styles
import './styles/global.css';
import './styles/components.css';
import './styles/pages.css';

// Import pages
import Landing from './pages/Landing';
import StudentDashboard from './pages/StudentDashboard';
import StudentActivities from './pages/StudentActivities';
import StudentAttendance from './pages/StudentAttendance';
import StudentCertificates from './pages/StudentCertificates';
import StudentProfile from './pages/StudentProfile';
import CoordinatorDashboard from './pages/CoordinatorDashboard';
import CoordinatorStudents from './pages/CoordinatorStudents';
import CoordinatorActivities from './pages/CoordinatorActivities';
import CoordinatorAttendance from './pages/CoordinatorAttendance';
import CoordinatorCertificates from './pages/CoordinatorCertificates';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing */}
        <Route path="/" element={<Landing />} />
        
        {/* Student Routes */}
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/student/activities" element={<StudentActivities />} />
        <Route path="/student/attendance" element={<StudentAttendance />} />
        <Route path="/student/certificates" element={<StudentCertificates />} />
        <Route path="/student/profile" element={<StudentProfile />} />
        
        {/* Coordinator Routes */}
        <Route path="/coordinator" element={<CoordinatorDashboard />} />
        <Route path="/coordinator/students" element={<CoordinatorStudents />} />
        <Route path="/coordinator/activities" element={<CoordinatorActivities />} />
        <Route path="/coordinator/attendance" element={<CoordinatorAttendance />} />
        <Route path="/coordinator/certificates" element={<CoordinatorCertificates />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;