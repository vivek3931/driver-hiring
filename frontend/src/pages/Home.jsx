import { Link } from 'react-router-dom';
import { CheckCircle, Shield, Clock, Users } from 'lucide-react';

const Home = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-medium text-sm w-fit mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Over 1,000+ Drivers Hired This Month
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-navy-900 tracking-tight leading-tight mb-6">
              Find Your Next <span className="text-emerald-600">Premium</span> Driving Job
            </h1>
            <p className="text-lg text-muted-blue max-w-xl mb-10 leading-relaxed">
              Connect with top companies, personal clients, and agencies looking for verified, professional drivers. Start your journey today with India's most trusted driver hiring platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/jobs" className="btn-primary text-center text-lg px-8 py-3 w-full sm:w-auto">
                Browse Jobs
              </Link>
              <Link to="/register" className="btn-secondary text-center text-lg px-8 py-3 w-full sm:w-auto">
                Register as a Driver
              </Link>
            </div>
            
            <div className="mt-10 flex items-center gap-4 text-sm font-medium text-charcoal">
              <div className="flex -space-x-2">
                <img className="w-8 h-8 rounded-full border-2 border-white bg-slate-200" src="https://i.pravatar.cc/100?img=1" alt="Driver 1" />
                <img className="w-8 h-8 rounded-full border-2 border-white bg-slate-200" src="https://i.pravatar.cc/100?img=2" alt="Driver 2" />
                <img className="w-8 h-8 rounded-full border-2 border-white bg-slate-200" src="https://i.pravatar.cc/100?img=3" alt="Driver 3" />
                <div className="w-8 h-8 rounded-full border-2 border-white bg-navy-900 text-white flex items-center justify-center text-xs">+1k</div>
              </div>
              <p>Trusted by professionals across the country</p>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-emerald-600 rounded-3xl transform translate-x-4 translate-y-4 opacity-10"></div>
            <img 
              src="/hero_driver.png" 
              alt="Professional Driver" 
              className="relative z-10 w-full h-auto object-cover rounded-3xl shadow-premium border border-slate-100 min-h-[400px] bg-slate-200"
            />
            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-premium z-20 flex items-center gap-4 border border-slate-100 hidden sm:flex">
              <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600">
                <CheckCircle size={24} />
              </div>
              <div>
                <p className="font-bold text-navy-900 leading-none">100%</p>
                <p className="text-sm text-muted-blue">Verified Drivers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="bg-white py-20 border-t border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-navy-900 mb-4">Why Choose DriverHire?</h2>
          <p className="text-muted-blue max-w-2xl mx-auto mb-16">We provide a premium, seamless experience for both recruiters and drivers, ensuring safety, reliability, and speed.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-left">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-soft transition-shadow">
              <div className="w-12 h-12 bg-navy-900 text-white rounded-lg flex items-center justify-center mb-6 shadow-sm">
                <Shield size={24} />
              </div>
              <h3 className="text-xl font-bold text-navy-900 mb-3">Verified Profiles</h3>
              <p className="text-muted-blue text-sm leading-relaxed">Every driver background is thoroughly checked. We verify licenses, ID proofs, and previous employment history to ensure maximum reliability and trust for employers.</p>
            </div>
            
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-soft transition-shadow">
              <div className="w-12 h-12 bg-emerald-600 text-white rounded-lg flex items-center justify-center mb-6 shadow-sm">
                <Clock size={24} />
              </div>
              <h3 className="text-xl font-bold text-navy-900 mb-3">Fast Hiring Process</h3>
              <p className="text-muted-blue text-sm leading-relaxed">Our smart filtering algorithm matches the right driver with the right recruiter instantly. Post a job and start receiving qualified applications within hours.</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-soft transition-shadow">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center mb-6 shadow-sm">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-bold text-navy-900 mb-3">Diverse Job Types</h3>
              <p className="text-muted-blue text-sm leading-relaxed">Whether you need a personal chauffeur, a commercial truck driver, or delivery partners for your logistics business, we have a vast pool of specialized drivers.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-navy-900 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-emerald-500 opacity-20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 rounded-full bg-blue-500 opacity-20 blur-3xl"></div>
        
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <img src="/trusted_badge.png" alt="Trusted Badge" className="w-24 h-24 mx-auto mb-8 rounded-full shadow-lg border-4 border-white/10" />
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Hire or Get Hired?</h2>
          <p className="text-slate-300 text-lg mb-10 max-w-2xl mx-auto">Join thousands of verified drivers and trusted companies using our platform daily.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
             <Link to="/register" className="btn-success text-center text-lg px-8 py-3 shadow-lg">
                Create a Free Account
              </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
