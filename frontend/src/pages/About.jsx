import { Link } from 'react-router-dom';
import { Shield, Users, Target, Clock, Globe, Award } from 'lucide-react';

const About = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-navy-900 text-white py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
             <img src="/about_team.png" alt="Our Team" className="w-full h-full object-cover mix-blend-luminosity" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900 to-transparent z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Redefining Driver Recruitment.</h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            DriverHire is India's most trusted premium platform connecting verified, professional drivers with top-tier companies and individuals. We prioritize safety, reliability, and speed in every hire.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-navy-900 mb-4">Our Core Values</h2>
            <p className="text-muted-blue text-lg max-w-2xl mx-auto">The principles that guide our platform and ensure a premium experience for everyone.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card p-8 border hover:border-emerald-500 transition-colors">
              <Shield className="text-emerald-600 mb-6" size={40} />
              <h3 className="text-xl font-bold text-navy-900 mb-3">Uncompromising Safety</h3>
              <p className="text-charcoal leading-relaxed">Every driver on our platform undergoes a rigorous multi-point background check. We verify identities, driving records, and previous employment to guarantee peace of mind.</p>
            </div>
            
            <div className="card p-8 border hover:border-emerald-500 transition-colors">
              <Target className="text-emerald-600 mb-6" size={40} />
              <h3 className="text-xl font-bold text-navy-900 mb-3">Precision Matching</h3>
              <p className="text-charcoal leading-relaxed">Our smart algorithms ensure that recruiters find drivers with the exact skills, vehicle experience, and cultural fit required for their specific needs.</p>
            </div>

            <div className="card p-8 border hover:border-emerald-500 transition-colors">
              <Clock className="text-emerald-600 mb-6" size={40} />
              <h3 className="text-xl font-bold text-navy-900 mb-3">Speed and Efficiency</h3>
              <p className="text-charcoal leading-relaxed">We've streamlined the hiring process. What used to take weeks through traditional agencies now takes hours on DriverHire.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-slate-100 border-y border-slate-200 text-center">
         <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
               <p className="text-4xl font-bold text-navy-900 mb-2">50k+</p>
               <p className="text-muted-blue font-medium">Verified Drivers</p>
            </div>
            <div>
               <p className="text-4xl font-bold text-navy-900 mb-2">10k+</p>
               <p className="text-muted-blue font-medium">Companies Hiring</p>
            </div>
            <div>
               <p className="text-4xl font-bold text-navy-900 mb-2">99%</p>
               <p className="text-muted-blue font-medium">Success Rate</p>
            </div>
            <div>
               <p className="text-4xl font-bold text-navy-900 mb-2">24/7</p>
               <p className="text-muted-blue font-medium">Support Available</p>
            </div>
         </div>
      </section>

      {/* Team/Mission Section with Image */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-navy-900 mb-6">Built by Professionals, for Professionals.</h2>
              <p className="text-charcoal text-lg mb-6 leading-relaxed">
                DriverHire was founded by a team of logistics experts and technologists who recognized a massive gap in the market. The traditional process of hiring reliable drivers was slow, unsafe, and unreliable.
              </p>
              <p className="text-charcoal text-lg mb-8 leading-relaxed">
                We set out to build a platform that brings transparency, speed, and trust to the process. Today, we are proud to be the backbone of transportation for thousands of businesses across the country.
              </p>
              <ul className="space-y-4 mb-8">
                 <li className="flex items-center gap-3 text-navy-900 font-medium"><Globe className="text-emerald-600" size={20} /> Nationwide Coverage</li>
                 <li className="flex items-center gap-3 text-navy-900 font-medium"><Award className="text-emerald-600" size={20} /> Industry Leading Technology</li>
                 <li className="flex items-center gap-3 text-navy-900 font-medium"><Users className="text-emerald-600" size={20} /> Dedicated Account Managers</li>
              </ul>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-600 rounded-2xl transform translate-x-4 translate-y-4 opacity-10"></div>
              <img src="/about_team.png" alt="The DriverHire Team" className="relative z-10 rounded-2xl shadow-premium object-cover max-h-[500px] w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-emerald-600 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Experience the Premium Difference.</h2>
          <p className="text-emerald-50 text-lg mb-10">Join the thousands of users who have transformed how they hire and get hired.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register" className="bg-white text-emerald-700 hover:bg-emerald-50 font-bold py-3 px-8 rounded-md transition-colors shadow-sm">
              Get Started Now
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
