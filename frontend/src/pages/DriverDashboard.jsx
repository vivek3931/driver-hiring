import DashboardLayout from '../components/DashboardLayout';
import { Home, User, FileText, Briefcase } from 'lucide-react';

const DriverDashboard = () => {
    const driverLinks = [
        { name: 'Dashboard', path: '/driver/dashboard', icon: Home },
        { name: 'My Profile', path: '/driver/profile', icon: User },
        { name: 'My Applications', path: '/driver/applications', icon: FileText },
        { name: 'Find Jobs', path: '/jobs', icon: Briefcase },
    ];

    return (
        <DashboardLayout title="Driver Dashboard" links={driverLinks}>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="card p-6 border-l-4 border-l-emerald-500">
                    <h3 className="text-muted-blue text-sm font-medium">Profile Status</h3>
                    <p className="text-2xl font-bold text-navy-900 mt-2">Pending</p>
                </div>
                <div className="card p-6 border-l-4 border-l-blue-500">
                    <h3 className="text-muted-blue text-sm font-medium">Applied Jobs</h3>
                    <p className="text-2xl font-bold text-navy-900 mt-2">0</p>
                </div>
                <div className="card p-6 border-l-4 border-l-purple-500">
                    <h3 className="text-muted-blue text-sm font-medium">Interviews Scheduled</h3>
                    <p className="text-2xl font-bold text-navy-900 mt-2">0</p>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="card p-6 mt-8">
                <h2 className="text-xl font-bold text-navy-900 mb-4">Recent Activity</h2>
                <div className="text-center text-muted-blue py-8">
                    <p>No recent activity found. Complete your profile to start applying for jobs.</p>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default DriverDashboard;
