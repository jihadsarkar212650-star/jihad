import { useState, useEffect } from 'react';
import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Swal from 'sweetalert2';
import { 
  X, LogIn, ShieldCheck, UserCog, User, Lock, Menu, Phone, HelpCircle, MessageCircle, BookOpen, ArrowRight, Store, UserPlus
} from 'lucide-react';
import { HomePage } from './HomePage';
import { StudentPanel } from './StudentPanel';
import { AdminPanel } from './AdminPanel';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [isHeaderDrawerOpen, setIsHeaderDrawerOpen] = useState(false);
  const [isAnnivPopupOpen, setIsAnnivPopupOpen] = useState(false);
  const [showGoTop, setShowGoTop] = useState(false);

  // Auth States
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loginNumber, setLoginNumber] = useState('');
  const [loginPass, setLoginPass] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Admin Check
    if (loginNumber === '01919012424' && loginPass === 'jihad123') {
      setIsAuthenticated(true);
      setIsAdmin(true);
      setIsLoginModalOpen(false);
      localStorage.setItem('ue_auth', 'true');
      localStorage.setItem('ue_admin', 'true');
      Swal.fire({
        icon: 'success',
        title: 'Admin Access Granted',
        text: 'Entering Management Dashboard...',
        timer: 1500,
        showConfirmButton: false,
        toast: true,
        position: 'top-end'
      });
      return;
    }

    // Student Check
    if (loginNumber === '01919012423' && loginPass === '888999') {
      setIsAuthenticated(true);
      setIsAdmin(false);
      setIsLoginModalOpen(false);
      localStorage.setItem('ue_auth', 'true');
      localStorage.setItem('ue_admin', 'false');
      Swal.fire({
        icon: 'success',
        title: 'Login Successful',
        text: 'Welcome to your Students Panel!',
        timer: 2000,
        showConfirmButton: false,
        toast: true,
        position: 'top-end'
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'Invalid Number or Password'
      });
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    localStorage.removeItem('ue_auth');
    localStorage.removeItem('ue_admin');
    Swal.fire({
      icon: 'info',
      title: 'Logged Out',
      text: 'You have been successfully logged out.',
      timer: 1500,
      showConfirmButton: false,
      toast: true,
      position: 'top-end'
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
      setShowGoTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);

    const savedAuth = localStorage.getItem('ue_auth');
    const savedAdmin = localStorage.getItem('ue_admin');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
      if (savedAdmin === 'true') setIsAdmin(true);
    }

    const COOLDOWN = 30 * 60 * 1000;
    const LAST_SHOW = localStorage.getItem('ue_anniv_popup_closed_at_v1');
    const now = Date.now();
    
    if (!LAST_SHOW || now - parseInt(LAST_SHOW) > COOLDOWN) {
      const timer = setTimeout(() => {
        setIsAnnivPopupOpen(true);
      }, 5000);
      return () => {
        clearTimeout(timer);
        window.removeEventListener('scroll', handleScroll);
      };
    }
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeAnnivPopup = () => {
    setIsAnnivPopupOpen(false);
    localStorage.setItem('ue_anniv_popup_closed_at_v1', Date.now().toString());
  };

  if (isAuthenticated) {
    return isAdmin ? <AdminPanel logout={logout} /> : <StudentPanel logout={logout} />;
  }

  return (
    <>
      <HomePage 
        isScrolled={isScrolled}
        setIsHelpModalOpen={setIsHelpModalOpen}
        setIsHeaderDrawerOpen={setIsHeaderDrawerOpen}
        setIsMobileDrawerOpen={setIsMobileDrawerOpen}
        isAnnivPopupOpen={isAnnivPopupOpen}
        closeAnnivPopup={closeAnnivPopup}
        showGoTop={showGoTop}
        setIsLoginModalOpen={setIsLoginModalOpen}
      />

      {/* LOGIN MODAL */}
      <AnimatePresence>
        {isLoginModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setIsLoginModalOpen(false)}
               className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />
            <motion.div 
               initial={{ scale: 0.9, opacity: 0, y: 20 }}
               animate={{ scale: 1, opacity: 1, y: 0 }}
               exit={{ scale: 0.9, opacity: 0, y: 20 }}
               className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden z-20"
            >
              <div className="bg-blue-600 p-8 text-white relative">
                <button 
                  onClick={() => setIsLoginModalOpen(false)}
                  className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
                <div className="text-center">
                  <h3 className="text-2xl font-black mb-2 font-hind">Login to System</h3>
                  <p className="text-blue-100/80 font-bold font-hind">Welcome Back!</p>
                </div>
              </div>
              
              <form onSubmit={handleLogin} className="p-8 space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 font-hind uppercase tracking-widest">Number</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                      type="text" 
                      value={loginNumber}
                      onChange={(e) => setLoginNumber(e.target.value)}
                      placeholder="Enter Number"
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none font-bold"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 font-hind uppercase tracking-widest">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                      type="password" 
                      value={loginPass}
                      onChange={(e) => setLoginPass(e.target.value)}
                      placeholder="Enter Password"
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none font-bold"
                      required
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black text-lg shadow-xl shadow-blue-900/20 hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
                >
                  <LogIn className="w-5 h-5" /> Login Now
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

       {/* HEADER DRAWER (MOBILE) */}
       <AnimatePresence>
        {isHeaderDrawerOpen && (
          <div className="fixed inset-0 z-[100]">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsHeaderDrawerOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }} className="absolute top-0 right-0 h-full w-[80%] max-w-sm bg-white shadow-2xl flex flex-col">
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <h3 className="text-xl font-bold text-blue-700 font-hind">মেনু</h3>
                <button onClick={() => setIsHeaderDrawerOpen(false)} className="p-2 bg-gray-100 rounded-xl"><X className="w-6 h-6" /></button>
              </div>
              <div className="p-6 overflow-y-auto flex-grow">
                <div className="grid gap-3">
                  {[
                    { icon: LogIn, label: "Login", onClick: () => { setIsLoginModalOpen(true); setIsHeaderDrawerOpen(false); } },
                    { icon: UserPlus, label: "Sign Up", href: "https://unityearning.com/sign-up" },
                    { icon: Store, label: "Store", href: "https://www.unityearning.com/shop" },
                    { icon: UserCog, label: "Agent Login", onClick: () => { setIsLoginModalOpen(true); setIsHeaderDrawerOpen(false); } },
                    { icon: ShieldCheck, label: "Student Login", onClick: () => { setIsLoginModalOpen(true); setIsHeaderDrawerOpen(false); } },
                    { icon: ShieldCheck, label: "Sub Admin Login", href: "https://unityearning.com/subadmin-login" },
                    { icon: ShieldCheck, label: "Admin Login", onClick: () => { setIsLoginModalOpen(true); setIsHeaderDrawerOpen(false); } },
                    { icon: BookOpen, label: "All Courses", href: "#" },
                    { icon: HelpCircle, label: "About us", href: "#" },
                    { icon: ShieldCheck, label: "Terms & Conditions", href: "#" },
                    { icon: ShieldCheck, label: "Privacy Policy", href: "#" },
                  ].map((item: any, i) => (
                    <button key={i} onClick={item.onClick} className="flex items-center gap-4 p-4 rounded-xl border border-gray-50 shadow-sm hover:bg-gray-50 transition-colors font-bold text-gray-800 cursor-pointer w-full text-left">
                      <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><item.icon className="w-5 h-5" /></div>
                      <span className="font-hind">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MOBILE DRAWER (QUICK MENU) */}
      <AnimatePresence>
        {isMobileDrawerOpen && (
          <div className="fixed inset-0 z-[100]">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsMobileDrawerOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }} className="absolute inset-x-0 bottom-0 bg-white rounded-t-3xl shadow-2xl max-h-[85vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b border-gray-100"><h3 className="text-xl font-bold text-blue-700 font-hind">দ্রুত মেনু</h3><button onClick={() => setIsMobileDrawerOpen(false)} className="p-2 bg-gray-100 rounded-xl"><X className="w-6 h-6" /></button></div>
              <div className="p-6 grid gap-3">
                {[
                  { icon: LogIn, label: "Login", color: "ue-pill-teal", onClick: () => { setIsLoginModalOpen(true); setIsMobileDrawerOpen(false); } },
                  { icon: UserPlus, label: "Sign Up", color: "", href: "https://unityearning.com/sign-up" },
                  { icon: Store, label: "Store", color: "ue-pill-emerald", href: "https://www.unityearning.com/shop" },
                  { icon: UserCog, label: "Agent Login", color: "", onClick: () => { setIsLoginModalOpen(true); setIsMobileDrawerOpen(false); } },
                  { icon: ShieldCheck, label: "Student Login", color: "", onClick: () => { setIsLoginModalOpen(true); setIsMobileDrawerOpen(false); } },
                  { icon: ShieldCheck, label: "Sub Admin Login", color: "", href: "https://unityearning.com/subadmin-login" },
                  { icon: ShieldCheck, label: "Admin Login", color: "", onClick: () => { setIsLoginModalOpen(true); setIsMobileDrawerOpen(false); } },
                ].map((item: any, i) => (
                  <button key={i} onClick={item.onClick} className={`ue-pill-btn ${item.color} justify-center w-full py-4 cursor-pointer`}><item.icon className="w-5 h-5" /> <span>{item.label}</span> <ArrowRight className="w-4 h-4" /></button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* HELP MODAL */}
      <AnimatePresence>
        {isHelpModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsHelpModalOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="ue-modal__dialog max-w-2xl w-full p-0 overflow-hidden">
               <button onClick={() => setIsHelpModalOpen(false)} className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200"><X className="w-5 h-5" /></button>
              <div className="p-8">
                <div className="flex items-center gap-4 mb-8"><div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><Phone className="w-6 h-6" /></div><h3 className="text-2xl font-bold text-blue-900 font-hind">সহায়তা কেন্দ্র</h3></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { icon: HelpCircle, title: "সাধারণ সহায়তা", desc: "লার্নিং/লগইন/পেমেন্ট–সংক্রান্ত প্রশ্নের দ্রুত সমাধান।" },
                    { icon: MessageCircle, title: "মেসেঞ্জার সাপোর্ট", desc: "লাইভ চ্যাটে এজেন্টের সাথে কথা বলুন。", cta: "মেসেঞ্জারে চ্যাট করুন", url: "https://m.me/yourpage" },
                    { icon: BookOpen, title: "সহায়তা ডকস", desc: "স্টেপ–বাই–স্টেপ গাইড, FAQ ও ভিডিও টিউটোরিয়াল。" }
                  ].map((item, i) => (
                    <div key={i} className="p-6 bg-gray-50 rounded-2xl flex gap-4"><div className="p-2 bg-white rounded-lg h-fit text-blue-600 shadow-sm"><item.icon className="w-5 h-5" /></div><div><h4 className="font-bold text-gray-900 mb-1 font-hind">{item.title}</h4><p className="text-sm text-gray-500 mb-3 font-hind">{item.desc}</p></div></div>
                  ))}
                </div>
              </div>
              <div className="bg-gray-50 p-6 flex justify-end gap-3"><button onClick={() => setIsHelpModalOpen(false)} className="ue-primary px-8 py-2 rounded-full font-bold text-white font-hind uppercase text-sm">ঠিক আছে</button></div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
