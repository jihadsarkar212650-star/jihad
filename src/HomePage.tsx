import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, X, LogIn, UserPlus, Store, UserCog, ShieldCheck, 
  ArrowRight, Phone, HelpCircle, MessageCircle, BookOpen,
  ChevronUp, Star, PenSquare, Sliders, Users, Trophy, Briefcase
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const COURSES = [
  { id: 1, title: "Al-Quran Hadis & Namaz Shikkha", mentor: "Maulana Hafizur Rahman", price: "৳ ৫০০০", rating: 4.9, img: "https://unityearning.com/assets/img/Popular%20Courses/Al-Quran.jpg" },
  { id: 2, title: "Advanced Photo Editing", mentor: "Ariful Islam", price: "৳ ৪০০০", rating: 4.8, img: "https://unityearning.com/assets/img/Popular%20Courses/photo%20edit.jpg" },
  { id: 3, title: "Professional Video Editing", mentor: "Sajid Ahmed", price: "৳ ৮০০০", rating: 4.7, img: "https://unityearning.com/assets/img/Popular%20Courses/video%20edit.jpg" },
  { id: 4, title: "Digital Marketing Strategy", mentor: "Nusrat Jahan", price: "৳ ৬০০০", rating: 4.9, img: "https://unityearning.com/assets/img/Popular%20Courses/Digital%20Market.jpg" },
  { id: 5, title: "E-Commerce Management", mentor: "Rakibul Hassan", price: "৳ ৭০০০", rating: 4.6, img: "https://unityearning.com/assets/img/Popular%20Courses/Product%20Sell.jpg" },
  { id: 6, title: "Data Entry Specialist", mentor: "Farhana Akter", price: "৳ ৩০০০", rating: 4.5, img: "https://unityearning.com/assets/img/Popular%20Courses/data%20enty.jpg" },
  { id: 7, title: "Facebook Marketing Masterclass", mentor: "Tanvir Ahmed", price: "৳ ৫০০০", rating: 4.8, img: "https://unityearning.com/assets/img/Popular%20Courses/Graphic.jpg" },
  { id: 8, title: "Professional Spoken English", mentor: "Sumaiya Islam", price: "৳ ৪৫০০", rating: 4.9, img: "https://unityearning.com/assets/img/Popular%20Courses/spoken-english.jpeg" },
  { id: 9, title: "Advanced Graphic Design", mentor: "Imran Hossain", price: "৳ ৭০০০", rating: 4.7, img: "https://unityearning.com/assets/img/Popular%20Courses/Graphic%20Design.jpg" },
];

const STATS = [
  { target: 88608, suffix: "+", label: "Course Complete", color: "#7C3AED", icon: "book" },
  { target: 18000, suffix: "+", label: "Job Placement", color: "#F59E0B", icon: "user" },
  { target: 42100, suffix: "+", label: "Success Freelancer", color: "#06B6D4", icon: "trophy" },
  { target: 1180, suffix: "+", label: "Entrepreneurs", color: "#10B981", icon: "briefcase" },
];

const RATING_DIST = [
  { star: 5, pct: 52 },
  { star: 4, pct: 28 },
  { star: 3, pct: 12 },
  { star: 2, pct: 5 },
  { star: 1, pct: 3 },
];

function Counter({ target, suffix, label, color }: any) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated) {
        setHasAnimated(true);
        let start = 0;
        const duration = 2000;
        const startTime = performance.now();

        const animate = (currentTime: number) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easedProgress = 1 - Math.pow(1 - progress, 3);
          const currentCount = Math.floor(easedProgress * target);
          setCount(currentCount);

          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };
        requestAnimationFrame(animate);
      }
    }, { threshold: 0.5 });

    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, [target, hasAnimated]);

  return (
    <div ref={elementRef} className="ue-stat-card">
      <div className="ue-stat-icon relative w-16 h-16 grid place-items-center flex-shrink-0">
        <div 
          className="absolute inset-x-0 bottom-1 h-4 rounded-lg opacity-30 mx-auto w-14" 
          style={{ backgroundColor: color }}
        />
        <div className="relative" style={{ color }}>
          <BookOpen className="w-9 h-9" />
        </div>
      </div>
      <div className="flex-grow">
        <div className="ue-stat-num" style={{ backgroundImage: `linear-gradient(90deg, ${color}, #000)` }}>
          {count.toLocaleString()}{suffix}
        </div>
        <div className="ue-stat-label text-gray-900 font-semibold">{label}</div>
      </div>
    </div>
  );
}

