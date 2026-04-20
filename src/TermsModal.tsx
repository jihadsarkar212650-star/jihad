import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, ShieldAlert, Star, Trophy, Target, Building2, AlertTriangle } from 'lucide-react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TermsModal({ isOpen, onClose }: TermsModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            onClick={onClose} 
            className="absolute inset-0 bg-black/70 backdrop-blur-sm" 
          />
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 20 }} 
            animate={{ scale: 1, opacity: 1, y: 0 }} 
            exit={{ scale: 0.95, opacity: 0, y: 20 }} 
            className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col font-bengali"
          >
            {/* Header */}
            <div className="flex-shrink-0 bg-gradient-to-r from-blue-700 to-indigo-600 p-6 sm:p-8 text-white relative">
              <button 
                onClick={onClose} 
                className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md">
                  <ShieldAlert className="w-8 h-8 text-blue-100" />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black mb-1">Terms & Conditions</h2>
                  <p className="text-blue-100 font-medium text-sm sm:text-base">Unity Earning E-learning Platform</p>
                </div>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-grow overflow-y-auto p-6 sm:p-8 bg-slate-50">
              <div className="space-y-8 max-w-3xl mx-auto">
                
                {/* Intro */}
                <div className="text-center mb-10">
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2">স্কিল শিখুন • কাজ করুন • ইনকাম শুরু করুন</h3>
                  <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full opacity-50"></div>
                </div>

                {/* Section 1 */}
                <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                  <div className="flex items-center gap-3 mb-4">
                    <Star className="w-6 h-6 text-yellow-500 fill-yellow-500/20" />
                    <h4 className="text-lg sm:text-xl font-bold text-slate-900">Joining হলে কী কী পাবেন?</h4>
                  </div>
                  <ul className="space-y-3">
                    {[
                      "টপ পপুলার ও আপডেটেড প্রফেশনাল কোর্স",
                      "প্র্যাকটিক্যাল প্রজেক্ট ও রিয়েল কাজের অভিজ্ঞতা",
                      "Trainer, Team Leader ও Live Support",
                      "ক্যারিয়ার গাইডলাইন ও ইনকাম রোডম্যাপ",
                      "Income Opportunity"
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="text-slate-700 font-medium leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Section 2 */}
                <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                  <div className="flex items-center gap-3 mb-4">
                    <Trophy className="w-6 h-6 text-blue-500" />
                    <h4 className="text-lg sm:text-xl font-bold text-slate-900">ইনকাম করা কি সম্ভব?</h4>
                  </div>
                  <p className="text-slate-700 font-bold mb-4 bg-blue-50 p-3 rounded-lg border border-blue-100">
                    হ্যাঁ, আমাদের প্ল্যাটফর্ম থেকে শেখা স্কিল ব্যবহার করে বাস্তব কাজের মাধ্যমে ইনকাম করা সম্ভব।
                  </p>
                  <ul className="space-y-3 mb-5">
                    {[
                      "শুধু ভিডিও নয় — হাতে-কলমে কাজ শেখানো হয়",
                      "রিয়েল টাস্ক ও প্র্যাকটিক্যাল কাজ করানো হয়",
                      "কাজ করার সঠিক গাইডলাইন ও সাপোর্ট দেওয়া হয়",
                      "নিয়মিত কাজ করলে ইনকামের সুযোগ তৈরি হয়"
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0"></div>
                        <span className="text-slate-600 font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                    <p className="text-emerald-800 font-bold">স্কিল + সময় + নিয়মিত কাজ = ইনকাম করার বাস্তব সম্ভাবনা</p>
                  </div>
                </section>

                {/* Section 3 */}
                <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                  <div className="flex items-center gap-3 mb-4">
                    <Target className="w-6 h-6 text-indigo-500" />
                    <h4 className="text-lg sm:text-xl font-bold text-slate-900">কেন আমাদের কোম্পানিতে জয়েন করবেন?</h4>
                  </div>
                  <div className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-100/50 mb-6">
                    <p className="text-indigo-900 font-bold mb-2">আমরা শুধু কোর্স বিক্রি করি না — আমরা আপনাকে একটি পূর্ণ প্রফেশনাল ক্যারিয়ার রোডম্যাপ দেই।</p>
                    <p className="text-indigo-700 font-medium">স্বল্প খরচে টপ পপুলার স্কিল শিখে কাজ ও ইনকামের সুযোগ।</p>
                  </div>

                  <h5 className="font-bold text-slate-800 mb-3">আমাদের কোর্সের সুবিধা:</h5>
                  <ul className="space-y-2 mb-6">
                    <li className="flex gap-2 text-slate-600 font-medium"><span className="text-blue-500">❖</span> প্রফেশনাল ও আপডেটেড সিলেবাস</li>
                    <li className="flex gap-2 text-slate-600 font-medium"><span className="text-blue-500">❖</span> প্র্যাকটিক্যাল প্রজেক্ট ও রিয়েল উদাহরণ</li>
                    <li className="flex gap-2 text-slate-600 font-medium"><span className="text-blue-500">❖</span> কোম্পানি পলিসি অনুযায়ী কোর্স এক্সেস</li>
                  </ul>

                  <h5 className="font-bold text-slate-800 mb-3">Trainer • Team Leader • Live Support:</h5>
                  <div className="grid gap-3">
                    <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg flex items-center gap-3">
                      <div className="bg-blue-100 text-blue-700 p-1 rounded">✔</div>
                      <p className="text-slate-700 font-medium"><span className="font-bold">Trainer</span> – স্টেপ বাই স্টেপ স্কিল শেখাবে</p>
                    </div>
                    <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg flex items-center gap-3">
                      <div className="bg-blue-100 text-blue-700 p-1 rounded">✔</div>
                      <p className="text-slate-700 font-medium"><span className="font-bold">Team Leader</span> – কাজ ও গ্রোথ মনিটর করবে</p>
                    </div>
                    <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg flex items-center gap-3">
                      <div className="bg-blue-100 text-blue-700 p-1 rounded">✔</div>
                      <p className="text-slate-700 font-medium"><span className="font-bold">Live Support</span> – ইনবক্স ও গ্রুপে সাপোর্ট</p>
                    </div>
                  </div>
                </section>

                {/* Section 4 */}
                <section className="bg-slate-900 text-white p-6 sm:p-8 rounded-2xl shadow-xl border border-slate-800 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[50px] rounded-full"></div>
                  
                  <div className="flex items-center gap-3 mb-6 relative z-10">
                    <Building2 className="w-6 h-6 text-blue-400" />
                    <h4 className="text-lg sm:text-xl font-bold">কোম্পানি সম্পর্কে</h4>
                  </div>
                  
                  <div className="relative z-10 space-y-4">
                    <div className="border-b border-slate-700 pb-4">
                      <p className="text-blue-300 font-bold text-lg mb-1">Unity Earning E-learning Platform</p>
                      <p className="text-slate-400">২০২১ সাল থেকে সততা ও দায়িত্বের সাথে পরিচালিত।</p>
                    </div>
                    <ul className="space-y-2 pt-2">
                      <li className="flex gap-3 text-slate-300"><span className="text-blue-400">▹</span> নিজস্ব টিম ও ম্যানেজমেন্ট সিস্টেম</li>
                      <li className="flex gap-3 text-slate-300"><span className="text-blue-400">▹</span> টেকনোলজি ভিত্তিক কাজ ও সার্ভিস</li>
                      <li className="flex gap-3 text-slate-300"><span className="text-blue-400">▹</span> দীর্ঘমেয়াদী ইনকাম সুযোগ</li>
                    </ul>
                  </div>
                </section>

                {/* Warning Section */}
                <section className="bg-red-50 p-6 rounded-2xl shadow-sm border border-red-100">
                  <div className="flex items-center gap-3 mb-4">
                    <AlertTriangle className="w-6 h-6 text-red-500" />
                    <h4 className="text-lg sm:text-xl font-bold text-red-700">গুরুত্বপূর্ণ কোম্পানি কন্ডিশন</h4>
                  </div>
                  <div className="space-y-4">
                    <p className="text-red-900 font-bold flex items-start gap-2">
                      <span className="text-xl">💰</span> 
                      <span>আমাদের মেইন এডমিশন ফি ১১০০ টাকা। যদি অফারে আইডি একটিভ করে থাকেন তাহলে বাকি ৫০০ টাকা পরবর্তীতে কোম্পানিকে পরিশোধ করে দিতে হবে কাজ করার মাধ্যমে।</span>
                    </p>
                    <p className="text-red-900 font-bold flex items-start gap-2 border-t border-red-200/50 pt-4">
                      <span className="text-xl">⚠️</span> 
                      <span>কোর্স বা সার্ভিস ফি পেমেন্ট করার পর কোনো অবস্থাতেই টাকা রিফান্ড দেওয়া হবে না।</span>
                    </p>
                    <p className="text-red-800/80 font-medium text-sm sm:text-base border-t border-red-200/50 pt-4">
                      ইনকাম ব্যক্তিভেদে ভিন্ন হতে পারে এবং তা সম্পূর্ণভাবে নিজের কাজ ও সময় দেওয়ার উপর নির্ভরশীল।
                    </p>
                  </div>
                </section>

              </div>
            </div>
            
            {/* Footer */}
            <div className="flex-shrink-0 p-4 border-t border-slate-100 bg-white flex justify-end">
              <button 
                onClick={onClose} 
                className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold transition-colors"
              >
                Close / ঠিক আছে
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
