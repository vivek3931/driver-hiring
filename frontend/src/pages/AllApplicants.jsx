import { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Home, Users, PlusCircle, Briefcase, Mail, Phone, Calendar, UserCheck, UserX, UserPlus, FileText, MapPin, IndianRupee, Clock, ChevronRight, Navigation, Zap, Target } from 'lucide-react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const AllApplicants = () => {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const recruiterLinks = [
    { name: 'Oversight Hub', path: '/recruiter/dashboard', icon: Home },
    { name: 'Deploy Mission', path: '/recruiter/jobs/new', icon: PlusCircle },
    { name: 'Manage Directives', path: '/recruiter/jobs', icon: Briefcase },
    { name: 'Tactical Personnel', path: '/recruiter/applicants', icon: Users },
  ];

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('user'))?.token;
        const { data } = await axios.get('/api/applications/recruiter/all', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setApplicants(data);
      } catch (err) {
        console.error("Error fetching applicants", err);
      } finally {
        setLoading(false);
      }
    };
    fetchApplicants();
  }, []);

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
    <DashboardLayout title="Tactical Pool" links={recruiterLinks}>
      <div className="space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-surface-50 pb-10">
            <div>
                <div className="flex items-center gap-2 mb-4 text-primary-600">
                    <Navigation size={14} />
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Institutional Personnel Radar</span>
                </div>
                <h2 className="text-4xl font-bold text-surface-950 tracking-tighter leading-none mb-3">Global Applicant Pool</h2>
                <p className="text-surface-500 font-medium text-lg max-w-xl">Comprehensive oversight of all operative enlistments across your active mission portfolio.</p>
            </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="app-card h-48 animate-pulse bg-surface-50"></div>
            ))}
          </div>
        ) : applicants.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="app-card p-32 text-center bg-surface-50 border-2 border-dashed border-surface-200"
          >
            <div className="w-24 h-24 bg-white rounded-[32px] flex items-center justify-center text-surface-200 mx-auto mb-10 shadow-soft border border-surface-100">
                <Users size={48} />
            </div>
            <h3 className="text-3xl font-bold text-surface-950 mb-4 tracking-tighter">Zero Enlistments</h3>
            <p className="text-surface-500 font-medium max-w-md mx-auto text-lg leading-relaxed">No active operatives haven enlistment for your mission directives yet. Scale your outreach to attract Tier 1 talent.</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 gap-8">
            <AnimatePresence>
              {applicants.map((app, index) => (
                <motion.div
                  key={app._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="app-card p-0 bg-white group hover:shadow-uber transition-all duration-500 overflow-hidden"
                >
                  <div className="p-10">
                    <div className="flex flex-col lg:flex-row gap-12">
                        <div className="shrink-0">
                            <div className="w-24 h-24 bg-surface-950 text-white rounded-[32px] flex items-center justify-center shadow-uber relative group-hover:bg-primary-600 transition-colors duration-500">
                                <span className="text-4xl font-bold tracking-tighter">{app.driver?.name?.charAt(0)}</span>
                                <div className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-full border-4 border-white ${
                                    app.status === 'Accepted' ? 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]' : 
                                    app.status === 'Rejected' ? 'bg-rose-500' : 'bg-surface-300'
                                }`}></div>
                            </div>
                        </div>

                        <div className="flex-grow space-y-8">
                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                                <div>
                                    <div className="flex items-center gap-3 mb-2 text-surface-400">
                                        <Zap size={14} className="text-primary-600" />
                                        <span className="text-[10px] font-bold uppercase tracking-widest">Protocol ID: {app._id.slice(-8).toUpperCase()}</span>
                                    </div>
                                    <h3 className="text-3xl font-bold text-surface-950 tracking-tighter mb-4">{app.driver?.name}</h3>
                                    <div className="flex flex-wrap items-center gap-3">
                                        <span className="px-4 py-1.5 bg-surface-50 text-surface-950 text-[10px] font-bold uppercase tracking-widest rounded-full border border-surface-100 flex items-center gap-2">
                                            <Target size={14} className="text-primary-600" />
                                            Target Mission: {app.job?.title}
                                        </span>
                                        <span className={`px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-full border ${
                                            app.status === 'Accepted' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                                            app.status === 'Rejected' ? 'bg-rose-50 text-rose-600 border-rose-100' : 
                                            'bg-surface-50 text-surface-500 border-surface-100'
                                        }`}>
                                            {app.status} Status
                                        </span>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <a href={`mailto:${app.driver?.email}`} className="p-4 rounded-2xl bg-surface-50 text-surface-950 hover:bg-primary-50 hover:text-primary-600 transition-colors border border-surface-100">
                                        <Mail size={24} />
                                    </a>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-8 text-sm font-bold text-surface-500">
                                <div className="flex items-center gap-2.5">
                                    <Calendar size={18} className="text-primary-500" />
                                    <span className="tracking-tight uppercase text-[10px] text-surface-400">Enlisted:</span>
                                    <span>{new Date(app.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                </div>
                                <div className="flex items-center gap-2.5">
                                    <MapPin size={18} className="text-primary-500" />
                                    <span className="tracking-tight uppercase text-[10px] text-surface-400">Sourced Zone:</span>
                                    <span>{app.job?.location}</span>
                                </div>
                            </div>

                            {app.coverLetter && (
                                <div className="p-8 bg-surface-50 rounded-[32px] border border-surface-100 relative group-hover:bg-white transition-colors">
                                    <p className="text-[10px] font-bold text-surface-300 uppercase tracking-widest mb-4 flex items-center gap-2">
                                        <FileText size={14} /> Operative Statement
                                    </p>
                                    <p className="text-lg font-medium text-surface-600 italic leading-relaxed">"{app.coverLetter}"</p>
                                </div>
                            )}
                        </div>

                        <div className="shrink-0 flex flex-col gap-3 justify-center min-w-[200px] lg:border-l lg:border-surface-50 lg:pl-10">
                            <button 
                                onClick={() => updateStatus(app._id, 'Accepted')}
                                disabled={updatingId === app._id || app.status === 'Accepted'}
                                className="w-full flex items-center justify-center gap-3 py-5 rounded-[20px] bg-surface-950 text-white font-bold text-xs uppercase tracking-widest hover:bg-primary-600 transition-all shadow-uber disabled:opacity-50"
                            >
                                <UserPlus size={18} /> {app.status === 'Accepted' ? 'Deployed' : 'Confirm Deployment'}
                            </button>
                            <div className="grid grid-cols-1 gap-2">
                                <button 
                                    onClick={() => updateStatus(app._id, 'Shortlisted')}
                                    disabled={updatingId === app._id || app.status === 'Shortlisted'}
                                    className="flex items-center justify-center gap-2 py-4 rounded-[20px] bg-white text-surface-950 font-bold text-[10px] uppercase tracking-widest hover:bg-surface-50 transition-all border border-surface-100"
                                >
                                    Flag for Review
                                </button>
                                <button 
                                    onClick={() => updateStatus(app._id, 'Rejected')}
                                    disabled={updatingId === app._id || app.status === 'Rejected'}
                                    className="flex items-center justify-center gap-2 py-4 rounded-[20px] bg-white text-rose-600 font-bold text-[10px] uppercase tracking-widest hover:bg-rose-50 transition-all border border-rose-100"
                                >
                                    Decommission
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

export default AllApplicants;
