import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, X, LogIn, UserPlus, Store, UserCog, ShieldCheck, 
  ArrowRight, Phone, HelpCircle, MessageCircle, BookOpen,
  ChevronUp, Star, PenSquare, Sliders, Users, Trophy, Briefcase, Mail
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useSettings } from './lib/useSettings';

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

const REVIEWS = [
  { name: "আশরাফুল ইসলাম", rating: 5, text: "এই কম্পানি অনেক ভালো আমি কাজ করতেছি" },
  { name: "আরিফ সরকার", rating: 5, text: "আমি এখান থেকে এখন পযন্ত ১০k এর বেশি টাকা ইনকাম করেছি🤗" },
  { name: "আমেনা আক্তার", rating: 5, text: "আমি এখানে অনেক দিন ধরে কাজ করতেছি, এই কম্পানি অনেক ভালো" },
  { name: "আলামিন", rating: 5, text: "Unity Earning E-learning Platform Best Platform" },
  { name: "সাদিয়া ইসলাম", rating: 5, text: "আমার পছন্দের একটি কোম্পানি এটি" },
  { name: "তানজিনা আক্তার", rating: 5, text: "প্লাটফর্ম টি খুব ট্রাস্টেড, আমি অনেক কিছু শিখতে পেরেছি।" },
  { name: "সাইদুল ইসলাম", rating: 5, text: "কোর্সগুলো অনেক সুন্দরভাবে সাজানো, টিম সাপোর্ট খুবই ভালো।" }
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
  setIsLoginModalOpen: (open: boolean) => void;
}

const getValidUrl = (url?: string) => {
  if (!url) return "#";
  if (url.startsWith('mailto:') || url.startsWith('http://') || url.startsWith('https://')) return url;
  return `https://${url}`;
};

