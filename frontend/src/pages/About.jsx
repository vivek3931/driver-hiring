import { Link } from 'react-router-dom';
import { Shield, Users, Target, Clock, Globe, Award, ShieldCheck, ChevronRight, Star, Zap, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const About = () => {
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    const values = [
        {
            icon: Shield,
            title: "Absolute Safety",
            desc: "Every driver undergoes a rigorous 15-point verification process, ensuring only the most reliable professionals Join our elite network.",
            color: "text-primary-600",
            bg: "bg-primary-50"
        },
        {
            icon: Target,
            title: "Precision Matching",
            desc: "Our intelligent algorithm analyzes 20+ parameters to pair you with the driver who perfectly matches your vehicle and culture.",
            color: "text-emerald-500",
            bg: "bg-emerald-50"
        },
        {
            icon: Clock,
            title: "Rapid Deployment",
            desc: "Reduce your hiring cycle from weeks to minutes. Access our on-demand pool of verified talent instantly.",
            color: "text-blue-500",
            bg: "bg-blue-50"
        }
    ];

    const stats = [
        { label: "Elite Drivers", value: "25k+", icon: Users },
        { label: "Corporate Partners", value: "1.2k+", icon: Globe },
        { label: "Success Rate", value: "99.8%", icon: Star },
        { label: "Uptime", value: "24/7", icon: Zap }
    ];

    return (
        <div className="bg-surface-50 min-h-screen font-sans">
            {/* Premium Hero Section */}
            <section className="relative pt-24 pb-32 overflow-hidden bg-white">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary-50/30 rounded-full blur-3xl -z-10"></div>
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-full text-primary-600 font-extrabold text-xs uppercase tracking-widest mb-8 border border-primary-100/50"
                    >
                        <ShieldCheck size={14} strokeWidth={3} />
                        The Gold Standard in Logistics
                    </motion.div>
                    
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-extrabold text-surface-900 mb-8 tracking-tight leading-[1.1]"
                    >
                        Pioneering the Future of <br />
                        <span className="text-primary-600">Professional Driving.</span>
                    </motion.h1>
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-surface-500 max-w-3xl mx-auto leading-relaxed font-medium mb-12"
                    >
                        We aren't just a job board; we are the premium infrastructure for India's most trusted driver network. We bridge the gap between elite talent and visionary organizations.
                    </motion.p>
                </div>
            </section>

            {/* Core Values Section */}
            <section className="py-32 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-24">
                        <h2 className="text-sm font-extrabold text-primary-600 uppercase tracking-[0.3em] mb-4">Our Foundation</h2>
                        <h3 className="text-4xl md:text-5xl font-extrabold text-surface-900 tracking-tight">Built on Unwavering Principles.</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {values.map((item, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="card p-10 bg-white hover:shadow-premium transition-all group"
                            >
                                <div className={`w-16 h-16 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center mb-8 shadow-subtle group-hover:scale-110 transition-transform duration-500`}>
                                    <item.icon size={32} />
                                </div>
                                <h4 className="text-2xl font-extrabold text-surface-900 mb-4">{item.title}</h4>
                                <p className="text-surface-600 font-medium leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Transformation */}
            <section className="py-24 bg-surface-900 text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-600/20 rounded-full blur-[120px] -mr-64 -mt-64"></div>
                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                        {stats.map((stat, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <div className="text-primary-400 mb-4 flex justify-center">
                                    <stat.icon size={28} />
                                </div>
                                <p className="text-5xl font-extrabold mb-2 tracking-tight">{stat.value}</p>
                                <p className="text-surface-400 font-extrabold text-xs uppercase tracking-widest">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-32 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-sm font-extrabold text-primary-600 uppercase tracking-[0.3em] mb-4">Our Vision</h2>
                            <h3 className="text-4xl md:text-5xl font-extrabold text-surface-900 mb-8 leading-tight">Elevating Every <span className="text-primary-600">Journey.</span></h3>
                            <p className="text-surface-600 font-medium text-lg mb-8 leading-relaxed">
                                We believe that a driver is more than just an employee; they are the front-line ambassadors of your brand and the guardians of your most valuable assets. 
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                                {[
                                    { icon: Heart, text: "Driver well-being focus" },
                                    { icon: Award, text: "Certified Excellence" },
                                    { icon: ShieldCheck, text: "Vetted Intelligence" },
                                    { icon: Zap, text: "Real-time Operations" }
                                ].map((feature, i) => (
                                    <div key={i} className="flex items-center gap-3 font-extrabold text-surface-900 text-sm">
                                        <div className="w-8 h-8 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center shrink-0">
                                            <feature.icon size={16} />
                                        </div>
                                        {feature.text}
                                    </div>
                                ))}
                            </div>
                            <Link to="/register" className="btn-primary inline-flex items-center gap-3 px-10 py-5 text-lg shadow-premium">
                                Join the Movement <ChevronRight size={20} strokeWidth={3} />
                            </Link>
                        </motion.div>
                        
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="aspect-[4/5] rounded-[48px] overflow-hidden shadow-premium-dark border-8 border-surface-50">
                                <img 
                                    src="https://images.unsplash.com/photo-1449965231354-2e232616a67e?q=80&w=2070&auto=format&fit=crop" 
                                    alt="Professional Driving" 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute -bottom-10 -left-10 card p-8 bg-white max-w-[280px] shadow-premium-lg">
                                <div className="flex gap-1 mb-4">
                                    {[1,2,3,4,5].map(s => <Star key={s} size={16} className="fill-amber-400 text-amber-400" />)}
                                </div>
                                <p className="text-surface-900 font-bold mb-2">"The industry benchmark for safety and professional driver logistics."</p>
                                <p className="text-surface-400 text-xs font-bold uppercase tracking-wider">— Logistics Today</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
