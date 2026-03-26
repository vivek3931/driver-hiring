import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight, Star, MapPin, Search, ChevronRight, Activity, Zap, Compass } from 'lucide-react';

const Home = () => {
    const fadeUp = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
    };

    const staggering = {
        visible: { transition: { staggerChildren: 0.1 } }
    };

    return (
        <div className="bg-white min-h-screen overflow-x-hidden selection:bg-primary-100 selection:text-primary-900">
            
            {/* Hero Section - The Uber Interface */}
            <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-40 border-b border-surface-100">
                <div className="map-gradient absolute inset-0 opacity-50 pointer-events-none"></div>
                
                <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                        
                        <motion.div 
                            initial="hidden"
                            animate="visible"
                            variants={staggering}
                            className="lg:col-span-6 flex flex-col items-start text-left"
                        >
                            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-10 group cursor-default">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary-600 animate-pulse"></div>
                                <span className="text-[11px] font-bold text-surface-400 uppercase tracking-[0.3em] group-hover:text-primary-600 transition-colors">Strategic Mobility Network</span>
                            </motion.div>
                            
                            <motion.h1 variants={fadeUp} className="text-5xl lg:text-7xl leading-[1.1] font-bold text-surface-950 tracking-tighter mb-10">
                                Driving <br />
                                The <span className="text-primary-600">Standard.</span>
                            </motion.h1>
                            
                            <motion.p variants={fadeUp} className="text-xl text-surface-500 max-w-lg mb-12 font-medium leading-relaxed">
                                Experience India's premier logistics interface. We connect elite chauffeuring talent with high-stakes deployment missions.
                            </motion.p>
                            
                            <motion.div variants={fadeUp} className="w-full max-w-md bg-white border border-surface-200 rounded-uber shadow-uber p-2 flex flex-col gap-2">
                                <Link to="/jobs" className="flex items-center justify-between p-5 rounded-xl bg-surface-950 text-white hover:bg-surface-900 transition-all group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                                            <Search size={24} />
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm">Explore Missions</p>
                                            <p className="text-[10px] text-surface-400 font-medium tracking-wide">Browse elite driver assignments</p>
                                        </div>
                                    </div>
                                    <ChevronRight size={20} className="text-surface-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
                                </Link>
                                
                                <Link to="/register" className="flex items-center justify-between p-5 rounded-xl bg-white border border-surface-100 hover:bg-surface-50 transition-all group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center">
                                            <Zap size={24} />
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm text-surface-950">Join Network</p>
                                            <p className="text-[10px] text-surface-400 font-medium tracking-wide">Apply for professional certification</p>
                                        </div>
                                    </div>
                                    <ArrowRight size={20} className="text-surface-300 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" />
                                </Link>
                            </motion.div>
                        </motion.div>
                        
                        <motion.div 
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                            className="lg:col-span-6 lg:pl-12"
                        >
                            <div className="relative group">
                                <div className="absolute -inset-4 bg-primary-600/5 rounded-[48px] blur-3xl group-hover:bg-primary-600/10 transition-all duration-700"></div>
                                <div className="relative rounded-[40px] overflow-hidden shadow-uber-heavy border-8 border-white">
                                    <img 
                                        src="/uber_hero.png" 
                                        alt="Professional Logistics" 
                                        className="w-full h-auto object-cover scale-105 group-hover:scale-100 transition-transform duration-1000"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-surface-950/20 to-transparent"></div>
                                </div>
                                
                                {/* Status Tags */}
                                <motion.div 
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 1 }}
                                    className="absolute top-10 -left-10 bg-white p-5 rounded-3xl shadow-uber flex items-center gap-4 border border-surface-100"
                                >
                                    <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                                        <Activity size={20} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-surface-400 uppercase">Live Network</p>
                                        <p className="font-bold text-surface-950">1,240 Active Units</p>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Features: The Logistics Stack */}
            <section className="py-32 bg-surface-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-24">
                        <div className="max-w-2xl">
                            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-8">Redefining <br />Chauffeur <span className="text-primary-600">Operations.</span></h2>
                            <p className="text-lg lg:text-xl text-surface-500 font-medium">Built for precision. We've automated the vetting, matching, and management of elite driver fleets.</p>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-16 h-1 bg-surface-950"></div>
                            <div className="w-16 h-1 bg-surface-200"></div>
                            <div className="w-16 h-1 bg-surface-200"></div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: "Tactical Alignment", desc: "Proprietary matching algorithms aligning drivers with cargo sensitivity and client requirements.", icon: <Compass className="text-primary-600" size={32} /> },
                            { title: "Institutional Vetting", desc: "Military-grade background checks and performance history forensic analysis for every enlistee.", icon: <ShieldCheck className="text-primary-600" size={32} /> },
                            { title: "Global Logistics Hub", desc: "Centralized command and control for recruiters to manage unlimited driver rotations and mission logs.", icon: <MapPin className="text-primary-600" size={32} /> }
                        ].map((item, i) => (
                            <motion.div 
                                key={i}
                                whileHover={{ y: -8 }}
                                className="app-card p-12 bg-white"
                            >
                                <div className="mb-8">{item.icon}</div>
                                <h3 className="text-2xl font-bold mb-5 tracking-tight">{item.title}</h3>
                                <p className="text-surface-500 font-medium leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials / Stats */}
            <section className="py-40 border-t border-surface-100 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                    <div className="relative">
                        <div className="text-[200px] font-bold text-surface-50 absolute -top-40 -left-10 select-none">"</div>
                        <p className="text-4xl lg:text-5xl font-bold text-surface-950 leading-[1.1] tracking-tight relative z-10">
                            "The DriverHire interface has completely transformed how we deploy high-stakes logistics teams. It's fast, professional, and reliable."
                        </p>
                        <div className="flex items-center gap-5 mt-12">
                            <img src="https://i.pravatar.cc/100?img=33" className="w-16 h-16 rounded-full grayscale border border-surface-100" alt="Recruiter" />
                            <div>
                                <p className="font-bold text-surface-950">Rajesh Verma</p>
                                <p className="text-[11px] font-bold text-surface-400 uppercase tracking-widest">Director, Skyline Logistics</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-8">
                        {[
                            { label: "Successful Deployments", val: "14.2k" },
                            { label: "Vetted Professionals", val: "2.8k" },
                            { label: "Client Satisfaction", val: "99.8%" },
                            { label: "Average Response Time", val: "12m" }
                        ].map((stat, i) => (
                            <div key={i} className="p-10 bg-white border border-surface-100 rounded-uber shadow-soft">
                                <p className="text-4xl font-bold text-surface-950 mb-2 truncate">{stat.val}</p>
                                <p className="text-[10px] font-bold text-surface-400 uppercase tracking-widest leading-tight">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-48 bg-surface-950 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary-600/20 rounded-full blur-[160px] -mr-96 -mt-96"></div>
                <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                    <h2 className="text-6xl lg:text-8xl font-bold tracking-tighter mb-12">Ready for <br />the <span className="text-primary-500">Next Phase?</span></h2>
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <Link to="/register" className="btn-vibrant py-6 px-16 text-lg">
                            Get Performance Access
                        </Link>
                        <Link to="/jobs" className="px-16 py-6 rounded-ola border border-white/20 font-bold hover:bg-white/5 transition-colors">
                            View Directives
                        </Link>
                    </div>
                    <div className="mt-20 flex flex-col items-center gap-4 opacity-50">
                        <div className="flex -space-x-3">
                            {[21, 22, 23, 24, 25].map(i => (
                                <img key={i} src={`https://i.pravatar.cc/100?img=${i}`} className="w-10 h-10 rounded-full border-2 border-surface-950" />
                            ))}
                        </div>
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                            <Star size={14} fill="currentColor" className="text-primary-500" />
                            5,000+ Enlisted Operators
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Home;
