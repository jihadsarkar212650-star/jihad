import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, X, LogOut, LayoutGrid, FileText, ImageIcon, 
  User, Bell, Video, Lock, Store, HelpCircle, ArrowRight, Phone,
  Users, CreditCard, ArrowDownCircle, UserCog, ChevronUp, AlertTriangle, Send, CheckCircle2,
  Copy, ExternalLink, QrCode, Wallet, Fingerprint, Share2, Keyboard, Eye
} from 'lucide-react';
import { useState, FormEvent, useEffect } from 'react';
import { db } from './lib/firebase';
import { useSettings } from './lib/useSettings';
import Swal from 'sweetalert2';

const MENU_ITEMS = [
  { label: "Student profile", icon: User, href: "#" },
  { label: "My Homeworks", icon: FileText, href: "#" },
  { label: "Photo Gallery", icon: ImageIcon, href: "#" },
  { label: "Edit Profile", icon: UserCog, href: "#" },
  { label: "Reference", icon: Users, href: "#" },
  { label: "My Passbook", icon: CreditCard, href: "#" },
  { label: "Withdrawals", icon: ArrowDownCircle, href: "#" },
  { label: "Notice", icon: Bell, href: "#" },
  { label: "Store", icon: Store, href: "#" },
  { label: "Video Tutorial", icon: Video, href: "https://support-unityearning.vercel.app/" },
  { label: "Typing Work", icon: Keyboard, href: "https://unity-earning-typing.vercel.app" },
  { label: "Change Password", icon: Lock, href: "#" },
];

