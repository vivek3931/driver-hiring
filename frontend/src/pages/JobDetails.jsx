import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/jobs/${id}`);
        setJob(res.data);
      } catch (err) {
        setError('Job not found');
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  const handleApply = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    if (user.role !== 'driver') {
      setError('Only drivers can apply for jobs.');
      return;
    }

    setApplying(true);
    setError('');
    setMessage('');
    
    try {
      const token = JSON.parse(localStorage.getItem('user'))?.token;
      await axios.post(`http://localhost:5000/api/applications/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('Successfully applied for this job!');
    } catch (err) {
      setError(err.response?.data?.message || 'Error applying for job');
    } finally {
      setApplying(false);
    }
  };

  if (loading) return <div className="text-center py-20 text-xl font-medium text-muted-blue">Loading job details...</div>;
  if (!job) return <div className="text-center py-20 text-xl font-medium text-red-500">{error}</div>;

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="card p-8 bg-white border border-slate-200">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-100 pb-6 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-navy-900 tracking-tight">{job.title}</h1>
              <p className="text-emerald-600 font-medium text-lg mt-2">{job.recruiter?.name || 'Verified Company'}</p>
              <div className="flex items-center gap-4 mt-3 text-sm text-charcoal">
                <span className="flex items-center gap-1"><span className="text-muted-blue">📍</span> {job.location}</span>
                <span className="flex items-center gap-1"><span className="text-muted-blue">💼</span> {job.employmentType}</span>
                <span className="flex items-center gap-1"><span className="text-muted-blue">🕒</span> {job.shiftTiming} Shift</span>
              </div>
            </div>
            
            <div className="mt-6 md:mt-0 text-right">
              {job.salaryRange && (
                <div className="text-2xl font-bold text-navy-900 mb-4">
                  ₹{job.salaryRange.min} - ₹{job.salaryRange.max} <span className="text-base font-normal text-muted-blue">/ month</span>
                </div>
              )}
              <button 
                onClick={handleApply} 
                disabled={applying || message !== ''} 
                className={`w-full md:w-auto px-8 py-3 rounded-md font-medium text-white transition-colors ${message ? 'bg-emerald-500 cursor-not-allowed' : 'bg-navy-900 hover:bg-navy-800 shadow-sm'}`}
              >
                {applying ? 'Applying...' : message ? 'Applied ✓' : 'Apply Now'}
              </button>
            </div>
          </div>
          
          {(error || message) && (
            <div className={`p-4 mb-6 rounded-md ${error ? 'bg-red-50 text-red-700' : 'bg-emerald-50 text-emerald-700'}`}>
              {error || message}
            </div>
          )}

          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-bold text-navy-900 mb-4">Job Description</h2>
              <div className="text-charcoal whitespace-pre-line leading-relaxed">
                {job.description}
              </div>
            </section>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <section>
                <h2 className="text-xl font-bold text-navy-900 mb-4">Requirements</h2>
                <ul className="space-y-2 text-charcoal list-disc list-inside">
                  <li><strong>Vehicle Type:</strong> {job.vehicleTypeRequired}</li>
                  <li><strong>Experience Minimum:</strong> {job.experienceRequired} years</li>
                </ul>
              </section>
              
              {job.benefits && job.benefits.length > 0 && (
                <section>
                  <h2 className="text-xl font-bold text-navy-900 mb-4">Benefits</h2>
                  <ul className="space-y-2 text-charcoal list-disc list-inside">
                    {job.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
