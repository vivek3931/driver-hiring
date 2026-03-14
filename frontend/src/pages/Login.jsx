import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

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
        <div className="min-h-screen flex text-slate-900 font-sans">
            {/* Left Image Side */}
            <div className="hidden lg:flex lg:w-1/2 bg-navy-900 relative items-center justify-center p-12 overflow-hidden">
                 <img src="/login_bg.png" alt="Premium Background" className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay" />
                 <div className="relative z-10 max-w-md text-white">
                      <h2 className="text-4xl font-bold mb-6">Welcome to DriverHire Premium.</h2>
                      <p className="text-lg text-slate-300 leading-relaxed">Access India's most trusted network of verified drivers and top-tier employers. Sign in to manage your profile, view applications, and connect with professionals.</p>
                 </div>
            </div>

            {/* Right Form Side */}
            <div className="flex-1 flex items-center justify-center p-8 bg-slate-50">
                <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-premium border border-slate-100">
                    <div>
                        <h2 className="mt-2 text-center text-3xl font-bold tracking-tight text-navy-900">
                            Welcome Back
                        </h2>
                        <p className="mt-2 text-center text-sm text-muted-blue">
                            Sign in to access your dashboard
                        </p>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={onSubmit}>
                        {isError && <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm">{message}</div>}
                        <div className="space-y-4">
                            <div>
                                <label className="label-text">Email Address</label>
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    className="input-field"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={onChange}
                                />
                            </div>
                            <div>
                                <label className="label-text">Password</label>
                                <input
                                    name="password"
                                    type="password"
                                    required
                                    className="input-field"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={onChange}
                                />
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full btn-primary py-3"
                            >
                                {isLoading ? 'Signing In...' : 'Sign In'}
                            </button>
                        </div>
                        <div className="text-center text-sm text-charcoal">
                            Don't have an account?{' '}
                            <Link to="/register" className="font-medium text-emerald-600 hover:text-emerald-500">
                                Register here
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
