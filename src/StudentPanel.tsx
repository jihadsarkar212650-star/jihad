import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, X, LogOut, LayoutGrid, FileText, ImageIcon, 
  User, Bell, Video, Lock, Store, HelpCircle, ArrowRight, Phone,
  Users, CreditCard, ArrowDownCircle, UserCog, ChevronUp, AlertTriangle
} from 'lucide-react';
import { useState, FormEvent } from 'react';

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
  { label: "Change Password", icon: Lock, href: "#" },
];

const CATEGORIES = [
  { title: "Email Marketing", count: 0, img: "https://unityearning.com/storage/1031/6950fbb80cfba_1000647097.jpg" },
  { title: "Video Editing.", count: 0, img: "https://unityearning.com/storage/1029/690c6e2c2f6b2_unityearning.png" },
  { title: "Form Fill-up.", count: 0, img: "https://unityearning.com/storage/974/68285cb173da7_Computer-Training.jpg" },
  { title: "Data Entry.", count: 0, img: "https://unityearning.com/storage/973/68285c8b497dd_data-enty.jpg" },
  { title: "Typing Work.", count: 0, img: "https://unityearning.com/storage/972/68285c6c41f10_Computer-Training.jpg" },
  { title: "Digital Marketing.", count: 0, img: "https://unityearning.com/storage/971/68285c484e1b0_Digital-Market.jpg" },
  { title: "Graphic Designing.", count: 0, img: "https://unityearning.com/storage/970/68285c2c8b2f2_Graphic-Design.jpg" },
  { title: "Product Selling.", count: 0, img: "https://unityearning.com/storage/969/68285c0e6b179_Product-Sell.jpg" },
  { title: "Computer Course.", count: 0, img: "https://unityearning.com/storage/968/68285bf5cde79_download.jpeg" },
  { title: "Facebook Marketing.", count: 0, img: "https://unityearning.com/storage/967/68285bdea9065_Graphic.jpg" },
  { title: "Gaming Marketing.", count: 0, img: "https://unityearning.com/storage/966/68285bc0748a5_download-(1).jpeg" },
  { title: "Spoken English.", count: 0, img: "https://unityearning.com/storage/965/68285b9c72461_spoken-english-(1).jpeg" },
  { title: "Namaz & Quran Shikkha", count: 0, img: "https://unityearning.com/storage/964/68285b7c714c4_Screenshot_2025-05-17-15-04-27-93_40deb401b9ffe8e1df2f1cc5ba480b12.jpg" },
  { title: "Photo Editing.", count: 1, img: "https://unityearning.com/storage/1020/68c0a022baaef_unityearning.png" },
];

const LIVE_CLASSES = [
  "Email Marketing", "Video Editing.", "Form Fill-up.", "Data Entry.", 
  "Typing Work.", "Digital Marketing.", "Graphic Designing.", "Product Selling.",
  "Computer Course.", "Facebook Marketing.", "Gaming Marketing.", "Spoken English.",
  "Namaz & Quran Shikkha", "Photo Editing."
];

interface StudentPanelProps {
  logout: () => void;
}

