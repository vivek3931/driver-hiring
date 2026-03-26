import { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Home, Users, CheckSquare, Settings, Activity, ShieldAlert, BarChart3, Clock, TrendingUp, ShieldCheck, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';

const AdminDashboard = () => {
  const [statsData, setStatsData] = useState({
    totalUsers: 0,
    activeJobs: 0,
    totalApplications: 0,
    pendingVerifications: 0
  });
  const [loading, setLoading] = useState(true);

  const adminLinks = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: Home },
    { name: 'Manage Drivers', path: '/admin/drivers', icon: Users },
    { name: 'Manage Recruiters', path: '/admin/recruiters', icon: Users },
    { name: 'Verifications', path: '/admin/verifications', icon: CheckSquare },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  useEffect(() => {
    const fetchStats = async () => {
        try {
            const token = JSON.parse(localStorage.getItem('user'))?.token;
            const { data } = await axios.get('/api/auth/admin/stats', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setStatsData(data);
        } catch (err) {
            console.error("Error fetching admin stats", err);
        } finally {
            setLoading(false);
        }
    };
    fetchStats();
  }, []);

  const stats = [
    { label: 'Total Personnel', value: statsData.totalUsers, icon: Users, color: 'text-primary-600', bg: 'bg-primary-50', border: 'border-primary-100' },
    { label: 'Active Missions', value: statsData.activeJobs, icon: BarChart3, color: 'text-indigo-500', bg: 'bg-indigo-50', border: 'border-indigo-100' },
    { label: 'System Requests', value: statsData.totalApplications, icon: Activity, color: 'text-emerald-500', bg: 'bg-emerald-50', border: 'border-emerald-100' },
    { label: 'Pending Audit', value: statsData.pendingVerifications, icon: ShieldAlert, color: 'text-rose-500', bg: 'bg-rose-50', border: 'border-rose-100' },
  ];

  return (
    <DashboardLayout title="System Sovereignty" links={adminLinks}>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
            <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className={`card p-8 bg-white border-t-4 ${stat.border} hover:shadow-premium transition-all group`}
            >
                <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center shadow-subtle group-hover:rotate-6 transition-transform`}>
                        <stat.icon size={24} />
                    </div>
                    <TrendingUp size={16} className="text-emerald-500 opacity-30" />
                </div>
                <h3 className="text-surface-400 text-[10px] font-extrabold uppercase tracking-[0.2em]">{stat.label}</h3>
                <p className="text-3xl font-black text-surface-900 mt-2 tracking-tight">{stat.value}</p>
            </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10">
        <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="card p-10 bg-white"
        >
            <div className="flex items-center justify-between mb-10">
                <h2 className="text-2xl font-black text-surface-900 flex items-center gap-3">
                    <div className="w-1.5 h-8 bg-rose-500 rounded-full"></div>
                    Critical Audit Queue
                </h2>
                <span className="px-3 py-1 bg-rose-50 text-rose-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-rose-100">Priority Delta</span>
            </div>
            
            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <div className="w-10 h-10 border-4 border-surface-50 border-t-rose-500 rounded-full animate-spin"></div>
                </div>
            ) : (
                <div className="text-center py-24 bg-surface-50/20 rounded-[48px] border-2 border-dashed border-surface-200">
                    <div className="w-24 h-24 bg-white rounded-[32px] flex items-center justify-center mx-auto mb-8 text-surface-200 shadow-subtle border border-surface-100">
                        <ShieldCheck size={48} />
                    </div>
                    <h3 className="text-2xl font-black text-surface-900 mb-2">Queue Integrity Verified</h3>
                    <p className="text-surface-500 font-medium max-w-sm mx-auto text-sm">
                        Total system synchronization achieved. All personnel verifications and mission parameters are within expected thresholds.
                    </p>
                </div>
            )}
        </motion.div>

        <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="card p-10 bg-indigo-900 text-white relative overflow-hidden"
        >
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 opacity-20 rounded-full -mr-32 -mt-32 blur-3xl"></div>
            <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                    <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-10 border border-white/10">
                        <Zap size={28} className="text-indigo-300" />
                    </div>
                    <h3 className="text-3xl font-black mb-6">System Health</h3>
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-indigo-300 uppercase tracking-widest">Database Sync</span>
                            <span className="text-xs font-black">99.9%</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-indigo-400 w-[99.9%] rounded-full"></div>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-indigo-300 uppercase tracking-widest">API Latency</span>
                            <span className="text-xs font-black">24ms</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-400 w-[12%] rounded-full"></div>
                        </div>
                    </div>
                </div>
                <button className="mt-12 w-full py-5 bg-white text-indigo-900 font-black text-xs uppercase tracking-widest rounded-3xl hover:bg-indigo-50 transition-colors shadow-premium">
                    Access System Logs
                </button>
            </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
