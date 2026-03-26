import { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Home, User, FileText, Briefcase, Clock, CheckCircle2, AlertCircle, TrendingUp, Zap, ShieldCheck, ChevronRight, Navigation, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Link } from 'react-router-dom';

const DriverDashboard = () => {
    const [statsData, setStatsData] = useState({ total: 0, accepted: 0, rejected: 0, pending: 0 });
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isProfileComplete, setIsProfileComplete] = useState(true);

    const driverLinks = [
        { name: 'Mission Dashboard', path: '/driver/dashboard', icon: Home },
        { name: 'Tactical Profile', path: '/driver/profile', icon: User },
        { name: 'Active Enlistments', path: '/driver/applications', icon: FileText },
        { name: 'Directives Radar', path: '/jobs', icon: Briefcase },
    ];

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const token = JSON.parse(localStorage.getItem('user'))?.token;
                const [statsRes, profileRes] = await Promise.all([
                    axios.get('/api/applications/driver/stats', {
                        headers: { Authorization: `Bearer ${token}` }
                    }),
                    axios.get('/api/driver/profile', {
                        headers: { Authorization: `Bearer ${token}` }
                    })
                ]);
                setStatsData(statsRes.data);
                setProfile(profileRes.data);
                
                const complete = profileRes.data.phone && 
                                profileRes.data.location && 
                                profileRes.data.drivingLicense?.number && 
                                profileRes.data.vehicleTypes?.length > 0;
                setIsProfileComplete(!!complete);
            } catch (err) {
                console.error("Error fetching dashboard data", err);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, []);

    const stats = [
        { label: 'Network Verification', value: profile?.phone ? 'Tier 1 Verified' : 'Action Required', highlight: true },
        { label: 'Active Directives', value: statsData.total || '0', icon: Target },
        { label: 'Confirmed Commissions', value: statsData.accepted || '0', icon: Zap },
    ];

    return (
        <DashboardLayout title="Operational Oversight" links={driverLinks}>
            {!isProfileComplete && !loading && (
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12 p-10 bg-primary-600 rounded-[40px] flex flex-col md:flex-row items-center justify-between gap-8 shadow-uber relative overflow-hidden group"
                >
                    <div className="absolute inset-0 map-gradient opacity-10 pointer-events-none"></div>
                    <div className="relative z-10 flex items-center gap-6">
                        <div className="w-16 h-16 bg-rose-500 text-white rounded-[20px] flex items-center justify-center shrink-0">
                            <AlertCircle size={32} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-white tracking-tight">Profile Incomplete</h3>
                            <p className="text-surface-400 font-medium">Your operational dossier requires verification to enable deployment.</p>
                        </div>
                    </div>
                    <Link to="/driver/profile" className="relative z-10 btn-primary bg-white text-surface-950 hover:bg-surface-50 py-5 px-10 whitespace-nowrap">
                        Finalize Dossier
                    </Link>
                </motion.div>
            )}

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {stats.map((stat, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={`app-card p-10 bg-white group hover:-translate-y-2 transition-transform duration-500`}
                    >
                        <div className="flex items-center justify-between mb-8">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${stat.highlight ? 'bg-emerald-50 text-emerald-600' : 'bg-surface-50 text-surface-400 group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors'}`}>
                                {stat.icon ? <stat.icon size={24} /> : <ShieldCheck size={24} />}
                            </div>
                            <span className="text-[10px] font-bold text-surface-300 uppercase tracking-[0.2em] group-hover:text-primary-500 transition-colors">Telemetry Active</span>
                        </div>
                        <h3 className="text-surface-400 text-[10px] font-bold uppercase tracking-[0.3em] mb-2">{stat.label}</h3>
                        <p className={`text-3xl font-bold tracking-tighter ${stat.highlight && !profile?.phone ? 'text-rose-500' : 'text-surface-950'}`}>{stat.value}</p>
                    </motion.div>
                ))}
            </div>

            {/* Tactical Feed & Intelligence */}
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
                                <h2 className="text-2xl font-bold text-surface-950 tracking-tight">Active In-Field Logs</h2>
                                <p className="text-[10px] text-surface-400 font-bold uppercase tracking-widest mt-1">Institutional Records</p>
                            </div>
                        </div>
                        <Link to="/driver/applications" className="btn-secondary py-3 px-6 text-xs font-bold uppercase tracking-widest">Full History</Link>
                    </div>
                    
                    {loading ? (
                        <div className="flex items-center justify-center py-20">
                            <div className="w-10 h-10 border-4 border-surface-50 border-t-primary-600 rounded-full animate-spin"></div>
                        </div>
                    ) : (
                        <div className="text-center py-32 bg-surface-50 rounded-[48px] border-2 border-dashed border-surface-100">
                            <div className="w-24 h-24 bg-white rounded-[32px] flex items-center justify-center mx-auto mb-10 text-surface-200 shadow-soft border border-surface-100">
                                <Navigation size={48} />
                            </div>
                            <h3 className="text-2xl font-bold text-surface-950 mb-4 tracking-tighter">Radar Silent</h3>
                            <p className="text-surface-500 font-medium max-w-sm mx-auto mb-12 text-lg">
                                All mission systems are nominal. No outstanding directives require your immediate tactical overview.
                            </p>
                            <Link to="/jobs" className="btn-primary py-5 px-12 inline-flex items-center gap-3">
                                Scan For Directives <ChevronRight size={20} />
                            </Link>
                        </div>
                    )}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="lg:col-span-4 bg-primary-600 rounded-[48px] p-12 text-white relative overflow-hidden flex flex-col justify-between shadow-uber-heavy"
                >
                    <div className="absolute inset-0 map-gradient opacity-10 pointer-events-none"></div>
                    <div className="relative z-10">
                        <div className="w-16 h-16 bg-white/5 rounded-[24px] flex items-center justify-center mb-10 border border-white/10 shadow-soft">
                            <ShieldCheck size={32} className="text-primary-500" strokeWidth={1.5} />
                        </div>
                        <h3 className="text-3xl font-bold mb-6 tracking-tight">Tier 1 Rating</h3>
                        <p className="text-surface-400 font-medium text-lg leading-relaxed mb-12">
                            You are tracking in the top percentiles of the Mobility Network. Peak performance unlocked priority deployments.
                        </p>
                    </div>
                    <div className="relative z-10">
                        <div className="flex justify-between text-[11px] font-bold uppercase tracking-[0.3em] mb-4 text-surface-500">
                            <span>Efficiency Alpha</span>
                            <span className="text-emerald-500">92.4%</span>
                        </div>
                        <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden mb-12">
                            <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: '92.4%' }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                className="h-full bg-emerald-500 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                            />
                        </div>
                        <Link to="/driver/profile" className="w-full py-5 bg-white text-surface-950 font-bold text-xs uppercase tracking-widest rounded-3xl flex items-center justify-center hover:bg-surface-50 transition-colors group">
                            Protocol Update <ChevronRight size={16} className="ml-2 translate-x-0 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </motion.div>
            </div>
        </DashboardLayout>
    );
};

export default DriverDashboard;