function StudentProfile() {
  const info = [
    { label: "First Name :", value: "Tanha Islam" },
    { label: "Last Name :", value: "Mim" },
    { label: "E-mail:", value: "tanhaislam21@gmail.com" },
    { label: "Phone:", value: "01919012423" },
    { label: "Bio:", value: "Online Job" },
    { label: "Address:", value: "Dhaka" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="container mx-auto px-4 lg:px-12 mt-8"
    >
      <div className="ue-profile-hero mb-8">
        <div className="ue-soft-card p-6 flex flex-row items-center justify-between !bg-gradient-to-r from-blue-600 to-blue-400">
          <span className="text-xl font-black">Balance:</span>
          <div className="ue-badge-box">6991.22</div>
        </div>
        <div className="ue-soft-card p-6 flex flex-row items-center justify-between !bg-gradient-to-r from-teal-500 to-green-400">
          <span className="text-xl font-black">Student ID:</span>
          <div className="ue-badge-box">3255889</div>
        </div>
      </div>

      <div className="grid gap-4 mb-12">
        {info.map((item, i) => (
          <div key={i} className="ue-info-card">
            <span className="text-gray-600 font-bold text-lg">{item.label}</span>
            <span className="text-gray-900 font-black text-lg text-right">{item.value}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function MyHomeworks() {
  const homeworks = [
    { title: "Photo Editing.", status: "Continue", color: "bg-cyan-500", img: "https://unityearning.com/storage/1020/68c0a022baaef_unityearning.png" },
    { title: "Namaz & Quran Shikkha", status: "Pending", color: "bg-blue-600", img: "https://unityearning.com/storage/964/68285b7c714c4_Screenshot_2025-05-17-15-04-27-93_40deb401b9ffe8e1df2f1cc5ba480b12.jpg" },
    { title: "Spoken English.", status: "Pending", color: "bg-blue-600", img: "https://unityearning.com/storage/965/68285b9c72461_spoken-english-(1).jpeg" },
    { title: "Gaming Marketing.", status: "Pending", color: "bg-blue-600", img: "https://unityearning.com/storage/966/68285bc0748a5_download-(1).jpeg" },
    { title: "Facebook Marketing.", status: "Pending", color: "bg-blue-600", img: "https://unityearning.com/storage/967/68285bdea9065_Graphic.jpg" },
    { title: "Computer Course.", status: "Pending", color: "bg-blue-600", img: "https://unityearning.com/storage/968/68285bf5cde79_download.jpeg" },
    { title: "Graphic Designing.", status: "Pending", color: "bg-blue-600", img: "https://unityearning.com/storage/970/68285c2c8b2f2_Graphic-Design.jpg" },
    { title: "Digital Marketing.", status: "Pending", color: "bg-blue-600", img: "https://unityearning.com/storage/971/68285c484e1b0_Digital-Market.jpg" },
    { title: "Typing Work.", status: "Pending", color: "bg-blue-600", img: "https://unityearning.com/storage/972/68285c6c41f10_Computer-Training.jpg" },
    { title: "Data Entry.", status: "Pending", color: "bg-blue-600", img: "https://unityearning.com/storage/973/68285c8b497dd_data-enty.jpg" },
    { title: "Form Fill-up.", status: "Pending", color: "bg-blue-600", img: "https://unityearning.com/storage/974/68285cb173da7_Computer-Training.jpg" },
    { title: "Video Editing.", status: "Pending", color: "bg-blue-600", img: "https://unityearning.com/storage/1029/690c6e2c2f6b2_unityearning.png" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 lg:px-12 mt-8"
    >
      <div className="text-center mb-12">
        <h2 className="text-2xl font-bold text-gray-500 tracking-wide">Home / My Homeworks</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {homeworks.map((hw, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-xl transition-shadow flex flex-col">
            <div className="h-56 overflow-hidden">
               <img 
                 src={hw.img} 
                 alt={hw.title} 
                 className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                 referrerPolicy="no-referrer" 
               />
            </div>
            <div className="p-8">
              <h4 className="text-2xl font-black text-gray-900 mb-6">{hw.title}</h4>
              <button className={`${hw.color} text-white px-8 py-3 rounded-xl font-black shadow-lg hover:brightness-110 transition-all active:scale-95`}>
                {hw.status}
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
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 lg:px-12 mt-8 pb-20"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-500 tracking-wide">Home</h2>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-2xl mx-auto">
        <div className="space-y-6">
          <div>
            <label className="block text-gray-500 text-lg font-bold mb-2">First Name</label>
            <input 
              type="text" 
              defaultValue="Tanha Islam" 
              className="w-full px-6 py-4 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-gray-700 font-bold"
            />
          </div>
          <div>
            <label className="block text-gray-500 text-lg font-bold mb-2">Last Name</label>
            <input 
              type="text" 
              defaultValue="Mim" 
              className="w-full px-6 py-4 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-gray-700 font-bold"
            />
          </div>
          <div>
            <label className="block text-gray-500 text-lg font-bold mb-2">Email</label>
            <input 
              type="email" 
              defaultValue="tanhaislam21@gmail.com" 
              className="w-full px-6 py-4 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-gray-700 font-bold"
            />
          </div>
          <div>
            <label className="block text-gray-500 text-lg font-bold mb-2">Phone Number</label>
            <input 
              type="text" 
              defaultValue="01919012423" 
              className="w-full px-6 py-4 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-gray-700 font-bold"
            />
          </div>
          <div>
            <label className="block text-gray-500 text-lg font-bold mb-2">Bio</label>
            <textarea 
              defaultValue="Online Job" 
              rows={3}
              className="w-full px-6 py-4 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-gray-700 font-bold resize-none"
            />
          </div>
          <div>
            <label className="block text-gray-500 text-lg font-bold mb-2">Address</label>
            <input 
              type="text" 
              defaultValue="Dhaka" 
              className="w-full px-6 py-4 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-gray-700 font-bold"
            />
          </div>
          <div>
            <label className="block text-gray-500 text-lg font-bold mb-4">Gender</label>
            <div className="flex items-center gap-8">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="radio" name="gender" className="w-5 h-5 accent-blue-600" />
                <span className="text-gray-600 font-bold text-lg group-hover:text-blue-600">Male</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="radio" name="gender" defaultChecked className="w-5 h-5 accent-blue-600" />
                <span className="text-gray-600 font-bold text-lg group-hover:text-blue-600">Female</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="radio" name="gender" className="w-5 h-5 accent-blue-600" />
                <span className="text-gray-600 font-bold text-lg group-hover:text-blue-600">Others</span>
              </label>
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
    { type: "", date: "07 Apr 2026", amount: "150.00", notes: "Photo Submit", status: "Approved" },
    { type: "", date: "04 Apr 2026", amount: "180.00", notes: "Email Market", status: "Approved" },
    { type: "", date: "04 Apr 2026", amount: "300.00", notes: "Data Entry", status: "Approved" },
    { type: "", date: "01 Apr 2026", amount: "220.00", notes: "PDF Typing Su", status: "Approved" },
    { type: "W", date: "23 Mar 2026", amount: "250.00", notes: "Form Fill Up", status: "Approved" },
    { type: "W", date: "17 Feb 2026", amount: "800.00", notes: "Withdrawal", status: "Approved" },
    { type: "", date: "16 Feb 2026", amount: "120.00", notes: "Mini Job", status: "Approved" },
    { type: "", date: "15 Feb 2026", amount: "400.00", notes: "Course Sell", status: "Approved" },
    { type: "", date: "14 Feb 2026", amount: "210.00", notes: "Typing Test", status: "Approved" },
    { type: "", date: "12 Feb 2026", amount: "190.00", notes: "Ad Click", status: "Approved" },
    { type: "", date: "10 Feb 2026", amount: "330.00", notes: "Logo Design", status: "Approved" },
    { type: "", date: "08 Feb 2026", amount: "280.00", notes: "Social Share", status: "Approved" },
    { type: "W", date: "05 Feb 2026", amount: "500.00", notes: "Withdrawal", status: "Approved" },
    { type: "", date: "03 Feb 2026", amount: "170.00", notes: "Data Extract", status: "Approved" },
    { type: "", date: "01 Feb 2026", amount: "240.00", notes: "Feedback", status: "Approved" },
  ];

  const transactions = Array.from({ length: 100 }, (_, i) => ({
    ...baseTransactions[i % baseTransactions.length],
    sr: i + 1,
  }));

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-2 lg:px-12 mt-4 lg:mt-8 pb-20"
    >
      <div className="flex items-center justify-between mb-4 lg:mb-8">
        <h2 className="text-xl lg:text-2xl font-black text-gray-800">My Passbook</h2>
      </div>

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
    { sr: 4, method: "Bkash", date: "15 Feb 2026, 09:59 pm", amount: "Tk 600.00", notes: "Successful", status: "Completed" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-2 lg:px-12 mt-4 lg:mt-8 pb-20"
    >
      <div className="text-center mb-4 lg:mb-8">
        <h2 className="text-xl lg:text-2xl font-bold text-gray-500 tracking-wide">Home</h2>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 lg:gap-6 mb-8 lg:mb-12">
        <div className="text-center md:text-left">
          <h2 className="text-2xl lg:text-3xl font-black text-gray-900 mb-1">Withdrawals</h2>
          <div className="flex items-center justify-center md:justify-start gap-4 text-sm lg:text-lg">
            <span className="text-gray-500 font-bold">Current Balance:</span>
            <span className="text-blue-600 font-black">Tk 6991.22</span>
          </div>
          <div className="text-[10px] lg:text-sm text-gray-400 font-bold mt-1">Minimum Withdrawal Amount: Tk 50.00</div>
        </div>
        <button 
          onClick={() => onNavigate('new-withdraw')}
          className="bg-blue-600 text-white px-6 lg:px-8 py-3 lg:py-4 rounded-xl lg:rounded-2xl font-black shadow-xl hover:shadow-blue-200 hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-2 lg:gap-3 text-sm lg:text-base"
        >
          New Withdraw Request <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5" />
        </button>
      </div>

      <div className="bg-white rounded-xl lg:rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse table-fixed lg:table-auto min-w-[320px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-2 lg:px-8 py-3 lg:py-6 font-black text-gray-700 uppercase tracking-tighter text-[9px] lg:text-sm w-[10%] lg:w-auto">Sr</th>
                <th className="px-2 lg:px-8 py-3 lg:py-6 font-black text-gray-700 uppercase tracking-tighter text-[9px] lg:text-sm w-[15%] lg:w-auto">Method</th>
                <th className="px-2 lg:px-8 py-3 lg:py-6 font-black text-gray-700 uppercase tracking-tighter text-[9px] lg:text-sm w-[25%] lg:w-auto">Date</th>
                <th className="px-2 lg:px-8 py-3 lg:py-6 font-black text-gray-700 uppercase tracking-tighter text-[9px] lg:text-sm w-[20%] lg:w-auto">Amount</th>
                <th className="px-2 lg:px-8 py-3 lg:py-6 font-black text-gray-700 uppercase tracking-tighter text-[9px] lg:text-sm w-[15%] lg:w-auto">Notes</th>
                <th className="px-2 lg:px-8 py-3 lg:py-6 font-black text-gray-700 uppercase tracking-tighter text-[9px] lg:text-sm text-right w-[15%] lg:w-auto">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {history.map((h, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors text-[9px] lg:text-xs">
                  <td className="px-2 lg:px-8 py-3 lg:py-6 text-gray-900 font-black">{h.sr}</td>
                  <td className="px-2 lg:px-8 py-3 lg:py-6 whitespace-nowrap overflow-hidden text-ellipsis">
                    <div className="flex items-center gap-1 lg:gap-3">
                      <div className="p-1 lg:p-2 bg-pink-50 rounded-lg hidden sm:block">
                        <CreditCard className="w-3 h-3 lg:w-5 lg:h-5 text-pink-500" />
                      </div>
                      <span className="text-gray-900 font-bold">{h.method}</span>
                    </div>
                  </td>
                  <td className="px-2 lg:px-8 py-3 lg:py-6 text-gray-500 font-bold leading-tight">{h.date}</td>
                  <td className="px-2 lg:px-8 py-3 lg:py-6 text-blue-600 font-black whitespace-nowrap">{h.amount}</td>
                  <td className="px-2 lg:px-8 py-3 lg:py-6 text-gray-500 font-bold truncate">{h.notes}</td>
                  <td className="px-2 lg:px-8 py-3 lg:py-6 text-right">
                    <span className={`inline-block px-2 lg:px-4 py-1 lg:py-1.5 rounded-full font-black text-[7px] lg:text-xs uppercase tracking-widest ${
                      h.status === 'Completed' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                    }`}>
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
  const methods = ["Please Select", "Bkash", "Nagad", "Roket", "Paytm", "Google Pay", "PhonePe"];

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="container mx-auto px-4 lg:px-12 mt-4 lg:mt-8 pb-20"
    >
      <div className="text-center mb-6 lg:mb-8">
        <h2 className="text-xl lg:text-2xl font-bold text-gray-400 tracking-wide">Home</h2>
      </div>

      <div className="flex items-center justify-between gap-4 mb-8 lg:mb-12">
        <h2 className="text-2xl lg:text-3xl font-black text-gray-900 leading-tight">Create New Request</h2>
        <button 
          onClick={onBack}
          className="bg-blue-600 text-white px-4 lg:px-6 py-2 lg:py-3 rounded-xl font-black text-xs lg:text-sm shadow-lg active:scale-95 transition-all"
        >
          Request List
        </button>
      </div>

      <div className="space-y-8 max-w-xl mx-auto">
        {/* WITHDRAW METHOD */}
        <div className="relative">
          <label className="block text-gray-500 text-xl lg:text-2xl font-black mb-3">Withdraw Method</label>
          <div 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full px-6 py-4 rounded-xl border border-gray-200 bg-white flex items-center justify-between cursor-pointer hover:border-blue-400 transition-colors"
          >
            <span className={`text-lg font-bold ${selectedMethod === "Please Select" ? 'text-gray-400' : 'text-gray-800'}`}>{selectedMethod}</span>
            <ChevronUp className={`w-5 h-5 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-0' : 'rotate-180'}`} />
          </div>
          
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute left-0 right-0 top-[calc(100%+8px)] bg-white border border-gray-100 rounded-2xl shadow-2xl z-50 overflow-hidden"
              >
                {methods.map((method, i) => (
                  <div 
                    key={i}
                    onClick={() => {
                      setSelectedMethod(method);
                      setIsDropdownOpen(false);
                    }}
                    className={`px-6 py-4 text-xl font-bold cursor-pointer transition-colors hover:bg-gray-50 ${
                      selectedMethod === method ? 'bg-blue-600 text-white' : 'text-gray-700'
                    }`}
                  >
                    {method}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* PHONE NUMBER */}
        <div>
          <label className="block text-gray-500 text-xl lg:text-2xl font-black mb-3">Withdraw Phone Number</label>
          <input 
            type="text" 
            placeholder="Type Withdraw Phone Number" 
            className="w-full px-6 py-4 rounded-2xl border border-gray-200 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 transition-all text-xl font-bold placeholder:text-gray-300"
          />
        </div>

        {/* AMOUNT */}
        <div>
          <label className="block text-gray-500 text-xl lg:text-2xl font-black mb-3">Amount</label>
          <input 
            type="text" 
            placeholder="Type Amount" 
            className="w-full px-6 py-4 rounded-2xl border border-gray-200 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 transition-all text-xl font-bold placeholder:text-gray-300"
          />
          <div className="mt-6">
            <p className="text-gray-500 text-xl font-black">Not withdraw full balance!</p>
            <p className="text-gray-500 text-xl font-black">Minimum account Balance (10)</p>
          </div>
        </div>

        <button className="bg-blue-600 text-white px-8 py-4 rounded-xl font-black text-lg shadow-xl hover:brightness-110 active:scale-95 transition-all">
          Create Request
        </button>
      </div>
    </motion.div>
  );
}

function Notice() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="container mx-auto px-4 lg:px-12 mt-8 pb-20"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-500 tracking-wide">Home</h2>
      </div>

      <div className="bg-white rounded-3xl shadow-2xl p-6 lg:p-10 border-l-8 border-red-500 mb-8 overflow-hidden relative">
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
          <Bell className="w-32 h-32" />
        </div>
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-red-500 p-3 rounded-2xl text-white shadow-lg shadow-red-200">
            <AlertTriangle className="w-7 h-7" />
          </div>
          <h3 className="text-3xl font-black text-red-600 uppercase tracking-tighter">নোটিশ</h3>
        </div>
        <div className="space-y-5">
          <div className="flex items-start gap-4">
            <div className="w-2.5 h-2.5 mt-2.5 rounded-full bg-red-500 shrink-0"></div>
            <p className="text-xl lg:text-2xl font-black text-gray-800 leading-snug">আপনার অ্যাকাউন্টের পাসওয়ার্ড কোনো অবস্থাতেই কাউকে শেয়ার করবেন না।</p>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-2.5 h-2.5 mt-2.5 rounded-full bg-red-500 shrink-0"></div>
            <p className="text-xl lg:text-2xl font-black text-gray-800 leading-snug">আপনার রেফারেল লিংক বা অ্যাকাউন্ট ব্যালেন্সের স্ক্রিনশট কারও সঙ্গে শেয়ার করা সম্পূর্ণ নিষিদ্ধ।</p>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-2.5 h-2.5 mt-2.5 rounded-full bg-red-500 shrink-0"></div>
            <p className="text-xl lg:text-2xl font-black text-gray-800 leading-snug">একবার টাকা উইথড্র দেওয়ার পর টাকা না পাওয়া পর্যন্ত দ্বিতীয়বার রিকোয়েস্ট পাঠাবেন না।</p>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-2.5 h-2.5 mt-2.5 rounded-full bg-red-500 shrink-0"></div>
            <p className="text-xl lg:text-2xl font-black text-gray-800 leading-snug">টাকা উইথড্র দেওয়ার সাথে সাথেই আপনার টিম লিডার / ট্রেনারকে জানাবেন।</p>
          </div>
          <div className="flex items-start gap-4 border-t border-gray-100 pt-6 mt-6 bg-blue-50/50 p-6 rounded-2xl">
            <div className="bg-blue-600 p-3 rounded-2xl shadow-lg shadow-blue-200">
              <Phone className="w-6 h-6 text-white" />
            </div>
            <p className="text-xl lg:text-2xl font-black text-blue-700 leading-snug italic">কোনো সমস্যা হলে আমাদের ফেসবুক পেজে অথবা হেল্প লাইন নাম্বারে কল করুন।</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function UnityStoreView() {
  const [showProducts, setShowProducts] = useState(false);
  const products = [
    { title: "Smart Office Chair", price: "500", img: "https://picsum.photos/seed/chair1/400/400" },
    { title: "Wooden Study Table", price: "1200", img: "https://picsum.photos/seed/table1/400/400" },
    { title: "Gaming Laptop Pro", price: "45000", img: "https://picsum.photos/seed/laptop1/400/400" },
    { title: "Ergonomic Desk Chair", price: "800", img: "https://picsum.photos/seed/chair2/400/400" },
    { title: "Modern Glass Table", price: "2500", img: "https://picsum.photos/seed/table2/400/400" },
    { title: "Ultrabook Air", price: "35000", img: "https://picsum.photos/seed/laptop2/400/400" },
    { title: "Executive Leather Chair", price: "1500", img: "https://picsum.photos/seed/chair3/400/400" },
    { title: "Folding PC Desk", price: "1000", img: "https://picsum.photos/seed/table3/400/400" },
    { title: "Workstation Laptop", price: "55000", img: "https://picsum.photos/seed/laptop3/400/400" },
    { title: "Mesh Back Chair", price: "600", img: "https://picsum.photos/seed/chair4/400/400" },
    { title: "Round Dining Table", price: "3000", img: "https://picsum.photos/seed/table4/400/400" },
    { title: "Business NotePro", price: "28000", img: "https://picsum.photos/seed/laptop4/400/400" },
    { title: "Sturdy Plastic Chair", price: "300", img: "https://picsum.photos/seed/chair5/400/400" },
    { title: "Minimalist Desk", price: "1800", img: "https://picsum.photos/seed/table5/400/400" },
    { title: "High-End Gaming Rig", price: "75000", img: "https://picsum.photos/seed/laptop5/400/400" },
    { title: "Padded Swivel Chair", price: "950", img: "https://picsum.photos/seed/chair6/400/400" },
    { title: "Compact Corner Table", price: "1100", img: "https://picsum.photos/seed/table6/400/400" },
    { title: "Student Laptop Plus", price: "22000", img: "https://picsum.photos/seed/laptop6/400/400" },
  ];

  if (!showProducts) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="container mx-auto px-4 lg:px-12 mt-12 flex flex-col items-center justify-center min-h-[50vh]"
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-500 tracking-wide">Home</h2>
        </div>
        
        <button 
          onClick={() => setShowProducts(true)}
          className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl border border-gray-100 flex flex-col items-center gap-6 hover:shadow-2xl transition-all group active:scale-95"
        >
          <div className="bg-blue-600 p-6 rounded-2xl group-hover:scale-110 transition-transform shadow-lg shadow-blue-200">
            <Store className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-3xl font-black text-gray-900 tracking-tight">Unity Store</h3>
          <div className="bg-blue-50 text-blue-600 px-6 py-2 rounded-full font-black text-sm uppercase tracking-widest group-hover:bg-blue-600 group-hover:text-white transition-colors">
            পণ্য দেখতে ক্লিক করুন
          </div>
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 lg:px-12 mt-8 pb-20"
    >
      <div className="flex items-center justify-between mb-8 lg:mb-12">
        <div>
          <h2 className="text-2xl lg:text-3xl font-black text-gray-900 mb-1">Unity Store</h2>
          <p className="text-gray-500 font-bold">আপনার পছন্দের পন্য কিনুন সাশ্রয়ী মূল্যে</p>
        </div>
        <button 
          onClick={() => setShowProducts(false)}
          className="bg-gray-100 text-gray-600 px-4 py-2 rounded-xl font-bold hover:bg-gray-200 transition-colors"
        >
          ফিরে যান
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-8">
        {products.map((p, i) => (
          <motion.div 
            key={i}
            whileHover={{ y: -5 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-xl transition-all"
          >
            <div className="aspect-square overflow-hidden relative">
              <img 
                src={p.img} 
                alt={p.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-2 right-2 bg-blue-600 text-white px-3 py-1 rounded-full text-[10px] font-black shadow-lg">নিরাপদ পন্য</div>
            </div>
            <div className="p-3 lg:p-5">
              <h3 className="font-black text-gray-900 text-sm lg:text-lg mb-2 truncate">{p.title}</h3>
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">মূল্য</span>
                  <span className="text-blue-600 font-black text-sm lg:text-xl">Tk {p.price}</span>
                </div>
              </div>
              <button className="w-full bg-slate-900 text-white py-2 lg:py-3 rounded-xl font-black text-xs lg:text-sm hover:bg-blue-600 transition-colors active:scale-95">
                এখনই কিনুন
              </button>
            </div>
          </motion.div>
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
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="container mx-auto px-4 lg:px-12 mt-8 pb-20"
    >
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold text-gray-500 tracking-wide">Home</h2>
      </div>

      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-2">
            <label className="text-xl font-bold text-gray-600 block pl-1">Old Password</label>
            <input 
              type="password" 
              placeholder="Old Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full p-5 lg:p-6 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm text-lg active:scale-[0.99] transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xl font-bold text-gray-600 block pl-1">New Password</label>
            <input 
              type="password" 
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-5 lg:p-6 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm text-lg active:scale-[0.99] transition-all"
            />
          </div>

          <button 
            type="submit"
            className="w-full py-5 lg:py-6 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-500 text-white font-black text-2xl lg:text-3xl shadow-xl shadow-purple-200 flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-95 transition-all"
          >
            Change Password <ArrowRight className="w-8 h-8 font-black" />
          </button>
        </form>

        {isSuccess && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-6 p-4 bg-green-50 text-green-600 font-bold rounded-2xl text-center border border-green-100"
          >
            পাসওয়ার্ড সফলভাবে পরিবর্তন করা হয়েছে!
          </motion.div>
        )}

        {/* PAGE FOOTER IN IMAGE */}
        <div className="mt-20 flex flex-col items-start gap-8 border-t border-gray-100 pt-12">
          <img src="https://unityearning.com/assets/img/unityearning.png" alt="Logo" className="h-16 w-auto" />
          <p className="text-xl lg:text-2xl font-bold text-gray-500 leading-relaxed max-w-3xl">
            Learn how to use online social media in our society and how to earn online without wasting valuable time from online social media.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function StudentPanel({ logout }: StudentPanelProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard', 'profile', 'homeworks', 'edit-profile', 'passbook', 'withdrawals', 'new-withdraw', 'notice', 'store', or 'change-password'

  const navigateTo = (tab: string) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-hind">
      {/* HEADER */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 lg:px-12 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4 lg:gap-8">
            <a href="/">
              <img src="https://unityearning.com/assets/img/unityearning.png" alt="Unity Earning" className="h-10 lg:h-12 w-auto" />
            </a>
            <div className="hidden md:block">
              <h5 className="font-bold text-gray-700 m-0">Students Panel</h5>
            </div>
          </div>

          <nav className="hidden xl:block">
            <ul className="gradient-menu">
              <li onClick={() => navigateTo('dashboard')}><a href="#"><LayoutGrid className="w-4 h-4 mr-2" /> All Course</a></li>
              {MENU_ITEMS.map((item, i) => (
                <li key={i} onClick={() => {
                  if (item.label === 'Video Tutorial') return; // Let anchor handle it
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
                  <a href={item.href} target={item.label === 'Video Tutorial' ? "_blank" : "_self"} rel={item.label === 'Video Tutorial' ? "noopener noreferrer" : ""}><item.icon className="w-4 h-4 mr-2" /> {item.label}</a>
                </li>
              ))}
              <li><button onClick={logout} className="w-full flex items-center justify-center"><LogOut className="w-4 h-4 mr-2" /> Logout</button></li>
            </ul>
          </nav>

          <button 
            className="xl:hidden p-2 text-gray-700 bg-gray-100 rounded-lg"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-[100]">
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setIsMobileMenuOpen(false)}
               className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
               initial={{ x: "100%" }}
               animate={{ x: 0 }}
               exit={{ x: "100%" }}
               className="absolute top-0 right-0 h-full w-[80%] max-w-sm bg-white shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <img src="https://unityearning.com/assets/img/unityearning.png" alt="Logo" className="h-10 w-auto" />
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-gray-100 rounded-xl">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="p-6 overflow-y-auto">
                <ul className="gradient-menu">
                  <li onClick={() => navigateTo('dashboard')}><a href="#"><LayoutGrid className="w-4 h-4 mr-2" /> All Course</a></li>
                  {MENU_ITEMS.map((item, i) => (
                    <li key={i} onClick={() => {
                      if (item.label === 'Video Tutorial') return; // Let anchor handle it
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
                      <a href={item.href} target={item.label === 'Video Tutorial' ? "_blank" : "_self"} rel={item.label === 'Video Tutorial' ? "noopener noreferrer" : ""}><item.icon className="w-4 h-4 mr-2" /> {item.label}</a>
                    </li>
                  ))}
                  <li><button onClick={logout} className="w-full h-full flex items-center justify-center py-[12px]"><LogOut className="w-4 h-4 mr-2" /> Logout</button></li>
                </ul>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <main className="flex-grow pb-16">
        {activeTab === 'dashboard' ? (
          <>
            {/* HERO */}
            <div 
              className="ue-grad-hero h-[350px] lg:h-[450px] flex items-center text-white relative overflow-hidden"
              style={{ backgroundImage: "url(https://unityearning.com/frontend/images/banner/banner-2.jpeg)", backgroundSize: "cover", backgroundPosition: "center", backgroundBlendMode: "overlay" }}
            >
              <div className="container mx-auto px-4 lg:px-12 relative z-10">
                <h3 className="text-3xl lg:text-5xl font-black drop-shadow-lg text-center md:text-left">
                  UNITY EARNING <br/> E-LEARNING PLATFORM
                </h3>
              </div>
            </div>

            <div className="container mx-auto px-4 lg:px-12 -mt-12 relative z-20">
              <div className="bg-white p-6 rounded-2xl shadow-xl mb-8">
                <p className="text-gray-700 leading-relaxed font-bold">
                  এটি একটি বিশ্বস্ত বাংলাদেশি অনলাইন প্ল্যাটফর্ম। কেবলমাত্র স্মার্টফোন ব্যবহার করে ঘরে বসে
                  অবসর সময়কে কাজে লাগিয়ে শেখা এবং আয় করার সুযোগ রয়েছে। মাতৃভাষায় সহজভাবে শেখার পাশাপাশি আমাদের
                  কমিউনিটি থেকে কোর্স, সার্ভিস বা প্রোডাক্ট বিক্রির মাধ্যমে আয় করতে পারবেন—ধাপে ধাপে
                  ক্যারিয়ার গড়ুন আত্মবিশ্বাসে।
                </p>
              </div>

              {/* SUPPORT TEAM */}
              <div className="ue-grad-panel p-6 lg:p-10 mb-8">
                <h6 className="text-white font-black uppercase mb-6 tracking-widest text-lg">UNITY EARNING E-LEARNING PLATFORM &gt;&gt; সাপোর্ট টিম</h6>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div className="ue-soft-card p-6">
                    <div className="text-white font-black text-xl mb-2">টিম লিডার:</div>
                    <div className="text-white/90 text-lg mb-4">Nurjahan Islam</div>
                    <a href="https://wa.me/88-01785613673" className="flex items-center gap-2 text-white font-black hover:scale-105 transition-transform origin-left">
                      <Phone className="w-5 h-5" /> Whatsapp: -01785613673
                    </a>
                  </div>
                  <div className="ue-soft-card p-6">
                    <div className="text-white font-black text-xl mb-2">ট্রেইনার:</div>
                    <div className="text-white/90 text-lg mb-4">Sadia Akter</div>
                    <a href="https://wa.me/88-01636276634" className="flex items-center gap-2 text-white font-black hover:scale-105 transition-transform origin-left">
                      <Phone className="w-5 h-5" /> Whatsapp: -01636276634
                    </a>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* HELP BOX */}
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center h-full">
                  <h3 className="text-2xl font-black text-gray-900 mb-6 text-center">কিভাবে সাহায্য করতে পারি?</h3>
                  <div className="w-full bg-slate-900 p-6 rounded-2xl text-center mt-auto">
                    <h5 className="text-white font-black mb-4">যেকোনো সমস্যা</h5>
                    <span className="inline-block bg-teal-600 text-white px-6 py-2 rounded-full font-black text-sm mb-6">সময়ঃ ৮:৩০AM – ১১:৩০PM</span>
                    <a href="https://www.facebook.com/share/1MAceX7uXW/" className="ue-join-btn ue-pill-teal">
                      <ArrowRight className="w-5 h-5" /> Join Meeting
                    </a>
                  </div>
                </div>

                {/* LIVE CLASSES */}
                <div className="bg-lime-500 p-8 rounded-2xl shadow-lg lg:col-span-2">
                  <h5 className="text-gray-900 font-black text-2xl mb-8 text-center uppercase tracking-widest">লাইভ ক্লাসে যোগ দিন</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {LIVE_CLASSES.map((topic, i) => (
                      <div key={i} className="ue-soft-card p-6 flex flex-col md:flex-row items-center justify-between gap-4" style={{ background: "linear-gradient(135deg,#1d4ed8,#0ea5a4)" }}>
                        <div>
                          <p className="m-0 text-white"><b>ক্লাস টপিক:</b> {topic}</p>
                          <p className="m-0 text-white/80"><b>শিক্ষক:</b> —</p>
                        </div>
                        <span className="ue-join-btn opacity-80 cursor-default scale-90 whitespace-nowrap">জয়েন করুন</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ADMIN SUPPORT */}
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center col-span-full">
                  <h3 className="text-2xl font-black text-gray-900 mb-6">আমার অ্যাডমিন সাপোর্ট</h3>
                  <div className="w-full ue-grad-hero p-8 lg:p-12 flex flex-col md:flex-row items-center justify-center gap-8">
                    <div className="p-4 bg-white/20 rounded-2xl">
                      <Bell className="w-10 h-10 text-white" />
                    </div>
                    <div className="text-center md:text-left">
                      <p className="text-2xl font-black text-white mb-0 uppercase leading-none">যেকোনো সমস্যায় যোগাযোগ করুন</p>
                    </div>
                    <a href="https://wa.me/https://whatsapp.com/channel/0029VbB4RqI3mFY5nkzbCs0p" className="ue-chip !bg-white !text-teal-900 border-none px-12 py-4 text-xl">
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>

              {/* CATEGORIES */}
              <div className="mt-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {CATEGORIES.map((cat, i) => (
                    <div 
                      key={i} 
                      onClick={() => {
                        if (cat.title === "Product Selling.") navigateTo('store');
                        else navigateTo('dashboard');
                      }}
                      className="ue-cat-card block group cursor-pointer"
                    >
                      <div className="overflow-hidden">
                        <img src={cat.img} alt={cat.title} className="thumb transition-transform duration-500 group-hover:scale-110" referrerPolicy="no-referrer" />
                      </div>
                      <div className="bdy">
                        <h5 className="title text-xl mb-1">{cat.title}</h5>
                        <div className="meta font-bold">({cat.count}) কোর্স</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* COUNTER AREA */}
              <div className="mt-24 p-12 lg:p-24 rounded-3xl bg-black/60 bg-blend-overlay relative overflow-hidden" style={{ backgroundImage: "url(https://unityearning.com/frontend/images/bg/bg-image-20.jpg)", backgroundSize: "cover", backgroundPosition: "center" }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
                  <div className="text-center text-white">
                    <h3 className="text-6xl font-black mb-4">500</h3>
                    <span className="text-xl font-bold uppercase tracking-widest text-gray-300">শিক্ষার্থী (চলমান)</span>
                  </div>
                  <div className="text-center text-white">
                    <h3 className="text-6xl font-black mb-4">110</h3>
                    <span className="text-xl font-bold uppercase tracking-widest text-gray-300">কোর্স & ভিডিও</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : activeTab === 'profile' ? (
          <StudentProfile />
        ) : activeTab === 'edit-profile' ? (
          <EditProfile />
        ) : activeTab === 'passbook' ? (
          <MyPassbook />
        ) : activeTab === 'withdrawals' ? (
          <Withdrawals onNavigate={navigateTo} />
        ) : activeTab === 'new-withdraw' ? (
          <NewWithdrawRequest onBack={() => navigateTo('withdrawals')} />
        ) : activeTab === 'notice' ? (
          <Notice />
        ) : activeTab === 'store' ? (
          <UnityStoreView />
        ) : activeTab === 'change-password' ? (
          <ChangePassword />
        ) : (
          <MyHomeworks />
        )}
      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t border-gray-100 py-16">
        <div className="container mx-auto px-4 lg:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                <div>
                  <img src="https://unityearning.com/assets/img/unityearning.png" alt="Logo" className="h-12 w-auto mb-8" />
                  <p className="text-gray-500 font-bold leading-relaxed">
                    Learn how to use online social media in our society and how to earn online without wasting valuable time from online social media.
                  </p>
                </div>
                <div>
                  <h5 className="text-xl font-black mb-8 text-gray-900 border-b-2 border-teal-500 pb-2 w-fit">Company</h5>
                  <ul className="space-y-4 font-bold text-gray-500">
                    <li><a href="#" className="hover:text-teal-600 transition-colors">About</a></li>
                    <li><a href="#" className="hover:text-teal-600 transition-colors">FAQ</a></li>
                    <li><a href="#" className="hover:text-teal-600 transition-colors">Blogs</a></li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-xl font-black mb-8 text-gray-900 border-b-2 border-teal-500 pb-2 w-fit">Blogs</h5>
                  <ul className="space-y-4 font-bold text-gray-500">
                    <li><a href="#" className="hover:text-teal-600 transition-colors">Contact</a></li>
                    <li><a href="#" className="hover:text-teal-600 transition-colors">Support</a></li>
                    <li><a href="#" className="hover:text-teal-600 transition-colors">Courses</a></li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-xl font-black mb-8 text-gray-900 border-b-2 border-teal-500 pb-2 w-fit">Contact Info</h5>
                   <ul className="space-y-6 font-bold text-gray-500">
                    <li>
                      <p className="text-gray-400 text-sm mb-1">Phone:</p>
                      <a href="tel:01600602084" className="text-teal-600 leading-tight block">📞 Help Line Support 💬 কোনো সমস্যা হলে আমাদের WhatsApp-এ যোগাযোগ করুন 👉 01600602084⁠</a>
                    </li>
                    <li>
                       <p className="text-gray-400 text-sm mb-1">E-mail:</p>
                      <a href="mailto:unityearning13@gmail.com" className="text-gray-900">unityearning13@gmail.com</a>
                    </li>
                    <li>
                      <p className="text-gray-400 text-sm mb-1">Location:</p>
                      <span className="text-gray-900">Dhaka, Bangladesh</span>
                    </li>
                  </ul>
                </div>
            </div>
            <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 font-bold text-sm">
                <p>Unity Earning LMS, All Rights Reserved</p>
                <div className="flex gap-8">
                  <a href="#" className="hover:text-teal-600">Terms of service</a>
                  <a href="#" className="hover:text-teal-600">Privacy policy</a>
                </div>
            </div>
        </div>
      </footer>

      {/* GO UP BUTTON */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-10 right-10 p-4 bg-white text-blue-600 rounded-full shadow-2xl z-[60] border border-blue-100 hover:scale-110 transition-transform"
      >
        <ChevronUp className="w-6 h-6" />
      </button>
    </div>
  );
}
