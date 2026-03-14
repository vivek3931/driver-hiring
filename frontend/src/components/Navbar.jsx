import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { ShieldCheck } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuthStore();
    const navigate = useNavigate();

    const onLogout = () => {
        logout();
        navigate('/');
    };

    const dashboardLink =
        user?.role === 'driver' ? '/driver/dashboard' :
            user?.role === 'recruiter' ? '/recruiter/dashboard' :
                user?.role === 'admin' ? '/admin/dashboard' : '/';

    return (
        <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0 flex items-center gap-2">
                        <ShieldCheck className="text-emerald-600" size={28} />
                        <Link to="/" className="text-2xl font-bold text-navy-900 tracking-tight">DriverHire<span className="text-emerald-600">.</span></Link>
                    </div>
                    <nav className="hidden md:flex space-x-8">
                        <Link to="/" className="text-charcoal hover:text-navy-900 font-medium">Home</Link>
                        <Link to="/jobs" className="text-charcoal hover:text-navy-900 font-medium">Find Jobs</Link>
                    </nav>
                    <div className="flex items-center space-x-4">
                        {user ? (
                            <>
                                <Link to={dashboardLink} className="text-navy-900 font-medium hover:text-emerald-600">
                                    Dashboard
                                </Link>
                                <button onClick={onLogout} className="btn-secondary px-4 py-2 text-sm">
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-navy-900 font-medium hover:text-emerald-600 px-3 py-2">
                                    Sign In
                                </Link>
                                <Link to="/register" className="btn-primary px-4 py-2 text-sm">
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
