import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore';
import { motion } from 'framer-motion';
import { MapPin, Briefcase, Clock, Calendar, CheckCircle2, ShieldCheck, ArrowLeft, Building2, Car, ChevronRight, Zap, Target, Navigation, ArrowRight } from 'lucide-react';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const [checkingProfile, setCheckingProfile] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const { data } = await axios.get(`/api/jobs/${id}`);
        setJob(data);
      } catch (err) {
        setError('Job not found');
      } finally {
        setLoading(false);
      }
    };

    const checkProfile = async () => {
      if (user && user.role === 'driver') {
        try {
          const token = JSON.parse(localStorage.getItem('user'))?.token;
          const { data } = await axios.get('/api/driver/profile', {
            headers: { Authorization: `Bearer ${token}` }
          });
          
          const complete = data.phone && 
                          data.location && 
                          data.drivingLicense?.number && 
                          data.vehicleTypes?.length > 0;
          
          setIsProfileComplete(complete);
        } catch (err) {
          console.error("Error checking profile", err);
          setIsProfileComplete(false);
        } finally {
          setCheckingProfile(false);
        }
      } else {
        setCheckingProfile(false);
      }
    };

    fetchJob();
    checkProfile();
  }, [id, user]);

  const handleApply = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    if (user.role !== 'driver') {
      setError('Only drivers can apply for jobs.');
      return;
    }

    setApplying(true);
    setError('');
    setMessage('');
    
    try {
      const token = JSON.parse(localStorage.getItem('user'))?.token;
      await axios.post(`/api/applications/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('Successfully applied for this job!');
    } catch (err) {
      setError(err.response?.data?.message || 'Error applying for job');
    } finally {
      setApplying(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-6">
            <div className="w-16 h-16 border-4 border-surface-100 border-t-primary-600 rounded-full animate-spin"></div>
            <p className="text-surface-400 font-bold uppercase tracking-[0.3em] text-[10px]">Syncing Mission Briefing...</p>
        </div>
    </div>
  );
  
  if (!job) return (
    <div className="min-h-screen bg-white flex items-center justify-center p-8">
        <div className="max-w-md w-full text-center p-12 rounded-[40px] border-2 border-dashed border-surface-100">
            <div className="w-20 h-20 bg-surface-50 text-surface-300 rounded-[24px] flex items-center justify-center mx-auto mb-10">
                <Target size={40} />
            </div>
            <h2 className="text-3xl font-bold text-surface-950 mb-4 tracking-tighter">Mission Terminated</h2>
            <p className="text-surface-500 font-medium mb-12 leading-relaxed">The requested operational directive has been closed or the intel is no longer valid.</p>
            <Link to="/jobs" className="btn-secondary py-5 px-10">
                Back to Command Hub
            </Link>
        </div>
    </div>
  );

  return (
    <div className="bg-white min-h-screen pb-24 pt-24 lg:pt-32">
      {/* Top Protocol Bar */}
      <div className="bg-white border-b border-surface-50 sticky top-0 z-30">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-6 flex justify-between items-center">
            <Link to="/jobs" className="inline-flex items-center gap-3 text-surface-400 hover:text-surface-950 font-bold transition-colors group">
                <div className="p-2 bg-surface-50 rounded-xl group-hover:bg-primary-50 transition-colors">
                    <ArrowLeft size={20} />
                </div>
                <span className="text-sm tracking-tight font-black uppercase tracking-widest text-[10px]">Back to Radar</span>
            </Link>
            <div className="flex items-center gap-4">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Active Link</span>
            </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 mt-16 lg:mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Left Strategic Objective Briefing */}
            <div className="lg:col-span-8 space-y-16">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="flex flex-col md:flex-row gap-10 mb-16 pb-16 border-b border-surface-50">
                        <div className="w-24 h-24 bg-surface-950 text-white rounded-[32px] flex items-center justify-center shadow-uber shrink-0">
                            <Car size={48} />
                        </div>
                        <div>
                            <div className="flex items-center gap-3 mb-4 text-primary-600">
                                <Navigation size={14} />
                                <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Operational Directive</span>
                            </div>
                            <h1 className="text-4xl lg:text-6xl font-bold text-surface-950 tracking-tighter leading-tight mb-6">
                                {job.title}
                            </h1>
                            <div className="flex flex-wrap items-center gap-6">
                                <p className="text-xl font-bold text-surface-400 flex items-center gap-3">
                                    <Building2 size={24} strokeWidth={1.5} />
                                    {job.recruiter?.companyName || 'Verified Strategic Partner'}
                                </p>
                                <span className="px-5 py-2.5 bg-surface-950 text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
                                    {job.employmentType} Allocation
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24">
                        {[
                            { label: "Zone", val: job.location, icon: <MapPin size={22} className="text-primary-600" /> },
                            { label: "Experience", val: `${job.experienceRequired}+ Years`, icon: <Briefcase size={22} className="text-primary-600" /> },
                            { label: "Execution", val: job.shiftTiming, icon: <Clock size={22} className="text-primary-600" /> },
                            { label: "Asset Type", val: job.vehicleTypeRequired, icon: <Car size={22} className="text-primary-600" /> }
                        ].map((stat, i) => (
                            <div key={i} className="p-8 bg-surface-50 rounded-[32px] border border-surface-100 group hover:border-primary-200 transition-colors">
                                <div className="mb-6">{stat.icon}</div>
                                <p className="text-surface-400 text-[10px] font-bold uppercase tracking-widest mb-2">{stat.label}</p>
                                <p className="text-surface-950 font-bold text-xl tracking-tight">{stat.val}</p>
                            </div>
                        ))}
                    </div>

                    <div className="max-w-3xl">
                        <h2 className="text-3xl font-bold text-surface-950 mb-10 tracking-tight flex items-center gap-4">
                            <div className="w-1.5 h-10 bg-surface-950 rounded-full"></div>
                            Mission Specifications
                        </h2>
                        <div className="text-xl text-surface-500 font-medium leading-relaxed mb-20 whitespace-pre-line">
                            {job.description}
                        </div>

                        <h2 className="text-3xl font-bold text-surface-950 mb-10 tracking-tight flex items-center gap-4">
                            <div className="w-1.5 h-10 bg-emerald-500 rounded-full"></div>
                            Engagement Benefits
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {(job.benefits || ["Full Strategic Insurance", "Incentive Multipliers", "New Fleet Inventory", "Housing Allocation"]).map((benefit, i) => (
                                <div key={i} className="flex items-center gap-5 p-6 bg-surface-50 rounded-[28px] text-surface-950 font-bold border border-surface-100">
                                    <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                                        <CheckCircle2 size={20} />
                                    </div>
                                    <span className="text-lg tracking-tight">{benefit}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Right Strategic Action Column */}
            <div className="lg:col-span-4 lg:sticky lg:top-40">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="p-10 bg-surface-950 rounded-[48px] text-white shadow-uber-heavy relative overflow-hidden"
                >
                    <div className="absolute inset-0 map-gradient opacity-10 pointer-events-none"></div>
                    
                    <div className="relative z-10">
                        <div className="mb-12">
                            <p className="text-primary-400 font-bold text-[10px] uppercase tracking-[0.3em] mb-4">Engagement Reward</p>
                            <div className="flex items-baseline gap-3">
                                <span className="text-6xl font-bold tracking-tighter">₹{job.salary || job.salaryRange.min}</span>
                                <span className="text-surface-400 font-bold text-lg uppercase tracking-widest text-[10px]">Per Month</span>
                            </div>
                        </div>

                        {(error || message) && (
                            <div className={`p-6 mb-10 rounded-3xl font-bold text-sm border flex items-center gap-4 ${error ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'}`}>
                                <Zap size={20} /> {error || message}
                            </div>
                        )}

                        <button 
                            onClick={handleApply} 
                            disabled={applying || message !== '' || (user?.role === 'driver' && !isProfileComplete)} 
                            className={`w-full py-6 rounded-3xl font-bold text-xl flex items-center justify-center gap-4 transition-all ${
                                message ? 'bg-emerald-500 text-white shadow-premium' : 
                                (user?.role === 'driver' && !isProfileComplete && !checkingProfile) ? 'bg-surface-800 text-surface-500 cursor-not-allowed opacity-50' :
                                'hover:bg-primary-600 bg-primary-500 text-white shadow-uber'
                            }`}
                        >
                            {applying ? (
                                <div className="w-8 h-8 border-3 border-white/20 border-t-white rounded-full animate-spin"></div>
                            ) : message ? (
                                <>
                                    Deployment Confirmed <CheckCircle2 size={24} />
                                </>
                            ) : (user?.role === 'driver' && !isProfileComplete && !checkingProfile) ? (
                                <>
                                    Profile Incomplete <ShieldCheck size={24} />
                                </>
                            ) : (
                                <>
                                    Initiate Application <ChevronRight size={24} />
                                </>
                            )}
                        </button>

                        {user?.role === 'driver' && !isProfileComplete && !checkingProfile && (
                            <Link 
                                to="/driver/profile" 
                                className="mt-8 w-full py-5 rounded-3xl font-bold text-sm bg-white/5 text-white/80 flex items-center justify-center gap-3 hover:bg-white/10 transition-colors border border-white/10"
                            >
                                Complete Profile Dossier <ArrowRight size={18} />
                            </Link>
                        )}

                        <div className="mt-12 p-8 bg-white/5 rounded-3xl border border-white/10">
                            <ShieldCheck size={32} className="text-emerald-500 mb-4" />
                            <h4 className="text-lg font-bold mb-2">Operational Trust</h4>
                            <p className="text-surface-400 text-sm font-medium leading-relaxed">
                                Our security protocols have verified this strategic partner and mission briefing.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default JobDetails;
