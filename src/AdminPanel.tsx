import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, X, LogOut, LayoutGrid, Users, UserPlus, GraduationCap, 
  Store, BookOpen, CreditCard, Settings, MessageSquare, 
  ChevronDown, Bell, Search, Wallet, ArrowDownCircle, 
  Activity, UserX, UserCheck, Inbox, ShieldCheck, Plus, Trash2, Save
} from 'lucide-react';
import Swal from 'sweetalert2';
import { useSettings } from './lib/useSettings';

interface AdminPanelProps {
  logout: () => void;
}

export function AdminPanel({ logout }: AdminPanelProps) {
  const [activeView, setActiveView] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['members', 'payouts']);
  const { settings, updateSettings, loading } = useSettings();

  // Local state for editing settings
  const [editNotices, setEditNotices] = useState<string[]>([]);
  const [editSupport, setEditSupport] = useState(settings.supportTeam);

  useEffect(() => {
    if (settings) {
      setEditNotices(settings.notices);
      setEditSupport(settings.supportTeam);
    }
  }, [settings]);

  const handleSaveSettings = async () => {
    try {
      await updateSettings({
        notices: editNotices,
        supportTeam: editSupport
      });
      Swal.fire({
        icon: 'success',
        title: 'Settings Updated',
        text: 'Changes are now live for all students!',
        timer: 1500,
        toast: true,
        position: 'top-end'
      });
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Update Failed' });
    }
  };

  const toggleMenu = (menu: string) => {
    setExpandedMenus(prev => 
      prev.includes(menu) ? prev.filter(m => m !== menu) : [...prev, menu]
    );
  };

  const stats = [
    { title: "Member Due Balance", value: "65,460.19", unit: "TK", desc: "সদস্যদের মোট বকেয়া", color: "from-amber-500 to-red-500", icon: Wallet },
    { title: "Pending Withdraw Amount", value: "400.00", unit: "TK", desc: "অনুমোদনের অপেক্ষায়", color: "from-blue-500 to-cyan-500", icon: ArrowDownCircle },
    { title: "Total Payments Member", value: "563,116.00", unit: "TK", desc: "সদস্যদের প্রদত্ত মোট পরিশোধ", color: "from-slate-800 to-slate-600", icon: Users },
    { title: "Pending Fees Received", value: "261,500.00", unit: "TK", desc: "জমা নিশ্চিত হয়নি", color: "from-rose-500 to-pink-500", icon: Inbox },
    { title: "Total Active Members", value: "4,594", unit: "", desc: "এ মুহূর্তে সক্রিয়", color: "from-cyan-500 to-emerald-500", icon: Activity },
    { title: "Total Inactive Members", value: "158,808", unit: "", desc: "নিষ্ক্রিয়/স্থগিত", color: "from-emerald-500 to-green-600", icon: UserX },
  ];

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
    { 
      id: 'referral', 
      label: 'Referral Search', 
      icon: Search,
      subItems: [
        { id: 'referral-converted', label: 'Converted Referrals' },
        { id: 'referral-leads', label: 'Leads Referrals' }
      ]
    },
    { 
      id: 'shop', 
      label: 'Shop', 
      icon: Store,
      subItems: [
        { id: 'shop-products', label: 'Products' }
      ]
    },
    { 
      id: 'members', 
      label: 'Member Management', 
      icon: GraduationCap,
      subItems: [
        { id: 'members-all', label: 'All Student' },
        { id: 'members-active', label: 'Active Student' },
        { id: 'members-pending', label: 'Pending Student' },
        { id: 'members-block', label: 'Block Student' }
      ]
    },
    { id: 'managers', label: 'Manager Manage', icon: Users },
    { id: 'seniorteam', label: 'Senior Team Manage', icon: UserCheck },
    { id: 'teamleaders', label: 'Team Leader Manage', icon: Users },
    { id: 'teachers', label: 'Teacher Manage', icon: BookOpen },
    { id: 'counsellors', label: 'Counsellors Manage', icon: Users },
    { 
      id: 'courses', 
      label: 'Course Management', 
      icon: BookOpen,
      subItems: [
        { id: 'course-category', label: 'Course Category' },
        { id: 'course-list', label: 'Course' },
        { id: 'course-content', label: 'Course Content' }
      ]
    },
    { id: 'payments', label: 'Student Payments', icon: CreditCard },
    { 
      id: 'payouts', 
      label: 'Manage Payout', 
      icon: CreditCard,
      subItems: [
        { id: 'payouts-requested', label: 'Requested Withdraws' },
        { id: 'payouts-completed', label: 'Completed Withdraws' },
        { id: 'payouts-rejected', label: 'Rejected Withdraws' },
        { id: 'payouts-fees', label: 'Pending Fees' }
      ]
    },
    { id: 'settings', label: 'Application Settings', icon: Settings },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
  ];

  const renderSettings = () => (
    <div className="p-6 lg:p-10 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">Application Settings</h2>
          <p className="text-gray-500 font-bold">Manage notices, support team, and global configurations</p>
        </div>
        <button 
          onClick={handleSaveSettings}
          className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-black flex items-center gap-2 shadow-xl shadow-blue-200 hover:scale-105 active:scale-95 transition-all"
        >
          <Save className="w-5 h-5" /> Save Changes
        </button>
      </div>

      <div className="grid gap-10">
        {/* NOTICES SECTION */}
        <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-black text-gray-800 flex items-center gap-2">
              <Bell className="w-6 h-6 text-red-500" /> নোটিশ ম্যানেজমেন্ট (Notices)
            </h3>
            <button 
              onClick={() => setEditNotices([...editNotices, 'New Notice Message...'])}
              className="p-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-4">
            {editNotices.map((n, i) => (
              <div key={i} className="flex gap-3">
                <textarea 
                  value={n}
                  onChange={(e) => {
                    const next = [...editNotices];
                    next[i] = e.target.value;
                    setEditNotices(next);
                  }}
                  className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none font-bold text-gray-700 leading-snug"
                  rows={2}
                />
                <button 
                  onClick={() => setEditNotices(editNotices.filter((_, idx) => idx !== i))}
                  className="p-4 bg-red-50 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all self-start"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* SUPPORT TEAM SECTION */}
        <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-black text-gray-800 flex items-center gap-2">
              <Users className="w-6 h-6 text-blue-600" /> সাপোর্ট টিম ম্যানেজমেন্ট (Support Team)
            </h3>
            <button 
              onClick={() => setEditSupport([...editSupport, { role: 'Role', name: 'Name', phone: 'Phone' }])}
              className="p-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {editSupport.map((member, i) => (
              <div key={i} className="p-6 bg-gray-50 rounded-3xl border border-gray-100 relative group">
                <button 
                  onClick={() => setEditSupport(editSupport.filter((_, idx) => idx !== i))}
                  className="absolute -top-3 -right-3 p-2 bg-white text-red-500 rounded-full shadow-lg border border-red-50 opacity-0 group-hover:opacity-100 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="space-y-4">
                  <input 
                    type="text" 
                    value={member.role}
                    onChange={(e) => {
                      const next = [...editSupport];
                      next[i].role = e.target.value;
                      setEditSupport(next);
                    }}
                    placeholder="Role (e.g. টিম লিডার)"
                    className="w-full p-3 bg-white border border-gray-100 rounded-xl font-black text-blue-600 outline-none"
                  />
                  <input 
                    type="text" 
                    value={member.name}
                    onChange={(e) => {
                      const next = [...editSupport];
                      next[i].name = e.target.value;
                      setEditSupport(next);
                    }}
                    placeholder="Name"
                    className="w-full p-3 bg-white border border-gray-100 rounded-xl font-black text-gray-800 outline-none"
                  />
                  <input 
                    type="text" 
                    value={member.phone}
                    onChange={(e) => {
                      const next = [...editSupport];
                      next[i].phone = e.target.value;
                      setEditSupport(next);
                    }}
                    placeholder="Phone"
                    className="w-full p-3 bg-white border border-gray-100 rounded-xl font-black text-gray-500 outline-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="p-6 lg:p-10">
      <div className="bg-slate-900 rounded-2xl p-6 mb-8 flex items-center justify-between text-white shadow-xl">
        <div>
          <h2 className="text-xl lg:text-3xl font-black uppercase tracking-tight">Dashboard</h2>
          <p className="text-slate-400 font-bold text-xs lg:text-sm mt-1 uppercase tracking-widest">Overview • Realtime snapshot</p>
        </div>
        <div className="hidden md:flex items-center gap-4 bg-white/5 p-3 rounded-xl border border-white/5">
          <Bell className="w-5 h-5 text-amber-500" />
          <span className="text-xs font-black">SYSTEM ACTIVE</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {stats.map((s, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`bg-gradient-to-br ${s.color} p-6 rounded-3xl text-white shadow-2xl relative overflow-hidden group hover:scale-[1.02] transition-all`}
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform">
              <s.icon className="w-24 h-24" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                  <s.icon className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm tracking-wide opacity-90">{s.title}</h4>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl lg:text-4xl font-black tracking-tighter">{s.value}</span>
                {s.unit && <span className="text-lg font-black opacity-80">{s.unit}</span>}
              </div>
              <p className="mt-4 text-xs font-bold opacity-75">{s.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      {/* SIDEBAR */}
      <aside className={`fixed inset-y-0 left-0 z-50 bg-[#181463] text-white w-72 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 overflow-y-auto`}>
        <div className="p-8 border-b border-white/10 flex items-center justify-between">
          <h2 className="text-2xl font-black uppercase tracking-widest">Dashboard</h2>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-2 bg-white/10 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-6">
          <ul className="space-y-2">
            {sidebarItems.map((item) => (
              <li key={item.id}>
                {item.subItems ? (
                  <div>
                    <button 
                      onClick={() => toggleMenu(item.id)}
                      className={`w-full flex items-center justify-between p-4 rounded-xl transition-all ${expandedMenus.includes(item.id) ? 'bg-white/10 text-white' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="w-5 h-5" />
                        <span className="font-bold">{item.label}</span>
                      </div>
                      <ChevronDown className={`w-4 h-4 transition-transform ${expandedMenus.includes(item.id) ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {expandedMenus.includes(item.id) && (
                        <motion.ul 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="mt-2 ml-10 space-y-1 overflow-hidden"
                        >
                          {item.subItems.map((sub) => (
                            <li key={sub.id}>
                              <button 
                                onClick={() => setActiveView(sub.id)}
                                className={`w-full text-left p-2 rounded-lg text-sm font-bold transition-all ${activeView === sub.id ? 'text-amber-400 bg-amber-400/10' : 'text-white/50 hover:text-white hover:pl-4'}`}
                              >
                                {sub.label}
                              </button>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <button 
                    onClick={() => setActiveView(item.id)}
                    className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all ${activeView === item.id ? 'bg-white/20 text-white shadow-lg' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-bold">{item.label}</span>
                  </button>
                )}
              </li>
            ))}
            
            <li className="pt-8 mt-8 border-t border-white/10">
              <button 
                onClick={logout}
                className="w-full flex items-center gap-3 p-4 rounded-xl text-red-300 hover:bg-red-500 hover:text-white transition-all font-bold"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white h-20 border-b border-gray-100 px-6 lg:px-10 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 bg-gray-50 rounded-lg">
              <Menu className="w-6 h-6 text-gray-700" />
            </button>
            <h1 className="text-lg lg:text-xl font-black text-gray-800 uppercase tracking-tighter hidden sm:block">Admin Management System</h1>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-sm font-black text-gray-900">Unity Earning Admin</span>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Root Controller</span>
            </div>
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black shadow-lg shadow-blue-200">
              AD
            </div>
          </div>
        </header>

        <main className="flex-grow overflow-y-auto">
          {activeView === 'dashboard' ? renderDashboard() : 
           activeView === 'settings' ? renderSettings() : (
            <div className="p-10 flex flex-col items-center justify-center min-h-[60vh] text-center">
              <div className="p-6 bg-amber-50 rounded-3xl text-amber-600 mb-6">
                <ShieldCheck className="w-12 h-12" />
              </div>
              <h2 className="text-2xl font-black text-gray-900 mb-2 uppercase tracking-tighter">View Under Development</h2>
              <p className="text-gray-500 font-bold max-w-sm">এই পেজটির কাজ বর্তমানে চলছে। ডাটাবেজ কানেট হওয়ার পর এটি সচল হবে।</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
