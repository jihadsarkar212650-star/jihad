import React, { useState } from 'react';
import { Menu, User, CheckSquare, MessageCircle } from 'lucide-react';
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
    <div className="min-h-screen bg-gray-50 flex flex-col font-bengali">
      {/* Header */}
      <header className="h-14 bg-gradient-to-r from-blue-700 to-blue-500 flex items-center justify-between px-4 text-white sticky top-0 z-50 shadow-md">
        <button onClick={onBack} className="p-1">
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold tracking-wide uppercase font-sans">UNITY EARNING</h1>
        <button className="p-1">
          <User className="w-6 h-6" />
        </button>
      </header>

      <main className="flex-grow flex flex-col items-center py-8 px-4">
        {/* Gradient Border Wrapper */}
        <div className="w-full max-w-md bg-gradient-to-br from-blue-400 via-blue-600 to-blue-800 p-0.5 rounded-sm shadow-lg">
          <div className="bg-white rounded-sm pt-8 pb-6 px-6 relative h-full w-full">
            
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-[28px] font-bold text-blue-600 mb-2">রেজিস্ট্রেশন করুন</h2>
              <p className="text-gray-600 font-medium text-sm sm:text-base">নতুন অ্যাকাউন্ট তৈরি করুন</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-800 font-bold mb-1.5 text-sm lg:text-base">পূর্ণ নাম <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  required 
                  placeholder="আপনার নাম লিখুন" 
                  className="w-full border border-gray-300 rounded py-2 px-3 outline-none focus:border-blue-500 text-gray-800 placeholder-gray-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-gray-800 font-bold mb-1.5 text-sm lg:text-base">হোয়াটসঅ্যাপ নাম্বার <span className="text-red-500">*</span></label>
                <input 
                  type="tel" 
                  required 
                  placeholder="01XXXXXXXXX" 
                  className="w-full border border-gray-300 rounded py-2 px-3 outline-none focus:border-blue-500 text-gray-800 placeholder-gray-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-gray-800 font-bold mb-1.5 text-sm lg:text-base">ইমেইল আইডি <span className="text-red-500">*</span></label>
                <input 
                  type="email" 
                  required 
                  placeholder="আপনার ইমেইল আইডি দিন" 
                  className="w-full border border-gray-300 rounded py-2 px-3 outline-none focus:border-blue-500 text-gray-800 placeholder-gray-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-gray-800 font-bold mb-1.5 text-sm lg:text-base">পাসওয়ার্ড ৮ ডিজিট <span className="text-red-500">*</span></label>
                <input 
                  type="password" 
                  required 
                  minLength={8}
                  placeholder="********" 
                  className="w-full border border-gray-300 rounded py-2 px-3 outline-none focus:border-blue-500 text-gray-800 placeholder-gray-400 tracking-widest transition-colors"
                />
              </div>

              <div>
                <label className="block text-gray-800 font-bold mb-1.5 text-sm lg:text-base">পাসওয়ার্ড নিশ্চিত করুন <span className="text-red-500">*</span></label>
                <input 
                  type="password" 
                  required 
                  minLength={8}
                  placeholder="পুনরায় পাসওয়ার্ড লিখুন" 
                  className="w-full border border-gray-300 rounded py-2 px-3 outline-none focus:border-blue-500 text-gray-800 placeholder-gray-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-gray-800 font-bold mb-1.5 text-sm lg:text-base">রেজিস্ট্রেশন কোড <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  required 
                  placeholder="আপনার রেজিস্ট্রেশন কোড দিন" 
                  className="w-full border border-gray-300 rounded py-2 px-3 outline-none focus:border-blue-500 text-gray-800 placeholder-gray-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-gray-800 font-bold mb-1.5 text-sm lg:text-base">রেফারাল আইডি <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  required 
                  placeholder="স্পন্সরের রেফারাল আইডি দিন" 
                  className="w-full border border-gray-300 rounded py-2 px-3 outline-none focus:border-blue-500 text-gray-800 placeholder-gray-400 transition-colors"
                />
              </div>

              <div className="pt-3 pb-1 flex items-start gap-2">
                <input 
                  type="checkbox" 
                  id="privacy"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-1 w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <label htmlFor="privacy" className="text-gray-700 text-sm lg:text-base">
                  আমি <a href="#" className="text-blue-600 font-medium hover:underline">প্রাইভেসি পলিসি</a> মেনে নিয়েছি
                </label>
              </div>

              <div className="pt-2">
                <button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded flex items-center justify-center gap-2 transition-colors shadow-md text-lg"
                >
                  <div className="bg-white/20 p-0.5 rounded-sm">
                    <CheckSquare className="w-4 h-4 text-white" />
                  </div>
                  রেজিস্ট্রেশন করুন
                </button>
              </div>

              <div className="text-center pt-5 pb-2">
                <span className="text-gray-700 font-medium">আগে থেকেই একাউন্ট আছে? </span>
                <button type="button" onClick={onBack} className="text-blue-600 font-bold hover:underline">লগইন করুন</button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <footer className="text-center py-6 text-gray-600 text-sm bg-gray-50 flex-shrink-0 font-sans">
        © 2026 UNITY EARNING. All rights reserved.
      </footer>

      <button className="fixed bottom-6 right-6 w-14 h-14 bg-[#1877F2] text-white rounded-full flex items-center justify-center shadow-xl hover:bg-blue-700 transition-colors z-50">
        <MessageCircle className="w-7 h-7 fill-current" />
      </button>
    </div>
  );
}
