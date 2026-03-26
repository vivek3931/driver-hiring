import { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Home, Users, PlusCircle, Briefcase, Trash2, Edit, ExternalLink, Clock, MapPin, IndianRupee, Navigation, Target, ChevronRight } from 'lucide-react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const ManageJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const recruiterLinks = [
    { name: 'Oversight Hub', path: '/recruiter/dashboard', icon: Home },
    { name: 'Deploy Mission', path: '/recruiter/jobs/new', icon: PlusCircle },
    { name: 'Manage Directives', path: '/recruiter/jobs', icon: Briefcase },
    { name: 'Tactical Personnel', path: '/recruiter/applicants', icon: Users },
  ];

  const fetchJobs = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('user'))?.token;
      const { data } = await axios.get('/api/jobs/recruiter/my', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setJobs(data);
    } catch (err) {
      console.error("Error fetching jobs", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you certain you want to decommission this job listing? This action cannot be undone.')) return;
    
    setDeletingId(id);
    try {
      const token = JSON.parse(localStorage.getItem('user'))?.token;
      await axios.delete(`/api/jobs/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setJobs(jobs.filter(job => job._id !== id));
    } catch (err) {
      alert('Failed to delete job');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <DashboardLayout title="Deployment Inventory" links={recruiterLinks}>
      <div className="space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-surface-50 pb-10">
            <div>
                <div className="flex items-center gap-2 mb-4 text-primary-600">
                    <Navigation size={14} />
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Institutional Log</span>
                </div>
                <h2 className="text-4xl font-bold text-surface-950 tracking-tighter leading-none mb-3">Active Directives</h2>
                <p className="text-surface-500 font-medium text-lg max-w-xl">Monitor and manage all specialized driver requirements across your operational sectors.</p>
            </div>
            <Link to="/recruiter/jobs/new" className="btn-primary flex items-center gap-3 px-8 py-5 shadow-uber">
                <PlusCircle size={20} /> Deploy New Directive
            </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="app-card h-40 animate-pulse bg-surface-50"></div>
            ))}
          </div>
        ) : jobs.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="app-card p-32 text-center bg-surface-50 border-2 border-dashed border-surface-200"
          >
            <div className="w-24 h-24 bg-white rounded-[32px] flex items-center justify-center text-surface-200 mx-auto mb-10 shadow-soft border border-surface-100">
                <Target size={48} />
            </div>
            <h3 className="text-3xl font-bold text-surface-950 mb-4 tracking-tighter">Inventory Empty</h3>
            <p className="text-surface-500 font-medium mb-12 max-w-md mx-auto text-lg leading-relaxed">No active mission parameters are currently tracking on your tactical board. Ready to begin recruitment?</p>
            <Link to="/recruiter/jobs/new" className="btn-primary py-5 px-12 inline-flex">Post Your First Job</Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 gap-8">
            <AnimatePresence>
              {Array.isArray(jobs) && jobs.map((job, index) => (
                <motion.div
                  key={job._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ delay: index * 0.05 }}
                  className="app-card p-0 bg-white group hover:shadow-uber transition-all duration-500 overflow-hidden"
                >
                  <div className="p-10 flex flex-col md:flex-row items-center justify-between gap-10">
                    <div className="flex-grow space-y-6">
                      <div className="flex items-center gap-5">
                        <div className="w-16 h-16 bg-surface-50 text-surface-950 rounded-[20px] flex items-center justify-center group-hover:bg-primary-600 group-hover:text-white transition-colors duration-500">
                            <Briefcase size={32} />
                        </div>
                        <div>
                            <div className="flex items-center gap-3">
                                <h3 className="text-2xl font-bold text-surface-950 tracking-tight">{job.title}</h3>
                                <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 text-[9px] font-bold uppercase tracking-widest rounded-full border border-emerald-100">
                                    <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-pulse"></div>
                                    {job.status}
                                </div>
                            </div>
                            <div className="flex items-center gap-6 mt-3 text-sm font-bold text-surface-400">
                                <span className="flex items-center gap-2"><MapPin size={16} className="text-primary-600" /> {job.location}</span>
                                <span className="flex items-center gap-2 font-black uppercase tracking-widest text-[10px]">{job.employmentType} Allocation</span>
                            </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 shrink-0">
                      <Link 
                        to={`/recruiter/jobs/${job._id}/applicants`} 
                        className="py-5 px-8 rounded-2xl bg-surface-950 text-white hover:bg-surface-800 transition-all flex items-center gap-3 font-bold text-sm tracking-tight shadow-uber group-hover:bg-primary-600 group-hover:border-primary-600"
                      >
                        Enlisted Units <ChevronRight size={18} />
                      </Link>
                      <button 
                        onClick={() => handleDelete(job._id)}
                        disabled={deletingId === job._id}
                        className="p-5 rounded-2xl bg-surface-50 text-surface-400 hover:text-rose-600 hover:bg-rose-50 transition-all border border-surface-100 disabled:opacity-50"
                      >
                        <Trash2 size={24} />
                      </button>
                    </div>
                  </div>
                  <div className="bg-surface-50 px-10 py-4 flex items-center justify-between border-t border-surface-100">
                     <span className="text-[10px] font-bold text-surface-300 uppercase tracking-widest">Protocol ID / {job._id.slice(-12).toUpperCase()}</span>
                     <Link to={`/jobs/${job._id}`} className="text-surface-950 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2 hover:text-primary-600 transition-colors">
                        Operational Preview <ExternalLink size={12} />
                     </Link>
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

export default ManageJobs;
