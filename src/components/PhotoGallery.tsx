import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ImagePlus, Upload, ShieldCheck, Heart, MessageCircle } from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, addDoc, query, onSnapshot, orderBy, serverTimestamp } from 'firebase/firestore';

export function PhotoGallery() {
  const [posts, setPosts] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const demoPosts = [
      { id: '1', studentName: 'আব্দুল করিম', message: 'ইউনিটি আর্নিং থেকে আমি মাসে ১০ হাজার টাকা ইনকাম করছি।', imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=400' },
      { id: '2', studentName: 'রহিমা খাতুন', message: 'এত সহজে আর্নিং করা যায় আগে জানতাম না, ধন্যবাদ ইউনিটি!', imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=400' },
      { id: '3', studentName: 'শাকিল আহমেদ', message: 'আমার ক্যারিয়ারের সেরা সিদ্ধান্ত ছিল ইউনিটি আর্নিং-এ যুক্ত হওয়া।', imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400' },
      { id: '4', studentName: 'নুসরাত জাহান', message: 'পড়াশোনার পাশাপাশি আমি এখন স্বাবলম্বী।', imageUrl: 'https://images.unsplash.com/photo-1593642532400-2682810df593?auto=format&fit=crop&q=80&w=400' },
      { id: '5', studentName: 'মাসুদ রানা', message: 'ইউনিটি আর্নিং আমাদের মতো বেকারদের জন্য আশার আলো।', imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb27cd6c?auto=format&fit=crop&q=80&w=400' },
  ];

  useEffect(() => {
    const q = query(collection(db, 'testimonials'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const dbPosts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPosts([...dbPosts, ...demoPosts]);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="p-6 font-bengali">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-black text-slate-900">গ্যালারি ও সাফল্যের গল্প</h2>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl font-bold hover:bg-indigo-700"
        >
          <ImagePlus className="w-5 h-5" /> ছবি পোস্ট করুন
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <motion.div key={post.id} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
            <img src={post.imageUrl} alt={post.studentName} className="w-full h-64 object-cover rounded-xl mb-4" />
            <h3 className="font-bold text-slate-900">{post.studentName}</h3>
            <p className="text-slate-600 text-sm mt-1">{post.message}</p>
          </motion.div>
        ))}
      </div>
      
      {/* Upload Modal (simplified for now) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/50">
            <div className="bg-white p-6 rounded-2xl w-full max-w-sm">
                <h3 className="text-xl font-bold mb-4">পোস্ট করুন</h3>
                {/* Add simple form here if needed */}
                <button onClick={() => setIsModalOpen(false)} className="w-full bg-slate-200 p-2 rounded-xl">বন্ধ করুন</button>
            </div>
        </div>
      )}
    </div>
  );
}
