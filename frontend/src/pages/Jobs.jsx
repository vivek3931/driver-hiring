import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    location: '',
    vehicleType: '',
    keyword: ''
  });

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const res = await axios.get(`http://localhost:5000/api/jobs?${queryParams}`);
      setJobs(res.data);
    } catch (error) {
      console.error("Error fetching jobs", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
    // eslint-disable-next-line
  }, []);

  const onFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const applyFilters = (e) => {
    e.preventDefault();
    fetchJobs();
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-navy-900 tracking-tight">Find Your Perfect Driving Job</h1>
          <p className="mt-4 text-lg text-muted-blue">Browse through premium listings from verified companies.</p>
        </div>

        {/* Search Bar / Filters */}
        <div className="card p-6 mb-10">
          <form onSubmit={applyFilters} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
               <input type="text" name="keyword" placeholder="Job title or keywords" value={filters.keyword} onChange={onFilterChange} className="input-field" />
            </div>
            <div>
               <input type="text" name="location" placeholder="City or area" value={filters.location} onChange={onFilterChange} className="input-field" />
            </div>
            <div>
               <select name="vehicleType" value={filters.vehicleType} onChange={onFilterChange} className="input-field text-charcoal">
                 <option value="">Any Vehicle Type</option>
                 <option value="Car">Car</option>
                 <option value="Truck">Truck</option>
                 <option value="Bus">Bus</option>
                 <option value="Delivery Van">Delivery Van</option>
                 <option value="Heavy Vehicle">Heavy Vehicle</option>
               </select>
            </div>
            <div>
              <button type="submit" className="btn-primary w-full h-full">Search Jobs</button>
            </div>
          </form>
        </div>

        {/* Jobs List */}
        {loading ? (
          <div className="text-center py-20 text-muted-blue text-xl">Loading jobs...</div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-lg border border-slate-200 shadow-sm">
            <p className="text-xl text-navy-900 font-medium">No jobs found matching your criteria</p>
            <button onClick={() => { setFilters({location:'', vehicleType:'', keyword:''}); fetchJobs(); }} className="mt-4 text-emerald-600 font-medium hover:underline">Clear Filters</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map(job => (
              <div key={job._id} className="card p-6 flex flex-col hover:-translate-y-1 transition-transform duration-300">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-navy-900 leading-tight">{job.title}</h3>
                    <p className="text-emerald-600 font-medium mt-1">{job.recruiter?.name || 'Verified Company'}</p>
                  </div>
                  <span className="bg-slate-100 text-slate-600 text-xs font-bold px-3 py-1 rounded-full">{job.employmentType}</span>
                </div>
                
                <div className="space-y-2 mb-6 flex-1">
                  <p className="text-sm text-charcoal flex items-center gap-2"><span className="text-muted-blue">📍</span> {job.location}</p>
                  <p className="text-sm text-charcoal flex items-center gap-2"><span className="text-muted-blue">🚘</span> {job.vehicleTypeRequired}</p>
                  <p className="text-sm text-charcoal flex items-center gap-2"><span className="text-muted-blue">⚡</span> {job.experienceRequired}+ years experience</p>
                  {job.salaryRange && (
                    <p className="text-sm text-charcoal font-medium mt-2">₹{job.salaryRange.min} - ₹{job.salaryRange.max} / month</p>
                  )}
                </div>

                <Link to={`/jobs/${job._id}`} className="btn-secondary w-full text-center mt-auto">
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Jobs;
