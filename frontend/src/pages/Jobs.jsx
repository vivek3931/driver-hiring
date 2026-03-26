import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Car, Briefcase, Calendar, ArrowRight, X, CheckCircle2, Navigation, Target, Zap } from 'lucide-react';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    location: '',
    vehicleType: '',
    keyword: ''
  });

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('/api/jobs', { params: filters });
      setJobs(data);
    } catch (error) {
      console.error("Error fetching jobs", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const onFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const applyFilters = (e) => {
    e.preventDefault();
    fetchJobs();
  };

  return (
    <div className="bg-white min-h-screen pb-20 selection:bg-primary-100 selection:text-primary-900">
      
      {/* Search Command Center */}
      <section className="bg-surface-950 pt-40 pb-24 lg:pt-56 relative overflow-hidden">
        <div className="absolute inset-0 map-gradient opacity-10"></div>
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-16"
            >
                <div className="inline-flex items-center gap-2 mb-6 text-primary-400">
                    <Navigation size={14} className="animate-pulse" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.4em]">In-Field Deployment Hub</span>
                </div>
                <h1 className="text-4xl lg:text-6xl font-bold text-white tracking-tighter leading-none mb-6">
                    Active <span className="text-primary-500">Missions.</span>
                </h1>
                <p className="text-lg text-surface-400 font-medium max-w-xl">
                    Select your operational zone and vehicle classification to begin deployment.
                </p>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="max-w-5xl"
            >
                <form onSubmit={applyFilters} className="bg-white rounded-[32px] p-2 flex flex-col lg:flex-row gap-2 shadow-uber-heavy border border-white/10">
                    <div className="flex-[2] flex items-center px-8 gap-4 bg-surface-50 rounded-2xl border border-transparent focus-within:border-surface-200 transition-all group">
                        <Search size={22} className="text-surface-400" />
                        <input 
                            type="text" 
                            name="keyword" 
                            placeholder="Keywords (e.g. VIP, Luxury, Convoy)" 
                            value={filters.keyword} 
                            onChange={onFilterChange} 
                            className="w-full py-6 bg-transparent outline-none text-surface-950 font-bold placeholder:text-surface-300 text-lg" 
                        />
                    </div>
                    <div className="flex-1 flex items-center px-8 gap-4 bg-surface-50 rounded-2xl border border-transparent focus-within:border-surface-200 transition-all group">
                        <MapPin size={22} className="text-surface-400" />
                        <input 
                            type="text" 
                            name="location" 
                            placeholder="Operational Zone" 
                            value={filters.location} 
                            onChange={onFilterChange} 
                            className="w-full py-6 bg-transparent outline-none text-surface-950 font-bold placeholder:text-surface-300 text-lg" 
                        />
                    </div>
                    <button type="submit" className="btn-primary py-6 px-12 text-lg">
                       Search
                    </button>
                </form>
            </motion.div>
        </div>
      </section>

      {/* Mission Grid */}
      <main className="max-w-[1440px] mx-auto px-6 lg:px-12 pt-16">
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-4 border-b border-surface-100 pb-10">
            <div className="flex items-center gap-4">
                <div className="w-2 h-10 bg-primary-600 rounded-full"></div>
                <div>
                   <h2 className="text-2xl font-bold text-surface-950">
                        {loading ? 'Analyzing data...' : `${jobs.length} Available Targets`}
                    </h2>
                    <p className="text-xs text-surface-400 font-bold uppercase tracking-widest mt-1">Live Feed Syncing</p>
                </div>
            </div>
            
            <div className="flex items-center gap-3">
                {filters.keyword || filters.location || filters.vehicleType ? (
                    <button 
                        onClick={() => { setFilters({location:'', vehicleType:'', keyword:''}); fetchJobs(); }}
                        className="flex items-center gap-2 px-6 py-3 rounded-full bg-surface-950 text-white font-bold text-xs uppercase tracking-widest hover:bg-surface-800 transition-colors"
                    >
                        <X size={14} /> Clear Scan
                    </button>
                ) : null}
            </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="app-card h-[400px] animate-pulse bg-surface-50 border-none"></div>
            ))}
          </div>
        ) : jobs.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-40 bg-surface-50 rounded-[48px] border-2 border-dashed border-surface-200"
          >
            <div className="w-24 h-24 bg-white rounded-[32px] flex items-center justify-center mx-auto mb-10 text-surface-200 shadow-soft border border-surface-100">
                <Target size={48} />
            </div>
            <h3 className="text-3xl font-bold text-surface-950 mb-4 tracking-tighter">Negative Connection</h3>
            <p className="text-surface-500 font-medium max-w-md mx-auto mb-12">No active missions match your current scan parameters. Update your zone or vehicle classification.</p>
            <button 
                onClick={() => { setFilters({location:'', vehicleType:'', keyword:''}); fetchJobs(); }}
                className="btn-secondary py-5 px-12"
            >
                Reset Radar
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <AnimatePresence>
                {Array.isArray(jobs) && jobs.map((job, index) => (
                    <motion.div 
                        key={job._id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                    >
                        <Link to={`/jobs/${job._id}`} className="app-card group p-0 flex flex-col h-full bg-white hover:-translate-y-2 transition-transform duration-500">
                            {/* Card Header (Uber Style) */}
                            <div className="p-10 border-b border-surface-50 bg-white group-hover:bg-surface-50 transition-colors">
                                <div className="flex justify-between items-start mb-10">
                                    <div className="w-16 h-16 bg-surface-950 text-white rounded-[20px] flex items-center justify-center shadow-uber group-hover:bg-primary-600 transition-colors">
                                        <Car size={32} />
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3 py-1.5 rounded-full mb-2">
                                            Active
                                        </span>
                                        <p className="text-2xl font-bold text-surface-950 tracking-tight">₹{job.salary || job.salaryRange.min}</p>
                                        <p className="text-[10px] text-surface-400 font-bold uppercase tracking-widest mt-1">Base / Month</p>
                                    </div>
                                </div>
                                
                                <h3 className="text-3xl font-bold text-surface-950 leading-none mb-4 tracking-tight group-hover:text-primary-600 transition-colors">
                                    {job.title}
                                </h3>
                                
                                <div className="flex items-center gap-2 text-surface-500 font-bold text-sm">
                                    <CheckCircle2 size={16} className="text-primary-600" />
                                    {job.recruiter?.companyName || 'Verified Strategic Partner'}
                                </div>
                            </div>
                            
                            {/* Card Body */}
                            <div className="p-10 space-y-6 flex-grow">
                                <div className="flex items-center gap-4 text-surface-600 font-medium">
                                    <div className="w-10 h-10 rounded-xl bg-surface-50 flex items-center justify-center text-surface-400 group-hover:text-primary-600 transition-colors">
                                        <MapPin size={18} />
                                    </div>
                                    <span className="text-lg tracking-tight">{job.location}</span>
                                </div>
                                <div className="flex items-center gap-4 text-surface-600 font-medium">
                                    <div className="w-10 h-10 rounded-xl bg-surface-50 flex items-center justify-center text-surface-400 group-hover:text-primary-600 transition-colors">
                                        <Zap size={18} />
                                    </div>
                                    <span className="text-lg tracking-tight">{job.vehicleTypeRequired} Qualification</span>
                                </div>
                            </div>

                            {/* Card Footer */}
                            <div className="px-10 py-8 bg-surface-50/50 flex justify-between items-center group-hover:bg-primary-600 group-hover:text-white transition-all duration-500">
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{job.employmentType} Allocation</span>
                                <div className="flex items-center gap-2 font-bold text-sm">
                                    View Directive <ArrowRight size={18} className="translate-x-0 group-hover:translate-x-2 transition-transform" />
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </AnimatePresence>
          </div>
        )}
      </main>
    </div>
  );
};

export default Jobs;
