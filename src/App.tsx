import { useState, useEffect } from 'react';
import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Swal from 'sweetalert2';
import { 
  X, LogIn, ShieldCheck, UserCog, User, Lock, Menu, Phone, HelpCircle, MessageCircle, BookOpen, ArrowRight, Store, UserPlus, Eye, EyeOff
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

  // Auth States
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  
  // Normal Login State
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loginNumber, setLoginNumber] = useState('');
  const [loginPass, setLoginPass] = useState('');

  // Sub Admin Login State
  const [isSubAdminModalOpen, setIsSubAdminModalOpen] = useState(false);
  const [subAdminType, setSubAdminType] = useState('');
  const [subAdminId, setSubAdminId] = useState('');
  const [subAdminPass, setSubAdminPass] = useState('');
  const [showSubPass, setShowSubPass] = useState(false);

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

  const handleSubAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    Swal.fire({
      icon: 'error',
      title: 'Access Denied',
      text: 'Your account could not be found or you entered incorrect credentials.'
    });
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
               className="bg-white/95 backdrop-blur-xl border border-white/20 rounded-[2rem] shadow-2xl relative z-10 w-full max-w-md overflow-hidden"
            >
              {/* Abstract Top Gradient */}
              <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 opacity-[0.08]" />

              <div className="p-8 relative">
                <button 
                  onClick={() => setIsLoginModalOpen(false)}
                  className="absolute top-4 right-4 p-2 bg-gray-100/50 hover:bg-red-50 hover:text-red-500 rounded-full text-gray-500 transition-all z-20"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="text-center mb-8 mt-2">
                  <div className="w-16 h-16 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-2xl mx-auto flex items-center justify-center mb-5 shadow-lg shadow-blue-500/30 rotate-3 transition-transform hover:rotate-0 duration-300">
                     <User className="w-8 h-8 text-white -rotate-3 transition-transform hover:rotate-0 duration-300" />
                  </div>
                  <h3 className="text-3xl font-black text-gray-900 mb-3 tracking-tight font-hind">লগইন প্যানেল</h3>
                  <p className="text-[13px] text-gray-600 font-bold font-hind leading-relaxed bg-blue-50/80 text-blue-800 p-4 rounded-2xl border border-blue-100 shadow-sm relative overflow-hidden">
                    <span className="absolute top-0 left-0 w-1 h-full bg-blue-500 rounded-l-2xl"></span>
                    স্টুডেন্ট আইডিতে লগইন করার জন্য আপনার <span className="font-black text-green-600">WhatsApp নাম্বার</span> এবং <span className="font-black">পাসওয়ার্ড</span> দিয়ে লগইন এ ক্লিক করুন।
                  </p>
                </div>
                
                <form onSubmit={handleLogin} className="space-y-5" autoComplete="off">
                  <div>
                    <label className="block text-xs font-black text-gray-500 mb-2 font-hind uppercase tracking-widest ml-1">WhatsApp Number</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Phone className="w-5 h-5 text-gray-400 group-focus-within:text-green-500 transition-colors" />
                      </div>
                      <input 
                        type="text" 
                        value={loginNumber}
                        onChange={(e) => setLoginNumber(e.target.value)}
                        placeholder="01XXXXXXXXX"
                        autoComplete="off"
                        className="w-full pl-12 pr-4 py-4 bg-gray-50/80 border-2 border-gray-100 rounded-2xl focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10 transition-all outline-none font-bold text-gray-800 placeholder-gray-400"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-black text-gray-500 mb-2 font-hind uppercase tracking-widest ml-1">Password</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock className="w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                      </div>
                      <input 
                        type="password" 
                        value={loginPass}
                        onChange={(e) => setLoginPass(e.target.value)}
                        placeholder="••••••••••"
                        autoComplete="new-password"
                        className="w-full pl-12 pr-4 py-4 bg-gray-50/80 border-2 border-gray-100 rounded-2xl focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all outline-none font-bold tracking-widest text-gray-800 placeholder-gray-400"
                        required
                      />
                    </div>
                  </div>

                  <motion.button 
                    type="submit"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-black text-lg shadow-xl shadow-blue-600/25 hover:shadow-indigo-600/40 transition-all flex items-center justify-center gap-3 overflow-hidden relative group"
                  >
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
                    <span className="relative flex items-center gap-2">লগইন করুন <LogIn className="w-5 h-5" /></span>
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SUB ADMIN LOGIN MODAL */}
      <AnimatePresence>
        {isSubAdminModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setIsSubAdminModalOpen(false)}
               className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />
            <motion.div 
               initial={{ scale: 0.9, opacity: 0, y: 20 }}
               animate={{ scale: 1, opacity: 1, y: 0 }}
               exit={{ scale: 0.9, opacity: 0, y: 20 }}
               className="bg-white rounded-xl shadow-2xl relative z-10 w-full max-w-md overflow-hidden p-8"
            >
               <button 
                  onClick={() => setIsSubAdminModalOpen(false)}
                  className="absolute top-4 right-4 p-2 bg-gray-50 hover:bg-gray-100 rounded-full text-gray-400 transition-all z-20"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="text-center mb-10 mt-2">
                  <h3 className="text-3xl font-bold text-[#0D0B3D] tracking-tight uppercase font-sans">SUB ADMIN LOGIN</h3>
                </div>

                <form onSubmit={handleSubAdminLogin} className="space-y-6" autoComplete="off">
                  <div>
                    <label className="block text-base font-semibold text-[#0D0B3D] mb-2 font-sans tracking-wide">Account Type</label>
                    <div className="relative">
                      <select 
                        value={subAdminType}
                        onChange={(e) => setSubAdminType(e.target.value)}
                        className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-gray-600 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2024%2024%22%20stroke%3D%22%239CA3AF%22%3E%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%222%22%20d%3D%22M19%209l-7%207-7-7%22%2F%3E%3C%2Fsvg%3E')] bg-[length:20px_20px] bg-no-repeat bg-[position:right_1rem_center]"
                        required
                      >
                        <option value="" disabled>Select Department</option>
                        <option value="support">Support Admin</option>
                        <option value="trainer">Trainer</option>
                        <option value="teacher">Teacher</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-base font-semibold text-[#0D0B3D] mb-2 font-sans tracking-wide">SubAdmin Email or Phone</label>
                    <input 
                      type="text" 
                      value={subAdminId}
                      onChange={(e) => setSubAdminId(e.target.value)}
                      placeholder="Type your email or phone number"
                      className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-gray-800 placeholder-gray-400 font-sans"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-base font-semibold text-[#0D0B3D] mb-2 font-sans tracking-wide">Password</label>
                    <div className="relative">
                      <input 
                        type={showSubPass ? "text" : "password"}
                        value={subAdminPass}
                        onChange={(e) => setSubAdminPass(e.target.value)}
                        placeholder="**********"
                        className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-gray-800 placeholder-gray-400 placeholder:tracking-wides font-sans"
                        required
                      />
                      <button 
                        type="button"
                        onClick={() => setShowSubPass(!showSubPass)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#1E1B4B] hover:text-[#4f46e5] opacity-70"
                      >
                        {showSubPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-start">
                    <a href="#" className="text-[#6C5DD3] font-semibold tracking-wide text-sm hover:underline decoration-2 underline-offset-4 font-sans">Forgot Password?</a>
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-4 mt-2 bg-[#6C5DD3] hover:bg-[#5a4bc0] text-white rounded-lg font-bold tracking-wide text-base shadow-lg transition-all font-sans"
                  >
                    Sign In
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
                    { icon: UserPlus, label: "Sign Up", onClick: () => { window.location.href="https://unityearning.com/sign-up" } },
                    { icon: Store, label: "Store", onClick: () => { window.location.href="https://www.unityearning.com/shop" } },
                    { icon: UserCog, label: "Agent Login", onClick: () => { setIsLoginModalOpen(true); setIsHeaderDrawerOpen(false); } },
                    { icon: ShieldCheck, label: "Student Login", onClick: () => { setIsLoginModalOpen(true); setIsHeaderDrawerOpen(false); } },
                    { icon: ShieldCheck, label: "Sub Admin Login", onClick: () => { setIsSubAdminModalOpen(true); setIsHeaderDrawerOpen(false); } },
                    { icon: ShieldCheck, label: "Admin Login", onClick: () => { setIsLoginModalOpen(true); setIsHeaderDrawerOpen(false); } },
                    { icon: BookOpen, label: "All Courses", onClick: () => {} },
                    { icon: HelpCircle, label: "About us", onClick: () => {} },
                    { icon: ShieldCheck, label: "Terms & Conditions", onClick: () => {} },
                    { icon: ShieldCheck, label: "Privacy Policy", onClick: () => {} },
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
                  { icon: UserPlus, label: "Sign Up", color: "", onClick: () => { window.location.href="https://unityearning.com/sign-up" } },
                  { icon: Store, label: "Store", color: "ue-pill-emerald", onClick: () => { window.location.href="https://www.unityearning.com/shop" } },
                  { icon: UserCog, label: "Agent Login", color: "", onClick: () => { setIsLoginModalOpen(true); setIsMobileDrawerOpen(false); } },
                  { icon: ShieldCheck, label: "Student Login", color: "", onClick: () => { setIsLoginModalOpen(true); setIsMobileDrawerOpen(false); } },
                  { icon: ShieldCheck, label: "Sub Admin Login", color: "", onClick: () => { setIsSubAdminModalOpen(true); setIsMobileDrawerOpen(false); } },
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
