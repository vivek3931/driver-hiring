import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { ShieldCheck, Menu, X, LogOut, ChevronRight, User, Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const { user, logout } = useAuthStore();
    const navigate = useNavigate();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    const onLogout = () => {
        logout();
        navigate('/');
        setIsOpen(false);
    };

    const dashboardLink =
        user?.role === 'driver' ? '/driver/dashboard' :
            user?.role === 'recruiter' ? '/recruiter/dashboard' :
                user?.role === 'admin' ? '/admin/dashboard' : '/';

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Directives', path: '/jobs', hide: user?.role === 'recruiter' },
        { name: 'Intelligence', path: '/about' },
    ];

    return (
        <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
            scrolled ? 'bg-white/80 backdrop-blur-xl border-b border-surface-100 py-3' : 'bg-transparent py-6'
        }`}>
            <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex justify-between items-center">
                
                {/* Brand Logo - Uber Style */}
                <Link to="/" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 bg-surface-950 rounded-xl flex items-center justify-center text-white shadow-uber group-hover:bg-primary-600 transition-colors duration-500">
                        <ShieldCheck size={24} strokeWidth={2.5} />
                    </div>
                    <span className="text-2xl font-bold text-surface-950 tracking-tighter">
                        DRIVER<span className="text-primary-600">HIRE</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center gap-1">
                    {navLinks.filter(link => !link.hide).map(link => (
                        <Link 
                            key={link.path}
                            to={link.path} 
                            className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                                location.pathname === link.path 
                                ? 'bg-surface-100 text-surface-950' 
                                : 'text-surface-500 hover:text-surface-950'
                            }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* User Actions */}
                <div className="hidden lg:flex items-center gap-6">
                    {user ? (
                        <div className="flex items-center gap-4">
                            <button className="p-2 text-surface-400 hover:text-surface-950 transition-colors relative">
                                <Bell size={20} />
                                <div className="absolute top-2 right-2 w-2 h-2 bg-primary-600 rounded-full border-2 border-white"></div>
                            </button>
                            <Link to={dashboardLink} className="flex items-center gap-3 pl-4 border-l border-surface-100 hover:opacity-80 transition-opacity">
                                <div className="w-10 h-10 rounded-full bg-surface-100 flex items-center justify-center text-surface-700 font-bold border border-surface-200">
                                    {user.name.charAt(0)}
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-surface-950 leading-none">{user.name}</p>
                                    <p className="text-[10px] text-surface-400 font-bold uppercase tracking-widest mt-1">Certified {user.role}</p>
                                </div>
                            </Link>
                            <button onClick={onLogout} className="p-2 text-surface-400 hover:text-rose-600 transition-colors">
                                <LogOut size={20} />
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Link to="/login" className="px-6 py-3 text-sm font-bold text-surface-700 hover:text-surface-950 transition-colors">
                                Sign In
                            </Link>
                            <Link to="/register" className="btn-primary py-3.5 px-8 text-xs">
                                Join Network
                            </Link>
                        </div>
                    )}
                </div>

                {/* Mobile Toggle */}
                <button 
                    onClick={() => setIsOpen(!isOpen)}
                    className="lg:hidden p-2 rounded-xl text-surface-950 hover:bg-surface-100 transition-colors"
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Interface - Drawer Style */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="lg:hidden fixed inset-0 top-[88px] bg-white z-40 p-8 flex flex-col justify-between"
                    >
                        <div className="space-y-6">
                            {navLinks.filter(link => !link.hide).map(link => (
                                <Link 
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className="block text-4xl font-bold text-surface-950 tracking-tighter"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        <div className="space-y-4">
                            {user ? (
                                <>
                                    <Link 
                                        to={dashboardLink} 
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center justify-between p-6 rounded-2xl bg-surface-950 text-white font-bold"
                                    >
                                        Control Center <ChevronRight size={20} />
                                    </Link>
                                    <button 
                                        onClick={onLogout}
                                        className="w-full py-4 text-surface-500 font-bold text-lg"
                                    >
                                        Disconnect Account
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link 
                                        to="/register" 
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center justify-center p-6 rounded-2xl bg-surface-950 text-white font-bold shadow-uber"
                                    >
                                        Join Mobility Network
                                    </Link>
                                    <Link 
                                        to="/login"
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center justify-center p-6 rounded-2xl border border-surface-200 text-surface-950 font-bold"
                                    >
                                        Sign In
                                    </Link>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar;
