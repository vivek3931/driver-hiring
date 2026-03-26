import { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Home, Users, PlusCircle, Briefcase, TrendingUp, CheckCircle2, Inbox, Clock, MapPin, IndianRupee, Target, Navigation, Zap, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { Link } from 'react-router-dom';

const RecruiterDashboard = () => {
    const [statsData, setStatsData] = useState({
        activeJobs: 0,
        totalApplicants: 0,
        shortlisted: 0,
        accepted: 0
    });
    const [loading, setLoading] = useState(true);

    const recruiterLinks = [
        { name: 'Oversight Hub', path: '/recruiter/dashboard', icon: Home },
        { name: 'Deploy Mission', path: '/recruiter/jobs/new', icon: PlusCircle },
        { name: 'Manage Directives', path: '/recruiter/jobs', icon: Briefcase },
        { name: 'Tactical Personnel', path: '/recruiter/applicants', icon: Users },
    ];

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const token = JSON.parse(localStorage.getItem('user'))?.token;
                const statsRes = await axios.get('/api/jobs/recruiter/stats', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setStatsData(statsRes.data);
            } catch (err) {
                console.error("Error fetching dashboard data", err);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, []);

    const stats = [
        { label: 'Active Directives', value: statsData.activeJobs, icon: Briefcase, color: 'text-primary-600' },
        { label: 'Enlisted Personnel', value: statsData.totalApplicants, icon: Users, color: 'text-surface-950' },
        { label: 'Shortlisted Units', value: statsData.shortlisted, icon: CheckCircle2, color: 'text-emerald-600' },
        { label: 'Deployed Assets', value: statsData.accepted, icon: Target, color: 'text-primary-500' },
    ];

    return (
        <DashboardLayout title="Strategic Command" links={recruiterLinks}>
            
            {/* Stats Command Center */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                {stats.map((stat, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={`app-card p-10 bg-white group hover:-translate-y-2 transition-transform duration-500`}
                    >
                        <div className="flex items-center justify-between mb-8">
                            <div className={`w-12 h-12 rounded-2xl bg-surface-50 ${stat.color} flex items-center justify-center group-hover:bg-primary-50 transition-colors`}>
                                <stat.icon size={24} />
                            </div>
                            <div className="flex items-center gap-1">
                                <TrendingUp size={12} className="text-emerald-500" />
                                <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest leading-none">Nominal</span>
                            </div>
                        </div>
                        <h3 className="text-surface-400 text-[10px] font-bold uppercase tracking-[0.3em] mb-2">{stat.label}</h3>
                        <p className="text-4xl font-bold text-surface-950 tracking-tighter">{stat.value}</p>
                    </motion.div>
                ))}
            </div>

            {/* Main Operational Feed */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-10">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="lg:col-span-8 app-card p-12 bg-white"
                >
                    <div className="flex items-center justify-between mb-12">
                        <div className="flex items-center gap-4">
                            <div className="w-1.5 h-10 bg-surface-950 rounded-full"></div>
                            <div>
                                <h2 className="text-2xl font-bold text-surface-950 tracking-tight">Active Recruitment Radar</h2>
                                <p className="text-[10px] text-surface-400 font-bold uppercase tracking-widest mt-1">Live Pipeline Stream</p>
                            </div>
                        </div>
                        <Link to="/recruiter/jobs" className="btn-secondary py-3 px-6 text-xs font-bold uppercase tracking-widest">Global Overview</Link>
                    </div>
                    
                    {loading ? (
                        <div className="flex items-center justify-center py-20">
                            <div className="w-10 h-10 border-4 border-surface-50 border-t-primary-600 rounded-full animate-spin"></div>
                        </div>
                    ) : (
                        <div className="text-center py-32 bg-surface-50 rounded-[48px] border-2 border-dashed border-surface-100">
                            <div className="w-24 h-24 bg-white rounded-[32px] flex items-center justify-center mx-auto mb-10 text-surface-200 shadow-soft border border-surface-100">
                                <Inbox size={48} />
                            </div>
                            <h3 className="text-2xl font-bold text-surface-950 mb-4 tracking-tighter">Operational Quiet</h3>
                            <p className="text-surface-500 font-medium max-w-sm mx-auto mb-12 text-lg leading-relaxed">
                                No urgent personnel enlistments require tactical intervention. Your current mission parameters are performing within specs.
                            </p>
                            <Link to="/recruiter/jobs/new" className="btn-primary py-5 px-12 inline-flex items-center gap-3">
                                <PlusCircle size={20} /> Deploy New directive
                            </Link>
                        </div>
                    )}
                </motion.div>

                {/* Intelligence Side Card */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="lg:col-span-4 bg-surface-950 rounded-[48px] p-12 text-white relative overflow-hidden flex flex-col justify-between shadow-uber-heavy"
                >
                    <div className="absolute inset-0 map-gradient opacity-10 pointer-events-none"></div>
                    <div className="relative z-10">
                        <div className="w-16 h-16 bg-white/5 rounded-[24px] flex items-center justify-center mb-10 border border-white/10 shadow-soft">
                            <Zap size={32} className="text-primary-500" strokeWidth={1.5} />
                        </div>
                        <h3 className="text-3xl font-bold mb-6 tracking-tight">AI Matching</h3>
                        <p className="text-surface-400 font-medium text-lg leading-relaxed mb-12">
                            Integrate our heuristic driver matching engine to filter the top 2% of operational talent automatically.
                        </p>
                    </div>
                    
                    <div className="space-y-6 relative z-10">
                        <div className="p-6 bg-white/5 rounded-3xl border border-white/10 flex items-center gap-5">
                            <div className="w-12 h-12 rounded-2xl bg-primary-600/20 border border-primary-600/40 flex items-center justify-center shrink-0">
                                <CheckCircle2 size={24} className="text-primary-500" />
                            </div>
                            <div>
                                <p className="text-sm font-bold tracking-tight">Priority Search</p>
                                <p className="text-[10px] text-surface-500 font-bold uppercase tracking-widest mt-1">Status: Active</p>
                            </div>
                        </div>
                        
                        <button className="w-full py-5 bg-white text-surface-950 font-bold text-xs uppercase tracking-widest rounded-3xl flex items-center justify-center hover:bg-surface-50 transition-colors group">
                           View Intelligence Report <ChevronRight size={16} className="ml-2 translate-x-0 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </motion.div>
            </div>
        </DashboardLayout>
    );
};

export default RecruiterDashboard;
