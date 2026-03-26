import { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Home, Users, PlusCircle, Briefcase, MapPin, IndianRupee, Car, Clock, Briefcase as EmploymentIcon, ListChecks, FileText, Send, ChevronRight, Navigation, Zap } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const PostJob = () => {
  const navigate = useNavigate();
  const [jobData, setJobData] = useState({
    title: '',
    location: '',
    minSalary: '',
    maxSalary: '',
    experienceRequired: 0,
    vehicleTypeRequired: 'Car',
    shiftTiming: 'Day',
    employmentType: 'Full-time',
    vacancies: 1,
    description: '',
    benefits: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const recruiterLinks = [
    { name: 'Oversight Hub', path: '/recruiter/dashboard', icon: Home },
    { name: 'Deploy Mission', path: '/recruiter/jobs/new', icon: PlusCircle },
    { name: 'Manage Directives', path: '/recruiter/jobs', icon: Briefcase },
    { name: 'Tactical Personnel', path: '/recruiter/applicants', icon: Users },
  ];

  const onChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const token = JSON.parse(localStorage.getItem('user'))?.token;
      
      const payload = {
        title: jobData.title,
        location: jobData.location,
        salaryRange: {
          min: Number(jobData.minSalary),
          max: Number(jobData.maxSalary)
        },
        experienceRequired: Number(jobData.experienceRequired),
        vehicleTypeRequired: jobData.vehicleTypeRequired,
        shiftTiming: jobData.shiftTiming,
        employmentType: jobData.employmentType,
        vacancies: Number(jobData.vacancies),
        description: jobData.description,
        benefits: jobData.benefits.split(',').map(b => b.trim())
      };

      await axios.post('/api/jobs', payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      navigate('/recruiter/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Error posting job');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout title="Create Strategy" links={recruiterLinks}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="app-card p-12 lg:p-16 max-w-5xl bg-white relative overflow-hidden"
      >
        <div className="absolute inset-0 map-gradient opacity-5 pointer-events-none"></div>
        
        <div className="relative z-10">
            <div className="flex items-center gap-6 mb-16 pb-12 border-b border-surface-50">
                <div className="w-20 h-20 bg-surface-950 rounded-[28px] flex items-center justify-center text-white shadow-uber group-hover:bg-primary-600 transition-colors duration-500">
                    <PlusCircle size={40} />
                </div>
                <div>
                    <div className="flex items-center gap-2 mb-3 text-primary-600">
                        <Navigation size={14} />
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Operational Protocol</span>
                    </div>
                    <h2 className="text-3xl font-bold text-surface-950 tracking-tighter leading-none mb-3">Deploy New Directive</h2>
                    <p className="text-surface-400 font-medium text-lg leading-snug">Target elite driver talent with high-fidelity operational specifications.</p>
                </div>
            </div>
            
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 mb-12 rounded-3xl bg-rose-50 text-rose-600 border border-rose-100 font-bold text-sm flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-full bg-rose-200 flex items-center justify-center text-rose-600 shrink-0">
                    <Zap size={20} />
                </div>
                {error}
              </motion.div>
            )}

            <form onSubmit={onSubmit} className="space-y-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
                <div className="md:col-span-2 space-y-4">
                  <label className="text-surface-950 font-bold text-[11px] flex items-center gap-2 uppercase tracking-[0.2em]">
                    <FileText size={16} className="text-primary-600" /> Strategic Mission Title
                  </label>
                  <input type="text" name="title" required value={jobData.title} onChange={onChange} className="input-field py-5 text-lg" placeholder="e.g. Senior Corporate Chauffeur - North Division" />
                </div>
                
                <div className="space-y-4">
                  <label className="text-surface-950 font-bold text-[11px] flex items-center gap-2 uppercase tracking-[0.2em]">
                    <MapPin size={16} className="text-primary-600" /> Operational Zone
                  </label>
                  <input type="text" name="location" required value={jobData.location} onChange={onChange} className="input-field py-5" placeholder="e.g. Bandra West, Mumbai" />
                </div>
                
                <div className="space-y-4">
                  <label className="text-surface-950 font-bold text-[11px] flex items-center gap-2 uppercase tracking-[0.2em]">
                    <Car size={16} className="text-primary-600" /> Professional Asset Category
                  </label>
                  <div className="relative">
                      <select name="vehicleTypeRequired" required value={jobData.vehicleTypeRequired} onChange={onChange} className="input-field py-5 appearance-none cursor-pointer pr-12">
                        <option value="Car">Executive Sedan / SUV</option>
                        <option value="Truck">Heavy Logistics Truck</option>
                        <option value="Bus">Luxury Fleet Coach</option>
                        <option value="Delivery Van">Commercial Urban Delivery</option>
                        <option value="Heavy Vehicle">Specialized Industrial Asset</option>
                        <option value="Other">Custom Fleet Specification</option>
                      </select>
                      <ChevronRight size={18} className="absolute right-5 top-1/2 -translate-y-1/2 rotate-90 text-surface-400 pointer-events-none" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <label className="text-surface-950 font-bold text-[11px] flex items-center gap-2 uppercase tracking-[0.2em]">
                    <IndianRupee size={16} className="text-primary-600" /> Tactical Compensation Pool (Monthly)
                  </label>
                  <div className="grid grid-cols-2 gap-6">
                      <input type="number" name="minSalary" value={jobData.minSalary} onChange={onChange} className="input-field py-5" placeholder="Min ₹" />
                      <input type="number" name="maxSalary" value={jobData.maxSalary} onChange={onChange} className="input-field py-5" placeholder="Max ₹" />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-surface-950 font-bold text-[11px] flex items-center gap-2 uppercase tracking-[0.2em]">
                    <Clock size={16} className="text-primary-600" /> Deployment Shift
                  </label>
                  <div className="relative">
                      <select name="shiftTiming" required value={jobData.shiftTiming} onChange={onChange} className="input-field py-5 appearance-none cursor-pointer pr-12">
                        <option value="Day">Standard Ops (Day)</option>
                        <option value="Night">Strategic Ops (Night)</option>
                        <option value="Flexible">Dynamic Deployment</option>
                      </select>
                      <ChevronRight size={18} className="absolute right-5 top-1/2 -translate-y-1/2 rotate-90 text-surface-400 pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-surface-950 font-bold text-[11px] flex items-center gap-2 uppercase tracking-[0.2em]">
                    <EmploymentIcon size={16} className="text-primary-600" /> Engagement Model
                  </label>
                  <div className="relative">
                      <select name="employmentType" required value={jobData.employmentType} onChange={onChange} className="input-field py-5 appearance-none cursor-pointer pr-12">
                        <option value="Full-time">Institutional Retainer (Full-time)</option>
                        <option value="Part-time">Specialist Support (Part-time)</option>
                        <option value="Contract">Project Allocation (Contract)</option>
                      </select>
                      <ChevronRight size={18} className="absolute right-5 top-1/2 -translate-y-1/2 rotate-90 text-surface-400 pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-surface-950 font-bold text-[11px] flex items-center gap-2 uppercase tracking-[0.2em]">
                    <Users size={16} className="text-primary-600" /> Open Deployment Slots
                  </label>
                  <input type="number" name="vacancies" required value={jobData.vacancies} onChange={onChange} className="input-field py-5" min="1" />
                </div>

                <div className="md:col-span-2 space-y-4">
                  <label className="text-surface-950 font-bold text-[11px] flex items-center gap-2 uppercase tracking-[0.2em]">
                    <ListChecks size={16} className="text-primary-600" /> Operational Incentives (Comma Separated)
                  </label>
                  <input type="text" name="benefits" value={jobData.benefits} onChange={onChange} className="input-field py-5" placeholder="e.g. Performance Multipliers, Institutional Insurance, Daily Provisions" />
                </div>

                <div className="md:col-span-2 space-y-4">
                  <label className="text-surface-950 font-bold text-[11px] flex items-center gap-2 uppercase tracking-[0.2em]">
                    <FileText size={16} className="text-primary-600" /> Detailed Operational Briefing
                  </label>
                  <textarea name="description" required value={jobData.description} onChange={onChange} rows={8} className="input-field py-6 text-lg leading-relaxed" placeholder="Define the mission parameters, route complexities, and professional performance standards expected..."></textarea>
                </div>
              </div>
              
              <div className="pt-16 border-t border-surface-50 flex items-center justify-between">
                <button type="button" onClick={() => navigate(-1)} className="text-surface-400 font-bold hover:text-surface-950 transition-colors tracking-tight">
                    Discard Directive Profile
                </button>
                <button 
                    type="submit" 
                    disabled={loading} 
                    className={`btn-primary px-16 py-6 flex items-center gap-4 text-lg ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                    {loading ? (
                        <div className="w-6 h-6 border-3 border-white/20 border-t-white rounded-full animate-spin"></div>
                    ) : (
                        <>Launch Mission Blueprint <ChevronRight size={22} /></>
                    )}
                </button>
              </div>
            </form>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default PostJob;
