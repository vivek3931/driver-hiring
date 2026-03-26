import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { motion } from 'framer-motion';
import { User, Mail, Lock, ShieldCheck, Briefcase, ChevronRight, ArrowRight, CheckCircle2, Navigation } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'driver',
        companyName: '' // For recruiters
    });

    const { name, email, password, confirmPassword, role, companyName } = formData;
    const navigate = useNavigate();
    const { user, isLoading, isError, isSuccess, message, register, reset } = useAuthStore();
    const [customError, setCustomError] = useState('');

    useEffect(() => {
        if (isError) {
            setCustomError(message);
        }
        if (isSuccess || user) {
            if (user?.role === 'driver') navigate('/driver/dashboard');
            else if (user?.role === 'recruiter') navigate('/recruiter/dashboard');
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
        if (password !== confirmPassword) {
            setCustomError('Passwords do not match');
        } else {
            setCustomError('');
            register({ name, email, password, role, companyName });
        }
    };

    return (
        <div className="min-h-screen flex bg-white lg:pt-0 pt-32">
             {/* Left Content Side: The Value Prop */}
             <div className="hidden lg:flex lg:w-1/2 bg-surface-950 relative items-center justify-center p-24 overflow-hidden">
                <div className="absolute inset-0 map-gradient opacity-10"></div>
                 <div className="relative z-10 max-w-lg">
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-20 h-20 bg-primary-600 rounded-[24px] flex items-center justify-center text-white shadow-uber mb-12"
                      >
                        <ShieldCheck size={40} strokeWidth={2.5} />
                      </motion.div>
                      
                      <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl lg:text-6xl font-bold text-white mb-10 tracking-tighter leading-tight"
                      >
                        Start Your <br />
                        <span className="text-primary-500 text-4xl lg:text-5xl">Professional Journey.</span>
                      </motion.h2>
                      
                      <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-surface-400 leading-relaxed font-medium mb-12"
                      >
                        Join the most trusted ecosystem for professional mobility. We bridge the gap between skill and high-end logistical opportunity.
                      </motion.p>
                      
                      <div className="space-y-6">
                        {[
                          "Access to high-paying strategic missions",
                          "Advanced operational dashboard",
                          "Elite verification certification"
                        ].map((text, i) => (
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
                            <span>{text}</span>
                          </motion.div>
                        ))}
                      </div>
                 </div>
            </div>

            {/* Right Form Side: Interaction */}
            <div className="flex-1 flex items-center justify-center py-20 px-6 lg:px-24">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-xl w-full"
                >
                    <div className="mb-12">
                         <div className="flex items-center gap-2 mb-6 text-primary-600 lg:hidden">
                            <Navigation size={20} />
                            <span className="text-xs font-bold uppercase tracking-widest">Enlist in Network</span>
                        </div>
                        <h2 className="text-3xl lg:text-4xl font-bold text-surface-950 tracking-tighter mb-4">
                            New Deployment.
                        </h2>
                        <p className="text-surface-500 font-medium tracking-tight">
                            Establish your professional credentials to begin.
                        </p>
                    </div>

                    <form className="space-y-8" onSubmit={onSubmit}>
                        {(customError || isError) && (
                            <motion.div 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="p-5 bg-rose-50 text-rose-700 rounded-2xl text-sm font-bold border border-rose-100 flex items-center gap-3"
                            >
                                <ShieldCheck size={18} /> {customError || message}
                            </motion.div>
                        )}

                        <div className="space-y-8">
                            <div className="space-y-3">
                                <label className="label-text">Operational Role Classification</label>
                                <div className="grid grid-cols-2 gap-4">
                                    <button 
                                        type="button"
                                        onClick={() => setFormData({...formData, role: 'driver'})}
                                        className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 ${
                                            role === 'driver' 
                                            ? 'border-surface-950 bg-surface-950 text-white shadow-uber scale-[1.02]' 
                                            : 'border-surface-100 bg-surface-50 text-surface-400 hover:border-surface-200'
                                        }`}
                                    >
                                        <User size={24} />
                                        <span className="font-bold text-sm tracking-tight">Professional Driver</span>
                                    </button>
                                    <button 
                                        type="button"
                                        onClick={() => setFormData({...formData, role: 'recruiter'})}
                                        className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 ${
                                            role === 'recruiter' 
                                            ? 'border-surface-950 bg-surface-950 text-white shadow-uber scale-[1.02]' 
                                            : 'border-surface-100 bg-surface-50 text-surface-400 hover:border-surface-200'
                                        }`}
                                    >
                                        <Briefcase size={24} />
                                        <span className="font-bold text-sm tracking-tight">Strategic Recruiter</span>
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {role === 'recruiter' && (
                                    <div className="md:col-span-2">
                                        <label className="label-text">Strategic Entity Name</label>
                                        <input name="companyName" type="text" required className="input-field" placeholder="Elite Logistics Pvt Ltd" value={companyName} onChange={onChange} />
                                    </div>
                                )}

                                <div className={role === 'recruiter' ? 'md:col-span-1' : 'md:col-span-2'}>
                                    <label className="label-text">Full Operational Name</label>
                                    <input name="name" type="text" required className="input-field" placeholder="John Doe" value={name} onChange={onChange} />
                                </div>

                                <div className={role === 'recruiter' ? 'md:col-span-1' : 'md:col-span-2'}>
                                    <label className="label-text">Communications / Email</label>
                                    <input name="email" type="email" required className="input-field" placeholder="user@network.com" value={email} onChange={onChange} />
                                </div>

                                <div>
                                    <label className="label-text">Set Access Key</label>
                                    <input name="password" type="password" required minLength={6} className="input-field" placeholder="••••••••" value={password} onChange={onChange} />
                                </div>
                                
                                <div>
                                    <label className="label-text">Confirm Access Key</label>
                                    <input name="confirmPassword" type="password" required minLength={6} className="input-field" placeholder="••••••••" value={confirmPassword} onChange={onChange} />
                                </div>
                            </div>
                        </div>
                        
                        <button type="submit" disabled={isLoading} className="w-full btn-primary py-5 group">
                            {isLoading ? (
                                <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <span className="flex items-center justify-center gap-3">
                                    Finalize Enlistment <ArrowRight size={20} className="translate-x-0 group-hover:translate-x-2 transition-transform" />
                                </span>
                            )}
                        </button>

                        <p className="text-center text-surface-500 font-bold text-xs uppercase tracking-widest mt-12">
                            Identification already on file?{' '}
                            <Link to="/login" className="text-surface-950 hover:underline decoration-primary-500 decoration-2 underline-offset-8 transition-all px-2">
                                Authorize Sign In
                            </Link>
                        </p>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default Register;