const CATEGORIES = [
  { title: "Email Marketing", count: 0, img: "https://images.unsplash.com/photo-1557200136-7e10f443a9a1?auto=format&fit=crop&q=80&w=800" },
  { title: "Video Editing.", count: 0, img: "https://images.unsplash.com/photo-1574717024453-354056a2f26d?auto=format&fit=crop&q=80&w=800" },
  { title: "Form Fill-up.", count: 0, img: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=800" },
  { title: "Data Entry.", count: 0, img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800" },
  { title: "Typing Work.", count: 0, img: "https://images.unsplash.com/photo-1485856407642-7f9ba0268b51?auto=format&fit=crop&q=80&w=800" },
  { title: "Digital Marketing.", count: 0, img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800" },
  { title: "Graphic Designing.", count: 0, img: "https://images.unsplash.com/photo-1572044162444-ad60f128b582?auto=format&fit=crop&q=80&w=800" },
  { title: "Product Selling.", count: 0, img: "https://images.unsplash.com/photo-1472851294608-062f824d28c5?auto=format&fit=crop&q=80&w=800" },
  { title: "Computer Course.", count: 0, img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800" },
  { title: "Facebook Marketing.", count: 0, img: "https://images.unsplash.com/photo-1611162617651-5363b3614065?auto=format&fit=crop&q=80&w=800" },
  { title: "Gaming Marketing.", count: 0, img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800" },
  { title: "Spoken English.", count: 0, img: "https://images.unsplash.com/photo-1503676260728-1c00da096a0b?auto=format&fit=crop&q=80&w=800" },
  { title: "Namaz & Quran Shikkha", count: 0, img: "https://images.unsplash.com/photo-1564507004663-b6dfb3c814d5?auto=format&fit=crop&q=80&w=800" },
  { title: "Photo Editing.", count: 1, img: "https://images.unsplash.com/photo-1585217678944-7f1390448e89?auto=format&fit=crop&q=80&w=800" },
];

const LIVE_CLASSES = [
  { topic: "Email Marketing", teacher: "আল আমিন হাসান" },
  { topic: "Video Editing.", teacher: "আরিফ ইসলাম" },
  { topic: "Form Fill-up.", teacher: "সুমাইয়া জাহান" },
  { topic: "Data Entry.", teacher: "মেহরাব হোসেন" },
  { topic: "Digital Marketing.", teacher: "আকাশ আহমেদ" },
  { topic: "Graphic Designing.", teacher: "খলিলুর রহমান" },
  { topic: "Typing Work.", teacher: "জুনায়েদ ইসলাম" },
  { topic: "Product Selling.", teacher: "আমেনা খাতুন" },
  { topic: "Computer Course.", teacher: "আল আমিন হাসান" },
  { topic: "Facebook Marketing.", teacher: "আরিফ ইসলাম" },
  { topic: "Gaming Marketing.", teacher: "সুমাইয়া জাহান" },
  { topic: "Spoken English.", teacher: "মেহরাব হোসেন" },
  { topic: "Photo Editing.", teacher: "খলিলুর রহমান" }
];

interface StudentPanelProps {
  logout: () => void;
}

function LiveViewerCount() {
  const [count, setCount] = useState(358);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => {
        const diff = Math.floor(Math.random() * 5) - 2;
        const newCount = prev + diff;
        return newCount < 300 ? 300 : newCount > 600 ? 550 : newCount;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-1.5 bg-red-600/10 text-red-600 border border-red-600/10 px-2 py-1 rounded-lg text-[10px] font-black">
      <Eye className="w-3 h-3 animate-pulse" />
      <span className="tabular-nums">{count}</span>
    </div>
  );
}

function StudentProfile() {
  const [copied, setCopied] = useState(false);
  const studentId = "3255889";
  const referralCode = `UE-${studentId}`;
  const referralLink = `https://unityearning.com/register?ref=${referralCode}`;

  const info = [
    { label: "Phone", value: "01919012423", icon: Phone },
    { label: "E-mail", value: "tanhaislam21@gmail.com", icon: Send },
    { label: "Bio", value: "Premium Online Worker", icon: User },
    { label: "Address", value: "Dhaka, Bangladesh", icon: ExternalLink },
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    Swal.fire({
      icon: 'success',
      title: 'Link Copied!',
      text: 'Referral link copied to clipboard.',
      timer: 1500,
      showConfirmButton: false,
      toast: true,
      position: 'top-end'
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="container mx-auto px-4 lg:px-12 mt-4 md:mt-8 pb-20 space-y-6 md:space-y-12"
    >
      {/* PROFESSIONAL STAT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div className="relative group overflow-hidden bg-[#020617] rounded-3xl md:rounded-[32px] p-5 md:p-7 text-white shadow-xl flex flex-col justify-between min-h-[160px] md:h-[200px]">
          <div className="absolute top-0 right-0 p-6 opacity-10 scale-100 md:scale-125 rotate-12 group-hover:scale-[1.5] transition-transform duration-700">
            <Wallet className="w-20 h-20 md:w-24 md:h-24" />
          </div>
          <div className="relative z-10 flex flex-col h-full justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="bg-emerald-500 p-2 rounded-xl shadow-lg shadow-emerald-500/20">
                <Wallet className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </div>
              <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-emerald-400">Net Capital</span>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-black tabular-nums tracking-tighter mb-0.5">Tk 6,991.22</div>
              <p className="text-slate-400 font-bold text-[9px] uppercase tracking-widest leading-none">Available for Liquidation</p>
            </div>
            <div className="flex items-center gap-2 text-[8px] md:text-[9px] font-black uppercase tracking-widest bg-emerald-500/10 text-emerald-500 w-fit px-3 py-1 md:px-3.5 md:py-1.5 rounded-full border border-emerald-500/20">
              Verified Wallet
            </div>
          </div>
        </div>

        <div className="relative group overflow-hidden bg-gradient-to-br from-blue-700 to-indigo-900 rounded-3xl md:rounded-[32px] p-5 md:p-7 text-white shadow-xl flex flex-col justify-between min-h-[160px] md:h-[200px]">
          <div className="absolute top-0 right-0 p-6 opacity-10 scale-100 md:scale-125 -rotate-12 group-hover:scale-[1.5] transition-transform duration-700">
            <Fingerprint className="w-20 h-20 md:w-24 md:h-24" />
          </div>
          <div className="relative z-10 flex flex-col h-full justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md">
                <Fingerprint className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </div>
              <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-blue-200">identity signature</span>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-black tabular-nums tracking-tighter mb-0.5">ID: {studentId}</div>
              <p className="text-blue-200/60 font-bold text-[9px] uppercase tracking-widest leading-none">Global Student ID</p>
            </div>
            <div className="flex items-center gap-2 text-[8px] md:text-[9px] font-black uppercase tracking-widest bg-white/10 text-white w-fit px-3 py-1 md:px-3.5 md:py-1.5 rounded-full backdrop-blur-md border border-white/10">
              Premium Account
            </div>
          </div>
        </div>
      </div>

      {/* INFORMATION & MANAGEMENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* PERSONAL INFO */}
        <div className="lg:col-span-2 bg-white rounded-3xl md:rounded-[40px] p-5 md:p-8 shadow-sm border border-gray-100 relative overflow-hidden">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-base md:text-xl font-black text-slate-800 tracking-tighter">Student Profile Info</h3>
            <span className="text-[8px] md:text-[9px] font-black uppercase tracking-widest bg-slate-50 text-slate-400 px-3 py-1 rounded-full">Secure Data</span>
          </div>
          
          <div className="flex flex-col md:flex-row gap-5 md:gap-8 items-center mb-8 border-b border-gray-50 pb-8 text-center md:text-left">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-slate-900 rounded-2xl md:rounded-[32px] flex items-center justify-center text-white text-2xl md:text-3xl font-black shadow-lg ring-4 md:ring-[8px] ring-slate-50">
              TM
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-1 leading-none">Tanha Islam Mim</h2>
              <div className="flex items-center justify-center md:justify-start gap-2 bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full border border-emerald-100 w-fit mx-auto md:mx-0">
                <CheckCircle2 className="w-3 h-3" />
                <span className="text-[8px] md:text-[9px] font-black uppercase tracking-widest leading-none">Verified Identity</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {info.map((item, i) => (
              <div key={i} className="flex gap-4 items-center p-4 bg-slate-50 rounded-2xl md:rounded-3xl group hover:bg-white hover:shadow-xl hover:shadow-slate-100 transition-all border border-transparent hover:border-gray-50">
                <div className="w-9 h-9 md:w-10 md:h-10 bg-white rounded-xl flex items-center justify-center text-slate-400 group-hover:text-blue-600 shadow-sm transition-colors shrink-0">
                  <item.icon className="w-4 h-4 md:w-4.5 md:h-4.5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-slate-400 mb-0.5 truncate">{item.label}</p>
                  <p className="text-slate-800 font-black text-xs md:text-sm truncate">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* REFERRAL MANAGEMENT SECTION */}
        <div className="bg-[#020617] rounded-3xl md:rounded-[40px] p-5 md:p-8 text-white shadow-2xl relative overflow-hidden flex flex-col justify-between gap-6">
          <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none group-hover:scale-110 transition-transform">
            <Share2 className="w-32 h-32 md:w-48 md:h-48" />
          </div>
          
          <div className="relative z-10">
            <div className="bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] mb-4 border border-emerald-500/20 w-fit">
              Network Rewards
            </div>
            <h3 className="text-lg md:text-xl font-black mb-2 tracking-tighter">Referral System</h3>
            <p className="text-slate-400 font-bold mb-6 text-[10px] md:text-xs leading-relaxed opacity-80">
              Invite students and earn rewards for every activation.
            </p>

            <div className="space-y-4">
              <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
                <p className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-slate-500 mb-1 ">Unique Referral Code</p>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-lg md:text-xl font-black text-emerald-400 tracking-wider tabular-nums">{referralCode}</span>
                  <div className="bg-emerald-500/20 p-1.5 rounded-lg">
                    <QrCode className="w-4 h-4 md:w-5 md:h-5 text-emerald-500" />
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
                <p className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-slate-500 mb-2">Invitation Link</p>
                <div className="flex flex-col gap-2">
                  <input 
                    type="text" 
                    readOnly 
                    value={referralLink} 
                    className="bg-black/20 border border-white/5 rounded-lg px-3 py-2 text-[9px] font-bold text-slate-400 w-full outline-none"
                  />
                  <button 
                    onClick={copyToClipboard}
                    className="w-full py-2.5 bg-white text-slate-900 rounded-lg hover:bg-emerald-400 transition-colors active:scale-95 flex items-center justify-center gap-2 font-black text-[9px] uppercase tracking-widest"
                  >
                    <Copy className="w-3.5 h-3.5" /> Copy Link
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 p-4 bg-white/5 rounded-2xl border border-white/5 border-dashed">
            <div className="flex items-center gap-4">
              <div className="w-9 h-9 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-500 font-bold text-[10px] ring-2 ring-emerald-500/5">
                R
              </div>
              <div>
                <p className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-slate-400">Total Referrals</p>
                <p className="text-sm md:text-base font-black text-emerald-400 leading-none">00 Users</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function MyHomeworks() {
  const [submittingHw, setSubmittingHw] = useState<any>(null);
  const [submissionLink, setSubmissionLink] = useState('');
  const [submissionNotes, setSubmissionNotes] = useState('');

  const homeworks = [
    { title: "Email Marketing", status: "Continue", color: "bg-cyan-500", img: "https://images.unsplash.com/photo-1557200136-7e10f443a9a1?auto=format&fit=crop&q=80&w=800" },
    { title: "Video Editing.", status: "Continue", color: "bg-cyan-500", img: "https://images.unsplash.com/photo-1574717024453-354056a2f26d?auto=format&fit=crop&q=80&w=800" },
    { title: "Form Fill-up.", status: "Continue", color: "bg-cyan-500", img: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=800" },
    { title: "Data Entry.", status: "Continue", color: "bg-cyan-500", img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800" },
    { title: "Typing Work.", status: "Continue", color: "bg-cyan-500", img: "https://images.unsplash.com/photo-1485856407642-7f9ba0268b51?auto=format&fit=crop&q=80&w=800" },
    { title: "Digital Marketing.", status: "Continue", color: "bg-cyan-500", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800" },
    { title: "Graphic Designing.", status: "Continue", color: "bg-cyan-500", img: "https://images.unsplash.com/photo-1572044162444-ad60f128b582?auto=format&fit=crop&q=80&w=800" },
    { title: "Product Selling.", status: "Continue", color: "bg-cyan-500", img: "https://images.unsplash.com/photo-1472851294608-062f824d28c5?auto=format&fit=crop&q=80&w=800" },
    { title: "Computer Course.", status: "Continue", color: "bg-cyan-500", img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800" },
    { title: "Facebook Marketing.", status: "Continue", color: "bg-cyan-500", img: "https://images.unsplash.com/photo-1611162617651-5363b3614065?auto=format&fit=crop&q=80&w=800" },
    { title: "Gaming Marketing.", status: "Continue", color: "bg-cyan-500", img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800" },
    { title: "Spoken English.", status: "Continue", color: "bg-cyan-500", img: "https://images.unsplash.com/photo-1503676260728-1c00da096a0b?auto=format&fit=crop&q=80&w=800" },
    { title: "Namaz & Quran Shikkha", status: "Continue", color: "bg-cyan-500", img: "https://images.unsplash.com/photo-1564507004663-b6dfb3c814d5?auto=format&fit=crop&q=80&w=800" },
    { title: "Photo Editing.", status: "Continue", color: "bg-cyan-500", img: "https://images.unsplash.com/photo-1585217678944-7f1390448e89?auto=format&fit=crop&q=80&w=800" },
  ];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    Swal.fire({
      title: 'Submitting...',
      text: 'Please wait while we process your homework.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    setTimeout(() => {
      Swal.fire({
        icon: 'success',
        title: 'Successfully Submitted!',
        text: 'Your homework has been sent for review.',
        confirmButtonColor: '#3b82f6'
      });
      setSubmittingHw(null);
      setSubmissionLink('');
      setSubmissionNotes('');
    }, 1500);
  };

  if (submittingHw) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="container mx-auto px-4 lg:px-12 mt-8 pb-20">
        <div className="max-w-3xl mx-auto">
          <button 
            onClick={() => setSubmittingHw(null)}
            className="mb-6 flex items-center gap-2 text-gray-400 hover:text-blue-600 font-bold transition-colors"
          >
            <ArrowRight className="w-5 h-5 rotate-180" /> Back to Homeworks
          </button>

          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-slate-900 p-8 text-white relative">
              <div className="absolute top-0 right-0 p-8 opacity-10"><Send className="w-32 h-32" /></div>
              <h3 className="text-2xl font-black mb-2">Homework Submission</h3>
              <p className="opacity-70 font-bold">Assignment: {submittingHw.title}</p>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 lg:p-12 space-y-8">
              <div className="space-y-3">
                <label className="block text-sm font-black text-gray-400 uppercase tracking-widest ml-1">Work Link (Drive/File Link)</label>
                <div className="relative">
                  <HelpCircle className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                  <input 
                    type="url" 
                    required
                    placeholder="https://drive.google.com/..."
                    value={submissionLink}
                    onChange={(e) => setSubmissionLink(e.target.value)}
                    className="w-full pl-14 pr-6 py-5 rounded-2xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-blue-500 transition-all outline-none font-bold text-gray-700"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-black text-gray-400 uppercase tracking-widest ml-1">Additional Notes</label>
                <textarea 
                  rows={4}
                  placeholder="Tell us about your work..."
                  value={submissionNotes}
                  onChange={(e) => setSubmissionNotes(e.target.value)}
                  className="w-full px-6 py-5 rounded-2xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-blue-500 transition-all outline-none font-bold text-gray-700 resize-none"
                />
              </div>

              <div className="p-6 bg-blue-50 rounded-2xl flex items-center gap-4 border border-blue-100">
                <div className="bg-blue-600 p-2 rounded-lg text-white"><CheckCircle2 className="w-5 h-5" /></div>
                <p className="text-sm font-bold text-blue-800 leading-snug">সতর্কতা: ভুল লিংক প্রদান করলে আপনার সাবমিশন বাতিল হতে পারে। লিংকটি পাবলিক রাখা নিশ্চিত করুন।</p>
              </div>

              <button className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black text-xl shadow-xl shadow-blue-100 flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all">
                Submit Now <Send className="w-6 h-6" />
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container mx-auto px-4 lg:px-12 mt-8">
      <div className="text-center mb-10">
        <h2 className="text-xl font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Assignments</h2>
        <h3 className="text-3xl font-black text-gray-900 tracking-tighter">My Homeworks</h3>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 mb-20">
        {homeworks.map((hw, i) => (
          <div key={i} className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden group hover:shadow-2xl transition-all duration-500 flex flex-col h-full">
            <div className="aspect-[4/3] overflow-hidden relative">
               <img src={hw.img} alt={hw.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
               <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest text-white shadow-lg ${hw.status === 'Continue' ? 'bg-emerald-500' : 'bg-blue-600'}`}>
                    {hw.status}
                  </span>
               </div>
            </div>
            <div className="p-6 lg:p-8 flex-grow flex flex-col">
              <h4 className="text-lg lg:text-xl font-black text-gray-900 mb-6 leading-tight truncate">{hw.title}</h4>
              <button 
                onClick={() => {
                  if (hw.status === 'Continue') setSubmittingHw(hw);
                }}
                className={`mt-auto w-full py-3.5 rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-lg transition-all active:scale-95 ${
                  hw.status === 'Continue' 
                  ? 'bg-slate-900 text-white hover:bg-blue-600 shadow-blue-100' 
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                {hw.status === 'Continue' ? 'Continue Submit' : 'Request Access'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function EditProfile() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container mx-auto px-4 lg:px-12 mt-8 pb-20">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-500 tracking-wide">Home</h2>
      </div>
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-2xl mx-auto">
        <div className="space-y-6">
          <div>
            <label className="block text-gray-500 text-lg font-bold mb-2">First Name</label>
            <input type="text" defaultValue="Tanha Islam" className="w-full px-6 py-4 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-gray-700 font-bold" />
          </div>
          <div>
            <label className="block text-gray-500 text-lg font-bold mb-2">Last Name</label>
            <input type="text" defaultValue="Mim" className="w-full px-6 py-4 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-gray-700 font-bold" />
          </div>
          <div>
            <label className="block text-gray-500 text-lg font-bold mb-2">Email</label>
            <input type="email" defaultValue="tanhaislam21@gmail.com" className="w-full px-6 py-4 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-gray-700 font-bold" />
          </div>
          <div>
            <label className="block text-gray-500 text-lg font-bold mb-2">Phone Number</label>
            <input type="text" defaultValue="01919012423" className="w-full px-6 py-4 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-gray-700 font-bold" />
          </div>
          <div>
            <label className="block text-gray-500 text-lg font-bold mb-2">Bio</label>
            <textarea defaultValue="Online Job" rows={3} className="w-full px-6 py-4 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-gray-700 font-bold resize-none" />
          </div>
          <div>
            <label className="block text-gray-500 text-lg font-bold mb-2">Address</label>
            <input type="text" defaultValue="Dhaka" className="w-full px-6 py-4 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-gray-700 font-bold" />
          </div>
          <div>
            <label className="block text-gray-500 text-lg font-bold mb-4">Gender</label>
            <div className="flex items-center gap-8">
              <label className="flex items-center gap-2 cursor-pointer group"><input type="radio" name="gender" className="w-5 h-5 accent-blue-600" /><span className="text-gray-600 font-bold text-lg group-hover:text-blue-600">Male</span></label>
              <label className="flex items-center gap-2 cursor-pointer group"><input type="radio" name="gender" defaultChecked className="w-5 h-5 accent-blue-600" /><span className="text-gray-600 font-bold text-lg group-hover:text-blue-600">Female</span></label>
              <label className="flex items-center gap-2 cursor-pointer group"><input type="radio" name="gender" className="w-5 h-5 accent-blue-600" /><span className="text-gray-600 font-bold text-lg group-hover:text-blue-600">Others</span></label>
            </div>
          </div>
          <button className="w-full py-5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-black text-xl flex items-center justify-center gap-3 shadow-xl hover:scale-[1.02] active:scale-95 transition-all">
            Update Profile <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function MyPassbook() {
  const baseTransactions = [
    { type: "", date: "16 Apr 2026", amount: "200.00", notes: "Video Submit", status: "Approved" },
    { type: "", date: "16 Apr 2026", amount: "180.00", notes: "Email Sell Suc", status: "Approved" },
    { type: "", date: "13 Apr 2026", amount: "350.00", notes: "Product Sell", status: "Approved" },
    { type: "", date: "13 Apr 2026", amount: "200.00", notes: "PDF Typing Job", status: "Approved" },
    { type: "", date: "13 Apr 2026", amount: "300.00", notes: "Form Fill Up", status: "Approved" },
    { type: "W", date: "17 Feb 2026", amount: "800.00", notes: "Withdrawal", status: "Approved" },
  ];
  const transactions = Array.from({ length: 30 }, (_, i) => ({
    ...baseTransactions[i % baseTransactions.length],
    sr: i + 1,
  }));
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container mx-auto px-2 lg:px-12 mt-4 lg:mt-8 pb-20">
      <div className="flex items-center justify-between mb-4 lg:mb-8"><h2 className="text-xl lg:text-2xl font-black text-gray-800">My Passbook</h2></div>
      <div className="bg-white rounded-lg lg:rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="max-h-[600px] overflow-y-auto">
          <table className="w-full text-left border-collapse table-fixed lg:table-auto">
            <thead className="sticky top-0 z-10">
              <tr className="bg-gray-100 border-b border-gray-200 text-[10px] lg:text-sm shadow-sm">
                <th className="px-1 lg:px-6 py-3 lg:py-4 font-black text-gray-800 w-[10%] lg:w-auto text-center">Sr</th>
                <th className="px-1 lg:px-6 py-3 lg:py-4 font-black text-gray-800 w-[12%] lg:w-auto">Type</th>
                <th className="px-1 lg:px-6 py-3 lg:py-4 font-black text-gray-800 w-[24%] lg:w-auto">Date</th>
                <th className="px-1 lg:px-6 py-3 lg:py-4 font-black text-gray-800 w-[18%] lg:w-auto text-center">Amount</th>
                <th className="px-1 lg:px-6 py-3 lg:py-4 font-black text-gray-800 w-[24%] lg:w-auto">Notes</th>
                <th className="px-1 lg:px-6 py-3 lg:py-4 font-black text-gray-800 w-[12%] lg:w-auto">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {transactions.map((t, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors text-[9px] lg:text-xs">
                  <td className="px-1 lg:px-6 py-3 lg:py-4 text-gray-900 font-bold text-center">{t.sr}</td>
                  <td className="px-1 lg:px-6 py-3 lg:py-4 text-gray-500 font-medium truncate">{t.type}</td>
                  <td className="px-1 lg:px-6 py-3 lg:py-4 text-gray-600 font-medium leading-tight">{t.date}</td>
                  <td className="px-1 lg:px-6 py-3 lg:py-4 text-gray-900 font-black text-center">{t.amount}</td>
                  <td className="px-1 lg:px-6 py-3 lg:py-4 text-gray-600 font-medium truncate">{t.notes}</td>
                  <td className="px-1 lg:px-6 py-3 lg:py-4 text-blue-600 font-bold">{t.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}

function Withdrawals({ onNavigate }: { onNavigate: (tab: string) => void }) {
  const history = [
    { sr: 1, method: "Bkash", date: "27 Feb 2026, 03:24 pm", amount: "Tk 5000.00", notes: "N/A", status: "Rejected" },
    { sr: 2, method: "Bkash", date: "25 Feb 2026, 11:14 pm", amount: "Tk 1000.00", notes: "Successful", status: "Completed" },
    { sr: 3, method: "Bkash", date: "17 Feb 2026, 11:37 pm", amount: "Tk 800.00", notes: "Successful", status: "Completed" },
  ];
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container mx-auto px-2 lg:px-12 mt-4 lg:mt-8 pb-20">
      <div className="text-center mb-4 lg:mb-8"><h2 className="text-xl lg:text-2xl font-bold text-gray-500 tracking-wide">Home</h2></div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 lg:gap-6 mb-8 lg:mb-12">
        <div className="text-center md:text-left">
          <h2 className="text-2xl lg:text-3xl font-black text-gray-900 mb-1">Withdrawals</h2>
          <div className="flex items-center justify-center md:justify-start gap-4 text-sm lg:text-lg">
            <span className="text-gray-500 font-bold">Current Balance:</span>
            <span className="text-blue-600 font-black">Tk 6991.22</span>
          </div>
          <div className="text-[10px] lg:text-sm text-gray-400 font-bold mt-1">Minimum Withdrawal Amount: Tk 50.00</div>
        </div>
        <button onClick={() => onNavigate('new-withdraw')} className="bg-blue-600 text-white px-6 lg:px-8 py-3 lg:py-4 rounded-xl lg:rounded-2xl font-black shadow-xl hover:shadow-blue-200 hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-2 lg:gap-3 text-sm lg:text-base">
          New Withdraw Request <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5" />
        </button>
      </div>
      <div className="bg-white rounded-xl lg:rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto min-w-[320px]">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 italic">
                <th className="px-2 lg:px-8 py-3 lg:py-6 text-gray-700 text-[9px] lg:text-sm uppercase">Sr</th>
                <th className="px-2 lg:px-8 py-3 lg:py-6 text-gray-700 text-[9px] lg:text-sm uppercase">Method</th>
                <th className="px-2 lg:px-8 py-3 lg:py-6 text-gray-700 text-[9px] lg:text-sm uppercase">Date</th>
                <th className="px-2 lg:px-8 py-3 lg:py-6 text-gray-700 text-[9px] lg:text-sm uppercase">Amount</th>
                <th className="px-2 lg:px-8 py-3 lg:py-6 text-gray-700 text-[9px] lg:text-sm uppercase">Notes</th>
                <th className="px-2 lg:px-8 py-3 lg:py-6 text-gray-700 text-[9px] lg:text-sm text-right uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {history.map((h, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors text-[9px] lg:text-xs font-bold">
                  <td className="px-2 lg:px-8 py-3 lg:py-6 text-gray-900">{h.sr}</td>
                  <td className="px-2 lg:px-8 py-3 lg:py-6">{h.method}</td>
                  <td className="px-2 lg:px-8 py-3 lg:py-6 text-gray-500">{h.date}</td>
                  <td className="px-2 lg:px-8 py-3 lg:py-6 text-blue-600">{h.amount}</td>
                  <td className="px-2 lg:px-8 py-3 lg:py-6 text-gray-500">{h.notes}</td>
                  <td className="px-2 lg:px-8 py-3 lg:py-6 text-right">
                    <span className={`px-2 lg:px-4 py-1 rounded-full ${h.status === 'Completed' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>{h.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}

function NewWithdrawRequest({ onBack }: { onBack: () => void }) {
  const [selectedMethod, setSelectedMethod] = useState("Please Select");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const methods = ["Please Select", "Bkash", "Nagad", "Roket", "Paytm", "Google Pay", "PhonePe"];
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="container mx-auto px-4 lg:px-12 mt-4 lg:mt-8 pb-20">
      <div className="text-center mb-6 lg:mb-8"><h2 className="text-xl lg:text-2xl font-bold text-gray-400">Home</h2></div>
      <div className="flex items-center justify-between gap-4 mb-8 lg:mb-12">
        <h2 className="text-2xl lg:text-3xl font-black text-gray-900">Create New Request</h2>
        <button onClick={onBack} className="bg-blue-600 text-white px-4 lg:px-6 py-2 lg:py-3 rounded-xl font-black shadow-lg">Request List</button>
      </div>
      <div className="space-y-8 max-w-xl mx-auto">
        <div className="relative">
          <label className="block text-gray-500 text-xl font-black mb-3">Withdraw Method</label>
          <div onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="w-full px-6 py-4 rounded-xl border border-gray-200 bg-white flex items-center justify-between cursor-pointer hover:border-blue-400 transition-colors">
            <span className={selectedMethod === "Please Select" ? 'text-gray-400' : 'text-gray-800'}>{selectedMethod}</span><ChevronUp className={`w-5 h-5 text-gray-400 ${isDropdownOpen ? 'rotate-0' : 'rotate-180'}`} />
          </div>
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute left-0 right-0 top-[calc(100%+8px)] bg-white border border-gray-100 rounded-2xl shadow-2xl z-50 overflow-hidden">
                {methods.map((method, i) => (
                  <div key={i} onClick={() => { setSelectedMethod(method); setIsDropdownOpen(false); }} className={`px-6 py-4 text-xl font-bold cursor-pointer hover:bg-gray-50 ${selectedMethod === method ? 'bg-blue-600 text-white' : 'text-gray-700'}`}>{method}</div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div>
          <label className="block text-gray-500 text-xl font-black mb-3">Withdraw Phone Number</label>
          <input type="text" placeholder="Type Withdraw Phone Number" className="w-full px-6 py-4 rounded-2xl border border-gray-200 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 text-xl font-bold placeholder:text-gray-300" />
        </div>
        <div>
          <label className="block text-gray-500 text-xl font-black mb-3">Amount</label>
          <input type="text" placeholder="Type Amount" className="w-full px-6 py-4 rounded-2xl border border-gray-200 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 text-xl font-bold placeholder:text-gray-300" />
          <div className="mt-6 font-black text-gray-500"><p>Not withdraw full balance!</p><p>Minimum account Balance (10)</p></div>
        </div>
        <button className="bg-blue-600 text-white px-8 py-4 rounded-xl font-black text-lg shadow-xl hover:brightness-110 active:scale-95 transition-all">Create Request</button>
      </div>
    </motion.div>
  );
}

function Notice({ notices }: { notices: string[] }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="container mx-auto px-4 lg:px-12 mt-8 pb-20">
      <div className="text-center mb-8"><h2 className="text-2xl font-bold text-gray-500">Home</h2></div>
      <div className="bg-white rounded-3xl shadow-2xl p-6 lg:p-10 border-l-8 border-red-500 mb-8 overflow-hidden relative">
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none text-red-500"><Bell className="w-32 h-32" /></div>
        <div className="flex items-center gap-4 mb-6"><div className="bg-red-500 p-3 rounded-2xl text-white shadow shadow-red-200"><AlertTriangle className="w-7 h-7" /></div><h3 className="text-3xl font-black text-red-600 uppercase tracking-tighter">নোটিশ</h3></div>
        <div className="space-y-5">
          {notices.map((n, i) => (
            <div key={i} className="flex items-start gap-4"><div className="w-2.5 h-2.5 mt-2.5 rounded-full bg-red-500 shrink-0"></div><p className="text-xl lg:text-2xl font-black text-gray-800 leading-snug">{n}</p></div>
          ))}
          <div className="flex items-start gap-4 border-t border-gray-100 pt-6 mt-6 bg-blue-50/50 p-6 rounded-2xl">
            <div className="bg-blue-600 p-3 rounded-2xl shadow shadow-blue-200"><Phone className="w-6 h-6 text-white" /></div><p className="text-xl lg:text-2xl font-black text-blue-700 leading-snug italic">কোনো সমস্যা হলে আমাদের ফেসবুক পেজে অথবা হেল্প লাইন নাম্বারে কল করুন।</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function UnityStoreView() {
  const [showProducts, setShowProducts] = useState(false);
  const products = Array.from({ length: 12 }, (_, i) => ({ title: `Item ${i+1}`, price: "500", img: `https://picsum.photos/seed/item${i}/400/400` }));
  if (!showProducts) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="container mx-auto px-4 lg:px-12 mt-12 flex flex-col items-center justify-center min-h-[50vh]">
        <div className="text-center mb-8"><h2 className="text-2xl font-bold text-gray-500">Home</h2></div>
        <button onClick={() => setShowProducts(true)} className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl border border-gray-100 flex flex-col items-center gap-6 group hover:shadow-2xl transition-all">
          <div className="bg-blue-600 p-6 rounded-2xl shadow shadow-blue-200 group-hover:scale-110"><Store className="w-10 h-10 text-white" /></div>
          <h3 className="text-3xl font-black text-gray-900">Unity Store</h3><div className="bg-blue-50 text-blue-600 px-6 py-2 rounded-full font-black text-sm uppercase group-hover:bg-blue-600 group-hover:text-white transition-colors">পণ্য দেখতে ক্লিক করুন</div>
        </button>
      </motion.div>
    );
  }
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container mx-auto px-4 lg:px-12 mt-8 pb-20">
      <div className="flex items-center justify-between mb-8"><div><h2 className="text-2xl lg:text-3xl font-black text-gray-900">Unity Store</h2><p className="text-gray-500 font-bold">আপনার পছন্দের পন্য কিনুন সাশ্রয়ী মূল্যে</p></div><button onClick={() => setShowProducts(false)} className="bg-gray-100 text-gray-600 px-4 py-2 rounded-xl font-bold">ফিরে যান</button></div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((p, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-xl transition-all h-full flex flex-col">
            <div className="aspect-square relative overflow-hidden"><img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" /></div>
            <div className="p-5 flex-grow flex flex-col">
              <h3 className="font-black text-gray-900 text-lg mb-2 truncate">{p.title}</h3>
              <div className="flex items-center justify-between mt-auto pt-4 flex-wrap gap-2">
                <span className="text-blue-600 font-black text-xl">Tk {p.price}</span><button className="bg-slate-900 text-white py-2 px-4 rounded-xl font-black text-xs hover:bg-blue-600 transition-colors">কিনুন</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (oldPassword && newPassword) {
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
      setOldPassword('');
      setNewPassword('');
    }
  };
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="container mx-auto px-4 lg:px-12 mt-8 pb-20">
      <div className="text-center mb-10"><h2 className="text-2xl font-bold text-gray-500 tracking-wide">Home</h2></div>
      <div className="max-w-2xl mx-auto bg-white p-10 rounded-3xl border border-gray-100 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-2"><label className="text-xl font-bold text-gray-600 block pl-1">Old Password</label><input type="password" placeholder="Old Password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} className="w-full p-5 lg:p-6 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none transition-all" /></div>
          <div className="space-y-2"><label className="text-xl font-bold text-gray-600 block pl-1">New Password</label><input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full p-5 lg:p-6 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none transition-all" /></div>
          <button type="submit" className="w-full py-5 lg:py-6 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-500 text-white font-black text-2xl lg:text-3xl shadow-xl flex items-center justify-center gap-4 active:scale-95 transition-all">
            Change Password <ArrowRight className="w-8 h-8 font-black" />
          </button>
        </form>
        {isSuccess && <div className="mt-6 p-4 bg-green-50 text-green-600 font-bold rounded-2xl text-center border border-green-100">পাসওয়ার্ড সফলভাবে পরিবর্তন করা হয়েছে!</div>}
      </div>
    </motion.div>
  );
}

export function StudentPanel({ logout }: StudentPanelProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const { settings } = useSettings();
  const navigateTo = (tab: string) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-hind">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 lg:px-12 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4 lg:gap-8"><a href="/"><img src="https://unityearning.com/assets/img/unityearning.png" alt="Unity Earning" className="h-10 lg:h-12 w-auto" /></a><div className="hidden md:block"><h5 className="font-bold text-gray-700 m-0">Students Panel</h5></div></div>
          <nav className="hidden xl:block">
            <ul className="gradient-menu">
              <li onClick={() => navigateTo('dashboard')}><a href="#"><LayoutGrid className="w-4 h-4 mr-2" /> All Course</a></li>
              {MENU_ITEMS.map((item, i) => (
                <li key={i} onClick={() => {
                  if (item.href !== '#') return;
                  if (item.label === 'Student profile') navigateTo('profile');
                  else if (item.label === 'My Homeworks') navigateTo('homeworks');
                  else if (item.label === 'Edit Profile') navigateTo('edit-profile');
                  else if (item.label === 'My Passbook') navigateTo('passbook');
                  else if (item.label === 'Withdrawals') navigateTo('withdrawals');
                  else if (item.label === 'Notice') navigateTo('notice');
                  else if (item.label === 'Store') navigateTo('store');
                  else if (item.label === 'Change Password') navigateTo('change-password');
                  else navigateTo('dashboard');
                }}>
                  <a href={item.href} target={item.href !== '#' ? "_blank" : "_self"} rel={item.href !== '#' ? "noopener noreferrer" : ""}><item.icon className="w-4 h-4 mr-2" /> {item.label}</a>
                </li>
              ))}
              <li><button onClick={logout} className="w-full flex items-center justify-center font-bold px-4 py-2 hover:bg-red-50 text-red-600 transition-colors uppercase text-[12px] tracking-widest"><LogOut className="w-4 h-4 mr-2" /> Logout</button></li>
            </ul>
          </nav>
          <button className="xl:hidden p-2 text-gray-700 bg-gray-100 rounded-lg" onClick={() => setIsMobileMenuOpen(true)}><Menu className="w-6 h-6" /></button>
        </div>
      </header>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-[100]"><motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsMobileMenuOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} className="absolute top-0 right-0 h-full w-[80%] max-w-sm bg-white shadow-2xl flex flex-col">
              <div className="flex items-center justify-between p-6 border-b border-gray-100"><img src="https://unityearning.com/assets/img/unityearning.png" alt="Logo" className="h-10 w-auto" /><button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-gray-100 rounded-xl"><X className="w-6 h-6" /></button></div>
              <div className="p-6 overflow-y-auto">
                <ul className="gradient-menu">
                  <li onClick={() => navigateTo('dashboard')}><a href="#"><LayoutGrid className="w-4 h-4 mr-2" /> All Course</a></li>
                  {MENU_ITEMS.map((item, i) => (
                    <li key={i} onClick={() => {
                      if (item.href !== '#') return;
                      if (item.label === 'Student profile') navigateTo('profile');
                      else if (item.label === 'My Homeworks') navigateTo('homeworks');
                      else if (item.label === 'Edit Profile') navigateTo('edit-profile');
                      else if (item.label === 'My Passbook') navigateTo('passbook');
                      else if (item.label === 'Withdrawals') navigateTo('withdrawals');
                      else if (item.label === 'Notice') navigateTo('notice');
                      else if (item.label === 'Store') navigateTo('store');
                      else if (item.label === 'Change Password') navigateTo('change-password');
                      else navigateTo('dashboard');
                    }}><a href={item.href} target={item.href !== '#' ? "_blank" : "_self"} rel={item.href !== '#' ? "noopener noreferrer" : ""}><item.icon className="w-4 h-4 mr-2" /> {item.label}</a></li>
                  ))}
                  <li><button onClick={logout} className="w-full flex items-center justify-center py-4 text-red-600 font-bold uppercase text-xs border-t border-slate-50"><LogOut className="w-4 h-4 mr-2" /> Logout</button></li>
                </ul>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <main className="flex-grow pb-16">
        {activeTab === 'dashboard' ? (
          <><div className="ue-grad-hero h-[350px] lg:h-[450px] flex items-center text-white relative overflow-hidden" style={{ backgroundImage: "url(https://unityearning.com/frontend/images/banner/banner-2.jpeg)", backgroundSize: "cover", backgroundPosition: "center", backgroundBlendMode: "overlay" }}>
              <div className="container mx-auto px-4 lg:px-12 relative z-10"><h3 className="text-3xl lg:text-5xl font-black drop-shadow-lg">UNITY EARNING <br/> E-LEARNING PLATFORM</h3></div>
            </div>
            <div className="container mx-auto px-4 lg:px-12 -mt-12 relative z-20">
              <div className="bg-white p-6 rounded-2xl shadow-xl mb-8"><p className="text-gray-700 leading-relaxed font-bold">এটি একটি বিশ্বস্ত বাংলাদেশি অনলাইন প্ল্যাটফর্ম। কেবলমাত্র স্মার্টফোন ব্যবহার করে ঘরে বসে অবসর সময়কে কাজে লাগিয়ে শেখা এবং আয় করার সুযোগ রয়েছে। মাতৃভাষায় সহজভাবে শেখার পাশাপাশি আমাদের কমিউনিটি থেকে কোর্স, সার্ভিস বা প্রোডাক্ট বিক্রির মাধ্যমে আয় করতে পারবেন—ধাপে ধাপে ক্যারিয়ার গড়ুন আত্মবিশ্বাসে।</p></div>
              <div className="ue-grad-panel p-6 lg:p-10 mb-8 overflow-hidden"><h6 className="text-white font-black uppercase mb-6 tracking-widest text-lg">সাপোর্ট টিম</h6><div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">{settings.supportTeam.map((member, i) => (<div key={i} className="ue-soft-card p-6"><div className="text-white font-black text-xl mb-2">{member.role}:</div><div className="text-white/90 text-lg mb-4">{member.name}</div><a href={`https://wa.me/88-${member.phone}`} className="flex items-center gap-2 text-white font-black hover:scale-105 transition-transform origin-left"><Phone className="w-5 h-5" /> Whatsapp: -{member.phone}</a></div>))}</div></div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center h-full"><h3 className="text-2xl font-black text-gray-900 mb-6 text-center">কিভাবে সাহায্য করতে পারি?</h3><div className="w-full bg-slate-900 p-6 rounded-2xl text-center mt-auto"><h5 className="text-white font-black mb-4">যেকোনো সমস্যা</h5><span className="inline-block bg-teal-600 text-white px-6 py-2 rounded-full font-black text-sm mb-6">সময়ঃ ৮:৩০AM – ১১:৩০PM</span><a href="https://www.facebook.com/share/1MAceX7uXW/" className="ue-join-btn ue-pill-teal"><ArrowRight className="w-5 h-5" /> Join Meeting</a></div></div>
              <div className="bg-[#f0f9ff]/50 p-6 md:p-10 rounded-[40px] shadow-sm border border-blue-100 lg:col-span-2 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                  <Video className="w-48 h-48 text-blue-900" />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h5 className="text-gray-900 font-black text-xl md:text-2xl tracking-tighter uppercase mb-1">লাইভ ক্লাসে যোগ দিন</h5>
                      <p className="text-blue-600 font-bold text-xs uppercase tracking-widest">Global Live Learning Sessions</p>
                    </div>
                    <div className="flex items-center gap-2 bg-red-500 text-white px-3 py-1.5 rounded-full text-[10px] font-black animate-pulse">
                      <div className="w-1.5 h-1.5 bg-white rounded-full" />
                      LIVE NOW
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {LIVE_CLASSES.map((item, i) => (
                      <motion.div 
                        key={i} 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        className="bg-white rounded-[24px] p-4 border border-gray-100 flex items-center justify-between group hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1 transition-all duration-300"
                      >
                        <div className="flex flex-col gap-1 min-w-0 pr-4">
                          <h4 className="font-black text-slate-800 text-xs md:text-sm truncate uppercase tracking-tight">{item.topic}</h4>
                          <div className="flex items-center gap-2">
                             <div className="w-6 h-6 bg-blue-50 rounded-lg flex items-center justify-center">
                               <User className="w-3 h-3 text-blue-600" />
                             </div>
                             <span className="text-[10px] font-bold text-slate-500 truncate">টিচার: <span className="text-blue-600">{item.teacher}</span></span>
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-end gap-3 shrink-0">
                          <LiveViewerCount />
                          <button className="bg-slate-900 hover:bg-blue-600 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 shadow-lg shadow-slate-200">
                            জয়েন
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
              </div>
              <div className="mt-16"><div className="grid grid-cols-2 lg:grid-cols-4 gap-8">{CATEGORIES.map((cat, i) => (<div key={i} onClick={() => navigateTo(cat.title === "Product Selling." ? 'store' : 'dashboard')} className="ue-cat-card block group cursor-pointer overflow-hidden"><img src={cat.img} alt={cat.title} className="thumb transition-transform duration-500 group-hover:scale-110" referrerPolicy="no-referrer" /><div className="bdy text-center"><h5 className="title text-xl mb-1 font-black">{cat.title}</h5><div className="meta font-bold">({cat.count}) কোর্স</div></div></div>))}</div></div>
            </div></>
        ) : activeTab === 'profile' ? <StudentProfile /> : activeTab === 'edit-profile' ? <EditProfile /> : activeTab === 'passbook' ? <MyPassbook /> : activeTab === 'withdrawals' ? <Withdrawals onNavigate={navigateTo} /> : activeTab === 'new-withdraw' ? <NewWithdrawRequest onBack={() => navigateTo('withdrawals')} /> : activeTab === 'notice' ? <Notice notices={settings.notices} /> : activeTab === 'store' ? <UnityStoreView /> : activeTab === 'change-password' ? <ChangePassword /> : <MyHomeworks />}
      </main>
      <footer className="bg-white border-t border-gray-100 py-16"><div className="container mx-auto px-4 lg:px-12 text-center text-gray-500 font-bold"><img src="https://unityearning.com/assets/img/unityearning.png" alt="Logo" className="h-12 w-auto mx-auto mb-8" /><p className="max-w-2xl mx-auto mb-8">Learn how to use online social media in our society and how to earn online without wasting valuable time from online social media.</p><div className="flex justify-center gap-8 text-sm uppercase tracking-widest text-gray-400"><span>Unity Earning LMS, All Rights Reserved</span></div></div></footer>
      <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-10 right-10 p-4 bg-white text-blue-600 rounded-full shadow-2xl z-[60] border border-blue-100"><ChevronUp className="w-6 h-6" /></button>
    </div>
  );
}
