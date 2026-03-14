import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

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
        <div className="min-h-screen flex text-slate-900 font-sans">
             {/* Left Image Side */}
            <div className="hidden lg:flex lg:w-1/2 bg-navy-900 relative items-center justify-center p-12 overflow-hidden">
                 <img src="/about_team.png" alt="Team Background" className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-overlay" />
                 <div className="relative z-10 max-w-md text-white">
                      <h2 className="text-4xl font-bold mb-6">Join the Elite Network.</h2>
                      <p className="text-lg text-slate-300 leading-relaxed">Whether you are a highly-skilled driver looking for top-tier opportunities or a company seeking reliable professionals, DriverHire is the only platform you need.</p>
                 </div>
            </div>

            {/* Right Form Side */}
            <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
                <div className="max-w-lg w-full space-y-8 bg-white p-10 rounded-2xl shadow-premium border border-slate-100">
                    <div>
                        <h2 className="mt-2 text-center text-3xl font-bold tracking-tight text-navy-900">
                            Create an Account
                        </h2>
                        <p className="mt-2 text-center text-sm text-muted-blue">
                            Join the premium platform for drivers and recruiters
                        </p>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={onSubmit}>
                        {(customError || isError) && (
                            <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm">{customError || message}</div>
                        )}
                        <div className="space-y-4">
                            <div>
                                <label className="label-text">I am a</label>
                                <select name="role" value={role} onChange={onChange} className="input-field">
                                    <option value="driver">Driver looking for a job</option>
                                    <option value="recruiter">Recruiter hiring drivers</option>
                                </select>
                            </div>

                            {role === 'recruiter' && (
                                <div>
                                    <label className="label-text">Company Name</label>
                                    <input name="companyName" type="text" required className="input-field" value={companyName} onChange={onChange} />
                                </div>
                            )}

                            <div>
                                <label className="label-text">Full Name</label>
                                <input name="name" type="text" required className="input-field" value={name} onChange={onChange} />
                            </div>

                            <div>
                                <label className="label-text">Email Address</label>
                                <input name="email" type="email" required className="input-field" value={email} onChange={onChange} />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="label-text">Password</label>
                                    <input name="password" type="password" required minLength={6} className="input-field" value={password} onChange={onChange} />
                                </div>
                                <div>
                                    <label className="label-text">Confirm Password</label>
                                    <input name="confirmPassword" type="password" required minLength={6} className="input-field" value={confirmPassword} onChange={onChange} />
                                </div>
                            </div>
                        </div>
                        <div>
                            <button type="submit" disabled={isLoading} className="w-full btn-primary py-3">
                                {isLoading ? 'Creating Account...' : 'Register'}
                            </button>
                        </div>
                        <div className="text-center text-sm text-charcoal">
                            Already have an account?{' '}
                            <Link to="/login" className="font-medium text-emerald-600 hover:text-emerald-500">
                                Sign In
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
