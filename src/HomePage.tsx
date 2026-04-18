import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, X, LogIn, UserPlus, Store, UserCog, ShieldCheck, 
  ArrowRight, Phone, HelpCircle, MessageCircle, BookOpen,
  ChevronUp, Star, PenSquare, Sliders
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const COURSES = [
  { id: 1, title: "Al-Quran Hadis & Namaz Shikkha", img: "https://unityearning.com/assets/img/Popular%20Courses/Al-Quran.jpg" },
  { id: 2, title: "Photo Editing", img: "https://unityearning.com/assets/img/Popular%20Courses/photo%20edit.jpg" },
  { id: 3, title: "Video Editing", img: "https://unityearning.com/assets/img/Popular%20Courses/video%20edit.jpg" },
  { id: 4, title: "Digital Marketing", img: "https://unityearning.com/assets/img/Popular%20Courses/Digital%20Market.jpg" },
  { id: 5, title: "Product Sell & Buy", img: "https://unityearning.com/assets/img/Popular%20Courses/Product%20Sell.jpg" },
  { id: 6, title: "Data Entry", img: "https://unityearning.com/assets/img/Popular%20Courses/data%20enty.jpg" },
  { id: 7, title: "Facebook Marketing", img: "https://unityearning.com/assets/img/Popular%20Courses/Graphic.jpg" },
  { id: 8, title: "Spoken English", img: "https://unityearning.com/assets/img/Popular%20Courses/spoken-english.jpeg" },
  { id: 9, title: "Graphic Design", img: "https://unityearning.com/assets/img/Popular%20Courses/Graphic%20Design.jpg" },
  { id: 10, title: "Computer Training", img: "https://unityearning.com/assets/img/Popular%20Courses/Computer%20Training.jpg" },
  { id: 11, title: "SIM Offer Selling", img: "https://unityearning.com/assets/img/Popular%20Courses/sim.jpg" },
  { id: 12, title: "Email Marketing", img: "https://unityearning.com/assets/img/Popular%20Courses/email-marketing.png" },
  { id: 13, title: "Network Marketing", img: "https://unityearning.com/assets/img/Popular%20Courses/network.webp" },
  { id: 14, title: "E-Commerce Marketing", img: "https://unityearning.com/assets/img/Popular%20Courses/ecommerce.jpg" },
  { id: 15, title: "T-Shirt Design", img: "https://unityearning.com/assets/img/Popular%20Courses/tshirt.jpg" },
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
              <a href="https://unityearning.com/subadmin-login" className="nav-pill pill-sub">
                <UserCog className="w-4 h-4" /><span>Sub Admin</span>
              </a>
              <a href="https://unityearning.com/admin-login" className="nav-pill pill-admin">
                <ShieldCheck className="w-4 h-4" /><span>Admin</span>
              </a>
            </div>

            {/* Mobile Hamburger */}
            <button 
              className="lg:hidden p-2 text-white bg-green-700/50 rounded-lg"
              onClick={() => setIsHeaderDrawerOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </nav>
        </div>
      </div>

      {/* BANNER 1 */}
      <section className="banner_area_one py-12 lg:py-24 bg-[#0b8f2d]">
        <div className="container mx-auto px-4 lg:px-12">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/3 text-white">
              <p className="text-xl lg:text-2xl font-bold uppercase tracking-wider">
                WELCOME TO <br/>
                <span className="text-yellow-300">UNITY EARNING E-LEARNING PLATFORM</span>
              </p>
            </div>
            <div className="lg:w-2/3">
              <img 
                src="https://unityearning.com/assets/img/banner-img/skill.webp" 
                alt="Skills" 
                className="w-full max-w-2xl mx-auto rounded-2xl shadow-2xl" 
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* BANNER 2 / CTA */}
      <section className="banner_area_tow py-8 bg-[#0b8f2d]">
        <div className="container mx-auto px-4 lg:px-12">
          <div className="flex flex-wrap gap-4">
            <button onClick={() => setIsLoginModalOpen(true)} className="ue-pill-btn ue-pill-teal">
              <LogIn className="w-4 h-4" /> <span>Login</span> <ArrowRight className="w-4 h-4" />
            </button>
            <a href="https://unityearning.com/sign-up" className="ue-pill-btn">
              <UserPlus className="w-4 h-4" /> <span>Sign Up</span> <ArrowRight className="w-4 h-4" />
            </a>
            <a href="https://www.unityearning.com/shop" className="ue-pill-btn ue-pill-emerald">
              <Store className="w-4 h-4" /> <span>Store</span> <ArrowRight className="w-4 h-4" />
            </a>
            <button onClick={() => setIsLoginModalOpen(true)} className="ue-pill-btn ue-pill-lime">
              <UserCog className="w-4 h-4" /> <span>Agent Login</span> <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ABOUT / ACHIEVE */}
      <section className="achieve-area text-white">
        <div className="container mx-auto px-4 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg leading-relaxed font-hind">
              এটি বাংলাদেশের একটি বিশ্বস্ত অনলাইন প্ল্যাটফর্ম। এখানে আপনার ঘরে বসে শুধুমাত্র একটি স্মার্টফোন ব্যবহার করেই অবসর সময়কে কাজে লাগিয়ে শেখা এবং উপার্জনের সুযোগ রয়েছে।
              <br/><br/>
              শেখার প্রক্রিয়াটি অত্যন্ত সহজ, কারণ এখানে আপনি নিজের মাতৃভাষায় শেখার সুযোগ পাবেন। ফলে নতুন কিছু শেখা বা দক্ষতা অর্জন করতে আপনার কোনো সমস্যাই হবে না। পাশাপাশি, শেখার পাশাপাশি আমাদের কমিউনিটির মাধ্যমে আপনি কোর্স, সেবা বা বিভিন্ন প্রোডাক্ট বিক্রির মাধ্যমে আয় করতে পারবেন।
              <br/><br/>
              এখানে আপনার জন্য একটি সহজ, নির্ভরযোগ্য এবং দীর্ঘমেয়াদি ক্যারিয়ার গড়ে তোলার সুযোগ রয়েছে। ধাপে ধাপে শিখে এবং প্রয়োগের মাধ্যমে আপনি নিজের ক্যারিয়ারকে সুন্দর ও সফলভাবে এগিয়ে নিতে পারবেন।
            </p>

            <button 
              className="ue-help-btn mt-8"
              onClick={() => setIsHelpModalOpen(true)}
            >
              সহায়তা দরকার?
            </button>
          </div>
        </div>
      </section>

      {/* POPULAR COURSES */}
      <section className="courses-area bg-white py-16">
        <div className="container mx-auto px-4 lg:px-12">
          <div className="text-center mb-16">
            <span className="text-green-700 font-bold uppercase tracking-widest text-sm block mb-4">Popular Courses</span>
            <h2 className="bg-green-700 text-white px-8 py-6 rounded-xl inline-block text-2xl lg:text-3xl font-bold uppercase">
              Our Popular Courses
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {COURSES.map(course => (
              <motion.div 
                key={course.id} 
                whileHover={{ y: -5 }}
                className="single-course group"
              >
                <div className="aspect-video overflow-hidden">
                  <img src={course.img} alt={course.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" referrerPolicy="no-referrer" />
                </div>
                <div className="course-content bg-gray-50 p-6 flex flex-col items-center">
                  <h3 className="w-full">
                    {course.title}
                  </h3>
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
