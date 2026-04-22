import React, { useState } from 'react';
import { Menu, User, CheckSquare, MessageCircle, Mail, Key, Lock, UserPlus, Sliders, CheckCircle } from 'lucide-react';
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
      {/* Dynamic Header matching screenshot */}
      <header className="h-16 bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-between px-4 text-white sticky top-0 z-50 shadow-md">
        <button onClick={onBack} className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors active:scale-90">
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-black tracking-tight uppercase">UNITY EARNING</h1>
        <div className="p-2 bg-white/20 rounded-full">
          <User className="w-5 h-5 text-white" />
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center py-6 px-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-xl border-t-4 border-blue-600 p-6 md:p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-black text-blue-600 font-hind mb-1 uppercase">রেজিস্ট্রেশন করুন</h2>
            <p className="text-slate-500 font-bold text-sm font-hind">নতুন অ্যাকাউন্ট তৈরি করুন</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="block text-[13px] font-bold text-slate-800 font-hind">পূর্ণ নাম <span className="text-red-500">*</span></label>
              <div className="relative">
                <input 
                  type="text" 
                  required 
                  placeholder="আপনার নাম লিখুন" 
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none text-slate-700 placeholder-slate-400 font-hind text-sm transition-all"
                />
              </div>
            </div>

            {/* WhatsApp Number */}
            <div className="space-y-1.5">
              <label className="block text-[13px] font-bold text-slate-800 font-hind">হোয়াটসঅ্যাপ নাম্বার <span className="text-red-500">*</span></label>
              <div className="relative">
                <input 
                  type="tel" 
                  required 
                  placeholder="01XXXXXXXXX" 
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none text-slate-700 placeholder-slate-400 font-sans text-sm transition-all"
                />
              </div>
            </div>

            {/* Email ID */}
            <div className="space-y-1.5">
              <label className="block text-[13px] font-bold text-slate-800 font-hind">ই-মেইল আইডি <span className="text-red-500">*</span></label>
              <div className="relative">
                <input 
                  type="email" 
                  required 
                  placeholder="আপনার ইমেইল আইডি দিন" 
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none text-slate-700 placeholder-slate-400 font-sans text-sm transition-all"
                />
              </div>
            </div>

            {/* Registration Code */}
            <div className="space-y-1.5">
              <label className="block text-[13px] font-bold text-slate-800 font-hind">রেজিস্ট্রেশন কোড <span className="text-red-500">*</span></label>
              <div className="relative">
                <input 
                  type="text" 
                  required 
                  placeholder="রেজিস্ট্রেশন কোড লিখুন" 
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none text-slate-700 placeholder-slate-400 font-hind text-sm transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="block text-[13px] font-bold text-slate-800 font-hind">পাসওয়ার্ড ৮ ডিজিট <span className="text-red-500">*</span></label>
              <div className="relative">
                <input 
                  type="password" 
                  required 
                  minLength={8}
                  placeholder="********" 
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none text-slate-700 placeholder-slate-400 font-sans text-sm transition-all"
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-1.5">
              <label className="block text-[13px] font-bold text-slate-800 font-hind">পাসওয়ার্ড নিশ্চিত করুন <span className="text-red-500">*</span></label>
              <div className="relative">
                <input 
                  type="password" 
                  required 
                  placeholder="পুনরায় পাসওয়ার্ড লিখুন" 
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none text-slate-700 placeholder-slate-400 font-sans text-sm transition-all"
                />
              </div>
            </div>

            {/* Referral Code */}
            <div className="space-y-1.5">
              <label className="block text-[13px] font-bold text-slate-800 font-hind">রেফারাল কোড <span className="text-red-500">*</span></label>
              <div className="relative">
                <input 
                  type="text" 
                  required 
                  placeholder="রেফারাল কোড দিন" 
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none text-slate-700 placeholder-slate-400 font-hind text-sm transition-all"
                />
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-center gap-3 py-2">
              <input 
                type="checkbox" 
                id="agreed"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-200 cursor-pointer"
              />
              <label htmlFor="agreed" className="text-xs text-slate-600 font-bold font-hind cursor-pointer select-none">
                আমি <span className="text-blue-600 hover:underline">প্রাইভেসি পলিসি</span> মেনে নিয়েছি
              </label>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="w-full py-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-lg font-black uppercase text-base flex items-center justify-center gap-3 shadow-lg shadow-blue-200 active:scale-[0.98] transition-all"
            >
              <CheckCircle className="w-5 h-5" /> রেজিস্ট্রেশন করুন
            </button>
          </form>
          
          <div className="mt-8 text-center pt-6 border-t border-slate-100">
             <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">
               Already have an account? <button onClick={onBack} className="text-blue-600 hover:underline transition-all">Sign In</button>
             </p>
          </div>
        </div>

        <footer className="mt-8 text-center text-slate-400 font-bold text-xs">
          © 2026 UNITY EARNING. All reserved.
        </footer>
      </main>
    </div>
  );
}
