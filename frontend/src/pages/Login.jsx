import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, ShieldCheck, CheckCircle2, Navigation } from 'lucide-react';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;
    const navigate = useNavigate();
    const { user, isLoading, isError, isSuccess, message, login, reset } = useAuthStore();

    useEffect(() => {
        if (isError) {
            console.error(message);
        }
        if (isSuccess || user) {
            if (user?.role === 'driver') navigate('/driver/dashboard');
            else if (user?.role === 'recruiter') navigate('/recruiter/dashboard');
            else if (user?.role === 'admin') navigate('/admin/dashboard');
            else navigate('/');
        }
        reset();
    }, [user, isError, isSuccess, message, navigate, reset]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        login({ email, password });
    };

    return (
        <div className="min-h-screen flex bg-white lg:pt-0 pt-32">
            {/* Left Side: Strategic Insight */}
            <div className="hidden lg:flex w-1/2 bg-surface-950 relative overflow-hidden items-center justify-center p-24">
                <div className="absolute inset-0 map-gradient opacity-10"></div>
                <div className="relative z-10 max-w-lg">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center text-white shadow-uber mb-12"
                    >
                        <ShieldCheck size={32} strokeWidth={2.5} />
                    </motion.div>
                    
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl lg:text-6xl font-bold text-white mb-10 tracking-tighter leading-tight"
                    >
                        Enter The <br />
                        <span className="text-primary-500 text-4xl lg:text-5xl">Command Hub.</span>
                    </motion.h2>
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-surface-400 font-medium mb-12 leading-relaxed"
                    >
                        Access India's most advanced logistics infrastructure. Coordinate missions and manage elite driver rotations from a single interface.
                    </motion.p>

                    <div className="space-y-6">
                        {[
                            "Real-time mission telemetry",
                            "Verified driver certifications",
                            "Strategic partner network"
                        ].map((item, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 + i * 0.1 }}
                                className="flex items-center gap-4 text-white font-bold tracking-tight"
                            >
                                <div className="w-6 h-6 rounded-full bg-primary-600/20 border border-primary-600/40 flex items-center justify-center">
                                    <CheckCircle2 size={14} className="text-primary-500" />
                                </div>
                                {item}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Side: Authentication */}
            <div className="flex-1 flex items-center justify-center p-8 lg:p-24 relative">
                <div className="max-w-md w-full">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-full"
                    >
                        <div className="mb-12">
                            <div className="flex items-center gap-2 mb-6 text-primary-600 lg:hidden">
                                <Navigation size={20} />
                                <span className="text-xs font-bold uppercase tracking-widest">DriverHire Network</span>
                            </div>
                            <h1 className="text-3xl lg:text-4xl font-bold text-surface-950 tracking-tighter mb-4">Welcome Back.</h1>
                            <p className="text-surface-500 font-medium tracking-tight">Access your operational dashboard</p>
                        </div>

                        {isError && (
                            <motion.div 
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mb-8 p-5 bg-rose-50 border border-rose-100 rounded-2xl text-rose-700 text-sm font-bold flex items-center gap-3"
                            >
                                <X size={18} /> {message}
                            </motion.div>
                        )}

                        <form onSubmit={onSubmit} className="space-y-6">
                            <div className="space-y-5">
                                <div>
                                    <label className="label-text">Credentials Protocol / Email</label>
                                    <input 
                                        name="email"
                                        type="email" 
                                        required
                                        value={email}
                                        onChange={onChange}
                                        placeholder="user@network.com"
                                        className="input-field py-5"
                                    />
                                </div>
                                <div>
                                    <div className="flex justify-between items-center mb-2.5">
                                        <label className="label-text mb-0">Security Key / Password</label>
                                        <Link to="/forgot-password" size="sm" className="text-[11px] font-bold text-primary-600 hover:text-primary-700 transition-colors uppercase tracking-widest">Recover Access</Link>
                                    </div>
                                    <input 
                                        name="password"
                                        type="password" 
                                        required
                                        value={password}
                                        onChange={onChange}
                                        placeholder="••••••••"
                                        className="input-field py-5"
                                    />
                                </div>
                            </div>

                            <button 
                                type="submit" 
                                disabled={isLoading}
                                className="w-full btn-primary py-5 group transition-all"
                            >
                                {isLoading ? (
                                    <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                                ) : (
                                    <span className="flex items-center justify-center gap-3">
                                        Authorize Access <ArrowRight size={18} className="translate-x-0 group-hover:translate-x-2 transition-transform" />
                                    </span>
                                )}
                            </button>
                        </form>

                        <div className="mt-12 pt-8 border-t border-surface-100 flex flex-col items-center gap-6">
                            <p className="text-surface-500 font-medium">
                                No network access yet?{' '}
                                <Link to="/register" className="text-surface-950 font-bold hover:underline decoration-primary-500 decoration-2 underline-offset-4">
                                    Enlist Profile
                                </Link>
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Login;