interface HomePageProps {
  isScrolled: boolean;
  setIsHelpModalOpen: (open: boolean) => void;
  setIsHeaderDrawerOpen: (open: boolean) => void;
  setIsMobileDrawerOpen: (open: boolean) => void;
  isAnnivPopupOpen: boolean;
  closeAnnivPopup: () => void;
  showGoTop: boolean;
  setIsLoginModalOpen: (open: boolean) => void;
}

export function HomePage({ 
  isScrolled, 
  setIsHelpModalOpen, 
  setIsHeaderDrawerOpen, 
  setIsMobileDrawerOpen, 
  isAnnivPopupOpen, 
  closeAnnivPopup, 
  showGoTop,
  setIsLoginModalOpen
}: HomePageProps) {
  return (
    <div className={`min-h-screen bg-white ${isScrolled ? 'scrolled' : ''}`}>
      {/* HEADER / NAV */}
      <div className="navbar-area sticky top-0 z-50">
        <div className="container mx-auto px-4 lg:px-12 py-3">
          <nav className={`ue-nav flex items-center justify-between transition-all duration-300 ${isScrolled ? 'bg-white/70 py-2' : 'bg-white/10'}`}>
            <a href="/" className="navbar-brand">
              <img src="https://unityearning.com/assets/img/unityearning.png" alt="Unity Earning" className="h-10 lg:h-12 w-auto" />
            </a>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-4">
              <button onClick={() => setIsLoginModalOpen(true)} className="nav-pill pill-login">
                <LogIn className="w-4 h-4" /><span>Login</span>
              </button>
              <a href="https://unityearning.com/sign-up" className="nav-pill pill-signup">
                <UserPlus className="w-4 h-4" /><span>Sign Up</span>
              </a>
              <a href="https://www.unityearning.com/shop" className="nav-pill pill-store">
                <Store className="w-4 h-4" /><span>Store</span>
              </a>
              <button onClick={() => setIsLoginModalOpen(true)} className="nav-pill pill-sub">
                <UserCog className="w-4 h-4" /><span>Agent Login</span>
              </button>
              <button onClick={() => setIsLoginModalOpen(true)} className="nav-pill pill-admin">
                <ShieldCheck className="w-4 h-4" /><span>Admin</span>
              </button>
            </div>

            {/* Mobile Hamburger */}
            <button 
              className="lg:hidden p-2 text-white bg-blue-600/50 rounded-lg"
              onClick={() => setIsHeaderDrawerOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </nav>
        </div>
      </div>

      {/* BANNER 1 (HERO) */}
      <section className="relative min-h-[80vh] flex items-center pt-24 pb-16 lg:pt-32 lg:pb-32 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-[#020617] z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 via-indigo-900/30 to-slate-900/50" />
          
          {/* Floating Blobs */}
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              x: [0, 100, 0],
              y: [0, 50, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/20 blur-[120px] rounded-full"
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.3, 1],
              x: [0, -150, 0],
              y: [0, -100, 0],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-indigo-600/20 blur-[150px] rounded-full"
          />
          
          {/* Grid Pattern overlay */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay" />
        </div>

        <div className="container mx-auto px-4 lg:px-12 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 text-left">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-xs font-black tracking-widest uppercase mb-8 backdrop-blur-md">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                  Leading Skill Platform
                </div>
                
                <h1 className="text-4xl lg:text-7xl font-black text-white leading-[0.9] tracking-tighter mb-8 uppercase">
                  WELCOME TO <br/>
                  <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">UNITY EARNING</span> <br/>
                  <span className="text-2xl lg:text-4xl font-bold tracking-normal normal-case text-slate-400">E-Learning Platform</span>
                </h1>
                
                <p className="text-slate-400 font-bold mb-10 text-lg lg:text-xl leading-relaxed max-w-xl">
                  বাংলাদেশের অন্যতম বিশ্বস্ত ডিজিটাল লার্নিং প্ল্যাটফর্ম। দক্ষ মেন্টরদের তত্ত্বাবধানে আধুনিক স্কিল অর্জন করুন এবং স্বাবলম্বী হোন।
                </p>

                <div className="flex flex-wrap gap-4">
                  <button onClick={() => setIsLoginModalOpen(true)} className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-blue-600/25 hover:bg-blue-700 hover:-translate-y-1 transition-all group">
                    <span className="flex items-center gap-2">লগইন করুন <ArrowRight className="w-4 h-4 group-hover:translateX-1 transition-transform" /></span>
                  </button>
                  <a href="https://unityearning.com/sign-up" className="px-8 py-4 bg-slate-800 text-white border border-slate-700 rounded-2xl font-black uppercase tracking-widest hover:border-blue-500/50 hover:bg-slate-800/80 transition-all">
                    রেজিস্ট্রেশন
                  </a>
                  <a href="https://www.unityearning.com/shop" className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-indigo-600/25 hover:bg-indigo-700 hover:-translate-y-1 transition-all flex items-center gap-2">
                    <Store className="w-5 h-5" /> স্টোর
                  </a>
                  <button onClick={() => setIsLoginModalOpen(true)} className="px-8 py-4 bg-slate-900 text-white border border-slate-700 rounded-2xl font-black uppercase tracking-widest hover:bg-blue-600 hover:border-blue-600 transition-all flex items-center gap-2">
                    <UserCog className="w-5 h-5" /> এজেন্ট লগইন
                  </button>
                </div>
              </motion.div>
            </div>
            
            <div className="lg:w-1/2 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, type: "spring" }}
                className="relative z-20 group"
              >
                <div className="absolute inset-0 bg-blue-600/30 blur-[60px] rounded-full group-hover:scale-125 transition-transform duration-1000" />
                <div className="relative p-2 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[40px] shadow-2xl overflow-hidden">
                  <img 
                    src="https://unityearning.com/assets/img/banner-img/skill.webp" 
                    alt="Skills" 
                    className="w-full h-auto rounded-[32px] group-hover:scale-105 transition-transform duration-700" 
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/80 via-transparent to-transparent" />
                </div>
                
                {/* Floating elements */}
                <motion.div 
                  animate={{ y: [0, -20, 0] }} 
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-10 -right-10 p-6 bg-white rounded-3xl shadow-2xl hidden lg:block"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
                      <ShieldCheck className="w-8 h-8" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Trusted by</p>
                      <p className="text-xl font-black text-slate-900 tracking-tighter">10,000+ Students</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK STATS / OVERVIEW */}
      <section className="py-8 bg-[#020617] border-y border-white/5 relative z-10 overflow-hidden">
        <div className="container mx-auto px-4 lg:px-12">
          <div className="flex flex-wrap justify-center lg:justify-between items-center gap-8 lg:gap-0">
            {STATS.map((stat, i) => (
              <div key={i} className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-lg">
                   {stat.icon === 'book' ? <BookOpen /> : stat.icon === 'user' ? <Users /> : stat.icon === 'trophy' ? <Trophy /> : <Briefcase />}
                </div>
                <div>
                  <p className="text-xl font-black text-white tracking-tighter">{stat.target.toLocaleString()}{stat.suffix}</p>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT / ACHIEVE */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 lg:px-12 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-blue-600 font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Our Commitment</span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter mb-12 uppercase leading-none">
              বাংলাদেশের এক নম্বর <br/>
              <span className="text-blue-600">ডিজিটাল লার্নিং প্ল্যাটফর্ম</span>
            </h2>
            
            <p className="text-lg md:text-xl text-slate-500 font-bold leading-relaxed mb-12">
               এটি বাংলাদেশের একটি বিশ্বস্ত অনলাইন প্ল্যাটফর্ম। এখানে আপনার ঘরে বসে শুধুমাত্র একটি স্মার্টফোন ব্যবহার করেই অবসর সময়কে কাজে লাগিয়ে শেখা এবং উপার্জনের সুযোগ রয়েছে।
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left mb-16">
              <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 hover:bg-blue-50 hover:border-blue-100 transition-all group">
                <h4 className="text-xl font-black text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">সহজ শেখার পদ্ধতি</h4>
                <p className="text-slate-500 font-bold leading-relaxed">শেখার প্রক্রিয়াটি অত্যন্ত সহজ, কারণ এখানে আপনি নিজের মাতৃভাষায় শেখার সুযোগ পাবেন। ফলে নতুন কিছু শেখা বা দক্ষতা অর্জন করতে আপনার কোনো সমস্যাই হবে না।</p>
              </div>
              <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 hover:bg-emerald-50 hover:border-emerald-100 transition-all group">
                <h4 className="text-xl font-black text-slate-900 mb-4 group-hover:text-emerald-600 transition-colors">উপার্জনের সুযোগ</h4>
                <p className="text-slate-500 font-bold leading-relaxed">শেখার পাশাপাশি আমাদের কমিউনিটির মাধ্যমে আপনি কোর্স, সেবা বা বিভিন্ন প্রোডাক্ট বিক্রির মাধ্যমে আয় করতে পারবেন। এখানে দীর্ঘমেয়াদি ক্যারিয়ার গড়ার সুযোগ রয়েছে।</p>
              </div>
            </div>

            <button 
              className="px-10 py-5 bg-slate-900 text-white rounded-full font-black uppercase tracking-[0.2em] text-sm hover:bg-blue-600 hover:shadow-2xl transition-all shadow-xl shadow-slate-900/10"
              onClick={() => setIsHelpModalOpen(true)}
            >
              সহায়তা দরকার?
            </button>
          </div>
        </div>
      </section>

      {/* POPULAR COURSES */}
      <section className="bg-slate-50 py-24 border-y border-slate-100">
        <div className="container mx-auto px-4 lg:px-12">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-4">
            <div>
              <span className="text-blue-600 font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Expert Mentors</span>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">
                আমাদের জনপ্রিয় <span className="text-blue-600">কোর্সসমূহ</span>
              </h2>
            </div>
            <p className="text-slate-500 font-bold max-w-md md:text-right">আধুনিক ক্যারিয়ার গড়ার জন্য আমরা নিয়ে এসেছি সেরা সব স্কিল ভিত্তিক প্রফেশনাল কোর্স।</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {COURSES.map(course => (
              <motion.div 
                key={course.id} 
                whileHover={{ y: -8 }}
                className="single-course group overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 bg-white rounded-[32px]"
              >
                <div className="aspect-[16/10] overflow-hidden relative">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-lg">Premium Course</span>
                  </div>
                  <img src={course.img} alt={course.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex text-blue-500">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                    </div>
                    <span className="text-[10px] font-bold text-slate-400">({course.rating})</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-4 line-clamp-1 group-hover:text-blue-600 transition-colors">
                    {course.title}
                  </h3>
                  <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                        <UserCog className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold text-slate-500">{course.mentor}</span>
                    </div>
                    <span className="text-lg font-black text-blue-600 tracking-tighter">{course.price}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map((stat, i) => (
              <Counter 
                key={i} 
                target={stat.target} 
                suffix={stat.suffix} 
                label={stat.label} 
                color={stat.color} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* RATINGS */}
      <section id="ratings" className="ue-rating-section py-16">
        <div className="container mx-auto px-4 lg:px-12">
          <div className="ue-rating-card max-w-5xl mx-auto">
            <div className="ue-rating-head">
              <h4 className="text-xl font-bold">ব্যবহারকারীদের রেটিং</h4>
              <span className="ue-badge"><Star className="w-4 h-4 fill-current" /> Trusted Reviews</span>
            </div>

            <div className="p-8 bg-white">
              <div className="flex flex-col lg:flex-row gap-12 items-center">
                <div className="lg:w-1/3 text-center lg:text-left">
                  <div className="ue-score mb-4 justify-center lg:justify-start">
                    <div className="num">7/10</div>
                  </div>
                  <div className="ue-stars flex gap-1 justify-center lg:justify-start mb-2">
                    {[1,2,3].map(i => <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />)}
                    <Star className="w-6 h-6 text-yellow-400 fill-yellow-400/50" />
                    <Star className="w-6 h-6 text-gray-200" />
                  </div>
                  <div className="text-gray-500 font-bold">(১৮,০৩২ রিভিউ)</div>
                  <button className="ue-rate-cta mt-6 flex items-center gap-2 mx-auto lg:mx-0">
                    <PenSquare className="w-4 h-4" /> আপনার রেটিং দিন
                  </button>
                </div>

                <div className="lg:w-2/3 w-full">
                  <div className="space-y-4">
                    {RATING_DIST.map(r => (
                      <div key={r.star} className="flex items-center gap-4">
                        <div className="w-10 text-right font-bold text-gray-900">{r.star}★</div>
                        <div className="flex-grow ue-bar">
                          <motion.span 
                            initial={{ width: 0 }}
                            whileInView={{ width: `${r.pct}%` }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            viewport={{ once: true }}
                          />
                        </div>
                        <div className="w-12 font-bold text-gray-900">{r.pct}%</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black text-white pt-24 pb-12">
        <div className="container mx-auto px-4 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
            <div>
              <h3 className="text-xl font-bold mb-6 uppercase tracking-wider text-green-500 underline underline-offset-8">Office Address</h3>
              <div className="flex gap-4">
                <div className="p-2 bg-green-900/40 rounded-lg h-fit">
                  <HelpCircle className="w-5 h-5 text-green-400" />
                </div>
                <p className="text-gray-400 leading-relaxed uppercase">
                  Mirpur, Dhaka, Bangladesh <br/>
                  Mobile: 01700000000 <br/>
                  Email: info@unityearning.com
                </p>
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-xl font-bold mb-6 uppercase tracking-wider text-green-500 underline underline-offset-8">Certificate</h3>
              <img src="https://unityearning.com/assets/img/Popular%20Courses/cert.jpeg" alt="Certificate" className="w-1/2 mx-auto rounded-lg shadow-xl" referrerPolicy="no-referrer" />
            </div>

            <div>
              <h3 className="text-xl font-bold mb-6 uppercase tracking-wider text-green-500 underline underline-offset-8">Company</h3>
              <ul className="space-y-4">
                <li><a href="#" className="text-gray-400 hover:text-green-500 transition-colors uppercase font-bold">All Courses</a></li>
                <li><a href="#" className="text-gray-400 hover:text-green-500 transition-colors uppercase font-bold">About us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-green-500 transition-colors uppercase font-bold">Terms & Conditions</a></li>
                <li><a href="#" className="text-gray-400 hover:text-green-500 transition-colors uppercase font-bold">Privacy Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-900 pt-8 text-center">
            <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">
              <a href="https://biswasdigitalsolution.com" target="_blank" className="text-green-500 hover:underline">
                Unity Earning LMS. All Rights By BDS
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* GO TOP BUTTON */}
      <AnimatePresence>
        {showGoTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-24 right-6 p-4 bg-green-600 text-white rounded-full shadow-2xl z-40 hover:bg-green-700 transition-colors"
          >
            <ChevronUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* QUICK MENU TRIGGER (MOBILE) */}
      <button 
        className="fixed bottom-6 right-6 lg:hidden flex items-center gap-2 px-6 py-4 bg-teal-600 text-white rounded-full shadow-2xl z-40 font-bold"
        onClick={() => setIsMobileDrawerOpen(true)}
      >
        <Sliders className="w-5 h-5" /> Quick Menu
      </button>

      {/* ANNIVERSARY POPUP */}
      <AnimatePresence>
        {isAnnivPopupOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeAnnivPopup}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="ue-card z-50 overflow-hidden"
            >
              <button 
                onClick={closeAnnivPopup}
                className="ue-close"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="aspect-video bg-black relative">
                 <img 
                  src="https://unityearning.com/assets/img/banner-img/anniversary.jpeg" 
                  alt="Anniversary" 
                  className="w-full h-full object-cover" 
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-8 text-center bg-white">
                <h4 className="text-2xl font-bold text-gray-900 mb-2 font-hind">🎉 আমাদের বিশেষ অ্যানিভার্সারি অফার</h4>
                <p className="text-gray-600 mb-6 font-hind">
                  সীমিত সময়ের জন্য বিশেষ ছাড়। এখনই দেখে নিন এবং অফারটি কাজে লাগান!
                </p>
                <a 
                  href="https://www.unityearning.com/shop"
                  className="ue-cta inline-flex items-center gap-2"
                >
                  Visit Store <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
