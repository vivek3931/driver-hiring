import { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Home, User, FileText, Briefcase } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import axios from 'axios';

const DriverProfileForm = () => {
  const { user } = useAuthStore();
  const [profileData, setProfileData] = useState({
    phone: '',
    location: '',
    experience: 0,
    expectedSalary: 0,
    availabilityStatus: 'Available',
    languagesKnown: '',
  });
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const driverLinks = [
    { name: 'Dashboard', path: '/driver/dashboard', icon: Home },
    { name: 'My Profile', path: '/driver/profile', icon: User },
    { name: 'My Applications', path: '/driver/applications', icon: FileText },
    { name: 'Find Jobs', path: '/jobs', icon: Briefcase },
  ];

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('user'))?.token;
        const res = await axios.get('http://localhost:5000/api/driver/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.data) {
          setProfileData({
            phone: res.data.phone || '',
            location: res.data.location || '',
            experience: res.data.experience || 0,
            expectedSalary: res.data.expectedSalary || 0,
            availabilityStatus: res.data.availabilityStatus || 'Available',
            languagesKnown: res.data.languagesKnown ? res.data.languagesKnown.join(', ') : '',
          });
        }
      } catch (err) {
        console.error("Error fetching profile", err);
      }
    };
    fetchProfile();
  }, []);

  const onChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const token = JSON.parse(localStorage.getItem('user'))?.token;
      
      const updateData = {
          ...profileData,
          languagesKnown: profileData.languagesKnown.split(',').map(lang => lang.trim())
      };

      await axios.put('http://localhost:5000/api/driver/profile', updateData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('Profile updated successfully!');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error updating profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout title="My Profile" links={driverLinks}>
      <div className="card p-8 max-w-3xl">
        <h2 className="text-2xl font-bold text-navy-900 mb-6">Personal & Professional Details</h2>
        
        {message && (
          <div className={`p-4 mb-6 rounded-md ${message.includes('success') ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
            {message}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="label-text">Phone Number</label>
              <input type="text" name="phone" value={profileData.phone} onChange={onChange} className="input-field" placeholder="+91 9876543210" />
            </div>
            <div>
              <label className="label-text">Current Location</label>
              <input type="text" name="location" value={profileData.location} onChange={onChange} className="input-field" placeholder="City, State" />
            </div>
            <div>
              <label className="label-text">Years of Experience</label>
              <input type="number" name="experience" value={profileData.experience} onChange={onChange} className="input-field" min="0" />
            </div>
            <div>
              <label className="label-text">Expected Salary (Monthly)</label>
              <input type="number" name="expectedSalary" value={profileData.expectedSalary} onChange={onChange} className="input-field" min="0" />
            </div>
            <div>
              <label className="label-text">Availability</label>
              <select name="availabilityStatus" value={profileData.availabilityStatus} onChange={onChange} className="input-field">
                <option value="Available">Available for Hire</option>
                <option value="Hired">Currently Employed</option>
                <option value="Unavailable">Not Available</option>
              </select>
            </div>
            <div>
              <label className="label-text">Languages Known (comma separated)</label>
              <input type="text" name="languagesKnown" value={profileData.languagesKnown} onChange={onChange} className="input-field" placeholder="English, Hindi, Marathi" />
            </div>
          </div>
          
          <div className="pt-4 border-t border-slate-200">
            <button type="submit" disabled={loading} className="btn-primary w-full md:w-auto">
              {loading ? 'Saving...' : 'Save Profile Details'}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default DriverProfileForm;
