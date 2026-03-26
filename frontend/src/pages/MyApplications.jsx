import { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Home, User, FileText, Briefcase, Clock, MapPin, CheckCircle2, XCircle, AlertCircle, ChevronRight, IndianRupee } from 'lucide-react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const driverLinks = [
    { name: 'Dashboard', path: '/driver/dashboard', icon: Home },
    { name: 'My Profile', path: '/driver/profile', icon: User },
    { name: 'My Applications', path: '/driver/applications', icon: FileText },
    { name: 'Find Jobs', path: '/jobs', icon: Briefcase },
  ];

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('user'))?.token;
        const { data } = await axios.get('/api/applications/my', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setApplications(data);
      } catch (err) {
        console.error("Error fetching applications", err);
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Accepted': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'Rejected': return 'bg-rose-50 text-rose-700 border-rose-100';
      case 'Shortlisted': return 'bg-blue-50 text-blue-700 border-blue-100';
      default: return 'bg-surface-100 text-surface-600 border-surface-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Accepted': return <CheckCircle2 size={16} />;
      case 'Rejected': return <XCircle size={16} />;
      case 'Shortlisted': return <AlertCircle size={16} />;
      default: return <Clock size={16} />;
    }
  };

  return (
    <DashboardLayout title="Mission Log" links={driverLinks}>
      <div className="space-y-8">
        <div>
            <h2 className="text-3xl font-extrabold text-surface-900 tracking-tight">Active Applications</h2>
            <p className="text-surface-500 font-bold text-sm">Real-time status tracking for your professional engagements.</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-primary-100 border-t-primary-600 rounded-full animate-spin"></div>
          </div>
        ) : applications.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card p-20 text-center bg-white"
          >
            <div className="w-20 h-20 bg-surface-50 rounded-3xl flex items-center justify-center text-surface-300 mx-auto mb-6">
                <FileText size={40} />
            </div>
            <h3 className="text-2xl font-extrabold text-surface-900 mb-2">No Active Missions</h3>
            <p className="text-surface-500 font-medium mb-10 max-w-sm mx-auto">You haven't applied for any professional roles yet. Ready to accelerate your career?</p>
            <Link to="/jobs" className="btn-primary inline-flex">Explore Opportunities</Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {applications.map((app, index) => (
              <motion.div
                key={app._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="card p-0 bg-white overflow-hidden border border-surface-100 hover:shadow-premium transition-all group"
              >
                <div className="p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                        <h3 className="text-xl font-extrabold text-surface-900 group-hover:text-primary-600 transition-colors">{app.job?.title}</h3>
                        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest border ${getStatusStyle(app.status)}`}>
                            {getStatusIcon(app.status)}
                            {app.status}
                        </div>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-6 text-sm font-bold text-surface-500">
                      <span className="flex items-center gap-2"><MapPin size={14} className="text-primary-600" /> {app.job?.location}</span>
                      <span className="flex items-center gap-2"><IndianRupee size={14} className="text-primary-600" /> {app.job?.salaryRange?.min} - {app.job?.salaryRange?.max}</span>
                      <span className="flex items-center gap-2"><Clock size={14} className="text-primary-600" /> Applied {new Date(app.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <Link 
                    to={`/jobs/${app.job?._id}`} 
                    className="flex items-center gap-2 font-extrabold text-xs uppercase tracking-widest text-primary-600 hover:text-primary-700 transition-colors"
                  >
                    Details <ChevronRight size={16} strokeWidth={3} />
                  </Link>
                </div>
                {app.status === 'Accepted' && (
                    <div className="bg-emerald-50 px-8 py-3 border-t border-emerald-100">
                        <p className="text-emerald-700 text-xs font-bold font-sans">Mission Confirmed! Reach out to the employer via the contact information provided in your email.</p>
                    </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default MyApplications;
