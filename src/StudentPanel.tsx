import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, X, LogOut, LayoutGrid, FileText, ImageIcon, 
  User, Bell, Video, Lock, Store, HelpCircle, ArrowRight, Phone,
  Users, CreditCard, ArrowDownCircle, UserCog, ChevronUp, AlertTriangle, Send, CheckCircle2,
  Copy, ExternalLink, QrCode, Wallet, Fingerprint, Share2, Keyboard, Eye, MessageCircle, ShieldCheck, Mail, Bot, Brain, Award
} from 'lucide-react';
import { useState, FormEvent, useEffect, useRef } from 'react';
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
  { label: "Help Line", icon: Phone, href: "#" },
  { label: "Email Marketing", icon: Mail, href: "#" },
  { label: "Change Password", icon: Lock, href: "#" },
  { label: "Daily Quiz", icon: Brain, href: "#" },
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
  const [count, setCount] = useState(() => Math.floor(Math.random() * 200) + 300);
  const [status, setStatus] = useState<'up' | 'down' | 'neutral'>('neutral');

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => {
        const isUp = Math.random() > 0.4; // Slightly more chance to go up or equal
        const diff = Math.floor(Math.random() * 30) + 5; // Change by 5 to 35
        
        const newCount = isUp ? prev + diff : prev - diff;
        setStatus(isUp ? 'up' : 'down');
        
        // Boundaries
        return newCount < 150 ? 150 : newCount > 1500 ? 1200 : newCount;
      });
    }, 1000); // changes every 1 second
    return () => clearInterval(interval);
  }, []);

  const styles = status === 'up' 
    ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20 shadow-emerald-500/10'
    : status === 'down'
      ? 'bg-rose-500/10 text-rose-600 border-rose-500/20 shadow-rose-500/10'
      : 'bg-blue-500/10 text-blue-600 border-blue-500/20 shadow-blue-500/10';

  return (
    <div className={`flex items-center gap-1.5 border px-2.5 py-1 rounded-xl text-[10px] font-black transition-all duration-500 shadow-sm ${styles}`}>
      <Eye className="w-3.5 h-3.5 animate-pulse" />
      <span className="tabular-nums min-w-[32px] text-center">{count}</span>
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
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="container mx-auto px-4 lg:px-12 mt-4 pb-20">
      
      {/* Header Section */}
      <div className="bg-white rounded-[2rem] p-6 lg:p-10 shadow-xl shadow-blue-900/5 mt-4 mb-8 border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        
        {/* Background Decorations */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px] -z-10 pointer-events-none" />
        <div className="absolute left-0 bottom-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-[60px] -z-10 pointer-events-none" />

        <div className="flex items-start md:items-center gap-6">
          <div className="hidden sm:flex w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl items-center justify-center shrink-0">
            <Wallet className="w-8 h-8" />
          </div>
          <div className="text-left flex-1 w-full">
            <h2 className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight mb-3">Withdrawals</h2>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              <div className="flex items-center justify-between sm:justify-start gap-4">
                <span className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Current Balance</span>
                <span className="text-blue-600 font-black px-4 py-1.5 bg-blue-50 rounded-xl">Tk 6991.22</span>
              </div>
              <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-slate-200" />
              <div className="flex items-center justify-between sm:justify-start gap-4">
                 <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Min. Amount</span>
                 <span className="text-slate-600 font-bold text-xs">Tk 50.00</span>
              </div>
            </div>
          </div>
        </div>

        <button 
          onClick={() => onNavigate('new-withdraw')} 
          className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 lg:px-8 py-4 md:py-3.5 rounded-xl font-black shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/40 hover:-translate-y-0.5 active:scale-95 transition-all flex items-center justify-center gap-2 text-sm lg:text-base whitespace-nowrap"
        >
          <CreditCard className="w-4 h-4 hidden sm:block" /> New Request <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <h3 className="text-sm font-black text-slate-400 mb-4 px-2 uppercase tracking-widest">Transaction History</h3>

      <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
        
        {/* Mobile View: Cards */}
        <div className="block lg:hidden divide-y divide-slate-50">
          {history.map((h, i) => (
            <div key={i} className="p-5 flex flex-col gap-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-slate-600 shrink-0">
                    <span className="font-bold text-xs">#{h.sr}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">{h.method}</h4>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{h.date}</span>
                  </div>
                </div>
                <div className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest ${h.status === 'Completed' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100/50' : 'bg-rose-50 text-rose-600 border border-rose-100/50'}`}>
                  {h.status}
                </div>
              </div>
              <div className="flex justify-between items-center bg-slate-50 rounded-xl p-3 border border-slate-100/50 mt-1">
                <div>
                  <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest">Amount</span>
                  <span className="font-black text-blue-600 text-base">{h.amount}</span>
                </div>
                 <div className="text-right">
                  <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest">Notes</span>
                  <span className="font-bold text-slate-600 text-xs">{h.notes}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop View: Table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-8 py-5 text-slate-400 font-bold uppercase tracking-widest text-[10px]">Sr</th>
                <th className="px-8 py-5 text-slate-400 font-bold uppercase tracking-widest text-[10px]">Method</th>
                <th className="px-8 py-5 text-slate-400 font-bold uppercase tracking-widest text-[10px]">Date</th>
                <th className="px-8 py-5 text-slate-400 font-bold uppercase tracking-widest text-[10px]">Amount</th>
                <th className="px-8 py-5 text-slate-400 font-bold uppercase tracking-widest text-[10px]">Notes</th>
                <th className="px-8 py-5 text-slate-400 font-bold uppercase tracking-widest text-[10px] text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {history.map((h, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors font-semibold group">
                  <td className="px-8 py-5 text-slate-400 text-sm">#{h.sr}</td>
                  <td className="px-8 py-5 text-slate-800">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                        <CreditCard className="w-4 h-4" />
                      </div>
                      {h.method}
                    </div>
                  </td>
                  <td className="px-8 py-5 text-slate-500 text-sm">{h.date}</td>
                  <td className="px-8 py-5 text-blue-600 font-black">{h.amount}</td>
                  <td className="px-8 py-5 text-slate-500 text-sm">{h.notes}</td>
                  <td className="px-8 py-5 text-right">
                    <span className={`inline-flex px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest ${h.status === 'Completed' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100/50' : 'bg-rose-50 text-rose-600 border border-rose-100/50'}`}>
                      {h.status}
                    </span>
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
  const methods = ["Bkash", "Nagad", "Roket", "Paytm", "Google Pay", "PhonePe"];

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="container mx-auto px-4 lg:px-12 mt-4 pb-20 max-w-2xl">
      <div className="flex items-center justify-between mb-8 gap-4 pt-4">
        <div>
          <h2 className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">Withdraw Funds</h2>
          <p className="text-sm font-medium text-slate-500 mt-1">Submit a new withdrawal request</p>
        </div>
        <button onClick={onBack} className="bg-slate-100 text-slate-700 hover:bg-slate-200 px-4 py-2.5 rounded-xl font-bold transition-colors text-sm flex items-center gap-2">
          <LayoutGrid className="w-4 h-4" />
          <span className="hidden sm:inline">Request List</span>
        </button>
      </div>

      <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-5 sm:p-8 shadow-2xl shadow-blue-900/5 border border-slate-100/50 space-y-8 relative overflow-visible">
        {/* Background decorative blob */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px] -z-10 pointer-events-none" />

        <div className="space-y-6 relative z-10">
          
          {/* Method Dropdown */}
          <div className="relative">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Withdraw Method</label>
            <div 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
              className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 bg-white shadow-sm flex items-center justify-between cursor-pointer hover:border-blue-400/50 hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl transition-colors ${selectedMethod !== "Please Select" ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400 group-hover:text-blue-500 group-hover:bg-blue-50'}`}>
                   {selectedMethod !== "Please Select" ? <CreditCard className="w-5 h-5" /> : <Wallet className="w-5 h-5" />}
                </div>
                <span className={`text-lg font-bold ${selectedMethod === "Please Select" ? 'text-slate-400' : 'text-slate-800'}`}>
                  {selectedMethod}
                </span>
              </div>
              <ChevronUp className={`w-5 h-5 transition-transform duration-300 ${isDropdownOpen ? 'rotate-0 text-blue-500' : 'rotate-180 text-slate-400 group-hover:text-slate-600'}`} />
            </div>
            
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: -10, scale: 0.95 }} 
                  animate={{ opacity: 1, y: 0, scale: 1 }} 
                  exit={{ opacity: 0, y: -10, scale: 0.95 }} 
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 right-0 top-[calc(100%+8px)] bg-white border border-slate-100 rounded-2xl shadow-2xl shadow-slate-200/50 z-50 overflow-hidden py-2"
                >
                  {methods.map((method, i) => (
                    <div 
                      key={i} 
                      onClick={() => { setSelectedMethod(method); setIsDropdownOpen(false); }} 
                      className={`px-5 py-3.5 mx-2 rounded-xl text-md font-bold cursor-pointer transition-all flex items-center gap-3
                        ${selectedMethod === method ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'}`}
                    >
                      <CreditCard className={`w-4 h-4 ${selectedMethod === method ? 'text-blue-200' : 'text-slate-400'}`} />
                      {method}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Account Number</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <Phone className="w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
              </div>
              <input 
                type="text" 
                placeholder="01XXXXXXXXX" 
                className="w-full pl-14 pr-5 py-4 rounded-2xl border-2 border-slate-100 bg-white shadow-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-lg font-bold text-slate-800 placeholder:text-slate-300 transition-all" 
              />
            </div>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Withdraw Amount</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <span className="text-xl font-black text-slate-400 group-focus-within:text-blue-500 transition-colors">৳</span>
              </div>
              <input 
                type="number" 
                placeholder="0" 
                className="w-full pl-12 pr-5 py-4 rounded-2xl border-2 border-slate-100 bg-white shadow-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-xl font-black text-slate-800 placeholder:text-slate-300 transition-all font-mono" 
              />
            </div>
          </div>

          {/* Info Alert */}
          <div className="bg-amber-50/80 border border-amber-200/60 rounded-2xl p-4 flex gap-3 items-start mt-2 backdrop-blur-sm">
            <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5 animate-pulse" />
            <div>
              <p className="text-amber-900 font-bold text-sm">Important Notice</p>
              <ul className="text-amber-700/80 text-xs font-medium mt-1.5 space-y-1 list-disc list-inside">
                <li>Do not withdraw your full balance.</li>
                <li>Minimum account balance requirement: <strong className="text-amber-900 font-black">10 ৳</strong></li>
              </ul>
            </div>
          </div>

          <div className="pt-2">
            <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4.5 rounded-2xl font-black text-lg shadow-xl shadow-blue-600/25 hover:shadow-2xl hover:shadow-blue-600/40 hover:-translate-y-1 active:scale-95 transition-all flex justify-center items-center gap-2">
              <Send className="w-5 h-5" />
              Submit Request
            </button>
          </div>

        </div>
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

function EmailMarketing() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [savedEmails, setSavedEmails] = useState<{email: string, password: string, date: string}[]>([]);

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    
    const newEntry = {
      email,
      password, // Intentionally saving/displaying for the context requested by user
      date: new Date().toLocaleDateString('en-GB')
    };
    
    setSavedEmails([newEntry, ...savedEmails]);
    setEmail('');
    setPassword('');
    
    Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: 'Email saved successfully.',
      timer: 1500,
      showConfirmButton: false,
      position: 'top-end',
      toast: true
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 lg:py-16">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-gray-100 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-100 transition-colors pointer-events-none" />
          
          <div className="relative z-10 text-center mb-10">
            <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner ring-4 ring-white">
              <Mail className="w-10 h-10" />
            </div>
            <h2 className="text-3xl font-black text-slate-800 tracking-tight">Sell Your Email</h2>
            <p className="text-slate-500 font-bold mt-2">Enter your email and password below to sell.</p>
          </div>
          
          <form onSubmit={handleSave} className="space-y-6 relative z-10">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-widest">Enter Your Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input 
                  type="email" 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                  required 
                  placeholder="e.g. example@gmail.com" 
                  className="w-full pl-12 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-transparent transition-all font-semibold" 
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-widest">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input 
                  type="text" 
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
                  required 
                  placeholder="Enter password" 
                  className="w-full pl-12 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-transparent transition-all font-semibold" 
                />
              </div>
            </div>
            
            <button type="submit" className="w-full bg-slate-900 hover:bg-blue-600 text-white font-black py-4 rounded-xl shadow-lg shadow-slate-900/20 hover:shadow-blue-600/30 transition-all hover:-translate-y-1 mt-4 text-sm uppercase tracking-widest flex items-center justify-center gap-2">
              <CheckCircle2 className="w-5 h-5" /> Save Email
            </button>
          </form>
        </div>

        {savedEmails.length > 0 && (
          <div className="mt-8 bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100 relative overflow-hidden">
            <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
              <CheckCircle2 className="w-6 h-6 text-green-500" /> Saved Emails History
            </h3>
            <div className="space-y-4">
              <AnimatePresence>
                {savedEmails.map((item, i) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={i} 
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center shrink-0 shadow-inner">
                        <Mail className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="font-black text-slate-800 text-sm md:text-base">{item.email}</div>
                        <div className="text-xs text-slate-500 font-bold mt-0.5 tracking-tight">Added on: {item.date}</div>
                      </div>
                    </div>
                    <div className="bg-green-100 text-green-700 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-1.5 shrink-0 self-start sm:self-auto border border-green-200">
                      <CheckCircle2 className="w-4 h-4" /> Saved
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </div>
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

const getValidUrl = (url?: string) => {
  if (!url) return "#";
  if (url.startsWith('mailto:') || url.startsWith('http://') || url.startsWith('https://')) return url;
  return `https://${url}`;
};

function DailyQuiz() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const questions = [
    { question: "বাংলাদেশের রাজধানীর নাম কী?", options: ["ঢাকা", "চট্টগ্রাম", "সিলেট", "রাজশাহী"], answer: 0 },
    { question: "বাংলাদেশের জাতীয় পাখির নাম কী?", options: ["দোয়েল", "ময়না", "কাক", "শালিক"], answer: 0 },
    { question: "বাংলাদেশের জাতীয় ফুল কী?", options: ["শাপলা", "গোলাপ", "জবা", "পদ্ম"], answer: 0 },
    { question: "বাংলাদেশের স্বাধীনতা দিবস কবে?", options: ["২৬ মার্চ", "১৬ ডিসেম্বর", "২১ ফেব্রুয়ারি", "১ বৈশাখ"], answer: 0 },
    { question: "বাংলাদেশের বিজয় দিবস কবে?", options: ["১৬ ডিসেম্বর", "২৬ মার্চ", "২১ ফেব্রুয়ারি", "১৭ মার্চ"], answer: 0 },
    { question: "বাংলাদেশের জাতীয় ফলের নাম কী?", options: ["কাঁঠাল", "আম", "জাম", "লিচু"], answer: 0 },
    { question: "বাংলাদেশের জাতীয় পশুর নাম কী?", options: ["রয়েল বেঙ্গল টাইগার", "হরিণ", "হাতি", "বানর"], answer: 0 },
    { question: "বাংলাদেশের জাতীয় কবি কে?", options: ["কাজী নজরুল ইসলাম", "রবীন্দ্রনাথ ঠাকুর", "জসীমউদ্দীন", "জীবনানন্দ দাশ"], answer: 0 },
    { question: "বাংলাদেশের দীর্ঘতম নদী কোনটি?", options: ["মেঘনা", "পদ্মা", "যমুনা", "সুরমা"], answer: 0 },
    { question: "বাংলাদেশের সর্বোচ্চ পর্বতশৃঙ্গ কোনটি?", options: ["তাজিংডং", "কেওক্রাডং", "চন্দ্রনাথ", "চিম্বুক"], answer: 0 },
    { question: "বাংলাদেশের জাতীয় মাছের নাম কী?", options: ["ইলিশ", "রুই", "কাতলা", "পাঙ্গাশ"], answer: 0 },
    { question: "বাংলাদেশের প্রথম রাষ্ট্রপতি কে ছিলেন?", options: ["বঙ্গবন্ধু শেখ মুজিবুর রহমান", "তাজউদ্দীন আহমদ", "জিয়াউর রহমান", "সৈয়দ নজরুল ইসলাম"], answer: 0 },
    { question: "ভাষা আন্দোলন কত সালে হয়েছিল?", options: ["১৯৫২", "১৯৭১", "১৯৬৯", "১৯৪৭"], answer: 0 },
    { question: "শহীদ মিনার কে নকশা করেছিলেন?", options: ["হামিদুর রহমান", "জয়নুল আবেদিন", "কামরুল হাসান", "শামীম সিকদার"], answer: 0 },
    { question: "বাংলাদেশের মুক্তিযুদ্ধের সময় কয়টি সেক্টর ছিল?", options: ["১১টি", "৭টি", "৯টি", "১২টি"], answer: 0 },
    { question: "বাংলাদেশের জাতীয় সংসদের আসন সংখ্যা কত?", options: ["৩৫০", "৩০০", "৩৩০", "৩২০"], answer: 0 },
    { question: "ঢাকা বিশ্ববিদ্যালয় কত সালে প্রতিষ্ঠিত হয়?", options: ["১৯২১", "১৯১১", "১৯৩১", "১৯৪৭"], answer: 0 },
    { question: "বাংলাদেশের মুদ্রার নাম কী?", options: ["টাকা", "রুপি", "ডলার", "পাউন্ড"], answer: 0 },
    { question: "বাংলাদেশের বর্তমান বিভাগ কয়টি?", options: ["৮টি", "৭টি", "৬টি", "৯টি"], answer: 0 },
    { question: "বাংলাদেশের জাতীয় পতাকার নকশাকার কে?", options: ["কামরুল হাসান", "জয়নুল আবেদিন", "হামিদুর রহমান", "হাশেম খান"], answer: 0 }
  ];

  const handleStart = () => {
    setQuizStarted(true);
    setCurrentQuestion(0);
    setScore(0);
    setQuizCompleted(false);
    setSelectedAnswer(null);
  };

  const handleNext = () => {
    if (selectedAnswer === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setQuizCompleted(true);
      // In a real app, logic to add 20 BDT to user's balance would go here
    }
  };

  if (!quizStarted) {
    return (
      <div className="container mx-auto px-4 lg:px-12 py-12 max-w-4xl">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden text-center border border-gray-100 p-12">
          <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Brain className="w-12 h-12 text-indigo-600" />
          </div>
          <h2 className="text-3xl font-black mb-4 font-bengali">কুইজ খেলে ইনকাম করুন</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto text-lg leading-relaxed font-bengali">
            সাধারণ জ্ঞানের ২০টি প্রশ্নের সঠিক উত্তর দিন। কুইজটি সফলভাবে সম্পন্ন করলে আপনার একাউন্টে ২০ টাকা পুরস্কার হিসেবে যোগ করা হবে।
          </p>
          <button 
            onClick={handleStart}
            className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 hover:shadow-lg transition-all active:scale-95 font-bengali"
          >
            কুইজ শুরু করুন
          </button>
        </div>
      </div>
    );
  }

  if (quizCompleted) {
    return (
      <div className="container mx-auto px-4 lg:px-12 py-12 max-w-4xl">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden text-center border border-gray-100 p-12">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Award className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-3xl font-black mb-4 text-gray-800 font-bengali">অভিনন্দন!</h2>
          <p className="text-gray-600 mb-2 text-lg font-bengali">
            আপনি {questions.length} টি প্রশ্নের মধ্যে {score} টি সঠিক উত্তর দিয়েছেন।
          </p>
          <div className="bg-green-50 rounded-2xl p-6 inline-block mt-4 border border-green-100">
            <h3 className="text-xl font-bold text-green-800 mb-1 font-bengali">আপনার পুরস্কার</h3>
            <div className="text-4xl font-black text-green-600 font-bengali">২০ টাকা</div>
            <p className="text-green-700 text-sm mt-2 font-medium font-bengali">আপনার ব্যালেন্সে যোগ করা হয়েছে</p>
          </div>
          <div className="mt-8">
            <button 
              onClick={handleStart}
              className="px-6 py-3 bg-gray-100 font-bold text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-bengali"
            >
              আবার খেলুন
            </button>
          </div>
        </div>
      </div>
    );
  }

  const q = questions[currentQuestion];

  return (
    <div className="container mx-auto px-4 lg:px-12 py-12 max-w-4xl">
      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-black flex items-center gap-3 text-indigo-900 font-bengali">
          <div className="bg-indigo-100 p-2 rounded-lg">
            <Brain className="w-6 h-6 text-indigo-600" />
          </div>
          দৈনিক কুইজ
        </h2>
        <div className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-lg font-bold font-bengali">
          প্রশ্ন: {currentQuestion + 1} / {questions.length}
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 h-2 rounded-full mb-8 overflow-hidden">
        <div 
          className="bg-indigo-600 h-full rounded-full transition-all duration-300"
          style={{ width: `${((currentQuestion) / questions.length) * 100}%` }}
        />
      </div>

      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 sm:p-12 mb-6">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-8 leading-relaxed font-bengali">
          {q.question}
        </h3>
        
        <div className="space-y-4">
          {q.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedAnswer(idx)}
              className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all duration-200 font-medium text-lg font-bengali flex items-center gap-4 ${
                selectedAnswer === idx 
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-md shadow-indigo-100 scale-[1.01]' 
                  : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50 text-gray-700'
              }`}
            >
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                selectedAnswer === idx ? 'border-indigo-600' : 'border-gray-300'
              }`}>
                {selectedAnswer === idx && <div className="w-3 h-3 bg-indigo-600 rounded-full" />}
              </div>
              <span className="flex-grow">{option}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleNext}
          disabled={selectedAnswer === null}
          className="flex items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-indigo-700 disabled:opacity-50 disabled:hover:bg-indigo-600 transition-colors font-bengali disabled:cursor-not-allowed cursor-pointer"
        >
          {currentQuestion === questions.length - 1 ? 'শেষ করুন' : 'পরবর্তী প্রশ্ন'}
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export function StudentPanel({ logout }: StudentPanelProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showBanner, setShowBanner] = useState(true);
  const { settings } = useSettings();
  const navigateTo = (tab: string) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-hind">
      {settings.globalBanner && showBanner && (
        <AnimatePresence>
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowBanner(false)}
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: -50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl relative z-10 w-full max-w-lg overflow-hidden border border-gray-100"
            >
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-center relative">
                 <Bell className="w-12 h-12 text-white mx-auto mb-3 animate-bounce" />
                 <h3 className="text-2xl font-black text-white font-hind">বিশেষ নোটিশ</h3>
                 <button 
                    onClick={() => setShowBanner(false)}
                    className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/40 rounded-full text-white transition-all"
                  >
                    <X className="w-5 h-5" />
                 </button>
              </div>
              <div className="p-8 text-center bg-white flex flex-col items-center">
                <p className="text-lg text-gray-700 font-bold font-hind whitespace-pre-wrap leading-relaxed">
                  {settings.globalBanner}
                </p>
                <div className="mt-8">
                  <button 
                    onClick={() => setShowBanner(false)}
                    className="bg-blue-600 text-white font-black px-8 py-3 rounded-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg hover:scale-105 active:scale-95"
                  >
                    বুঝতে পেরেছি <CheckCircle2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </AnimatePresence>
      )}

      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 lg:px-12 h-20 flex items-center justify-between relative">
          <div className="flex items-center gap-4 lg:gap-8 shrink-0">
            <a href="/">
              <img src="https://unityearning.com/assets/img/unityearning.png" alt="Unity Earning" className="h-10 lg:h-12 w-auto" />
            </a>
            <div className="hidden md:block">
              <h5 className="font-bold text-slate-700 m-0">Students Panel</h5>
            </div>
          </div>

          {/* SCROLLING TICKER MARQUEE */}
          {settings.scrollingTicker && (
            <div className="flex-1 mx-4 lg:mx-8 overflow-hidden rounded-xl bg-blue-50/80 border border-blue-100 flex items-center shadow-inner h-10 relative">
              <div className="w-10 h-full bg-blue-600 flex items-center justify-center shrink-0 z-10 shadow-md">
                <Bell className="w-5 h-5 text-white animate-pulse" />
              </div>
              <div className="flex-1 overflow-hidden h-full flex items-center pointer-events-none relative">
                 {/* Fade edges */}
                 <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-blue-50/80 to-transparent z-10" />
                 <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-blue-50/80 to-transparent z-10" />
                 
                 <motion.div 
                   className="whitespace-nowrap flex items-center text-blue-900 font-bold px-4"
                   animate={{ x: ["100%", "-100%"] }}
                   transition={{ duration: 15, ease: "linear", repeat: Infinity }}
                 >
                   {settings.scrollingTicker}
                 </motion.div>
              </div>
            </div>
          )}
          {!settings.scrollingTicker && <div className="flex-1" />}

          <nav className="hidden xl:flex shrink-0">
            <ul className="gradient-menu">
              <li onClick={() => navigateTo('dashboard')}><a href="#"><LayoutGrid className="w-4 h-4 mr-2" /> All Course</a></li>
              {MENU_ITEMS.map((item, i) => (
                <li key={i} onClick={() => {
                  if (item.label === 'Help Line') {
                    window.dispatchEvent(new CustomEvent('open-chat-agent'));
                    return;
                  }
                  if (item.href !== '#') return;
                  if (item.label === 'Student profile') navigateTo('profile');
                  else if (item.label === 'My Homeworks') navigateTo('homeworks');
                  else if (item.label === 'Edit Profile') navigateTo('edit-profile');
                  else if (item.label === 'My Passbook') navigateTo('passbook');
                  else if (item.label === 'Withdrawals') navigateTo('withdrawals');
                  else if (item.label === 'Notice') navigateTo('notice');
                  else if (item.label === 'Store') navigateTo('store');
                  else if (item.label === 'Email Marketing') navigateTo('email-marketing');
                  else if (item.label === 'Daily Quiz') navigateTo('daily-quiz');
                  else if (item.label === 'Change Password') navigateTo('change-password');
                  else navigateTo('dashboard');
                }}>
                  <a href={item.href} target={item.href !== '#' ? "_blank" : "_self"} rel={item.href !== '#' ? "noopener noreferrer" : ""}><item.icon className="w-4 h-4 mr-2" /> {item.label}</a>
                </li>
              ))}
              <li><button onClick={logout} className="w-full flex items-center justify-center font-bold px-4 py-2 hover:bg-red-50 text-red-600 transition-colors uppercase text-[12px] tracking-widest"><LogOut className="w-4 h-4 mr-2" /> Logout</button></li>
            </ul>
          </nav>
          <button className="xl:hidden p-2 text-slate-700 bg-slate-100/80 hover:bg-slate-200 rounded-xl transition-colors shrink-0" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
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
                      if (item.label === 'Help Line') {
                        window.dispatchEvent(new CustomEvent('open-chat-agent'));
                        setIsMobileMenuOpen(false);
                        return;
                      }
                      if (item.href !== '#') return;
                      if (item.label === 'Student profile') navigateTo('profile');
                      else if (item.label === 'My Homeworks') navigateTo('homeworks');
                      else if (item.label === 'Edit Profile') navigateTo('edit-profile');
                      else if (item.label === 'My Passbook') navigateTo('passbook');
                      else if (item.label === 'Withdrawals') navigateTo('withdrawals');
                      else if (item.label === 'Notice') navigateTo('notice');
                      else if (item.label === 'Store') navigateTo('store');
                      else if (item.label === 'Email Marketing') navigateTo('email-marketing');
                      else if (item.label === 'Daily Quiz') navigateTo('daily-quiz');
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
              
              {/* Refined Support Team UI */}
              <div className="bg-gradient-to-br from-indigo-500 via-purple-600 to-fuchsia-600 rounded-[2rem] p-6 lg:p-8 mb-8 shadow-2xl shadow-indigo-500/30 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                  <ShieldCheck className="w-40 h-40 text-white" />
                </div>

                <h6 className="text-white font-black uppercase mb-6 tracking-widest text-lg flex items-center gap-2 relative z-10 drop-shadow-md">
                  <ShieldCheck className="w-6 h-6" /> সাপোর্ট টিম
                </h6>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 relative z-10">
                  {settings.supportTeam.map((member, i) => (
                    <div key={i} className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/30 hover:bg-white/20 transition-all flex items-center gap-4 group">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0 shadow-inner">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="text-white font-black text-sm lg:text-base drop-shadow-sm">{member.role}</div>
                        <div className="text-white/90 text-xs lg:text-sm font-bold mt-0.5">{member.name}</div>
                      </div>
                      <a 
                        href={`https://wa.me/88${member.phone.replace(/[^0-9]/g, '')}`} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="w-12 h-12 bg-[#25D366] hover:bg-[#1DA851] rounded-xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-[#25D366]/40 transition-all group-hover:scale-110 active:scale-95 border border-[#25D366]/50"
                      >
                        <MessageCircle className="w-6 h-6" />
                      </a>
                    </div>
                  ))}
                </div>

                {/* Helpline option */}
                <div className="mt-6 pt-6 border-t border-white/20 relative z-10">
                  <button onClick={() => window.dispatchEvent(new CustomEvent('open-chat-agent'))} className="w-full text-left flex flex-col sm:flex-row sm:items-center justify-between bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-4 sm:p-5 transition-all group gap-4 shadow-sm hover:shadow-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-blue-500 flex items-center justify-center rounded-xl shadow-xl shadow-blue-500/40 group-hover:scale-110 transition-transform shrink-0 border border-white/20">
                        <Bot className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <div className="text-white/90 text-xs sm:text-sm font-black uppercase tracking-widest mb-0.5 drop-shadow-sm">সব সময় সাহায্যে প্রস্তুত</div>
                        <div className="text-white text-lg sm:text-2xl font-black drop-shadow-md">হেল্পলাইন এ যোগাযোগ করুন</div>
                      </div>
                    </div>
                    <div className="hidden sm:flex w-12 h-12 bg-white/20 rounded-full items-center justify-center -rotate-45 group-hover:bg-blue-500 group-hover:rotate-0 transition-all duration-300 border border-white/30 group-hover:border-blue-500">
                      <ArrowRight className="w-6 h-6 text-white" />
                    </div>
                  </button>
              </div>
            </div>

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
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 mt-6">
                    {LIVE_CLASSES.map((item, i) => (
                      <motion.div 
                        key={i} 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        className="bg-white rounded-[24px] p-5 border border-transparent hover:border-blue-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-2 group shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(59,130,246,0.15)] hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden"
                      >
                        <div className="absolute top-0 left-0 sm:w-1.5 h-1.5 sm:h-full w-full bg-gradient-to-r sm:bg-gradient-to-b from-blue-400 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                        
                        <div className="flex flex-col gap-2 min-w-0 sm:pr-4 z-10 w-full">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="px-2.5 py-1 bg-red-50 text-red-600 rounded-lg text-[8px] font-black tracking-widest uppercase flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" /> Live
                            </span>
                            <span className="px-2 py-1 bg-slate-50 text-slate-500 rounded-lg text-[8px] font-black tracking-widest uppercase border border-slate-100">
                              Class {(i + 1).toString().padStart(2, '0')}
                            </span>
                          </div>
                          <h4 className="font-black text-slate-900 text-sm md:text-base tracking-tight leading-snug break-words">{item.topic}</h4>
                          <div className="flex items-center gap-2.5 mt-1 border-t border-slate-50 pt-2">
                             <div className="w-7 h-7 bg-blue-50 rounded-full flex items-center justify-center ring-2 ring-white shadow-sm shrink-0">
                               <User className="w-3.5 h-3.5 text-blue-600" />
                             </div>
                             <div className="flex flex-col">
                               <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Instructor</span>
                               <span className="text-[12px] font-bold text-slate-800 tracking-tight leading-none whitespace-nowrap">{item.teacher}</span>
                             </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3 shrink-0 z-10 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-50">
                          <LiveViewerCount />
                          <button className="bg-slate-900 hover:bg-blue-600 text-white px-6 sm:px-5 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all active:scale-95 shadow-[0_4px_15px_-3px_rgba(0,0,0,0.1)] hover:shadow-blue-500/25 flex items-center gap-1.5 group-hover:bg-blue-600">
                            জয়েন <ArrowRight className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
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
        ) : activeTab === 'profile' ? <StudentProfile /> : activeTab === 'edit-profile' ? <EditProfile /> : activeTab === 'passbook' ? <MyPassbook /> : activeTab === 'withdrawals' ? <Withdrawals onNavigate={navigateTo} /> : activeTab === 'new-withdraw' ? <NewWithdrawRequest onBack={() => navigateTo('withdrawals')} /> : activeTab === 'notice' ? <Notice notices={settings.notices} /> : activeTab === 'store' ? <UnityStoreView /> : activeTab === 'change-password' ? <ChangePassword /> : activeTab === 'email-marketing' ? <EmailMarketing /> : activeTab === 'daily-quiz' ? <DailyQuiz /> : <MyHomeworks />}
      </main>
      <footer className="bg-white border-t border-gray-100 py-16">
        <div className="container mx-auto px-4 lg:px-12 text-center text-gray-500 font-bold">
          <img src="https://unityearning.com/assets/img/unityearning.png" alt="Logo" className="h-12 w-auto mx-auto mb-8" />
          <p className="max-w-2xl mx-auto mb-8">Learn how to use online social media in our society and how to earn online without wasting valuable time from online social media.</p>
          
          {/* SOCIAL MEDIA LINKS */}
          <div className="flex justify-center items-center gap-4 mb-8">
            <a href={getValidUrl(settings?.socialLinks?.facebook)} target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-50 text-blue-500 rounded-full hover:bg-blue-600 hover:text-white transition-all shadow-sm hover:shadow-lg border border-gray-100 hover:-translate-y-1">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"/>
              </svg>
            </a>
            <a href={getValidUrl(settings?.socialLinks?.youtube)} target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-50 text-red-500 rounded-full hover:bg-red-600 hover:text-white transition-all shadow-sm hover:shadow-lg border border-gray-100 hover:-translate-y-1">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                <path d="M21.582 6.186a2.722 2.722 0 0 0-1.92-1.92C18.006 3.8 12 3.8 12 3.8s-6.006 0-7.662.466a2.722 2.722 0 0 0-1.92 1.92C1.95 7.848 1.95 12 1.95 12s0 4.152.468 5.814a2.722 2.722 0 0 0 1.92 1.92C5.994 20.2 12 20.2 12 20.2s6.006 0 7.662-.466a2.722 2.722 0 0 0 1.92-1.92c.468-1.662.468-5.814.468-5.814s0-4.152-.468-5.814zM9.996 15.005V8.995L15.26 12z"/>
              </svg>
            </a>
            <a href={getValidUrl(settings?.socialLinks?.telegram)} target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-50 text-sky-500 rounded-full hover:bg-sky-500 hover:text-white transition-all shadow-sm hover:shadow-lg border border-gray-100 hover:-translate-y-1">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.892-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
            </a>
            <a href={getValidUrl(settings?.socialLinks?.whatsapp)} target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-50 text-green-500 rounded-full hover:bg-green-500 hover:text-white transition-all shadow-sm hover:shadow-lg border border-gray-100 hover:-translate-y-1">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                <path d="M12.031 0C5.39 0 0 5.39 0 12.031c0 2.112.553 4.175 1.6 5.992L0 24l6.2-1.624c1.782.96 3.791 1.47 5.831 1.47h.004c6.641 0 12.031-5.39 12.031-12.031C24.066 5.39 18.672 0 12.031 0zm0 21.846h-.004c-1.802 0-3.565-.487-5.111-1.408l-.367-.217-3.805.998 1.016-3.71-.238-.378a9.855 9.855 0 0 1-1.503-5.244c0-5.45 4.436-9.885 9.885-9.885h.004c5.449 0 9.884 4.435 9.884 9.885 0 5.45-4.435 9.885-9.884 9.885zm5.421-7.403c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.199.297-.768.966-.94 1.164-.173.199-.347.223-.644.075-.298-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.298-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51h-.57c-.198 0-.52.074-.792.372-.272.298-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.075-.124-.272-.198-.57-.347z" />
              </svg>
            </a>
            <a href={getValidUrl(settings?.socialLinks?.gmail)} target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-50 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-all shadow-sm hover:shadow-lg border border-gray-100 hover:-translate-y-1">
              <Mail className="w-[22px] h-[22px]" />
            </a>
          </div>

          <div className="flex justify-center gap-8 text-sm uppercase tracking-widest text-gray-400">
            <span>Unity Earning LMS, All Rights Reserved</span>
          </div>
        </div>
      </footer>
      
      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-[60] flex flex-col gap-3">
        <UnityChatAgent />
        <a 
          href={settings?.socialLinks?.whatsapp ? getValidUrl(settings.socialLinks.whatsapp) : "https://wa.me/8801600602084"} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="w-12 h-12 bg-[#25D366] flex items-center justify-center text-white rounded-full shadow-lg shadow-[#25D366]/30 hover:bg-[#20bd5a] hover:scale-110 active:scale-95 transition-all outline-none"
        >
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M12.031 0C5.39 0 0 5.39 0 12.031c0 2.112.553 4.175 1.6 5.992L0 24l6.2-1.624c1.782.96 3.791 1.47 5.831 1.47h.004c6.641 0 12.031-5.39 12.031-12.031C24.066 5.39 18.672 0 12.031 0zm0 21.846h-.004c-1.802 0-3.565-.487-5.111-1.408l-.367-.217-3.805.998 1.016-3.71-.238-.378a9.855 9.855 0 0 1-1.503-5.244c0-5.45 4.436-9.885 9.885-9.885h.004c5.449 0 9.884 4.435 9.884 9.885 0 5.45-4.435 9.885-9.884 9.885zm5.421-7.403c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.199.297-.768.966-.94 1.164-.173.199-.347.223-.644.075-.298-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.298-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51h-.57c-.198 0-.52.074-.792.372-.272.298-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.075-.124-.272-.198-.57-.347z" />
          </svg>
        </a>
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
          className="w-12 h-12 bg-white hover:bg-slate-50 text-blue-600 rounded-full shadow-lg border border-slate-100 hover:scale-110 active:scale-95 transition-all outline-none flex items-center justify-center"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}

function UnityChatAgent() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{text: string, isUser: boolean}[]>([
    { text: "হ্যালো! ইউনিটি আর্নিং-এ আপনাকে স্বাগতম। আপনার কিভাবে সাহায্য করতে পারি?", isUser: false }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-chat-agent', handleOpen as EventListener);
    return () => window.removeEventListener('open-chat-agent', handleOpen as EventListener);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    setMessages(prev => [...prev, { text: input, isUser: true }]);
    setInput('');
    
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: "হ্যালো! আমি ইউনিটি এজেন্ট, আপনাকে স্বাগতম। আশা করি আপনি ভালোভাবে স্টাডি ও লার্নিং করতে পারবেন। আপনার যদি কোনো সমস্যা হয়ে থাকে তাহলে আমাদের হেল্প লাইনে (WhatsApp: 01600602084) যোগাযোগ করুন।", 
        isUser: false 
      }]);
    }, 600);
  };

  return (
    <div className="relative">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute bottom-16 right-0 w-[300px] sm:w-[320px] bg-white rounded-2xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden origin-bottom-right"
          >
            {/* Header */}
            <div className="bg-blue-600 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm leading-tight">Unity Earning Agent</h4>
                  <p className="text-blue-100 text-xs">Always here to help</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Chat Area */}
            <div className="p-4 h-[300px] overflow-y-auto bg-slate-50 flex flex-col gap-3">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${msg.isUser ? 'bg-blue-600 text-white rounded-br-sm' : 'bg-white text-slate-700 shadow-sm border border-slate-100 rounded-bl-sm'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Input Form */}
            <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-100 flex items-center gap-2">
              <input 
                type="text" 
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Type your message..." 
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              />
              <button 
                type="submit" 
                disabled={!input.trim()}
                className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center shrink-0 hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:hover:bg-blue-600"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-12 h-12 bg-blue-600 flex items-center justify-center text-white rounded-full shadow-lg shadow-blue-600/30 hover:bg-blue-700 hover:scale-110 active:scale-95 transition-all outline-none"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>
    </div>
  );
}
