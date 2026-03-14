import DashboardLayout from '../components/DashboardLayout';
import { Home, Users, PlusCircle, Briefcase } from 'lucide-react';

const RecruiterDashboard = () => {
    const recruiterLinks = [
        { name: 'Dashboard', path: '/recruiter/dashboard', icon: Home },
        { name: 'Post a Job', path: '/recruiter/jobs/new', icon: PlusCircle },
        { name: 'Manage Jobs', path: '/recruiter/jobs', icon: Briefcase },
        { name: 'Applicants', path: '/recruiter/applicants', icon: Users },
    ];

    return (
        <DashboardLayout title="Recruiter Dashboard" links={recruiterLinks}>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="card p-6 border-l-4 border-l-emerald-500">
                    <h3 className="text-muted-blue text-sm font-medium">Active Jobs</h3>
                    <p className="text-2xl font-bold text-navy-900 mt-2">0</p>
                </div>
                <div className="card p-6 border-l-4 border-l-blue-500">
                    <h3 className="text-muted-blue text-sm font-medium">Total Applicants</h3>
                    <p className="text-2xl font-bold text-navy-900 mt-2">0</p>
                </div>
                <div className="card p-6 border-l-4 border-l-purple-500">
                    <h3 className="text-muted-blue text-sm font-medium">Shortlisted</h3>
                    <p className="text-2xl font-bold text-navy-900 mt-2">0</p>
                </div>
            </div>

            {/* Recent Applications */}
            <div className="card p-6 mt-8">
                <h2 className="text-xl font-bold text-navy-900 mb-4">Recent Applications</h2>
                <div className="text-center text-muted-blue py-8">
                    <p>No recent applications found. Start by posting a job.</p>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default RecruiterDashboard;
