import { Link } from 'react-router-dom';
import { ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-navy-900 text-slate-300 py-12 border-t border-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 border-b border-navy-800 pb-8">
          
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="text-emerald-500" size={28} />
              <span className="text-2xl font-bold text-white tracking-tight">DriverHire<span className="text-emerald-500">.</span></span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400 mb-6">
              India's premium and most trusted platform for connecting verified professional drivers with top-tier recruiters and clients.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-sm hover:text-emerald-400 transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-sm hover:text-emerald-400 transition-colors">About Us</Link></li>
              <li><Link to="/jobs" className="text-sm hover:text-emerald-400 transition-colors">Browse Jobs</Link></li>
              <li><Link to="/register" className="text-sm hover:text-emerald-400 transition-colors">Create Account</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Legal</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm hover:text-emerald-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-sm hover:text-emerald-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-sm hover:text-emerald-400 transition-colors">Trust & Safety</a></li>
              <li><a href="#" className="text-sm hover:text-emerald-400 transition-colors">Cookie Policy</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm"><Mail size={16} className="text-emerald-500" /> support@driverhire.com</li>
              <li className="flex items-center gap-2 text-sm"><Phone size={16} className="text-emerald-500" /> 1800-123-4567</li>
              <li className="flex items-start gap-2 text-sm"><MapPin size={16} className="text-emerald-500 mt-1 flex-shrink-0" /> Tech Hub, Phase 2,<br/>Bangalore, India 560100</li>
            </ul>
          </div>

        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} DriverHire Premium Platform. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
             <a href="#" className="hover:text-white transition-colors">Twitter</a>
             <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
             <a href="#" className="hover:text-white transition-colors">Facebook</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
