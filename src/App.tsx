import { useState, useEffect } from 'react';
import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Swal from 'sweetalert2';
import { 
  X, LogIn, ShieldCheck, UserCog, User, Lock, Menu, Phone, HelpCircle, MessageCircle, BookOpen, ArrowRight, Store, UserPlus, Eye, EyeOff, MessageSquare, Trophy, Zap, Grid, ChevronRight, Briefcase, CheckCircle2
} from 'lucide-react';
import { HomePage } from './HomePage';
import { StudentPanel } from './StudentPanel';
import { AdminPanel } from './AdminPanel';
import { RegisterPage } from './RegisterPage';
import { TermsModal } from './TermsModal';
import { SuccessStories } from './SuccessStories';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [isHeaderDrawerOpen, setIsHeaderDrawerOpen] = useState(false);
  const [isSuccessStoriesOpen, setIsSuccessStoriesOpen] = useState(false);
  const [isAnnivPopupOpen, setIsAnnivPopupOpen] = useState(false);

  // Auth States
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  
  // Modal & Route States
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterRouteOpen, setIsRegisterRouteOpen] = useState(false);
  const [loginModalType, setLoginModalType] = useState<'student'|'agent'|'admin'>('student');
  const [loginNumber, setLoginNumber] = useState('');
  const [loginPass, setLoginPass] = useState('');

  // Sub Admin Login State
  const [isSubAdminModalOpen, setIsSubAdminModalOpen] = useState(false);
  const [subAdminType, setSubAdminType] = useState('');
  const [isSubAdminTypeOpen, setIsSubAdminTypeOpen] = useState(false);
  const [subAdminId, setSubAdminId] = useState('');
  const [subAdminPass, setSubAdminPass] = useState('');
  const [showSubPass, setShowSubPass] = useState(false);

  const DEPARTMENT_OPTIONS = [
    { value: 'photo_editing', label: 'Photo Editing Teacher' },
    { value: 'team_leader', label: 'Team Leader' },
    { value: 'video_editing', label: 'Video Editing Teacher' },
    { value: 'trainer', label: 'Trainer' },
    { value: 'counsellor', label: 'Counsellor' },
    { value: 'senior_counsellor', label: 'Senior Counsellor' },
    { value: 'helpline', label: 'Help-Line' },
    { value: 'social_marketing', label: 'Social Marketing Teacher' },
    { value: 'web_developer', label: 'Web-Developer' },
    { value: 'selling_team', label: 'Selling Team' },
    { value: 'marketing_team', label: 'Marketing Team' },
    { value: 'qualification_team', label: 'Qualification Team' },
    { value: 'manager', label: 'Manager' },
    { value: 'controller', label: 'Controller' },
    { value: 'teacher', label: 'Teacher' },
    { value: 'checker', label: 'Checker' },
    { value: 'senior_team_leader', label: 'Senior Team Leader' },
    { value: 'senior_controller', label: 'Senior Controller' },
    { value: 'counsellor_manager', label: 'Counsellor Manager' },
    { value: 'marketing_manager', label: 'Marketing Manager' },
    { value: 'senior_teacher', label: 'Senior Teacher' },
    { value: 'account', label: 'Account' }
  ];

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

  if (isSuccessStoriesOpen) {
    return <SuccessStories onBack={() => setIsSuccessStoriesOpen(false)} />;
  }

  if (isAuthenticated) {
    return isAdmin ? <AdminPanel logout={logout} /> : <StudentPanel logout={logout} />;
  }

  if (isRegisterRouteOpen) {
    return <RegisterPage onBack={() => setIsRegisterRouteOpen(false)} />;
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
        setLoginModalType={setLoginModalType}
        openRegisterPage={() => setIsRegisterRouteOpen(true)}
        openTermsModal={() => setIsTermsModalOpen(true)}
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

              <div className="p-6 relative">
                <button 
                  onClick={() => setIsLoginModalOpen(false)}
                  className="absolute top-4 right-4 p-2 bg-gray-100/50 hover:bg-red-50 hover:text-red-500 rounded-full text-gray-500 transition-all z-20"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="text-center mb-6 mt-1">
                  <div className="w-14 h-14 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-lg shadow-blue-500/30 rotate-3 transition-transform hover:rotate-0 duration-300">
                     <User className="w-7 h-7 text-white -rotate-3 transition-transform hover:rotate-0 duration-300" />
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 mb-2 tracking-tight font-hind">লগইন প্যানেল</h3>
                  <p className="text-[12px] text-gray-600 font-bold font-hind leading-relaxed bg-blue-50/80 text-blue-800 p-3 rounded-2xl border border-blue-100 shadow-sm relative overflow-hidden">
                    <span className="absolute top-0 left-0 w-1 h-full bg-blue-500 rounded-l-2xl"></span>
                    {loginModalType === 'agent' 
                      ? "এজেন্ট আইডিতে লগইন করার জন্য আপনার " 
                      : loginModalType === 'admin' 
                        ? "এডমিন প্যানেলে লগইন করার জন্য আপনার " 
                        : "স্টুডেন্ট আইডিতে লগইন করার জন্য আপনার "}
                    <span className="font-black text-green-600">WhatsApp নাম্বার</span> এবং <span className="font-black">পাসওয়ার্ড</span> দিয়ে লগইন এ ক্লিক করুন।
                  </p>
                </div>
                
                <form onSubmit={handleLogin} className="space-y-4" autoComplete="off">
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 mb-1.5 font-hind uppercase tracking-widest ml-1">WhatsApp Number</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Phone className="w-4 h-4 text-gray-400 group-focus-within:text-green-500 transition-colors" />
                      </div>
                      <input 
                        type="text" 
                        value={loginNumber}
                        onChange={(e) => setLoginNumber(e.target.value)}
                        placeholder="01XXXXXXXXX"
                        autoComplete="off"
                        className="w-full pl-11 pr-4 py-3 bg-gray-50/80 border-2 border-gray-100 rounded-2xl focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10 transition-all outline-none font-bold text-gray-800 placeholder-gray-400 text-sm"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-gray-400 mb-1.5 font-hind uppercase tracking-widest ml-1">Password</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock className="w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                      </div>
                      <input 
                        type="password" 
                        value={loginPass}
                        onChange={(e) => setLoginPass(e.target.value)}
                        placeholder="••••••••••"
                        autoComplete="new-password"
                        className="w-full pl-11 pr-4 py-3 bg-gray-50/80 border-2 border-gray-100 rounded-2xl focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all outline-none font-bold tracking-widest text-gray-800 placeholder-gray-400 text-sm"
                        required
                      />
                    </div>
                  </div>

                  <motion.button 
                    type="submit"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3.5 mt-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-black text-base shadow-xl shadow-blue-600/25 hover:shadow-indigo-600/40 transition-all flex items-center justify-center gap-3 overflow-hidden relative group"
                  >
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
                    <span className="relative flex items-center gap-2 font-hind">লগইন করুন <LogIn className="w-5 h-5" /></span>
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

                <div className="text-center mb-8 mt-2 flex flex-col items-center">
                  <div className="w-16 h-16 bg-gradient-to-tr from-indigo-600 via-purple-600 to-indigo-700 rounded-3xl flex items-center justify-center mb-4 shadow-xl shadow-indigo-100 rotate-3 active:rotate-0 transition-transform cursor-pointer">
                     <Briefcase className="w-8 h-8 text-white -rotate-3" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight font-sans">SUB ADMIN LOGIN</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-1">Management Portal Access</p>
                </div>

                <form onSubmit={handleSubAdminLogin} className="space-y-6" autoComplete="off">
                  <div>
                    <label className="block text-base font-semibold text-[#0D0B3D] mb-2 font-sans tracking-wide">Account Type</label>
                    <div className="relative">
                      
                      <div 
                        onClick={() => setIsSubAdminTypeOpen(true)}
                        className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-lg cursor-pointer flex justify-between items-center text-gray-800 font-sans"
                      >
                        <span className={subAdminType ? "text-gray-800" : "text-gray-500"}>
                          {subAdminType ? DEPARTMENT_OPTIONS.find(opt => opt.value === subAdminType)?.label : "Select Department"}
                        </span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#9CA3AF" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                      
                      <AnimatePresence>
                        {isSubAdminTypeOpen && (
                          <div className="fixed inset-0 z-[300] flex flex-col justify-end">
                            <motion.div 
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              onClick={() => setIsSubAdminTypeOpen(false)}
                              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                            />
                            <motion.div 
                              initial={{ y: "100%" }}
                              animate={{ y: 0 }}
                              exit={{ y: "100%" }}
                              transition={{ type: "spring", damping: 30, stiffness: 300 }}
                              className="relative bg-slate-50 h-[100dvh] flex flex-col w-full z-10 font-sans"
                            >
                              <div className="sticky top-0 bg-white z-20 border-b border-slate-200 flex items-center justify-between p-5 px-6 shadow-sm">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
                                    <Briefcase className="w-5 h-5 text-indigo-600" />
                                  </div>
                                  <div>
                                    <h3 className="text-slate-900 text-lg font-black leading-none font-hind">Select Department</h3>
                                    <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest font-bold">Field of Expertise</p>
                                  </div>
                                </div>
                                <button type="button" onClick={() => setIsSubAdminTypeOpen(false)} className="p-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-500 transition-colors">
                                  <X className="w-5 h-5" />
                                </button>
                              </div>
                              
                              <div className="flex-1 overflow-y-auto p-6 space-y-3 pb-24">
                                {DEPARTMENT_OPTIONS.map((option, i) => (
                                  <motion.label 
                                    key={i} 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.02 }}
                                    className={`relative group flex items-center justify-between p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                                      subAdminType === option.value 
                                      ? "bg-indigo-600 border-indigo-600 shadow-lg shadow-indigo-100" 
                                      : "bg-white border-slate-100 hover:border-indigo-100 shadow-sm"
                                    }`}
                                  >
                                    <input 
                                      type="radio" 
                                      name="department" 
                                      value={option.value}
                                      checked={subAdminType === option.value}
                                      onChange={(e) => {
                                        setSubAdminType(e.target.value);
                                        setTimeout(() => setIsSubAdminTypeOpen(false), 250);
                                      }}
                                      className="hidden"
                                    />
                                    <div className="flex items-center gap-4">
                                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                                        subAdminType === option.value ? "bg-white/20 text-white" : "bg-slate-100/50 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-500 shadow-inner"
                                      }`}>
                                        <UserCog className="w-5 h-5" />
                                      </div>
                                      <span className={`text-sm font-bold tracking-tight transition-colors font-hind ${
                                        subAdminType === option.value ? "text-white" : "text-slate-700"
                                      }`}>
                                        {option.label}
                                      </span>
                                    </div>
                                    
                                    {subAdminType === option.value && (
                                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                                        <CheckCircle2 className="w-6 h-6 text-white" />
                                      </motion.div>
                                    )}
                                  </motion.label>
                                ))}
                              </div>

                              <div className="p-6 bg-white border-t border-slate-100 absolute bottom-0 left-0 right-0">
                                <button onClick={() => setIsSubAdminTypeOpen(false)} className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest active:scale-95 transition-transform">
                                  Confirm Selection
                                </button>
                              </div>
                            </motion.div>
                          </div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                    <div>
                      <label className="block text-[10px] font-black text-slate-400 mb-1.5 font-sans uppercase tracking-[0.2em] ml-1">SubAdmin ID</label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-300 group-focus-within:text-indigo-500 transition-colors">
                          <User className="w-5 h-5" />
                        </div>
                        <input 
                          type="text" 
                          value={subAdminId}
                          onChange={(e) => setSubAdminId(e.target.value)}
                          placeholder="Email or phone"
                          className="w-full pl-11 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none text-slate-800 placeholder-slate-300 font-sans font-bold transition-all shadow-sm"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-black text-slate-400 mb-1.5 font-sans uppercase tracking-[0.2em] ml-1">Secure Password</label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-300 group-focus-within:text-indigo-500 transition-colors">
                          <Lock className="w-5 h-5" />
                        </div>
                        <input 
                          type={showSubPass ? "text" : "password"}
                          value={subAdminPass}
                          onChange={(e) => setSubAdminPass(e.target.value)}
                          placeholder="**********"
                          className="w-full pl-11 pr-12 py-4 bg-white border border-slate-200 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none text-slate-800 placeholder-slate-300 tracking-widest font-sans font-bold transition-all shadow-sm"
                          required
                        />
                        <button 
                          type="button"
                          onClick={() => setShowSubPass(!showSubPass)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-indigo-600 transition-colors"
                        >
                          {showSubPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-start px-1">
                      <a href="#" className="text-indigo-600 font-black tracking-widest text-[11px] uppercase hover:text-indigo-800 transition-colors font-sans decoration-dashed underline-offset-4">Forgot Access?</a>
                    </div>

                    <button 
                      type="submit"
                      className="w-full py-4.5 mt-2 bg-[#6C5DD3] hover:bg-slate-900 text-white rounded-2xl font-black tracking-[0.2em] text-sm uppercase shadow-xl shadow-indigo-100 active:scale-95 transition-all font-sans"
                    >
                      Authenticate
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
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }} className="absolute top-0 right-0 h-full w-[85%] max-w-sm bg-white shadow-2xl flex flex-col font-hind overflow-hidden">
              
              {/* Drawer Header - Professional Look */}
              <div className="relative p-6 pt-10 pb-8 bg-blue-700 text-white overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-400/20 rounded-full -ml-8 -mb-8 blur-xl"></div>
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20">
                      <Menu className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold tracking-tight">Unity Earning</h3>
                      <p className="text-[10px] text-blue-100 uppercase tracking-widest font-black">Main Navigation</p>
                    </div>
                  </div>
                  <button onClick={() => setIsHeaderDrawerOpen(false)} className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors border border-white/10">
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Menu List - Serial Order */}
              <div className="flex-grow overflow-y-auto bg-slate-50/50">
                <div className="p-4 space-y-2.5">
                  {[
                    { icon: LogIn, label: "Login", onClick: () => { setLoginModalType('student'); setIsLoginModalOpen(true); setIsHeaderDrawerOpen(false); } },
                    { icon: Trophy, label: "Success stories", onClick: () => { setIsSuccessStoriesOpen(true); setIsHeaderDrawerOpen(false); } },
                    { icon: UserPlus, label: "Sign Up", onClick: () => { setIsRegisterRouteOpen(true); setIsHeaderDrawerOpen(false); } },
                    { icon: Store, label: "Official Store", onClick: () => { window.location.href="https://www.unityearning.com/shop" } },
                    { icon: UserCog, label: "Agent Login", onClick: () => { setLoginModalType('agent'); setIsLoginModalOpen(true); setIsHeaderDrawerOpen(false); } },
                    { icon: ShieldCheck, label: "Student Login", onClick: () => { setLoginModalType('student'); setIsLoginModalOpen(true); setIsHeaderDrawerOpen(false); } },
                    { icon: ShieldCheck, label: "Sub Admin Login", onClick: () => { setIsSubAdminModalOpen(true); setIsHeaderDrawerOpen(false); } },
                    { icon: ShieldCheck, label: "Admin Login", onClick: () => { setLoginModalType('admin'); setIsLoginModalOpen(true); setIsHeaderDrawerOpen(false); } },
                    { icon: BookOpen, label: "All Courses", onClick: () => {} },
                    { icon: HelpCircle, label: "About us", onClick: () => {} },
                    { icon: ShieldCheck, label: "Terms & Conditions", onClick: () => { setIsTermsModalOpen(true); setIsHeaderDrawerOpen(false); } },
                    { icon: ShieldCheck, label: "Privacy Policy", onClick: () => {} },
                  ].map((item: any, i) => (
                    <motion.button 
                      key={i} 
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.03 }}
                      onClick={item.onClick} 
                      className="group flex items-center justify-between py-3.5 px-4 bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all text-slate-700 w-full text-left active:scale-[0.98]"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="w-9 h-9 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-inner">
                          <item.icon className="w-4.5 h-4.5" />
                        </div>
                        <span className="font-bold text-[15px] font-hind tracking-tight">{item.label}</span>
                      </div>
                      <ChevronRight className="w-4.5 h-4.5 text-slate-300 transform group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Footer Part */}
              <div className="p-4 border-t border-slate-100 bg-white">
                <button className="w-full py-4 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center gap-3 text-white font-bold shadow-lg shadow-slate-100 active:scale-95 transition-transform">
                  <Phone className="w-4 h-4 text-green-400" />
                  <span className="text-xs uppercase tracking-widest font-hind">হেল্পলাইনে যোগাযোগ</span>
                </button>
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
            <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }} className="absolute inset-x-0 bottom-0 bg-white rounded-t-[2.5rem] shadow-2xl max-h-[85vh] flex flex-col overflow-hidden font-hind">
              
              <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto my-3" />
              
              <div className="px-6 py-4 flex items-center justify-between border-b border-slate-50">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center border border-blue-100/50">
                    <Grid className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 font-hind">দ্রুত মেনু</h3>
                </div>
                <button onClick={() => setIsMobileDrawerOpen(false)} className="p-2 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors">
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              <div className="p-4 space-y-2.5 overflow-y-auto">
                {[
                  { icon: LogIn, label: "Login", color: "text-blue-600 bg-blue-50 border-blue-100", onClick: () => { setLoginModalType('student'); setIsLoginModalOpen(true); setIsMobileDrawerOpen(false); } },
                  { icon: Trophy, label: "Success stories", color: "text-orange-600 bg-orange-50 border-orange-100", onClick: () => { setIsSuccessStoriesOpen(true); setIsMobileDrawerOpen(false); } },
                  { icon: UserPlus, label: "Sign Up", color: "text-emerald-600 bg-emerald-50 border-emerald-100", onClick: () => { setIsRegisterRouteOpen(true); setIsMobileDrawerOpen(false); } },
                  { icon: Store, label: "Store", color: "text-purple-600 bg-purple-50 border-purple-100", onClick: () => { window.location.href="https://www.unityearning.com/shop" } },
                  { icon: UserCog, label: "Agent Login", color: "text-indigo-600 bg-indigo-50 border-indigo-100", onClick: () => { setLoginModalType('agent'); setIsLoginModalOpen(true); setIsMobileDrawerOpen(false); } },
                  { icon: ShieldCheck, label: "Student Login", color: "text-blue-600 bg-blue-50 border-blue-100", onClick: () => { setLoginModalType('student'); setIsLoginModalOpen(true); setIsMobileDrawerOpen(false); } },
                  { icon: ShieldCheck, label: "Sub Admin Login", color: "text-slate-600 bg-slate-50 border-slate-100", onClick: () => { setIsSubAdminModalOpen(true); setIsMobileDrawerOpen(false); } },
                  { icon: ShieldCheck, label: "Admin Login", color: "text-red-600 bg-red-50 border-red-100", onClick: () => { setLoginModalType('admin'); setIsLoginModalOpen(true); setIsMobileDrawerOpen(false); } },
                ].map((item: any, i) => (
                  <motion.button 
                    key={i} 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.03 }}
                    onClick={item.onClick} 
                    className="group flex items-center justify-between py-3.5 px-4 bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all text-slate-700 w-full text-left active:scale-[0.98]"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center border ${item.color} shadow-sm group-hover:scale-110 transition-transform`}>
                        <item.icon className="w-4.5 h-4.5" />
                      </div>
                      <span className="font-bold text-[15px] font-hind tracking-tight">{item.label}</span>
                    </div>
                    <ArrowRight className="w-4.5 h-4.5 text-slate-300 transform group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                ))}
              </div>

              <div className="p-6 pt-2 pb-10">
                 <button onClick={() => setIsHelpModalOpen(true)} className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-xl shadow-blue-100 flex items-center justify-center gap-3 active:scale-95 transition-transform">
                   <HelpCircle className="w-5 h-5 text-white/80" /> আমাদের সাথে কথা বলুন
                 </button>
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
                    { icon: HelpCircle, title: "সাধারণ সহায়তা", desc: "লার্নিং/লগইন/পেমেন্ট–সংক্রান্ত প্রশ্নের দ্রুত সমাধান।", cta: "কল দিন", phoneCall: "tel:+8801XXXXXXXXX" },
                    { icon: MessageCircle, title: "মেসেঞ্জার সাপোর্ট", desc: "লাইভ চ্যাটে এজেন্টের সাথে কথা বলুন。", cta: "মেসেঞ্জারে চ্যাট করুন", url: "https://m.me/yourpage" },
                    { icon: Phone, title: "সরাসরি কল", desc: "কোনো সমস্যা বা জরুরি প্রয়োজনে সরাসরি কল করুন।", cta: "কল দিন", phoneCall: "tel:+8801XXXXXXXXX" },
                    { icon: MessageSquare, title: "সরাসরি মেসেজ (WhatsApp)", desc: "সরাসরি হোয়াটসঅ্যাপে টেক্সট করুন।", cta: "মেসেজ দিন", whatsApp: "https://wa.me/8801XXXXXXXXX" },
                    { icon: BookOpen, title: "সহায়তা ডকস", desc: "স্টেপ–বাই–স্টেপ গাইড, FAQ ও ভিডিও টিউটোরিয়াল。" }
                  ].map((item, i) => (
                    <div key={i} className="p-6 bg-gray-50 rounded-2xl flex flex-col gap-4">
                      <div className="flex gap-4">
                        <div className="p-2 bg-white rounded-lg h-fit text-blue-600 shadow-sm"><item.icon className="w-5 h-5" /></div>
                        <div><h4 className="font-bold text-gray-900 mb-1 font-hind">{item.title}</h4><p className="text-sm text-gray-500 mb-3 font-hind">{item.desc}</p></div>
                      </div>
                      {item.cta && (
                        <a href={item.url || item.phoneCall || item.whatsApp} target="_blank" rel="noopener noreferrer" className="mt-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-sm text-center transition-colors">
                          {item.cta}
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gray-50 p-6 flex justify-end gap-3"><button onClick={() => setIsHelpModalOpen(false)} className="ue-primary px-8 py-2 rounded-full font-bold text-white font-hind uppercase text-sm">ঠিক আছে</button></div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* TERMS MODAL */}
      <TermsModal isOpen={isTermsModalOpen} onClose={() => setIsTermsModalOpen(false)} />
    </>
  );
}
