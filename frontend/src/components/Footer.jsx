import { Link } from 'react-router-dom';
import { ShieldCheck, Mail, Phone, MapPin, Twitter, Linkedin, Facebook, ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white text-surface-600 py-20 border-t border-surface-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 pb-16 border-b border-surface-100">
          
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6 group">
              <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center text-white shadow-premium group-hover:scale-110 transition-transform">
                <ShieldCheck size={24} strokeWidth={2.5} />
              </div>
              <span className="text-2xl font-extrabold text-surface-900 tracking-tight">Driver<span className="text-primary-600">Hire.</span></span>
            </Link>
            <p className="text-sm leading-relaxed font-medium text-surface-500 mb-8 max-w-xs">
              The gold standard in professional driver recruitment. Connecting elite talent with visionary organizations nationwide.
            </p>
            <div className="flex gap-4">
               {[Twitter, Linkedin, Facebook].map((Icon, i) => (
                 <a key={i} href="#" className="w-10 h-10 rounded-xl bg-surface-50 flex items-center justify-center text-surface-400 hover:bg-primary-600 hover:text-white transition-all shadow-subtle">
                   <Icon size={18} />
                 </a>
               ))}
            </div>
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-surface-900 font-extrabold mb-6 uppercase tracking-[0.2em] text-[10px]">Platform</h3>
            <ul className="space-y-4">
              <li><Link to="/jobs" className="text-sm font-bold hover:text-primary-600 transition-colors flex items-center gap-2 group"><ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" /> Professional Openings</Link></li>
              <li><Link to="/register" className="text-sm font-bold hover:text-primary-600 transition-colors flex items-center gap-2 group"><ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" /> Driver Network</Link></li>
              <li><Link to="/about" className="text-sm font-bold hover:text-primary-600 transition-colors flex items-center gap-2 group"><ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" /> Our Mission</Link></li>
              <li><Link to="/login" className="text-sm font-bold hover:text-primary-600 transition-colors flex items-center gap-2 group"><ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" /> Access Portal</Link></li>
            </ul>
          </div>

          {/* Governance */}
          <div>
            <h3 className="text-surface-900 font-extrabold mb-6 uppercase tracking-[0.2em] text-[10px]">Governance</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-sm font-bold hover:text-primary-600 transition-colors">Privacy Framework</a></li>
              <li><a href="#" className="text-sm font-bold hover:text-primary-600 transition-colors">Terms of Engagement</a></li>
              <li><a href="#" className="text-sm font-bold hover:text-primary-600 transition-colors">Trust & Safety Vetting</a></li>
              <li><a href="#" className="text-sm font-bold hover:text-primary-600 transition-colors">Compliance Standards</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-surface-900 font-extrabold mb-6 uppercase tracking-[0.2em] text-[10px]">Registry Hub</h3>
            <ul className="space-y-5">
              <li className="flex items-center gap-3 text-sm font-bold text-surface-900">
                <div className="w-8 h-8 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center shrink-0 shadow-subtle">
                  <Mail size={16} />
                </div> 
                support@driverhire.com
              </li>
              <li className="flex items-center gap-3 text-sm font-bold text-surface-900">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 shadow-subtle">
                  <Phone size={16} />
                </div> 
                800-ELITE-DRIVER
              </li>
              <li className="flex items-start gap-3 text-sm font-bold text-surface-900">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 shadow-subtle">
                  <MapPin size={16} />
                </div> 
                Corporate HQ, Level 24,<br/>Tech Corridor, India
              </li>
            </ul>
          </div>

        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center text-[10px] font-extrabold uppercase tracking-widest text-surface-400">
          <p>&copy; {new Date().getFullYear()} DriverHire Elite Logistics Infrastructure. All rights reserved.</p>
          <div className="flex gap-8 mt-6 md:mt-0">
             <span className="text-primary-600">Status: Operational</span>
             <span className="border-l border-surface-200 pl-8">Version 2.4.0-Premium</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