export function HomePage({ 
  isScrolled, 
  setIsHelpModalOpen, 
  setIsHeaderDrawerOpen, 
  setIsMobileDrawerOpen, 
  isAnnivPopupOpen, 
  closeAnnivPopup, 
  setIsLoginModalOpen
}: HomePageProps) {
  const { settings } = useSettings();
  
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
      <section className="relative min-h-[80vh] flex items-center pt-8 pb-16 lg:pt-16 lg:pb-32 overflow-hidden -mt-[100px]">
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

        <div className="container mx-auto px-4 lg:px-12 relative z-10 pt-10 lg:pt-16">
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

                <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-3 mt-8">
                  <button onClick={() => setIsLoginModalOpen(true)} className="w-full sm:w-auto px-4 py-3.5 bg-blue-600 text-white rounded-xl font-black uppercase tracking-wider text-xs sm:text-sm shadow-lg shadow-blue-600/25 hover:bg-blue-700 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-1.5 group">
                    লগইন করুন <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <a href="https://unityearning.com/sign-up" className="w-full sm:w-auto px-4 py-3.5 bg-slate-800 text-white border border-slate-700 rounded-xl font-black uppercase tracking-wider text-xs sm:text-sm hover:border-blue-500/50 hover:bg-slate-800/80 transition-all flex items-center justify-center text-center">
                    রেজিস্ট্রেশন
                  </a>
                  <a href="https://www.unityearning.com/shop" className="w-full sm:w-auto px-4 py-3.5 bg-indigo-600 text-white rounded-xl font-black uppercase tracking-wider text-xs sm:text-sm shadow-lg shadow-indigo-600/25 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-1.5">
                    <Store className="w-4 h-4" /> স্টোর
                  </a>
                  <button onClick={() => setIsLoginModalOpen(true)} className="w-full sm:w-auto px-4 py-3.5 bg-slate-900 text-white border border-slate-700 rounded-xl font-black uppercase tracking-wider text-xs sm:text-sm hover:bg-blue-600 hover:border-blue-600 transition-all flex items-center justify-center gap-1.5">
                    <UserCog className="w-4 h-4" /> এজেন্ট লগইন
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-row justify-between items-center gap-6 lg:gap-0">
            {STATS.map((stat, i) => (
              <div key={i} className="flex items-center gap-4 group justify-start lg:justify-center">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-lg shrink-0">
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

      {/* MEMBER REVIEWS CAROUSEL */}
      <section className="py-12 bg-slate-50 border-t border-gray-100 overflow-hidden">
        <div className="container mx-auto px-4 lg:px-12 mb-8">
          <h2 className="text-3xl font-black text-slate-800 text-center uppercase tracking-tighter">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Member
            </span> Reviews
          </h2>
          <p className="text-center text-slate-500 font-bold mt-2">আমাদের শিক্ষার্থীদের কিছু অনুভূতি</p>
        </div>
        
        <div className="relative w-full flex overflow-hidden group">
          {/* Duplicate the reviews array to ensure continuous scrolling effect */}
          <div className="animate-marquee flex gap-6 px-3">
            {[...REVIEWS, ...REVIEWS, ...REVIEWS].map((review, i) => (
              <div 
                key={i} 
                className="w-[300px] shrink-0 bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex gap-1 mb-3 text-yellow-400">
                  {[...Array(review.rating)].map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-slate-600 font-bold mb-4 line-clamp-3">
                  "{review.text}"
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-50">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-black">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-black text-slate-800 text-sm">{review.name}</h4>
                    <p className="text-xs font-bold text-slate-400">Student</p>
                  </div>
                </div>
              </div>
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
              <h3 className="text-xl font-bold mb-6 uppercase tracking-wider text-blue-500 underline underline-offset-8">Certificate</h3>
              <img src="https://unityearning.com/assets/img/Popular%20Courses/cert.jpeg" alt="Certificate" className="w-1/2 mx-auto rounded-lg shadow-xl" referrerPolicy="no-referrer" />
            </div>

            <div>
              <h3 className="text-xl font-bold mb-6 uppercase tracking-wider text-blue-500 underline underline-offset-8">Company</h3>
              <ul className="space-y-4">
                <li><a href="#" className="text-gray-400 hover:text-blue-500 transition-colors uppercase font-bold">All Courses</a></li>
                <li><a href="#" className="text-gray-400 hover:text-blue-500 transition-colors uppercase font-bold">About us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-blue-500 transition-colors uppercase font-bold">Terms & Conditions</a></li>
                <li><a href="#" className="text-gray-400 hover:text-blue-500 transition-colors uppercase font-bold">Privacy Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-900 pt-8 text-center flex flex-col gap-5">
            
            {/* SOCIAL MEDIA LINKS */}
            <div className="flex justify-center items-center gap-4">
              <a href={getValidUrl(settings?.socialLinks?.facebook)} target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-900 text-blue-500 rounded-full hover:bg-blue-600 hover:text-white transition-all shadow-lg hover:-translate-y-1">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"/>
                </svg>
              </a>
              <a href={getValidUrl(settings?.socialLinks?.youtube)} target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-900 text-red-500 rounded-full hover:bg-red-600 hover:text-white transition-all shadow-lg hover:-translate-y-1">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                  <path d="M21.582 6.186a2.722 2.722 0 0 0-1.92-1.92C18.006 3.8 12 3.8 12 3.8s-6.006 0-7.662.466a2.722 2.722 0 0 0-1.92 1.92C1.95 7.848 1.95 12 1.95 12s0 4.152.468 5.814a2.722 2.722 0 0 0 1.92 1.92C5.994 20.2 12 20.2 12 20.2s6.006 0 7.662-.466a2.722 2.722 0 0 0 1.92-1.92c.468-1.662.468-5.814.468-5.814s0-4.152-.468-5.814zM9.996 15.005V8.995L15.26 12z"/>
                </svg>
              </a>
              <a href={getValidUrl(settings?.socialLinks?.telegram)} target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-900 text-sky-500 rounded-full hover:bg-sky-500 hover:text-white transition-all shadow-lg hover:-translate-y-1">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.892-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </a>
              <a href={getValidUrl(settings?.socialLinks?.whatsapp)} target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-900 text-green-500 rounded-full hover:bg-green-500 hover:text-white transition-all shadow-lg hover:-translate-y-1">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884"/>
                </svg>
              </a>
              <a href={getValidUrl(settings?.socialLinks?.gmail)} target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-900 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-all shadow-lg hover:-translate-y-1">
                <Mail className="w-[22px] h-[22px]" />
              </a>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">
                <span className="text-blue-500">
                  Unity Earning LMS. All Rights Reserved
                </span>
              </p>
              <p className="text-gray-500 font-bold text-sm">
                Made with ❤️ by <a href="#" className="text-indigo-400 hover:text-blue-400 transition-colors font-black">Jihadul Islam</a>
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* FLOATING ACTION BUTTONS (MOBILE) */}
      <div className="fixed bottom-4 right-4 flex flex-col items-end gap-2 z-40 lg:hidden">
        {/* WhatsApp Icon */}
        <a 
          href={settings?.socialLinks?.whatsapp ? getValidUrl(settings.socialLinks.whatsapp) : "https://wa.me/8801919012426"} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-center w-10 h-10 bg-[#25D366] text-white rounded-full shadow-lg hover:bg-green-500 transition-colors"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M12.031 0C5.39 0 0 5.39 0 12.031c0 2.112.553 4.175 1.6 5.992L0 24l6.2-1.624c1.782.96 3.791 1.47 5.831 1.47h.004c6.641 0 12.031-5.39 12.031-12.031C24.066 5.39 18.672 0 12.031 0zm0 21.846h-.004c-1.802 0-3.565-.487-5.111-1.408l-.367-.217-3.805.998 1.016-3.71-.238-.378a9.855 9.855 0 0 1-1.503-5.244c0-5.45 4.436-9.885 9.885-9.885h.004c5.449 0 9.884 4.435 9.884 9.885 0 5.45-4.435 9.885-9.884 9.885zm5.421-7.403c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.199.297-.768.966-.94 1.164-.173.199-.347.223-.644.075-.298-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.298-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51h-.57c-.198 0-.52.074-.792.372-.272.298-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.075-.124-.272-.198-.57-.347z" />
          </svg>
        </a>

        {/* Quick Menu */}
        <button 
          className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white rounded-full shadow-lg font-bold text-sm hover:bg-indigo-700 transition"
          onClick={() => setIsMobileDrawerOpen(true)}
        >
          <Sliders className="w-4 h-4" /> Quick Menu
        </button>
      </div>

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
