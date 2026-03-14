import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { LogOut } from 'lucide-react';

const DashboardLayout = ({ title, links, children }) => {
    const { user, logout } = useAuthStore();
    const location = useLocation();

    return (
        <div className="flex min-h-[calc(100vh-4rem)] bg-slate-50">
            {/* Sidebar */}
            <aside className="w-64 bg-navy-900 text-white flex flex-col hidden md:flex min-h-full shadow-premium">
                <div className="p-6 border-b border-navy-800">
                    <h2 className="text-xl font-bold tracking-tight">{user?.name}</h2>
                    <p className="text-muted-blue text-sm capitalize">{user?.role} Portal</p>
                </div>
                <nav className="flex-1 px-4 py-6 space-y-2">
                    {links.map((link) => {
                        const isActive = location.pathname === link.path;
                        const Icon = link.icon;
                        return (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-300 hover:bg-navy-800 hover:text-white'
                                    }`}
                            >
                                {Icon && <Icon size={20} />}
                                <span className="font-medium">{link.name}</span>
                            </Link>
                        );
                    })}
                </nav>
                <div className="p-4 border-t border-navy-800">
                    <button
                        onClick={logout}
                        className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-navy-800 rounded-lg transition-colors font-medium"
                    >
                        <LogOut size={20} />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                <div className="p-8">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl font-bold text-navy-900 tracking-tight">{title}</h1>
                    </div>
                    <div className="space-y-6">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
