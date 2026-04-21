import React, { useState } from 'react';
import { Menu, User, CheckSquare, MessageCircle, Briefcase, ChevronRight } from 'lucide-react';
import Swal from 'sweetalert2';

export function RegisterPage({ onBack }: { onBack: () => void }) {
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      Swal.fire({
        icon: 'error',
        title: 'দুঃখিত!',
        text: 'অনুগ্রহ করে প্রাইভেসি পলিসি মেনে নিন।',
      });
      return;
    }
    Swal.fire({
      icon: 'success',
      title: 'রেজিস্ট্রেশন সফল!',
      text: 'আপনাকে স্বাগতম। অনুগ্রহ করে লগইন করুন।',
    }).then(() => {
      onBack();
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans overflow-x-hidden">
      {/* Header */}
      <header className="h-16 bg-white flex items-center justify-between px-6 text-slate-900 sticky top-0 z-50 border-b border-slate-100 shadow-sm">
        <button onClick={onBack} className="p-2 bg-slate-50 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors active:scale-90">
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-100">
              <User className="w-4 h-4 text-white" />
           </div>
           <h1 className="text-sm font-black tracking-[0.2em] uppercase font-sans text-slate-800">UNITY EARNING</h1>
        </div>
        <div className="w-9" /> {/* Spacer */}
      </header>

      <main className="flex-grow flex flex-col items-center py-12 px-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <div className="inline-block px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
              Join Our Community
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-2 font-hind tracking-tight">রেজিস্ট্রেশন করুন</h2>
            <p className="text-slate-500 font-bold text-sm font-hind">নতুন অ্যাকাউন্ট তৈরি করতে নিচের তথ্যগুলো পূরণ করুন</p>
          </div>

          <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl shadow-slate-200/40 border border-white relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-50 rounded-full opacity-50 blur-3xl pointer-events-none" />
            
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">আপনার পূর্ণ নাম</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-300 group-focus-within:text-indigo-600 transition-colors">
                    <User className="w-5 h-5" />
                  </div>
                  <input 
                    type="text" 
                    required 
                    placeholder="আপনার নাম লিখুন" 
                    className="w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none text-slate-800 placeholder-slate-300 font-hind font-bold transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">হোয়াটসঅ্যাপ নাম্বার</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-300 group-focus-within:text-indigo-600 transition-colors">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <input 
                    type="tel" 
                    required 
                    placeholder="01XXXXXXXXX" 
                    className="w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none text-slate-800 placeholder-slate-300 font-sans font-bold transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">ইমেইল আইডি (সঠিক)</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-300 group-focus-within:text-indigo-600 transition-colors">
                    <Briefcase className="w-5 h-5 opacity-50" />
                  </div>
                  <input 
                    type="email" 
                    required 
                    placeholder="আপনার ইমেইল আইডি দিন" 
                    className="w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none text-slate-800 placeholder-slate-300 font-sans font-bold transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">নতুন পাসওয়ার্ড (৮ ডিজিট)</label>
                <input 
                  type="password" 
                  required 
                  minLength={8}
                  placeholder="********" 
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none text-slate-800 placeholder-slate-300 font-sans font-bold transition-all tracking-widest"
                />
              </div>

              <div className="flex items-start gap-3 p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100">
                <div 
                  onClick={() => setAgreed(!agreed)}
                  className={`mt-1 cursor-pointer w-5 h-5 rounded-md flex items-center justify-center transition-all ${agreed ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'bg-white border-2 border-slate-200'}`}
                >
                  {agreed && <CheckSquare className="w-4 h-4" />}
                </div>
                <label className="text-[12px] text-indigo-900 font-bold font-hind leading-relaxed cursor-pointer select-none" onClick={() => setAgreed(!agreed)}>
                  আমি কোম্পানির সকল <span className="text-indigo-600 underline decoration-indigo-200">শর্তাবলী</span> এবং <span className="text-indigo-600 underline decoration-indigo-200">প্রাইভেসি পলিসি</span> মেনে অ্যাকাউন্ট তৈরি করছি।
                </label>
              </div>

              <button 
                type="submit" 
                className="w-full py-5 bg-indigo-600 hover:bg-slate-900 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-sm shadow-xl shadow-indigo-100 active:scale-95 transition-all"
              >
                Create Account
              </button>
            </form>
          </div>
          
          <p className="text-center mt-10 text-slate-400 font-bold text-xs uppercase tracking-widest">
            Already have an account? <button onClick={onBack} className="text-indigo-600 hover:underline decoration-dashed transition-all underline-offset-4">Sign In Now</button>
          </p>
        </div>
      </main>
    </div>
  );
}
