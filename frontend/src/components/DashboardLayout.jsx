import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { LogOut, ChevronRight, User, ShieldCheck, Calendar, Bell, Navigation } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DashboardLayout = ({ title, links, children }) => {
    const { user, logout } = useAuthStore();
    const location = useLocation();

    return (
        <div className="flex min-h-screen bg-white font-sans selection:bg-primary-100 selection:text-primary-900 pt-20 lg:pt-24">
            {/* Sidebar - Sharp Uber Minimalism */}
            <aside className="w-80 bg-white border-r border-surface-100 flex flex-col hidden lg:flex relative z-10">
                <div className="p-10 border-b border-surface-50">
                    <Link to="/" className="flex items-center gap-3 mb-12 group">
                        <div className="w-10 h-10 bg-surface-950 rounded-xl flex items-center justify-center text-white shadow-uber group-hover:bg-primary-600 transition-colors">
                            <ShieldCheck size={24} strokeWidth={2.5} />
                        </div>
                        <span className="text-2xl font-bold text-surface-950 tracking-tighter">
                            DRIVER<span className="text-primary-600">HIRE</span>
                        </span>
                    </Link>
                    
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-surface-50 flex items-center justify-center text-surface-950 font-bold border border-surface-100">
                             {user?.name.charAt(0)}
                        </div>
                        <div className="overflow-hidden">
                            <h2 className="text-sm font-bold text-surface-950 leading-tight truncate">{user?.name}</h2>
                            <p className="text-[10px] font-bold text-surface-400 uppercase tracking-[0.2em] mt-1">{user?.role} Division</p>
                        </div>
                    </div>
                </div>
                
                <nav className="flex-1 px-6 py-10 space-y-1.5 overflow-y-auto">
                    <p className="px-4 text-[10px] font-bold text-surface-300 uppercase tracking-[0.3em] mb-6">Operations Hub</p>
                    {links.map((link) => {
                        const isActive = location.pathname === link.path;
                        const Icon = link.icon;
                        return (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`flex items-center justify-between px-5 py-4 rounded-xl transition-all group ${
                                    isActive 
                                    ? 'bg-surface-950 text-white shadow-uber' 
                                    : 'text-surface-500 hover:bg-surface-50 hover:text-surface-950'
                                }`}
                            >
                                <div className="flex items-center gap-4">
                                    {Icon && <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />}
                                    <span className="font-bold text-sm tracking-tight">{link.name}</span>
                                </div>
                                {isActive && <ChevronRight size={16} strokeWidth={3} className="text-primary-500" />}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-8 mt-auto border-t border-surface-50">
                    <div className="p-6 bg-surface-50 rounded-2xl border border-surface-100 mb-8 group cursor-default">
                        <div className="flex items-center gap-2 mb-3 text-primary-600">
                            <Navigation size={14} className="animate-pulse" />
                            <span className="text-[9px] font-bold uppercase tracking-[0.2em]">Verified Status</span>
                        </div>
                        <h4 className="text-xs font-bold text-surface-950">Institutional Access</h4>
                        <p className="text-[9px] font-bold text-surface-400 uppercase tracking-widest mt-1">Tier 1 Operator</p>
                    </div>
                    
                    <button
                        onClick={logout}
                        className="flex items-center gap-4 w-full px-5 py-4 text-surface-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all font-bold text-sm group"
                    >
                        <LogOut size={20} strokeWidth={2.5} />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-w-0">
                {/* Internal Header */}
                <header className="h-24 border-b border-surface-50 flex items-center justify-between px-8 lg:px-12 bg-white sticky top-0 z-20">
                    <div>
                        <h1 className="text-xl font-bold text-surface-950 tracking-tight">{title}</h1>
                    </div>
                    
                    <div className="flex items-center gap-6">
                        <button className="p-2.5 text-surface-400 hover:text-surface-950 transition-colors relative bg-surface-50 rounded-xl border border-surface-100">
                            <Bell size={20} />
                            <div className="absolute top-2.5 right-2.5 w-2 h-2 bg-primary-600 rounded-full border-2 border-white"></div>
                        </button>
                        <div className="hidden sm:flex items-center gap-4 pl-6 border-l border-surface-100">
                            <div className="text-right">
                                <p className="text-[10px] font-bold text-surface-400 uppercase tracking-widest leading-none mb-1">Status</p>
                                <p className="text-xs font-bold text-emerald-600">Online</p>
                            </div>
                            <div className="w-10 h-10 rounded-xl bg-surface-50 border border-surface-100 flex items-center justify-center font-bold text-surface-950">
                                {user?.name.charAt(0)}
                            </div>
                        </div>
                    </div>
                </header>

                <div className="flex-1 p-8 lg:p-12 max-w-[1440px] mx-auto w-full bg-[#fdfdfd]">
                    <motion.div 
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 1 }}
                        className="space-y-12"
                    >
                        {children}
                    </motion.div>
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
