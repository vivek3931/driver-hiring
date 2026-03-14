import DashboardLayout from '../components/DashboardLayout';
import { Home, Users, CheckSquare, Settings } from 'lucide-react';

const AdminDashboard = () => {
  const adminLinks = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: Home },
    { name: 'Manage Drivers', path: '/admin/drivers', icon: Users },
    { name: 'Manage Recruiters', path: '/admin/recruiters', icon: Users },
    { name: 'Verifications', path: '/admin/verifications', icon: CheckSquare },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <DashboardLayout title="Admin Control Panel" links={adminLinks}>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card p-6 border-l-4 border-l-navy-900">
          <h3 className="text-muted-blue text-sm font-medium">Total Users</h3>
          <p className="text-2xl font-bold text-navy-900 mt-2">0</p>
        </div>
        <div className="card p-6 border-l-4 border-l-emerald-500">
          <h3 className="text-muted-blue text-sm font-medium">Active Jobs</h3>
          <p className="text-2xl font-bold text-navy-900 mt-2">0</p>
        </div>
        <div className="card p-6 border-l-4 border-l-blue-500">
          <h3 className="text-muted-blue text-sm font-medium">Pending Verifications</h3>
          <p className="text-2xl font-bold text-navy-900 mt-2">0</p>
        </div>
        <div className="card p-6 border-l-4 border-l-purple-500">
          <h3 className="text-muted-blue text-sm font-medium">Total Applications</h3>
          <p className="text-2xl font-bold text-navy-900 mt-2">0</p>
        </div>
      </div>

      {/* Action Requests */}
      <div className="card p-6 mt-8">
        <h2 className="text-xl font-bold text-navy-900 mb-4">Pending Verifications</h2>
        <div className="text-center text-muted-blue py-8">
          <p>No pending verification requests at the moment.</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
