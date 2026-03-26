import { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Home, Users, PlusCircle, Briefcase, Mail, Phone, Calendar, UserCheck, UserX, UserPlus, FileText, ChevronLeft, MapPin, IndianRupee } from 'lucide-react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const JobApplicants = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [applicants, setApplicants] = useState([]);
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const recruiterLinks = [
    { name: 'Dashboard', path: '/recruiter/dashboard', icon: Home },
    { name: 'Post a Job', path: '/recruiter/jobs/new', icon: PlusCircle },
    { name: 'Manage Jobs', path: '/recruiter/jobs', icon: Briefcase },
    { name: 'Applicants', path: '/recruiter/applicants', icon: Users },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('user'))?.token;
        const jobRes = await axios.get(`/api/jobs/${jobId}`);
        setJob(jobRes.data);

        const appRes = await axios.get(`/api/applications/job/${jobId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setApplicants(appRes.data);
      } catch (err) {
        console.error("Error fetching data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [jobId]);

  const updateStatus = async (appId, status) => {
    setUpdatingId(appId);
    try {
      const token = JSON.parse(localStorage.getItem('user'))?.token;
      await axios.put(`/api/applications/${appId}/status`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setApplicants(applicants.map(app => app._id === appId ? { ...app, status } : app));
    } catch (err) {
      alert('Failed to update status');
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <DashboardLayout title="Applicant Review" links={recruiterLinks}>
      <div className="space-y-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
                <button onClick={() => navigate(-1)} className="p-3 rounded-2xl bg-white border border-surface-200 text-surface-400 hover:text-surface-900 transition-colors shadow-subtle">
                    <ChevronLeft size={20} strokeWidth={3} />
                </button>
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold text-primary-600 uppercase tracking-[0.2em] bg-primary-50 px-2.5 py-1 rounded-lg">Squad Review</span>
                        <h2 className="text-2xl font-bold text-surface-900 tracking-tight">{job?.title}</h2>
                    </div>
                    <p className="text-surface-500 font-semibold text-xs tracking-wide">Evaluating elite driver talent for this deployment.</p>
                </div>
            </div>
            
            <div className="flex gap-4">
                <div className="card px-5 py-3 bg-white flex flex-col items-center justify-center border-emerald-100 min-w-[100px] shadow-sm">
                    <span className="text-xl font-bold text-emerald-600 leading-none">{applicants.length}</span>
                    <span className="text-[9px] font-bold text-surface-400 uppercase tracking-wider mt-1">Total Enlisted</span>
                </div>
            </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-primary-100 border-t-primary-600 rounded-full animate-spin"></div>
          </div>
        ) : applicants.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card p-20 text-center bg-white"
          >
            <div className="w-20 h-20 bg-surface-50 rounded-3xl flex items-center justify-center text-surface-300 mx-auto mb-6">
                <Users size={40} />
            </div>
            <h3 className="text-2xl font-extrabold text-surface-900 mb-2">No Enlistments Yet</h3>
            <p className="text-surface-500 font-medium max-w-sm mx-auto">This mission is currently active, but no drivers have answered the call yet. Check back soon for elite candidates.</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            <AnimatePresence>
              {applicants.map((app, index) => (
                <motion.div
                  key={app._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="card p-0 bg-white overflow-hidden border border-surface-100 hover:shadow-premium transition-all relative"
                >
                  <div className="p-8">
                    <div className="flex flex-col lg:flex-row gap-10">
                        <div className="shrink-0 flex flex-col items-center">
                            <div className="w-20 h-20 bg-surface-50 rounded-2xl flex items-center justify-center text-primary-600 shadow-lg shadow-surface-100 border border-primary-50 relative">
                                <span className="text-3xl font-bold">{app.driver?.name?.charAt(0)}</span>
                                <div className={`absolute -bottom-1 -right-1 w-7 h-7 rounded-full border-[3px] border-white flex items-center justify-center ${
                                    app.status === 'Accepted' ? 'bg-emerald-500' : 
                                    app.status === 'Rejected' ? 'bg-rose-500' : 'bg-surface-300'
                                } shadow-md`}>
                                    {app.status === 'Accepted' ? <UserCheck size={12} className="text-white" /> : 
                                     app.status === 'Rejected' ? <UserX size={12} className="text-white" /> : 
                                     <Clock size={12} className="text-white" />}
                                </div>
                            </div>
                        </div>

                        <div className="flex-grow space-y-4">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div>
                                    <h3 className="text-xl font-bold text-surface-900 leading-tight">{app.driver?.name}</h3>
                                    <p className="text-surface-400 font-bold text-[10px] uppercase tracking-widest mt-0.5">Professional Fleet Driver</p>
                                </div>
                                <div className="flex gap-2">
                                    <a href={`mailto:${app.driver?.email}`} className="p-3 rounded-xl bg-surface-50 text-surface-500 hover:bg-primary-50 hover:text-primary-600 transition-colors shadow-subtle">
                                        <Mail size={18} />
                                    </a>
                                    <a href="#" className="p-3 rounded-xl bg-surface-50 text-surface-500 hover:bg-primary-50 hover:text-primary-600 transition-colors shadow-subtle">
                                        <Phone size={18} />
                                    </a>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-center gap-3 text-sm font-bold text-surface-600">
                                    <div className="w-8 h-8 rounded-lg bg-surface-50 text-primary-600 flex items-center justify-center shrink-0">
                                        <Calendar size={14} />
                                    </div>
                                    Joined {new Date(app.createdAt).toLocaleDateString()}
                                </div>
                                <div className="flex items-center gap-3 text-sm font-bold text-surface-700">
                                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                                        <CheckCircle2 size={14} />
                                    </div>
                                    Full Verification Passed
                                </div>
                            </div>

                            {app.coverLetter && (
                                <div className="p-5 bg-surface-50 rounded-xl border border-surface-100 relative">
                                    <FileText size={14} className="absolute top-5 right-5 text-surface-200" />
                                    <p className="text-[9px] font-bold text-surface-400 uppercase tracking-widest mb-1.5 italic opacity-70">Driver Statement</p>
                                    <p className="text-sm font-medium text-surface-600 italic leading-relaxed">"{app.coverLetter}"</p>
                                </div>
                            )}
                        </div>

                        <div className="shrink-0 flex flex-col gap-3 justify-center min-w-[200px] border-l border-surface-50 pl-10">
                            <h4 className="text-[10px] font-extrabold text-surface-400 uppercase tracking-[0.2em] mb-2">Review Action</h4>
                            <button 
                                onClick={() => updateStatus(app._id, 'Accepted')}
                                disabled={updatingId === app._id || app.status === 'Accepted'}
                                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 text-white font-bold text-[10px] uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-lg disabled:opacity-50"
                            >
                                <UserPlus size={14} strokeWidth={2.5} /> {app.status === 'Accepted' ? 'Confirmed' : 'Enlist Driver'}
                            </button>
                            <div className="grid grid-cols-2 gap-3">
                                 <button 
                                    onClick={() => updateStatus(app._id, 'Shortlisted')}
                                    disabled={updatingId === app._id || app.status === 'Shortlisted'}
                                    className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-blue-50 text-blue-600 font-bold text-[10px] uppercase tracking-widest hover:bg-blue-100 transition-all border border-blue-100"
                                >
                                    Shortlist
                                </button>
                                <button 
                                    onClick={() => updateStatus(app._id, 'Rejected')}
                                    disabled={updatingId === app._id || app.status === 'Rejected'}
                                    className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-rose-50 text-rose-600 font-bold text-[10px] uppercase tracking-widest hover:bg-rose-100 transition-all border border-rose-100"
                                >
                                    Dismiss
                                </button>
                            </div>
                        </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default JobApplicants;
