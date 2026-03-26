import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

// Global / Public
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

import DriverDashboard from './pages/DriverDashboard';
import RecruiterDashboard from './pages/RecruiterDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Jobs from './pages/Jobs';
import JobDetails from './pages/JobDetails';
import DriverProfile from './pages/DriverProfile';
import PostJob from './pages/PostJob';
import ManageJobs from './pages/ManageJobs';
import MyApplications from './pages/MyApplications';
import JobApplicants from './pages/JobApplicants';
import AllApplicants from './pages/AllApplicants';
import About from './pages/About';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900">
        <Navbar />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/jobs" element={<Jobs />} />
            <Route path="/jobs/:id" element={<JobDetails />} />

            {/* Driver Routes */}
            <Route element={<ProtectedRoute allowedRoles={['driver']} />}>
              <Route path="/driver/dashboard" element={<DriverDashboard />} />
              <Route path="/driver/profile" element={<DriverProfile />} />
              <Route path="/driver/applications" element={<MyApplications />} />
            </Route>

            {/* Recruiter Routes */}
            <Route element={<ProtectedRoute allowedRoles={['recruiter']} />}>
              <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />
              <Route path="/recruiter/jobs/new" element={<PostJob />} />
              <Route path="/recruiter/jobs" element={<ManageJobs />} />
              <Route path="/recruiter/jobs/:jobId/applicants" element={<JobApplicants />} />
              <Route path="/recruiter/applicants" element={<AllApplicants />} />
            </Route>

            {/* Admin Routes */}
            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Route>
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;
