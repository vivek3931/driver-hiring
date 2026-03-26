import { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Home, Car, User, FileText, Briefcase, Phone, MapPin, Gauge, IndianRupee, Languages, Calendar, Save, CheckCircle2 } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import axios from 'axios';
import { motion } from 'framer-motion';

const DriverProfileForm = () => {
  const { user } = useAuthStore();
  const [profileData, setProfileData] = useState({
    phone: '',
    location: '',
    experience: 0,
    expectedSalary: 0,
    availabilityStatus: 'Available',
    languagesKnown: '',
    drivingLicenseNumber: '',
    vehicleTypes: []
  });

  const availableVehicleTypes = ['Car', 'Truck', 'Bus', 'Ambulance', 'Bike', 'Delivery Van', 'Heavy Vehicle', 'Other'];
  
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
        const { data } = await axios.get('/api/driver/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (data) {
          setProfileData({
            phone: data.phone || '',
            location: data.location || '',
            experience: data.experience || 0,
            expectedSalary: data.expectedSalary || 0,
            availabilityStatus: data.availabilityStatus || 'Available',
            languagesKnown: data.languagesKnown ? data.languagesKnown.join(', ') : '',
            drivingLicenseNumber: data.drivingLicense?.number || '',
            vehicleTypes: data.vehicleTypes || []
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
          languagesKnown: profileData.languagesKnown.split(',').map(lang => lang.trim()),
          drivingLicense: {
            number: profileData.drivingLicenseNumber
          }
      };

      await axios.put('/api/driver/profile', updateData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('Profile updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error updating profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout title="Professional Profile" links={driverLinks}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card p-10 max-w-4xl bg-white relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-50 rounded-full -mr-32 -mt-32 opacity-20"></div>
        
        <div className="relative z-10">
            <div className="flex items-center gap-4 mb-10 pb-10 border-b border-surface-100">
                <div className="w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center text-white shadow-premium">
                    <User size={32} />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-surface-900 tracking-tight">Driver Identity</h2>
                    <p className="text-surface-500 font-semibold text-xs tracking-wide">Enhance your professional standing with detailed information.</p>
                </div>
            </div>
            
            {message && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 mb-8 rounded-2xl font-bold text-sm flex items-center gap-3 border ${
                    message.includes('success') 
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                    : 'bg-rose-50 text-rose-700 border-rose-100'
                }`}
              >
                {message.includes('success') ? <CheckCircle2 size={18} /> : <FileText size={18} />}
                {message}
              </motion.div>
            )}

            <form onSubmit={onSubmit} className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                <div className="space-y-2">
                  <label className="text-surface-900 font-bold text-sm flex items-center gap-2">
                    <Phone size={16} className="text-primary-600" /> Phone Number
                  </label>
                  <input type="text" name="phone" value={profileData.phone} onChange={onChange} className="input-field" placeholder="+91 9876543210" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-surface-900 font-bold text-sm flex items-center gap-2">
                    <MapPin size={16} className="text-primary-600" /> Current City
                  </label>
                  <input type="text" name="location" value={profileData.location} onChange={onChange} className="input-field" placeholder="Mumbai, MH" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-surface-900 font-bold text-sm flex items-center gap-2">
                    <Gauge size={16} className="text-primary-600" /> Experience (Years)
                  </label>
                  <input type="number" name="experience" value={profileData.experience} onChange={onChange} className="input-field" min="0" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-surface-900 font-bold text-sm flex items-center gap-2">
                    <IndianRupee size={16} className="text-primary-600" /> Expected Monthly Salary
                  </label>
                  <input type="number" name="expectedSalary" value={profileData.expectedSalary} onChange={onChange} className="input-field" min="0" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-surface-900 font-bold text-sm flex items-center gap-2">
                    <Calendar size={16} className="text-primary-600" /> Availability Status
                  </label>
                  <select name="availabilityStatus" value={profileData.availabilityStatus} onChange={onChange} className="input-field appearance-none cursor-pointer">
                    <option value="Available">Open to Assignments</option>
                    <option value="Hired">Currently on Mission</option>
                    <option value="Unavailable">Taking a Break</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-surface-900 font-bold text-sm flex items-center gap-2">
                    <Languages size={16} className="text-primary-600" /> Languages Fluency
                  </label>
                  <input type="text" name="languagesKnown" value={profileData.languagesKnown} onChange={onChange} className="input-field" placeholder="English, Hindi, Regional..." />
                </div>

                <div className="space-y-2">
                  <label className="text-surface-900 font-bold text-sm flex items-center gap-2">
                    <FileText size={16} className="text-primary-600" /> Driving License Number
                  </label>
                  <input type="text" name="drivingLicenseNumber" value={profileData.drivingLicenseNumber} onChange={onChange} className="input-field" placeholder="DL-1234567890" />
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-surface-900 font-bold text-sm flex items-center gap-2">
                  <Car size={16} className="text-primary-600" /> Vehicle Types You Can Drive
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {availableVehicleTypes.map(type => (
                    <label key={type} className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${profileData.vehicleTypes.includes(type) ? 'bg-primary-50 border-primary-200 text-primary-700' : 'bg-surface-50 border-surface-100 text-surface-600 hover:bg-white'}`}>
                      <input 
                        type="checkbox" 
                        checked={profileData.vehicleTypes.includes(type)}
                        onChange={(e) => {
                          const newTypes = e.target.checked 
                            ? [...profileData.vehicleTypes, type]
                            : profileData.vehicleTypes.filter(t => t !== type);
                          setProfileData({ ...profileData, vehicleTypes: newTypes });
                        }}
                        className="hidden"
                      />
                      <span className="text-xs font-bold">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="pt-10 border-t border-surface-100 flex items-center justify-between">
                <p className="text-surface-400 text-xs font-medium max-w-[300px]">Update your profile regularly to maintain a high ranking in recruiter searches.</p>
                <button 
                    type="submit" 
                    disabled={loading} 
                    className={`btn-primary px-10 py-3.5 flex items-center gap-2.5 shadow-lg shadow-primary-200 font-bold text-sm ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                    {loading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                        <Save size={18} />
                    )}
                    {loading ? 'Processing...' : 'Securely Save Profile'}
                </button>
              </div>
            </form>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default DriverProfileForm;
