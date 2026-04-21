import { motion } from 'motion/react';
import { X, Star, Trophy, Users, StarHalf } from 'lucide-react';
import React from 'react';

const SUCCESS_STORIES = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: [
    "আরিফুল ইসলাম", "সাদিয়া আক্তার", "তানভীর আহমেদ", "নুসরাত জাহান", "মিজানুর রহমান",
    "রোকসানা পারভীন", "কামরুল হাসান", "ফাতেমা তুজ জোহরা", "নাইমুল ইসলাম", "জাসমিন আক্তার",
    "রাসেল মাহমুদ", "তানিয়া সুলতানা", "শাকিল আহমেদ", "শারমিন আক্তার", "ওমর ফারুক",
    "লিমা আক্তার", "ইমতিয়াজ সাদি", "জেসমিন আক্তার", "আরিফ বিল্লাহ", "সালমা বেগম",
    "সুজন মাহমুদ", "আফসানা মিমি", "আশরাফ আলী", "সুমি আক্তার", "জাহিদুল ইসলাম"
  ][i % 25],
  earnings: `৳ ${(Math.floor(Math.random() * 50) + 10)}k+`,
  text: [
    "Unity Earning এ এসে আমার জীবন বদলে গেছে। এখন আমি ঘরে বসে আয় করছি।",
    "মেন্টরদের গাইডলাইন আমাকে খুব দ্রুত সফল হতে সাহায্য করেছে। ধন্যবাদ Unity Earning!",
    "প্রথমে ভয় পাচ্ছিলাম, কিন্তু এখন আমি একজন আত্মবিশ্বাসী ফ্রিল্যান্সার।",
    "সহজ লার্নিং মেথড এবং দারুণ সাপোর্ট সিস্টেম আমাকে মুগ্ধ করেছে।",
    "আমি এখন মাসে ২০ হাজার টাকার বেশি আয় করছি। এই প্ল্যাটফরমটি জাস্ট অসাধারণ!",
    "অল্প সময়ে এত বড় সাফল্য পাব ভাবিনি। স্টুডেন্ট অবস্থায় আয় করার সুযোগ পেয়ে আমি খুশি।"
  ][i % 6],
  rating: 5,
  date: `${Math.floor(Math.random() * 28) + 1} Apr 2024`
}));

interface SuccessStoriesProps {
  onBack: () => void;
}

export function SuccessStories({ onBack }: SuccessStoriesProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="fixed inset-0 z-[300] bg-slate-50 flex flex-col font-hind"
    >
      <div className="sticky top-0 z-10 bg-white border-b border-gray-100 flex items-center justify-between p-4 md:p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight">Success Stories</h2>
            <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">৫২,০০০+ সফল শিক্ষার্থীদের গল্প</p>
          </div>
        </div>
        <button 
          onClick={onBack}
          className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition-all active:scale-95 shadow-sm"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SUCCESS_STORIES.map((story, i) => (
              <motion.div 
                key={story.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white p-6 rounded-[2.5rem] shadow-lg border border-slate-100 group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-black text-xl shadow-lg ring-4 ring-blue-50">
                      {story.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-black text-slate-800 text-sm md:text-base">{story.name}</h4>
                      <p className="text-[10px] font-bold text-slate-400">{story.date}</p>
                    </div>
                  </div>
                  <div className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-[10px] font-black border border-emerald-100 shadow-sm">
                    {story.earnings} Earnings
                  </div>
                </div>

                <div className="flex gap-1 mb-3 text-yellow-400">
                  {Array.from({ length: story.rating }).map((_, idx) => (
                    <Star key={idx} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>

                <p className="text-slate-600 font-bold text-sm leading-relaxed mb-4">
                  "{story.text}"
                </p>

                <div className="flex items-center gap-2 pt-4 border-t border-slate-50 opacity-50 group-hover:opacity-100 transition-opacity">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Verified Success Story</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="text-center mt-12 mb-20 text-slate-400 font-bold text-sm">
          ৫২,১০০+ এরও বেশি শিক্ষার্থী আমাদের সাথে সফলভাবে ক্যারিয়ার গড়েছেন। <br/>
          <span className="text-blue-500">আপনার গল্পটি হয়তো পরবর্তী হওয়ার অপেক্ষায়!</span>
        </div>
      </div>
    </motion.div>
  );
}
