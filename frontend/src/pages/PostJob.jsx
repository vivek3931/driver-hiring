import { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Home, Users, PlusCircle, Briefcase } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PostJob = () => {
  const navigate = useNavigate();
  const [jobData, setJobData] = useState({
    title: '',
    location: '',
    minSalary: '',
    maxSalary: '',
    experienceRequired: 0,
    vehicleTypeRequired: 'Car',
    shiftTiming: 'Day',
    employmentType: 'Full-time',
    vacancies: 1,
    description: '',
    benefits: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const recruiterLinks = [
    { name: 'Dashboard', path: '/recruiter/dashboard', icon: Home },
    { name: 'Post a Job', path: '/recruiter/jobs/new', icon: PlusCircle },
    { name: 'Manage Jobs', path: '/recruiter/jobs', icon: Briefcase },
    { name: 'Applicants', path: '/recruiter/applicants', icon: Users },
  ];

  const onChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const token = JSON.parse(localStorage.getItem('user'))?.token;
      
      const payload = {
        title: jobData.title,
        location: jobData.location,
        salaryRange: {
          min: Number(jobData.minSalary),
          max: Number(jobData.maxSalary)
        },
        experienceRequired: Number(jobData.experienceRequired),
        vehicleTypeRequired: jobData.vehicleTypeRequired,
        shiftTiming: jobData.shiftTiming,
        employmentType: jobData.employmentType,
        vacancies: Number(jobData.vacancies),
        description: jobData.description,
        benefits: jobData.benefits.split(',').map(b => b.trim())
      };

      await axios.post('http://localhost:5000/api/jobs', payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      navigate('/recruiter/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Error posting job');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout title="Post a New Job" links={recruiterLinks}>
      <div className="card p-8 max-w-4xl">
        <h2 className="text-2xl font-bold text-navy-900 mb-6">Job Details</h2>
        
        {error && (
          <div className="p-4 mb-6 rounded-md bg-red-50 text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="label-text">Job Title</label>
              <input type="text" name="title" required value={jobData.title} onChange={onChange} className="input-field" placeholder="e.g. Personal Car Driver needed" />
            </div>
            
            <div>
              <label className="label-text">Location</label>
              <input type="text" name="location" required value={jobData.location} onChange={onChange} className="input-field" placeholder="City, Area" />
            </div>
            
            <div>
              <label className="label-text">Required Vehicle Type</label>
              <select name="vehicleTypeRequired" required value={jobData.vehicleTypeRequired} onChange={onChange} className="input-field">
                <option value="Car">Car</option>
                <option value="Truck">Truck</option>
                <option value="Bus">Bus</option>
                <option value="Delivery Van">Delivery Van</option>
                <option value="Heavy Vehicle">Heavy Vehicle</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="label-text">Experience Required (Years)</label>
              <input type="number" name="experienceRequired" required value={jobData.experienceRequired} onChange={onChange} className="input-field" min="0" />
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div>
                  <label className="label-text">Min Salary</label>
                  <input type="number" name="minSalary" value={jobData.minSalary} onChange={onChange} className="input-field" placeholder="₹" />
               </div>
               <div>
                  <label className="label-text">Max Salary</label>
                  <input type="number" name="maxSalary" value={jobData.maxSalary} onChange={onChange} className="input-field" placeholder="₹" />
               </div>
            </div>

            <div>
              <label className="label-text">Shift Timing</label>
              <select name="shiftTiming" required value={jobData.shiftTiming} onChange={onChange} className="input-field">
                <option value="Day">Day</option>
                <option value="Night">Night</option>
                <option value="Flexible">Flexible</option>
              </select>
            </div>

            <div>
              <label className="label-text">Employment Type</label>
              <select name="employmentType" required value={jobData.employmentType} onChange={onChange} className="input-field">
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
              </select>
            </div>

            <div>
              <label className="label-text">Number of Vacancies</label>
              <input type="number" name="vacancies" required value={jobData.vacancies} onChange={onChange} className="input-field" min="1" />
            </div>

            <div className="md:col-span-2">
              <label className="label-text">Benefits (comma separated)</label>
              <input type="text" name="benefits" value={jobData.benefits} onChange={onChange} className="input-field" placeholder="e.g. Health Insurance, Overtime Pay" />
            </div>

            <div className="md:col-span-2">
              <label className="label-text">Job Description</label>
              <textarea name="description" required value={jobData.description} onChange={onChange} rows={5} className="input-field" placeholder="Describe the responsibilities and requirements..."></textarea>
            </div>
          </div>
          
          <div className="pt-4 border-t border-slate-200 flex justify-end">
            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? 'Posting...' : 'Post Job'}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default PostJob;
