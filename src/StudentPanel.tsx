import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, X, LogOut, LayoutGrid, FileText, ImageIcon, 
  User, Bell, Video, Lock, Store, HelpCircle, ArrowRight, Phone,
  Users, CreditCard, ArrowDownCircle, UserCog, ChevronUp, AlertTriangle, Send, CheckCircle2,
  Copy, ExternalLink, QrCode, Wallet, Fingerprint, Share2, Keyboard, Eye, MessageCircle, MessageSquare, ShieldCheck, Mail, Bot, Brain, Award, Trophy, HeartHandshake, Star, Zap, Briefcase, Crown, Diamond,
  Smartphone, Signal, ShoppingBag, PlayCircle, Layers, FilePlus, Target, Banknote, Book, Dice5, BookOpen,
  UserPlus,
  Search, ShoppingCart, Filter, Heart
} from 'lucide-react';
import React, { useState, FormEvent, useEffect, useRef } from 'react';
import { db } from './lib/firebase';
import { useSettings } from './lib/useSettings';
import { PhotoGallery } from './components/PhotoGallery';
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
  { label: "Menu", icon: Menu, href: "#" },
];

const EXTRA_MENU_ITEMS = [
  { label: "মোবাইল রিচার্জ", icon: Smartphone, color: "bg-blue-600", desc: "মোবাইল রিচার্জ করুন খুব সহজে।" },
  { label: "ড্রাইভ অফার", icon: Signal, color: "bg-blue-500", desc: "সাশ্রয়ী মূল্যে ড্রাইভ প্যাক পান।" },
  { label: "অনলাইন শপ", icon: ShoppingBag, color: "bg-blue-700", desc: "আমাদের স্টোর থেকে কেনাকাটা করুন।" },
  { label: "এডস ভিউ", icon: PlayCircle, color: "bg-blue-400", desc: "ভিডিও অ্যাড দেখে আয় করুন।" },
  { label: "মাইক্রো জব", icon: Layers, color: "bg-blue-500", desc: "ছোট ছোট কাজ করে অর্থ উপার্জন করুন।" },
  { label: "জব পোস্ট", icon: FilePlus, color: "bg-blue-600", desc: "আপনার প্রয়োজনে জব পোস্ট করুন।" },
  { label: "সোশ্যাল মিডিয়া মার্কেটিং", icon: Users, color: "bg-blue-400", desc: "সোশ্যাল মিডিয়ায় আপনার ব্র্যান্ড প্রচার করুন।" },
  { label: "স্মার্ট আর্নিং", icon: Wallet, color: "bg-blue-800", desc: "স্মার্ট উপায়ে ইনকাম করার সুযোগ।" },
  { label: "লার্নিং & আর্নিং", icon: BookOpen, color: "bg-blue-600", desc: "শিখুন এবং সাথে সাথে আয় করুন।" },
  { label: "লিডারশিপ", icon: Trophy, color: "bg-blue-500", desc: "টিম ম্যানেজমেন্ট এবং লিডারশিপ স্কিল।" },
  { label: "টার্গেট বোনাস", icon: Target, color: "bg-blue-700", desc: "টার্গেট পূরণ করে বোনাস লুফে নিন।" },
  { label: "মাসিক বেতন", icon: Banknote, color: "bg-blue-600", desc: "আপনার কাজের মাসিক সম্মানী।" },
  { label: "কুরআন শিক্ষা", icon: Book, color: "bg-blue-800", desc: "সহজ পদ্ধতিতে কুরআন শিক্ষা।" },
  { label: "Micro Jobs Dice", icon: Dice5, color: "bg-blue-500", desc: "ডাইস রোল করে মাইক্রো টাস্ক সম্পন্ন করুন।" },
  { label: "মেম্বার র‍্যাঙ্কিং", icon: Trophy, color: "bg-blue-600", desc: "সেরা মেম্বারদের তালিকা এবং র‍্যাঙ্কিং।" },
];

const RANKING_MEMBERS = [
  ...[
    "আরিফ হোসেন", "সাকিব আহমেদ", "রাহাত ইসলাম", "ফাহিম মুনতাসির", "সিয়াম মাহমুদ", "তামিম ইকবাল", "আদনান সামি", "আসিফ রহমান", "ইমরান হাসমি", "সোহেল রানা",
    "মিলন শেখ", "জাহিদ হাসান", "আকাশ চৌধুরী", "শাওন ইসলাম", "রায়হান আহমেদ", "নয়ন খান", "সজীব হোসেন", "লিমন মাহমুদ", "প্রান্ত বিশ্বাস", "সানি আহমেদ",
    "বিজয় রহমান", "সজল ইসলাম", "অনিক আহমেদ", "তপু বিশ্বাস", "জিসান খান", "নাজমুল হাসান", "কামরুল ইসলাম", "কবির হোসেন", "রুবেল আহমেদ", "রানা শেখ",
    "মামুন হাসান", "রাজু আহমেদ", "সালাউদ্দিন খান", "তানভীর আহমেদ", "হাসান মাহামুদ", "মাহিন আলম", "রাফি ইসলাম", "জুবায়ের আহমেদ", "আল-আমিন কবির", "মাসুম বিল্লাহ",
    "রাজিব হোসেন", "মোস্তফা কামাল", "ইসমাইল হোসেন", "ইউসুফ আলী", "সোলায়মান খান", "ইব্রাহিম আহমেদ", "সাঈদ রহমান", "ওমর ফারুক", "উসমান গনি", "আলী মর্তুজা"
  ].map((name, i) => ({ id: i + 1, name, gender: 'male' })),
  ...[
    "আফরিন আক্তার", "সাদিয়া ইসলাম", "মারিয়া সুলতানা", "মিম চৌধুরী", "নুসরাত তিশা", "সুমি আক্তার", "মিতু ইসলাম", "জান্নাতুল ফেরদৌস", "তানিয়া খাতুন", "সাবিনা ইয়াসমিন",
    "সুমাইয়া ইসলাম", "খাদিজা বেগম", "আয়শা সিদ্দিকা", "রাবেয়া খাতুন", "ফাতেমা আক্তার", "নুপুর আক্তার", "আঁখি আক্তার", "পলি ইসলাম", "রিয়া আক্তার", "পিয়া জান্নাত",
    "দিপা রানী", "তন্বী ইসলাম", "লাবনী আক্তার", "বর্না খাতুন", "সোনিয়া আক্তার", "তন্নী খাতুন", "শিলা পারভীন", "শিল্পা রানী", "মেঘলা আক্তার", "জোছনা বেগম",
    "কবিতা আক্তার", "বৃষ্টি খাতুন", "নিপা খাতুন", "বিথী আক্তার", "তামান্না ইসলাম", "ইভা আক্তার", "পিংকি আক্তার", "রিমা খাতুন", "সীমা আক্তার", "স্মৃতি মন্ডল",
    "সুপ্তি ইসলাম", "মৌরি আক্তার", "মৌসুমি আক্তার", "তনিমা ইসলাম", "নুসরাত জাহান", "সালমা খাতুন", "পারভীন আক্তার", "ঝর্না বেগম", "তমা আক্তার", "টুম্পা আক্তার"
  ].map((name, i) => ({ id: i + 51, name, gender: 'female' }))
].map((member, i) => ({
  ...member,
  converts: Math.max(5, 40 - Math.floor(i / 2.5))
})).sort((a, b) => b.converts - a.converts);

const MICRO_JOB_TASKS = [
  { title: "Facebook Page Follow", reward: "2 Tk", icon: Users },
  { title: "YouTube Video Watch (2 min)", reward: "1 Tk", icon: Video },
  { title: "Facebook Post Like & Share", reward: "2 Tk", icon: Share2 },
  { title: "YouTube Channel Subscribe", reward: "2 Tk", icon: PlayCircle },
  { title: "Instagram Profile Follow", reward: "1 Tk", icon: User },
  { title: "Telegram Channel Join", reward: "1 Tk", icon: MessageSquare },
  { title: "Website Visit (60 sec)", reward: "1 Tk", icon: ExternalLink },
  { title: "Download & Install App", reward: "5 Tk", icon: ArrowDownCircle },
  { title: "Google Map 5 Star Review", reward: "3 Tk", icon: Star },
  { title: "LinkedIn Company Follow", reward: "1 Tk", icon: Briefcase },
  { title: "Twitter (X) Profile Follow", reward: "1 Tk", icon: Zap },
  { title: "TikTok Video Like & Follow", reward: "1 Tk", icon: HeartHandshake },
  { title: "Facebook Group Join", reward: "1 Tk", icon: Users },
  { title: "Share Post in 10 Groups", reward: "5 Tk", icon: Share2 },
  { title: "Newsletter Email Subscribe", reward: "2 Tk", icon: Mail },
  { title: "Blog Post Comment", reward: "1 Tk", icon: MessageCircle },
  { title: "Join WhatsApp Community", reward: "1 Tk", icon: Phone },
  { title: "Pinterest Board Follow", reward: "1 Tk", icon: Layers },
  { title: "Reddit Post Upvote", reward: "1 Tk", icon: ChevronUp },
  { title: "Quora Answer Upvote", reward: "1 Tk", icon: ChevronUp },
  { title: "iPhone App Store Review", reward: "5 Tk", icon: Smartphone },
  { title: "Android Play Store Review", reward: "5 Tk", icon: Smartphone },
  { title: "YouTube Video Comment", reward: "1 Tk", icon: MessageSquare },
  { title: "Refer 1 Friend (Small Task)", reward: "10 Tk", icon: UserPlus },
  { title: "Fill Survey Form", reward: "5 Tk", icon: FileText },
];

const SURAH_LIST = [
  {
    id: 114,
    name: "সূরা আন-নাস (An-Nas)",
    arabic: "النَّاس",
    meaning: "মানবজাতি",
    verses: [
      { ar: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ", bn: "বলুন, আমি আশ্রয় গ্রহণ করছি মানুষের পালনকর্তার," },
      { ar: "مَلِكِ النَّاسِ", bn: "মানুষের অধিপতির," },
      { ar: "إِلَٰهِ النَّاسِ", bn: "মানুষের উপাস্যের," },
      { ar: "مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ", bn: "তার অনিষ্ট থেকে, যে কুমন্ত্রণা দেয় ও আত্মগোপন করে," },
      { ar: "الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ", bn: "যে কুমন্ত্রণা দেয় মানুষের অন্তরে," },
      { ar: "مِنَ الْجِنَّةِ وَالنَّاسِ", bn: "জ্বিনের মধ্য থেকে অথবা মানুষের মধ্য থেকে।" }
    ]
  },
  {
    id: 113,
    name: "সূরা আল-ফালাক (Al-Falaq)",
    arabic: "الْفَلَق",
    meaning: "ঊষাকাল",
    verses: [
      { ar: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ", bn: "বলুন, আমি আশ্রয় গ্রহণ করছি ঊষাকালের পালনকর্তার," },
      { ar: "مِن شَرِّ مَا خَلَقَ", bn: "তিনি যা সৃষ্টি করেছেন, তার অনিষ্ট থেকে," },
      { ar: "وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ", bn: "অন্ধকার রাত্রির অনিষ্ট থেকে, যখন তা সমাগত হয়," },
      { ar: "وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ", bn: "গ্রন্থিতে ফুৎকারদানকারীনিদের অনিষ্ট থেকে," },
      { ar: "وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ", bn: "এবং হিংসুকের অনিষ্ট থেকে যখন সে হিংসা করে।" }
    ]
  },
  {
    id: 112,
    name: "সূরা আল-ইখলাস (Al-Ikhlas)",
    arabic: "الإخْلَاص",
    meaning: "একত্ববাদ",
    verses: [
      { ar: "قُلْ هُوَ اللَّهُ أَحَدٌ", bn: "বলুন, তিনি আল্লাহ, এক," },
      { ar: "اللَّهُ الصَّمَدُ", bn: "আল্লাহ অমুখাপেক্ষী," },
      { ar: "لَمْ يَلِدْ وَلَمْ يُولَدْ", bn: "তিনি কাউকে জন্ম দেননি এবং কেউ তাকে জন্ম দেয়নি" },
      { ar: "وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ", bn: "এবং তাঁর সমতুল্য কেউ নেই।" }
    ]
  },
  {
    id: 111,
    name: "সূরা আল-লাহাব (Al-Lahab)",
    arabic: "اللَّهَب",
    meaning: "জ্বলন্ত শিখা",
    verses: [
      { ar: "تَبَّتْ يَدَا أَبِي لَهَبٍ وَتَبَّ", bn: "আবু লাহাবের হস্তদ্বয় ধ্বংস হোক এবং ধ্বংস হোক সে নিজেও," },
      { ar: "مَا أَغْنَىٰ عَنْهُ مَالُهُ وَمَا كَسَبَ", bn: "তার ধন-সম্পদ ও যা সে উপার্জন করেছে, তা তার কাজে আসেনি," },
      { ar: "سَيَصْلَىٰ نَارًا ذَاتَ لَهَبٍ", bn: "সত্ত্বরই সে প্রবেশ করবে লেলিহান অগ্নিতে," },
      { ar: "وَامْرَأَتُهُ حَمَّالَةَ الْحَطَبِ", bn: "এবং তার স্ত্রীও-যে ইন্ধন বহন করে," },
      { ar: "فِي جِيدِهَا حَبْلٌ مِّن مَّسَدٍ", bn: "তার গলায় খুরমার আঁশের রশি।" }
    ]
  },
  {
    id: 110,
    name: "সূরা আন-নাসর (An-Nasr)",
    arabic: "النَّصْر",
    meaning: "সাহায্য",
    verses: [
      { ar: "إِذَا جَاءَ نَصْرُ اللَّهِ وَالْفَتْحُ", bn: "যখন আসবে আল্লাহর সাহায্য ও বিজয়," },
      { ar: "وَرَأَيْتَ النَّاسَ يَدْخُلُونَ فِي دِينِ اللَّهِ أَفْوَاجًا", bn: "এবং আপনি মানুষকে দলে দলে আল্লাহর দ্বীনে প্রবেশ করতে দেখবেন," },
      { ar: "فَسَبِّحْ بِحَمْدِ رَبِّكَ وَاسْتَغْفِرْهُ ۚ إِنَّهُ كَانَ تَوَّابًا", bn: "তখন আপনি আপনার পালনকর্তার সপ্রশংস পবিত্রতা বর্ণনা করুন এবং তাঁর কাছে ক্ষমা প্রার্থনা করুন। নিশ্চয় তিনি ক্ষমাশীল।" }
    ]
  },
  {
    id: 109,
    name: "সূরা আল-কাফিরুন (Al-Kafirun)",
    arabic: "الْكَافِرُون",
    meaning: "অবিশ্বাসীগণ",
    verses: [
      { ar: "قُلْ يَا أَيُّهَا الْكَافِرُونَ", bn: "বলুন, হে কাফেরকুল," },
      { ar: "لَا أَعْبُدُ مَا تَعْبُدُونَ", bn: "আমি তার এবাদত করি না, যার এবাদত তোমরা কর।" },
      { ar: "وَلَا أَنتُمْ عَابِدُونَ مَا أَعْبُدُ", bn: "এবং তোমরাও তার এবাদতকারী নও, যার এবাদত আমি করি।" },
      { ar: "وَلَا أَنَا عَابِدٌ مَّا عَبَدتُّمْ", bn: "এবং আমি এবাদতকারী নই তার, যার এবাদত তোমরা করছ।" },
      { ar: "وَلَا أَنتُمْ عَابِدُونَ مَا أَعْبُدُ", bn: "তোমরা তার এবাদতকারী নও, যার এবাদত আমি করি।" },
      { ar: "لَكُمْ دِينُكُمْ وَلِيَ دِينِ", bn: "তোমাদের কর্মফল তোমাদের জন্যে এবং আমার কর্মফল আমার জন্যে।" }
    ]
  },
  {
    id: 108,
    name: "সূরা আল-কাওসার (Al-Kawthar)",
    arabic: "الْكَوْثَر",
    meaning: "প্রয়োজনাতিরিক্ত নেয়ামত",
    verses: [
      { ar: "إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ", bn: "নিশ্চয় আমি আপনাকে কাউসার (রহমত ও বরকত) দান করেছি।" },
      { ar: "فَصَلِّ لِرَبِّكَ وَانْحَرْ", bn: "অতএব আপনার পালনকর্তার উদ্দেশ্যে নামায পড়ুন এবং কোরবানী করুন।" },
      { ar: "إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ", bn: "যে আপনার সমালোচনা করে, সে-ই তো লেজকাটা (নির্বংশ)।" }
    ]
  },
  {
    id: 107,
    name: "সূরা আল-মাঊন (Al-Ma'un)",
    arabic: "الْمَاعُون",
    meaning: "নিত্য ব্যবহার্য বস্তু",
    verses: [
      { ar: "أَرَأَيْتَ الَّذِي يُكَذِّبُ بِالدِّينِ", bn: "আপনি কি দেখেছেন তাকে, যে বিচার দিবসকে অস্বীকার করে?" },
      { ar: "فَذَٰلِكَ الَّذِي يَدُعُّ الْيَتِيمَ", bn: "সে সেই ব্যক্তি, যে এতিমকে তাড়িয়ে দেয়," },
      { ar: "وَلَا يَحُضُّ عَلَىٰ طَعَامِ الْمِسْكِينِ", bn: "এবং মিসকিনকে অন্নদানে উৎসাহিত করে না।" },
      { ar: "فَوَيْلٌ لِّلْمُصَلِّينَ", bn: "অতএব দুর্ভোগ সেসব নামাযীর," },
      { ar: "الَّذِينَ هُمْ عَن صَلَاتِهِمْ سَاهُونَ", bn: "যারা তাদের নামায সম্বন্ধে বেখবর;" },
      { ar: "الَّذِينَ هُمْ يُرَاءُونَ", bn: "যারা লোক দেখানোর জন্য তা করে," },
      { ar: "وَيَمْنَعُونَ الْمَاعُونَ", bn: "এবং যারা নিত্য ব্যবহার্য ছোটখাট সাহায্য দানে বিরত থাকে।" }
    ]
  },
  {
    id: 106,
    name: "সূরা কুরাইশ (Quraish)",
    arabic: "قُرَيْش",
    meaning: "কুরাইশ গোত্র",
    verses: [
      { ar: "لِإِيلَافِ قُرَيْشٍ", bn: "কুরাইশদের আসক্তির কারণে," },
      { ar: "إِيلَافِهِمْ رِحْلَةَ الشِّتَاءِ وَالصَّيْفِ", bn: "আসক্তি তাদের শীত ও গ্রীষ্মকালীন সফরের," },
      { ar: "فَلْيَعْبُدُوا رَبَّ هَٰذَا الْبَيْتِ", bn: "অতএব তারা যেন এই গৃহের (কাবার) পালনকর্তার এবাদত করে," },
      { ar: "الَّذِي أَطْعَمَهُم مِّن جُوعٍ وَآمَنَهُم مِّنْ خَوْفٍ", bn: "যিনি তাদেরকে ক্ষুধা থেকে মুক্ত করে অন্ন দিয়েছেন এবং ভয় থেকে নিরাপদ করেছেন।" }
    ]
  },
  {
    id: 105,
    name: "সূরা আল-ফীল (Al-Fil)",
    arabic: "الْفِيل",
    meaning: "হাতি",
    verses: [
      { ar: "أَلَمْ تَرَ كَيْفَ فَعَلَ رَبُّكَ بِأَصْحَابِ الْفِيلِ", bn: "আপনি কি দেখেননি আপনার পালনকর্তা হস্তীবাহিনীর সাথে কিরূপ ব্যবহার করেছেন?" },
      { ar: "أَلَمْ يَجْعَلْ كَيْدَهُمْ فِي تَضْلِيلٍ", bn: "তিনি কি তাদের চক্রান্ত নস্যাৎ করে দেননি?" },
      { ar: "وَأَرْسَلَ عَلَيْهِمْ طَيْرًا أَبَابِيلَ", bn: "তিনি তাদের ওপর ঝাকে ঝাকে পাখি প্রেরণ করেছিলেন," },
      { ar: "تَرْمِيهِم بِحِجَارَةٍ مِّن سِجِّيلٍ", bn: "যারা তাদের ওপর পাথরের কংকর নিক্ষেপ করছিল।" },
      { ar: "فَجَعَلَهُمْ كَعَصْفٍ مَّأْكُولٍ", bn: "অতঃপর তিনি তাদেরকে ভক্ষিত তৃণের ন্যায় করে দিয়েছিলেন।" }
    ]
  },
  {
    id: 104,
    name: "সূরা আল-হুমাযাহ (Al-Humazah)",
    arabic: "الْهُمَزَة",
    meaning: "পরনিন্দাকারী",
    verses: [
      { ar: "وَيْلٌ لِّكُلِّ هُمَزَةٍ لُّمَزَةٍ", bn: "দুর্ভোগ প্রত্যেক পশ্চাতে ও সম্মুখে পরনিন্দাকারীর," },
      { ar: "الَّذِي جَمَعَ مَالًا وَعَدَّدَهُ", bn: "যে অর্থ জমা করে এবং তা বারবার গণনা করে," },
      { ar: "يَحْسَبُ أَنَّ مَالَهُ أَخْلَدَهُ", bn: "সে মনে করে যে, তার অর্থ তাকে অমর করে রাখবে।" },
      { ar: "كَلَّا ۖ لَيُنَبَذَنَّ فِي الْحُطَمَةِ", bn: "কখনই নয়, সে অবশ্যই নিক্ষিপ্ত হবে হুতামায় (পিষ্টকারী চূর্ণকারী আগুনে)।" }
    ]
  },
  {
    id: 103,
    name: "সূরা আল-আসর (Al-'Asr)",
    arabic: "الْعَصْر",
    meaning: "সময়",
    verses: [
      { ar: "وَالْعَصْرِ", bn: "সময়ের কসম," },
      { ar: "إِنَّ الْإِنسَانَ لَفِي خُسْرٍ", bn: "নিশ্চয় সকল মানুষ ক্ষতিগ্রস্ততার মধ্যে নিপতিত;" },
      { ar: "إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ وَتَوَاصَوْا بِالْحَقِّ وَتَوَاصَوْا بِالصَّبْرِ", bn: "কিন্তু তারা ব্যতীত, যারা ঈমান এনেছে ও সৎকর্ম করেছে এবং পরস্পরকে সত্যের উপদেশ দিয়েছে ও পরস্পরকে ধৈর্যের উপদেশ দিয়েছে।" }
    ]
  },
  {
    id: 102,
    name: "সূরা আত-তাকাসুর (At-Takathur)",
    arabic: "التَّكَاثُر",
    meaning: "প্রাচুর্যের প্রতিযোগিতা",
    verses: [
      { ar: "أَلْهَاكُمُ التَّكَاثُرُ", bn: "প্রাচুর্যের প্রতিযোগিতা তোমাদেরকে মোহাচ্ছন্ন করে রেখেছে," },
      { ar: "حَتَّىٰ زُرْتُمُ الْمَقَابِرَ", bn: "যতক্ষণ না তোমরা কবরে উপনীত হও।" },
      { ar: "كَلَّا سَوْفَ تَعْلَمُونَ", bn: "কখনই নয়, তোমরা শীঘ্রই জানতে পারবে।" }
    ]
  },
  {
    id: 101,
    name: "সূরা আল-কারিআহ (Al-Qari'ah)",
    arabic: "الْقَارِعَة",
    meaning: "মহা বিপদ",
    verses: [
      { ar: "الْقَارِعَةُ", bn: "মহা বিপদ!" },
      { ar: "مَا الْقَارِعَةُ", bn: "মহা বিপদ কি?" },
      { ar: "وَمَا أَدْرَاكَ مَا الْقَارِعَةُ", bn: "আপনি কি জানেন মহা বিপদ কি?" },
      { ar: "يَوْمَ يَكُونُ النَّاسُ كَالْفَرَاشِ الْمَبْثُوثِ", bn: "সেদিন মানুষ হবে বিক্ষিপ্ত পতঙ্গের ন্যায়," },
      { ar: "وَتَكُونُ الْجِبَالُ كَالْعِهْنِ الْمَنْفُوشِ", bn: "এবং পাহাড়গুলো হবে ধুনিত রঙিন পশমের ন্যায়।" }
    ]
  },
  {
    id: 100,
    name: "সূরা আল-আদিয়াত (Al-Adiyat)",
    arabic: "العاديات",
    meaning: "অভিযানকারী অশ্ব",
    verses: [
      { ar: "وَالْعَادِيَاتِ ضَبْحًا", bn: "শপথ সেই সব অশ্বের, যারা হাঁপাতে হাঁপাতে দৌড়ায়," },
      { ar: "ফাল মুরিয়াতি ক্বাদহা", bn: "যারা খুরাঘাতে অগ্নিস্ফুলিঙ্গ বিচ্ছুরণ করে," },
      { ar: "ফাল মুগীরাতি সুবহা", bn: "যারা প্রভাতকালে অভিযান চালায়," },
      { ar: "ফা আসারনা বিহী নাকআ", bn: "যারা ধুলোবালু উড়ায়," },
      { ar: "ফাওয়াসাত্না বিহী জামআ", bn: "যারা শত্রুদলের ভেতরে ঢুকে পড়ে।" }
    ]
  },
  {
    id: 99,
    name: "সূরা আয-যিলযাল (Az-Zalzalah)",
    arabic: "الزلزلة",
    meaning: "প্রকম্পন",
    verses: [
      { ar: "إِذَا زُلْزِلَتِ الْأَرْضُ زِلْزَالَهَا", bn: "যখন পৃথিবী তার কম্পনে প্রকম্পিত হবে," },
      { ar: "ওয়া আখরাজাতিল আরদু আসক্বালাহা", bn: "এবং পৃথিবী তার ভারসমূহ বের করে দেবে," },
      { ar: "ওয়া ক্বলাল ইনসানু মালাহা", bn: "আর মানুষ বলবে, এর কী হলো?" },
      { ar: "ইয়াওমাইযিন তুহাদ্দিসু আখবারাহা", bn: "সেদিন সে তার বৃত্তান্ত বর্ণনা করবে।" }
    ]
  },
  {
    id: 98,
    name: "সূরা আল-বাইয়্যিনাহ (Al-Bayyinah)",
    arabic: "البينة",
    meaning: "সুস্পষ্ট প্রমাণ",
    verses: [
      { ar: "لَمْ يَكُنِ الَّذِينَ كَفَرُوا", bn: "আহলে কিতাব ও মুশরিকদের মধ্যে যারা কাফের ছিল তারা পৃথক হওয়ার ছিল না।" },
      { ar: "রসূলুম মিনাল্লাহি ইয়াতলু সুহুফাম মুতহ্হারাহ", bn: "অর্থাৎ আল্লাহর একজন রসূল, যিনি পবিত্র সহীফা তিলাওয়াত করবেন।" }
    ]
  },
  {
    id: 97,
    name: "সূরা আল-কদর (Al-Qadr)",
    arabic: "القدر",
    meaning: "মহিমান্বিত রজনী",
    verses: [
      { ar: "إِنَّا أَنزَلْنَاهُ فِي لَيْلَةِ الْقَدْرِ", bn: "নিশ্চয় আমি এটি নাযিল করেছি কদরের রাত্রিতে।" },
      { ar: "ওমা আদরাকা মা লায়লাতুল ক্বদর", bn: "আপনি কি জানেন কদরের রাত্রি কি?" },
      { ar: "লায়লাতুল ক্বদরি খাইরুম মিন আলফি শাহর", bn: "কদরের রাত্রি হাজার মাস অপেক্ষা শ্রেষ্ঠ।" }
    ]
  },
  {
    id: 96,
    name: "সূরা আল-আলাক (Al-Alaq)",
    arabic: "العلق",
    meaning: "রক্তপিণ্ড",
    verses: [
      { ar: "اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ", bn: "পাঠ করুন আপনার পালনকর্তার নামে যিনি সৃষ্টি করেছেন।" },
      { ar: "খালাকাল ইনসানা মিন আলাক্ব", bn: "সৃষ্টি করেছেন মানুষকে জমাট চটচটে রক্ত থেকে।" },
      { ar: "ইক্বরা ওয়া রব্বুকাল আকরাম", bn: "পাঠ করুন, আপনার পালনকর্তা মহিমান্বিত।" }
    ]
  },
  {
    id: 95,
    name: "সূরা আত-তীন (At-Tin)",
    arabic: "التين",
    meaning: "ডুমুর ফল",
    verses: [
      { ar: "وَالتِّينِ وَالزَّيْتُونِ", bn: "শপথ ডুমুর ও যয়তুন (ফল)-এর," },
      { ar: "ওয়া তূরি সীনীন", bn: "শপথ সিনাই পর্বতের," },
      { ar: "ওয়া হাযাল বালাদিল আমীন", bn: "এবং শপথ এই নিরাপদ নগরীর (মক্কা)।" },
      { ar: "লাক্বদ খালাক্বনাল ইনসানা ফী আহসানি তাক্ববীন", bn: "আমি মানুষকে সৃষ্টি করেছি সর্বোত্তম গঠনে।" }
    ]
  },
  {
    id: 94,
    name: "সূরা আল-ইনশিরাহ (Ash-Sharh)",
    arabic: "الشرح",
    meaning: "বক্ষ প্রশস্তকরণ",
    verses: [
      { ar: "أَلَمْ نَشْرَحْ لَكَ صَدْرَكَ", bn: "আমি কি আপনার বক্ষ প্রশস্ত করে দিইনি?" },
      { ar: "ওয়া ওয়াদা’না আনকা বিযরাক", bn: "এবং আমি কি লাঘব করিনি আপনার বোঝা," },
      { ar: "আল্লাযী আনকাদা যাহরাক", bn: "যা আপনার পিঠ নুয়ে দিয়েছিল?" }
    ]
  },
  {
    id: 93,
    name: "সূরা আদ-দুহা (Ad-Duha)",
    arabic: "الضحى",
    meaning: "পূর্বাহ্নের রৌদ্র",
    verses: [
      { ar: "وَالضُّحَىٰ", bn: "শপথ পূর্বাহ্নের রৌদ্রের," },
      { ar: "ওয়াললায়লি ইযা সাজা", bn: "শপথ রাত্রির যখন তা অন্ধকারাচ্ছন্ন হয়," },
      { ar: "মা ওয়াদ্দা’আকা রব্বুকা ওয়ামা ক্বলা", bn: "আপনার পালনকর্তা আপনাকে ত্যাগ করেননি এবং আপনার ওপর অসন্তুষ্ট হননি।" }
    ]
  },
  {
    id: 92,
    name: "সূরা আল-লাইল (Al-Layl)",
    arabic: "الليل",
    meaning: "রাত্রি",
    verses: [
      { ar: "وَاللَّيْلِ إِذَا يَغْشَىٰ", bn: "শপথ রাত্রির যখন সে আচ্ছন্ন করে," },
      { ar: "ওয়ান নাহার ইযা তাজাল্লা", bn: "শপথ দিনের যখন সে প্রকাশিত হয়," },
      { ar: "ওমা খালাক্বায যাকারা ওয়াল উনসা", bn: "শপথ তাঁর, যিনি নর ও নারী সৃষ্টি করেছেন।" }
    ]
  },
  {
    id: 91,
    name: "সূরা আশ-শামস (Ash-Shams)",
    arabic: "الشمس",
    meaning: "সূর্য",
    verses: [
      { ar: "وَالشَّمْسِ وَضُحَاهَا", bn: "শপথ সূর্যের ও তার রৌদ্রের," },
      { ar: "ওয়াল ক্বমারি ইযা তালাহা", bn: "শপথ চন্দ্রের যখন তা সূর্যের পশ্চাতে আসে," },
      { ar: "ওয়ান নাহার ইযা জাল্লাহা", bn: "শপথ দিনের যখন তা সূর্যকে প্রকাশিত করে।" }
    ]
  },
  {
    id: 90,
    name: "সূরা আল-বালাদ (Al-Balad)",
    arabic: "البلد",
    meaning: "নগরী",
    verses: [
      { ar: "لَا أُقْسِمُ بِهَٰذَا الْبَلَدِ", bn: "আমি এই নগরীর শপথ করছি," },
      { ar: "ওয়া আন্তা হিল্লুম বিহাযাল বালাদ", bn: "আর আপনি এই নগরীর অধিবাসী," },
      { ar: "ওয়া ওয়ালিদিও ওয়ামা ওয়ালাদ", bn: "শপথ জনকের এবং যা সে জন্ম দিয়েছে।" }
    ]
  },
  {
    id: 89,
    name: "সূরা আল-ফাজর (Al-Fajr)",
    arabic: "الفجر",
    meaning: "ঊষা",
    verses: [
      { ar: "وَالْفَجْرِ", bn: "শপথ ঊষার," },
      { ar: "ওয়া লায়ালিন আশর", bn: "শপথ দশ রাত্রির," },
      { ar: "ওয়াশ শাফয়ি ওয়াল ওয়াতর", bn: "শপথ জোড় ও বেজোড়ের।" }
    ]
  },
  {
    id: 88,
    name: "সূরা আল-গাশিয়াহ (Al-Ghashiyah)",
    arabic: "الغاشية",
    meaning: "আচ্ছন্নকারী",
    verses: [
      { ar: "هَلْ أَتَاكَ حَدِيثُ الْغَاشِيَةِ", bn: "আপনার কাছে কি আচ্ছন্নকারী কেয়ামতের কাহিনী পৌঁছেছে?" },
      { ar: "উজুহু ইয়াওমাইযিন খাশীআহ", bn: "সেদিন অনেক মুখ হবে লাঞ্ছিত," },
      { ar: "আমীলাতুন নাসিবাহ", bn: "পরিশ্রান্ত ও ক্লান্ত।" }
    ]
  },
  {
    id: 87,
    name: "সূরা আল-আ'লা (Al-A'la)",
    arabic: "الأعلى",
    meaning: "সর্বোন্নত",
    verses: [
      { ar: "سَبِّحِ اسْمَ رَبِّكَ الْأَعْلَى", bn: "আপনি আপনার মহান পালনকর্তার নামের পবিত্রতা ঘোষণা করুন," },
      { ar: "আল্লাযী খালাক্বা ফাসাওয়্যা", bn: "যিনি সৃষ্টি করেছেন এবং ভারসাম্য রক্ষা করেছেন।" }
    ]
  },
  {
    id: 86,
    name: "সূরা আত-তারিক (At-Tariq)",
    arabic: "الطارق",
    meaning: "রাত্রিকালীন আগন্তুক",
    verses: [
      { ar: "وَالسَّمَاءِ وَالطَّارِقِ", bn: "শপথ আকাশের এবং রাত্রিকালীন আগন্তুকের," },
      { ar: "ওমা আদরকা মাত তারিক", bn: "আপনি কি জানেন রাত্রিকালীন আগন্তুক কি?" },
      { ar: "আন্ নাজমুত সাক্বীব", bn: "তা এক উজ্জ্বল নক্ষত্র।" }
    ]
  },
  {
    id: 85,
    name: "সূরা আল-বুরুজ (Al-Buruj)",
    arabic: "البروج",
    meaning: "নক্ষত্রপুঞ্জ",
    verses: [
      { ar: "وَالسَّمَاءِ ذَاتِ الْبُرُوجِ", bn: "শপথ নক্ষত্রখচিত আকাশের," },
      { ar: "ওয়াল ইয়াওমিল মাওউদ", bn: "এবং ঘোষিত দিবসের (কেয়ামত)।" }
    ]
  }
];

const SHOP_PRODUCTS = [
  { id: 1, name: "M10 Wireless Earbuds", price: 450, oldPrice: 850, rating: 4.8, reviews: 124, img: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=400" },
  { id: 2, name: "Smart Watch Series 8", price: 1250, oldPrice: 2200, rating: 4.9, reviews: 89, img: "https://images.unsplash.com/photo-1544117518-29057b97bb52?auto=format&fit=crop&q=80&w=400" },
  { id: 3, name: "Men's Casual Polo Shirt", price: 380, oldPrice: 650, rating: 4.5, reviews: 230, img: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?auto=format&fit=crop&q=80&w=400" },
  { id: 4, name: "Laptop Cooling Pad RGB", price: 750, oldPrice: 1200, rating: 4.7, reviews: 56, img: "https://images.unsplash.com/photo-1587302912306-cf1ed9c33146?auto=format&fit=crop&q=80&w=400" },
  { id: 5, name: "Wireless Gaming Mouse", price: 950, oldPrice: 1500, rating: 4.6, reviews: 45, img: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=400" },
  { id: 6, name: "Backpack Waterproof 35L", price: 1150, oldPrice: 1850, rating: 4.8, reviews: 112, img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=400" },
  { id: 7, name: "Power Bank 20000mAh", price: 1850, oldPrice: 2800, rating: 4.9, reviews: 210, img: "https://images.unsplash.com/photo-1609091839311-d536819bc148?auto=format&fit=crop&q=80&w=400" },
  { id: 8, name: "Electric Hair Trimmer", price: 650, oldPrice: 1100, rating: 4.4, reviews: 67, img: "https://images.unsplash.com/photo-1621607512214-68297480165e?auto=format&fit=crop&q=80&w=400" },
  { id: 9, name: "Bluetooth Soundbar 40W", price: 3200, oldPrice: 4500, rating: 4.7, reviews: 34, img: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&q=80&w=400" },
  { id: 10, name: "Smartphone Tripod 50 inch", price: 420, oldPrice: 750, rating: 4.3, reviews: 98, img: "https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?auto=format&fit=crop&q=80&w=400" },
  { id: 11, name: "Mechanical Keyboard RGB", price: 2800, oldPrice: 4200, rating: 4.9, reviews: 156, img: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&q=80&w=400" },
  { id: 12, name: "Air Purifier Ionizer", price: 4500, oldPrice: 6500, rating: 4.6, reviews: 23, img: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&q=80&w=400" },
  { id: 13, name: "Leather Wallet for Men", price: 550, oldPrice: 950, rating: 4.5, reviews: 178, img: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=400" },
  { id: 14, name: "Stainless Steel Water Bottle", price: 350, oldPrice: 550, rating: 4.4, reviews: 45, img: "https://images.unsplash.com/photo-1602143399827-7217db73665a?auto=format&fit=crop&q=80&w=400" },
  { id: 15, name: "Office Executive Chair", price: 8500, oldPrice: 12000, rating: 4.8, reviews: 12, img: "https://images.unsplash.com/photo-1505797149-43b0ad766a67?auto=format&fit=crop&q=80&w=400" },
  { id: 16, name: "Premium Coffee Mug", price: 250, oldPrice: 450, rating: 4.2, reviews: 342, img: "https://images.unsplash.com/photo-1517254456727-28d3f1826230?auto=format&fit=crop&q=80&w=400" },
  { id: 17, name: "Digital Thermometer", price: 180, oldPrice: 250, rating: 4.1, reviews: 54, img: "https://images.unsplash.com/photo-1584036553516-bf83210334c0?auto=format&fit=crop&q=80&w=400" },
  { id: 18, name: "LED Desk Lamp USB", price: 850, oldPrice: 1350, rating: 4.5, reviews: 29, img: "https://images.unsplash.com/photo-1534073828943-f801091bb18c?auto=format&fit=crop&q=80&w=400" },
  { id: 19, name: "Kitchen Knife Set 6pcs", price: 1250, oldPrice: 2100, rating: 4.6, reviews: 18, img: "https://images.unsplash.com/photo-1593641779344-972149b257be?auto=format&fit=crop&q=80&w=400" },
  { id: 20, name: "Electric Kettle 2.0L", price: 1100, oldPrice: 1650, rating: 4.7, reviews: 82, img: "https://images.unsplash.com/photo-1594212699903-ec8a3ecc50f6?auto=format&fit=crop&q=80&w=400" },
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
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const studentId = "3255889";
  const referralCode = `UE-${studentId}`;
  const referralLink = `https://unityearning.com/register?ref=${referralCode}`;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

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
            <label className="relative cursor-pointer group">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-slate-900 rounded-full overflow-hidden flex items-center justify-center text-white text-2xl md:text-3xl font-black shadow-lg ring-4 md:ring-[8px] ring-slate-50 transition-transform group-hover:scale-105">
                {profilePic ? (
                  <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=400" alt="Default Freelancer" className="w-full h-full object-cover" />
                )}
              </div>
              <div className="absolute -bottom-1 -right-1 bg-white p-1.5 rounded-full shadow-md border border-slate-100">
                <ImageIcon className="w-4 h-4 text-slate-600" />
              </div>
              <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
            </label>
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
              <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-2xl flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-red-500 shrink-0" />
                <p className="text-red-200 font-bold text-xs leading-relaxed">আপনার অ্যাকাউন্টের পাসওয়ার্ড কোনো অবস্থাতেই কাউকে শেয়ার করবেন না।</p>
              </div>
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
    { title: "Email Marketing", status: "Continue", color: "bg-cyan-500", img: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800" },
    { title: "Video Editing.", status: "Continue", color: "bg-cyan-500", img: "https://unityearning.com/assets/img/Popular%20Courses/video%20edit.jpg" },
    { title: "Form Fill-up.", status: "Continue", color: "bg-cyan-500", img: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800" },
    { title: "Data Entry.", status: "Continue", color: "bg-cyan-500", img: "https://unityearning.com/assets/img/Popular%20Courses/data%20enty.jpg" },
    { title: "Typing Work.", status: "Continue", color: "bg-cyan-500", img: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&q=80&w=800" },
    { title: "Digital Marketing.", status: "Continue", color: "bg-cyan-500", img: "https://unityearning.com/assets/img/Popular%20Courses/Digital%20Market.jpg" },
    { title: "Graphic Designing.", status: "Continue", color: "bg-cyan-500", img: "https://unityearning.com/assets/img/Popular%20Courses/Graphic%20Design.jpg" },
    { title: "Product Selling.", status: "Continue", color: "bg-cyan-500", img: "https://unityearning.com/assets/img/Popular%20Courses/Product%20Sell.jpg" },
    { title: "Computer Course.", status: "Continue", color: "bg-cyan-500", img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800" },
    { title: "Facebook Marketing.", status: "Continue", color: "bg-cyan-500", img: "https://unityearning.com/assets/img/Popular%20Courses/Graphic.jpg" },
    { title: "Gaming Marketing.", status: "Continue", color: "bg-cyan-500", img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800" },
    { title: "Spoken English.", status: "Continue", color: "bg-cyan-500", img: "https://unityearning.com/assets/img/Popular%20Courses/spoken-english.jpeg" },
    { title: "Namaz & Quran Shikkha", status: "Continue", color: "bg-cyan-500", img: "https://unityearning.com/assets/img/Popular%20Courses/Al-Quran.jpg" },
    { title: "Photo Editing.", status: "Continue", color: "bg-cyan-500", img: "https://unityearning.com/assets/img/Popular%20Courses/photo%20edit.jpg" },
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

function ExtraMenuSubItem({ item, onBack }: { item: any; onBack: () => void }) {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [rankingData] = useState(RANKING_MEMBERS);
  const [selectedSurah, setSelectedSurah] = useState<any>(null);

  const showNotReadyAlert = () => {
    Swal.fire({
      icon: 'info',
      title: 'প্রস্তুত হয়নি!',
      text: 'এই কাজটি বর্তমানে প্রক্রিয়াধীন আছে। এটি খুব শীঘ্রই চালু করা হবে। দয়া করে অপেক্ষা করুন।',
      confirmButtonText: 'ঠিক আছে',
      confirmButtonColor: '#2563eb'
    });
  };

  const handleShare = (product: any) => {
    const shareUrl = `https://unityearning.com/shop/product/${product.id}`;
    navigator.clipboard.writeText(shareUrl);
    Swal.fire({
      icon: 'success',
      title: 'লিংক কপি হয়েছে!',
      text: 'প্রোডাক্ট লিংকটি আপনার ক্লিপবোর্ডে কপি করা হয়েছে।',
      timer: 2000,
      showConfirmButton: false,
      toast: true,
      position: 'top-end'
    });
  };

  if (item.label === "কুরআন শিক্ষা") {
    return (
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="container mx-auto px-4 mt-8 pb-20">
        <button onClick={onBack} className="mb-6 flex items-center gap-2 p-3 px-4 bg-white rounded-xl shadow-sm border border-gray-100 font-bold text-gray-600 hover:text-blue-600 transition-all active:scale-95">
          <ArrowRight className="w-5 h-5 rotate-180" /> Back to Menu
        </button>

        <div className="text-center mb-10">
          <div className={`w-20 h-20 ${item.color} text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl`}>
            <item.icon className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tighter mb-2">{item.label}</h2>
          <p className="text-gray-500 font-bold">কুরআনের ছোট ছোট সূরাগুলো শিখুন (অর্থসহ)</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {SURAH_LIST.map((surah) => (
            <motion.div
              key={surah.id}
              whileHover={{ y: -5, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedSurah(surah)}
              className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all cursor-pointer flex flex-col justify-between group h-full"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-black text-gray-900 text-xl group-hover:text-blue-600 transition-colors">{surah.name}</h4>
                  <p className="text-xs text-blue-500 font-black uppercase tracking-[0.2em] mt-1">{surah.meaning}</p>
                </div>
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center font-bold">
                  {surah.id}
                </div>
              </div>
              <div className="mt-8 flex items-center justify-between">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{surah.verses.length} Verses</span>
                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* SURAH DETAILS MODAL */}
        <AnimatePresence>
          {selectedSurah && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setSelectedSurah(null)}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 50 }}
                className="bg-white rounded-[2.5rem] shadow-2xl relative z-10 w-full max-w-4xl h-auto max-h-[90vh] overflow-hidden flex flex-col"
              >
                <div className="p-4 md:p-8 overflow-y-auto custom-scrollbar">
                  <div className="flex justify-between items-start mb-6 sticky top-0 bg-white/95 backdrop-blur-md z-10 py-3 border-b border-gray-100 -mt-2">
                    <div>
                      <h1 className="text-2xl font-black text-slate-900 mb-0.5 leading-tight flex items-center gap-2">
                        {selectedSurah.name}
                        <span className="text-3xl font-arabic text-blue-600 opacity-20">{selectedSurah.arabic}</span>
                      </h1>
                      <p className="text-gray-500 font-bold text-[10px] uppercase tracking-widest leading-none">অর্থ: {selectedSurah.meaning}</p>
                    </div>
                    <button onClick={() => setSelectedSurah(null)} className="p-2 bg-gray-50 hover:bg-red-50 hover:text-red-500 rounded-xl text-gray-400 transition-all active:scale-90">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="space-y-6 pb-6">
                    {selectedSurah.verses.map((verse, vIdx) => (
                      <motion.div 
                        key={vIdx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: vIdx * 0.05 }}
                        className="relative pl-10 group"
                      >
                        <div className="absolute left-0 top-0 w-7 h-7 rounded bg-blue-50 text-blue-600 flex items-center justify-center font-black text-[10px]">
                          {vIdx + 1}
                        </div>
                        <div className="space-y-2">
                          <p className="text-2xl text-right font-arabic leading-[1.6] text-slate-800 tracking-wide">
                            {verse.ar}
                          </p>
                          <div className="p-3 bg-gray-50 rounded-xl border border-gray-50 group-hover:border-blue-100 group-hover:bg-blue-50/20 transition-all">
                             <p className="text-sm font-bold text-gray-600 leading-relaxed font-hind">
                                {verse.bn}
                             </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="p-6 bg-blue-600 rounded-2xl text-center text-white mt-2">
                    <h4 className="text-lg font-black mb-1">সাদাকাল্লাহুল আজিম</h4>
                    <p className="text-blue-100 font-bold opacity-70 uppercase tracking-widest text-[9px]">End of Surah {selectedSurah.name.split(' ')[1]}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }

  if (item.label === "মেম্বার র‍্যাঙ্কিং") {
    const filteredRanking = rankingData.filter(m => 
      m.name.toLowerCase().includes(searchQuery.toLowerCase())
    ).sort((a, b) => b.converts - a.converts);

    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-gray-50 flex flex-col font-hind pb-20">
        {/* HEADER */}
        <div className="bg-blue-600 text-white p-6 sticky top-20 z-40 shadow-lg">
          <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <button onClick={onBack} className="p-3 hover:bg-blue-700 rounded-2xl transition-all shadow-lg active:scale-90">
                <ArrowRight className="w-6 h-6 rotate-180" />
              </button>
              <div>
                <h1 className="text-2xl font-black tracking-tight">{item.label}</h1>
                <p className="text-xs font-bold text-blue-100 uppercase tracking-[0.2em]">Ranked by Total Converts</p>
              </div>
            </div>

            <div className="flex-1 max-w-xl w-full relative group">
              <input 
                type="text" 
                placeholder="মেম্বার খুঁজুন..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-2xl text-gray-800 outline-none shadow-inner border-2 border-transparent focus:border-blue-400 transition-all font-bold placeholder:text-gray-400"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* LIST SECTION (1 to 100) */}
        <div className="container mx-auto px-4 max-w-4xl mt-10">
          <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden divide-y divide-gray-50">
            {filteredRanking.map((member, i) => (
              <motion.div 
                key={member.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (i % 15) * 0.05 }}
                className="p-4 sm:p-6 flex items-center justify-between hover:bg-blue-50/50 transition-colors group"
              >
                <div className="flex items-center gap-4 sm:gap-6">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm ${i === 0 ? 'bg-amber-500 text-white shadow-md' : i === 1 ? 'bg-slate-300 text-slate-700' : i === 2 ? 'bg-orange-300 text-orange-800' : 'text-gray-300'}`}>
                    {filteredRanking.indexOf(member) + 1}
                  </div>
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shadow-inner ${member.gender === 'male' ? 'bg-blue-50 text-blue-400' : 'bg-pink-50 text-pink-400'}`}>
                    <User className="w-6 h-6 sm:w-7 sm:h-7" />
                  </div>
                  <div>
                    <h4 className="font-black text-gray-800 text-base sm:text-lg group-hover:text-blue-600 transition-colors uppercase tracking-tight">
                      {member.name}
                    </h4>
                    <p className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Verified Member</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-blue-600 font-black text-base sm:text-xl">{member.converts}</div>
                  <div className="text-[8px] sm:text-[10px] font-black text-gray-400 uppercase tracking-tighter">Total Converts</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    );
  }

  if (item.label === "অনলাইন শপ") {
    const filteredProducts = SHOP_PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-gray-50 flex flex-col font-hind pb-20">
        {/* SHOP HEADER */}
        <div className="bg-orange-500 text-white p-4 sticky top-20 z-40 shadow-md">
          <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button onClick={onBack} className="p-2 hover:bg-orange-600 rounded-full transition-all">
                <ArrowRight className="w-6 h-6 rotate-180" />
              </button>
              <h1 className="text-xl md:text-2xl font-black italic tracking-widest">UNITY EARNING SHOP</h1>
            </div>
            <div className="flex-1 max-w-xl w-full relative group">
              <input 
                type="text" 
                placeholder="Search in Unity Earning Shop..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-2.5 rounded-lg text-gray-800 outline-none shadow-inner border-2 border-transparent focus:border-orange-300 transition-all font-bold"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 hover:bg-orange-600 rounded-lg transition-all">
                <ShoppingCart className="w-7 h-7" />
                <span className="absolute -top-1 -right-1 bg-white text-orange-600 text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-md">0</span>
              </button>
              <button className="p-2 hover:bg-orange-600 rounded-lg transition-all hidden sm:block">
                <User className="w-7 h-7" />
              </button>
            </div>
          </div>
        </div>

        {/* SHOP CONTENT */}
        <div className="container mx-auto px-4 mt-8">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
            <h2 className="text-2xl font-black text-gray-800">Featured Products</h2>
            <button className="flex items-center gap-2 text-orange-600 font-black hover:underline">
              <Filter className="w-4 h-4" /> Filter By
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6">
            {filteredProducts.map((p) => (
              <motion.div 
                key={p.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-2xl transition-all duration-300 flex flex-col"
              >
                <div className="aspect-square relative overflow-hidden bg-gray-50">
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
                  <button className="absolute top-2 right-2 p-2 bg-white/80 backdrop-blur-md rounded-full text-gray-400 hover:text-red-500 transition-colors shadow-sm">
                    <Heart className="w-4 h-4" />
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/20 to-transparent flex justify-end">
                    <span className="bg-orange-500 text-white text-[9px] font-black px-2 py-1 rounded-md uppercase">Top Selling</span>
                  </div>
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-black text-gray-800 text-sm mb-2 leading-snug line-clamp-2 h-10 group-hover:text-orange-600 transition-colors cursor-pointer" onClick={() => setSelectedProduct(p)}>
                    {p.name}
                  </h3>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-orange-600 font-black text-lg">Tk {p.price}</span>
                    <span className="text-gray-400 text-xs line-through">Tk {p.oldPrice}</span>
                  </div>
                  <div className="flex items-center gap-1.5 mb-4 mt-auto">
                    <div className="flex items-center text-yellow-400">
                      <Star className="w-3 h-3 fill-current" />
                      <span className="text-gray-900 font-black text-xs ml-1">{p.rating}</span>
                    </div>
                    <span className="text-gray-300 text-xs">|</span>
                    <span className="text-gray-400 text-[10px] font-bold">({p.reviews})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setSelectedProduct(p)}
                      className="flex-1 py-2 bg-orange-500 text-white rounded-lg font-black text-xs hover:bg-orange-600 transition-all shadow-md shadow-orange-100"
                    >
                      Buy Now
                    </button>
                    <button 
                      onClick={() => handleShare(p)}
                      className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-all"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <Search className="w-16 h-16 text-gray-200 mx-auto mb-4" />
              <h3 className="text-xl font-black text-gray-400">No products found matching your search.</h3>
            </div>
          )}
        </div>

        {/* PRODUCT DETAILS MODAL */}
        <AnimatePresence>
          {selectedProduct && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setSelectedProduct(null)}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 50 }}
                className="bg-white rounded-[2rem] shadow-2xl relative z-10 w-full max-w-4xl overflow-hidden flex flex-col md:flex-row h-auto max-h-[90vh]"
              >
                <div className="md:w-1/2 aspect-square md:aspect-auto relative bg-gray-50 border-r border-gray-100">
                  <img src={selectedProduct.img} alt={selectedProduct.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <button 
                    onClick={() => setSelectedProduct(null)}
                    className="absolute top-4 left-4 p-2 bg-white/80 backdrop-blur text-gray-800 rounded-full shadow-lg md:hidden"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <div className="md:w-1/2 p-8 overflow-y-auto">
                  <div className="hidden md:flex justify-end mb-4">
                    <button onClick={() => setSelectedProduct(null)} className="p-2 bg-gray-50 rounded-full text-gray-400 hover:text-gray-900 transition-all">
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-black text-slate-900 mb-2 leading-tight">{selectedProduct.name}</h1>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center gap-1 text-yellow-400">
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-gray-900 font-black ml-2">{selectedProduct.rating}</span>
                    </div>
                    <span className="text-gray-400 font-bold">| {selectedProduct.reviews} Seller Ratings</span>
                  </div>

                  <div className="p-6 bg-orange-50 border border-orange-100 rounded-2xl mb-8">
                    <span className="text-orange-600 text-4xl font-black block mb-1">Tk {selectedProduct.price}</span>
                    <span className="text-gray-400 line-through font-bold text-xl">Tk {selectedProduct.oldPrice}</span>
                    <span className="ml-3 px-2 py-1 bg-orange-500 text-white text-xs font-black rounded-lg">-{Math.round((1 - selectedProduct.price / selectedProduct.oldPrice) * 100)}%</span>
                  </div>

                  <div className="space-y-4 mb-8">
                     <div className="flex items-center gap-3">
                       <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                         <CheckCircle2 className="w-6 h-6" />
                       </div>
                       <p className="font-bold text-gray-700">Cash on Delivery Available</p>
                     </div>
                     <div className="flex items-center gap-3">
                       <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                         <Layers className="w-6 h-6" />
                       </div>
                       <p className="font-bold text-gray-700">7 Days Return Policy</p>
                     </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 sticky bottom-0 bg-white pt-4 pb-2">
                    <button onClick={showNotReadyAlert} className="flex-1 py-4 bg-orange-500 text-white rounded-2xl font-black text-xl shadow-xl shadow-orange-100 hover:bg-orange-600 hover:-translate-y-1 active:scale-95 transition-all">
                      Add to Cart
                    </button>
                    <button onClick={showNotReadyAlert} className="flex-1 py-4 bg-slate-900 text-white rounded-2xl font-black text-xl shadow-xl shadow-slate-100 hover:bg-black hover:-translate-y-1 active:scale-95 transition-all">
                      Buy Now
                    </button>
                    <button 
                      onClick={() => handleShare(selectedProduct)}
                      className="p-4 bg-gray-100 text-gray-600 rounded-2xl hover:bg-gray-200 active:scale-95 transition-all"
                    >
                      <Share2 className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }

  if (item.label === "এডস ভিউ") {
    const ads = [
      { id: 1, title: "Unity Earning Official Website", provider: "Unity Ads", reward: "0.5 Tk", duration: "15s" },
      { id: 2, title: "Learn Digital Marketing with Unity", provider: "Unity Ads", reward: "0.5 Tk", duration: "15s" },
      { id: 3, title: "Unity Store - New Gadgets Available", provider: "Unity Ads", reward: "0.5 Tk", duration: "15s" },
      { id: 4, title: "How to Withdraw Money from Unity", provider: "Unity Ads", reward: "0.5 Tk", duration: "15s" },
      { id: 5, title: "Unity Earning - Student Success Story", provider: "Unity Ads", reward: "0.5 Tk", duration: "15s" },
      { id: 6, title: "Join Unity Premium Membership", provider: "Unity Ads", reward: "1.0 Tk", duration: "30s" },
      { id: 7, title: "Unity Earning - New Feature Launch", provider: "Unity Ads", reward: "0.5 Tk", duration: "15s" },
      { id: 8, title: "Micro Jobs Tips & Tricks", provider: "Unity Ads", reward: "0.5 Tk", duration: "15s" },
      { id: 9, title: "Unity Earning - Monthly Salary Guide", provider: "Unity Ads", reward: "0.5 Tk", duration: "20s" },
      { id: 10, title: "Invite Friends & Earn Bonus", provider: "Unity Ads", reward: "1.0 Tk", duration: "30s" },
    ];

    return (
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="container mx-auto px-4 mt-8 pb-20">
        <button onClick={onBack} className="mb-6 flex items-center gap-2 p-3 px-4 bg-white rounded-xl shadow-sm border border-gray-100 font-bold text-gray-600 hover:text-blue-600 transition-all active:scale-95">
          <ArrowRight className="w-5 h-5 rotate-180" /> Back to Menu
        </button>

        <div className="text-center mb-10">
          <div className={`w-20 h-20 ${item.color} text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl`}>
            <item.icon className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tighter mb-2">{item.label}</h2>
          <p className="text-gray-500 font-bold tracking-tight">ভিডিও এবং ব্যানার অ্যাড দেখে প্রতিদিন ইনকাম করুন</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {ads.map((ad, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02 }}
              onClick={showNotReadyAlert}
              className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all cursor-pointer overflow-hidden p-6 relative group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-inner">
                  <PlayCircle className="w-7 h-7" />
                </div>
                <div className="px-3 py-1 bg-amber-100 text-amber-700 text-[10px] font-black rounded-full uppercase tracking-widest animate-pulse">
                  Watch Now
                </div>
              </div>
              
              <h4 className="font-black text-gray-900 text-lg mb-2 leading-tight h-12 line-clamp-2">{ad.title}</h4>
              <p className="text-xs text-gray-400 font-bold mb-6 flex items-center gap-1.5 capitalize">
                <ShieldCheck className="w-3 h-3 text-emerald-500" /> {ad.provider}
              </p>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Reward</span>
                  <span className="text-xl font-black text-indigo-600">{ad.reward}</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Duration</span>
                  <span className="text-sm font-black text-gray-700">{ad.duration}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  }

  if (item.label === "মোবাইল রিচার্জ") {
    return (
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="container mx-auto px-4 mt-8 pb-20">
        <button onClick={onBack} className="mb-6 flex items-center gap-2 p-3 px-4 bg-white rounded-xl shadow-sm border border-gray-100 font-bold text-gray-600 hover:text-blue-600 transition-all active:scale-95">
          <ArrowRight className="w-5 h-5 rotate-180" /> Back to Menu
        </button>

        <div className="max-w-xl mx-auto bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
            <Smartphone className="w-32 h-32 text-blue-900" />
          </div>
          
          <div className="relative z-10">
            <div className={`w-20 h-20 ${item.color} text-white rounded-2xl flex items-center justify-center mb-8 shadow-xl`}>
              <item.icon className="w-10 h-10" />
            </div>
            
            <h2 className="text-3xl font-black text-gray-900 mb-2">{item.label}</h2>
            <p className="text-gray-500 font-bold mb-10">যেকোনো নাম্বারে দ্রুত রিচার্জ করুন</p>

            <form onSubmit={(e) => { e.preventDefault(); showNotReadyAlert(); }} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-black text-gray-500 uppercase tracking-widest pl-1">Mobile Number</label>
                <div className="relative">
                  <input 
                    type="tel" 
                    placeholder="01XXXXXXXXX" 
                    className="w-full p-4 pl-12 rounded-2xl border-2 border-gray-100 focus:border-blue-500 outline-none transition-all font-bold text-lg"
                    required
                  />
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-black text-gray-500 uppercase tracking-widest pl-1">Operator</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {['Grameenphone', 'Banglalink', 'Robi', 'Airtel'].map((op) => (
                    <label key={op} className="cursor-pointer group">
                      <input type="radio" name="operator" className="hidden peer" required />
                      <div className="p-3 text-center rounded-xl border-2 border-gray-100 peer-checked:border-blue-500 peer-checked:bg-blue-50 transition-all hover:bg-gray-50">
                        <span className="text-[10px] font-black text-gray-600 uppercase group-hover:text-blue-600">{op}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-black text-gray-500 uppercase tracking-widest pl-1">Amount (Tk)</label>
                <div className="relative">
                  <input 
                    type="number" 
                    placeholder="Enter Amount" 
                    className="w-full p-4 pl-12 rounded-2xl border-2 border-gray-100 focus:border-blue-500 outline-none transition-all font-bold text-lg"
                    required
                  />
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-black text-lg">৳</div>
                </div>
              </div>

              <button 
                type="submit" 
                className="w-full py-5 rounded-2xl bg-blue-600 text-white font-black text-xl shadow-xl shadow-blue-100 hover:bg-blue-700 hover:-translate-y-1 active:scale-95 transition-all mt-4"
              >
                Confirm Recharge
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    );
  }

  if (item.label === "মাসিক বেতন") {
    const salaryTiers = [
      { role: "Member", roleBn: "মেম্বার", amount: "কাজ করার উপর নির্ভর করবে", icon: Users, color: "bg-slate-500" },
      { role: "Team Trainer", roleBn: "টিম ট্রেইনার", amount: "5,000 Tk", icon: UserCog, color: "bg-blue-500" },
      { role: "Counsellor", roleBn: "কাউন্সেলর", amount: "5,000 Tk", icon: MessageSquare, color: "bg-indigo-500" },
      { role: "Senior Counsellor", roleBn: "সিনিয়র কাউন্সেলর", amount: "8,000 Tk", icon: Award, color: "bg-purple-500" },
      { role: "Team Leader", roleBn: "টিম লিডার", amount: "10,000 Tk", icon: Crown, color: "bg-amber-500" },
      { role: "Senior Team Leader", roleBn: "সিনিয়র টিম লিডার", amount: "20,000 Tk", icon: Trophy, color: "bg-orange-500" },
      { role: "Manager", roleBn: "ম্যানেজার", amount: "30,000 Tk", icon: Briefcase, color: "bg-emerald-500" },
    ];

    return (
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="container mx-auto px-4 mt-8 pb-20">
        <button onClick={onBack} className="mb-6 flex items-center gap-2 p-3 px-4 bg-white rounded-xl shadow-sm border border-gray-100 font-bold text-gray-600 hover:text-blue-600 transition-all active:scale-95">
          <ArrowRight className="w-5 h-5 rotate-180" /> Back to Menu
        </button>

        <div className="text-center mb-10">
          <div className={`w-20 h-20 ${item.color} text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl`}>
            <item.icon className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tighter mb-2">{item.label} (Monthly Salary)</h2>
          <p className="text-gray-500 font-bold">আপনার ডেজিগনেশন অনুযায়ী মাসিক সম্মানী</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {salaryTiers.map((tier, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-5 sm:p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between group overflow-hidden relative gap-4"
            >
              <div className={`absolute left-0 top-0 bottom-0 w-2 ${tier.color} opacity-80`} />
              <div className="flex items-center gap-4 sm:gap-6">
                <div className={`w-12 h-12 sm:w-14 sm:h-14 ${tier.color} text-white rounded-2xl flex items-center justify-center shadow-lg shrink-0`}>
                  <tier.icon className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <div>
                  <h4 className="text-lg sm:text-xl font-black text-gray-900 flex flex-wrap items-center gap-x-2">
                    {tier.role} <span className="text-[10px] sm:text-xs font-bold text-gray-400">| {tier.roleBn}</span>
                  </h4>
                  <p className="text-[10px] sm:text-sm text-gray-500 font-bold">Unity Earning Official Designation</p>
                </div>
              </div>
              <div className="text-left sm:text-right pl-16 sm:pl-0 border-t sm:border-t-0 border-gray-50 pt-3 sm:pt-0">
                <div className={`text-lg sm:text-xl font-black ${tier.amount.includes('Tk') ? 'text-blue-600' : 'text-slate-600'} flex flex-col items-start sm:items-end`}>
                  <span className="sm:hidden text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Monthly Salary:</span>
                  {tier.amount}
                  <span className="text-[10px] uppercase tracking-widest text-gray-400 font-black mt-1">Status: Verified</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 p-8 bg-blue-50 rounded-[2.5rem] border border-blue-100 max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8 shadow-inner">
           <div className="w-20 h-20 bg-blue-600 text-white rounded-3xl flex items-center justify-center shrink-0 shadow-lg">
             <Star className="w-10 h-10 animate-spin-slow" />
           </div>
           <div>
             <h3 className="text-xl font-black text-blue-900 mb-2 underline decoration-blue-200 underline-offset-4">আপনার বেতন পেতে করণীয়ঃ</h3>
             <ul className="space-y-2">
               <li className="flex items-center gap-2 text-blue-800 font-bold"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> আপনার টিম ট্রেইনার বা লিডারের সাথে যোগাযোগ রাখুন।</li>
               <li className="flex items-center gap-2 text-blue-800 font-bold"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> মাসিক টার্গেট পূরণ করুন।</li>
               <li className="flex items-center gap-2 text-blue-800 font-bold"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> নিয়মিত মিটিং এ অংশগ্রহণ করুন।</li>
             </ul>
           </div>
        </div>
      </motion.div>
    );
  }

  if (item.label === "সোশ্যাল মিডিয়া মার্কেটিং") {
    return (
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="container mx-auto px-4 mt-8 pb-20">
        <button onClick={onBack} className="mb-6 flex items-center gap-2 p-3 px-4 bg-white rounded-xl shadow-sm border border-gray-100 font-bold text-gray-600 hover:text-blue-600 transition-all active:scale-95">
          <ArrowRight className="w-5 h-5 rotate-180" /> Back to Menu
        </button>

        <div className="text-center mb-10">
          <div className={`w-20 h-20 ${item.color} text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl`}>
            <item.icon className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tighter mb-2">{item.label}</h2>
          <p className="text-gray-500 font-bold">সোশ্যাল মিডিয়া মার্কেটিং শিখে আয় করা শুরু করুন</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="bg-white p-4 rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden group">
            <div className="aspect-video w-full rounded-[1.5rem] overflow-hidden shadow-inner">
               <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/v3Rje3agun8" 
                title="YouTube video player 1" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
                className="w-full h-full"
               ></iframe>
            </div>
            <div className="p-6">
              <h4 className="text-xl font-black text-gray-900 mb-2">সোশ্যাল মিডিয়া মার্কেটিং পার্ট ১</h4>
              <p className="text-gray-500 font-bold text-sm">ফেসবুক মার্কেটিং এর বিস্তারিত গাইডলাইন।</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden group">
            <div className="aspect-video w-full rounded-[1.5rem] overflow-hidden shadow-inner">
               <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/R1a7cDaunPw" 
                title="YouTube video player 2" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
                className="w-full h-full"
               ></iframe>
            </div>
            <div className="p-6">
              <h4 className="text-xl font-black text-gray-900 mb-2">সোশ্যাল মিডিয়া মার্কেটিং পার্ট ২</h4>
              <p className="text-gray-500 font-bold text-sm">কিভাবে ক্লায়েন্ট হ্যান্ডেল করবেন এবং প্রফেশনাল মার্কেটিং করবেন।</p>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  if (item.label === "মাইক্রো জব") {
    return (
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="container mx-auto px-4 mt-8 pb-20">
        <button onClick={onBack} className="mb-6 flex items-center gap-2 p-3 px-4 bg-white rounded-xl shadow-sm border border-gray-100 font-bold text-gray-600 hover:text-blue-600 transition-all active:scale-95">
          <ArrowRight className="w-5 h-5 rotate-180" /> Back to Menu
        </button>

        <div className="text-center mb-10">
          <div className={`w-20 h-20 ${item.color} text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl`}>
            <item.icon className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tighter mb-2">{item.label}</h2>
          <p className="text-gray-500 font-bold">সহজ ছোট ছোট কাজ সম্পন্ন করে আর্নিং শুরু করুন</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {MICRO_JOB_TASKS.map((task, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              onClick={showNotReadyAlert}
              className="bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all cursor-pointer flex items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all shadow-inner">
                  <task.icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-black text-gray-800 text-sm">{task.title}</h4>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-0.5">Micro Task</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-blue-600 font-black text-lg">{task.reward}</div>
                <div className="text-emerald-500 font-black text-[9px] uppercase tracking-tighter">Verified</div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="container mx-auto px-4 mt-8 pb-20">
      <button onClick={onBack} className="mb-6 flex items-center gap-2 p-3 px-4 bg-white rounded-xl shadow-sm border border-gray-100 font-bold text-gray-600 hover:text-blue-600 transition-all active:scale-95">
        <ArrowRight className="w-5 h-5 rotate-180" /> Back to Menu
      </button>

      <div className="bg-white p-12 rounded-[2.5rem] shadow-xl border border-gray-100 text-center max-w-2xl mx-auto">
        <div className={`w-24 h-24 ${item.color} text-white rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl`}>
          <item.icon className="w-12 h-12" />
        </div>
        <h2 className="text-3xl font-black text-gray-900 mb-4">{item.label}</h2>
        <p className="text-lg text-gray-500 font-bold mb-10 leading-relaxed italic">"{item.desc}"</p>
        
        <div className="p-8 bg-blue-50 rounded-3xl border border-blue-100 text-left">
           <h4 className="font-black text-blue-900 mb-4 flex items-center gap-2 uppercase tracking-widest text-sm">
             <AlertTriangle className="w-5 h-5" /> Information
           </h4>
           <p className="text-blue-800 font-bold leading-relaxed">
             আপনার এই ফিচারটি বর্তমানে ডেভেলপমেন্ট মোডে আছে। খুব শীঘ্রই এটি লাইভ করা হবে। নিয়মিত চেক করতে থাকুন এবং UNITY EARNING এর সাথেই থাকুন। ধন্যবাদ!
           </p>
        </div>
        
        <button className="mt-10 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-blue-600 transition-all shadow-xl active:scale-95">
          Join Official Group
        </button>
      </div>
    </motion.div>
  );
}

function ExtraMenu() {
  const [selectedSubItem, setSelectedSubItem] = useState<any>(null);

  if (selectedSubItem) {
    return <ExtraMenuSubItem item={selectedSubItem} onBack={() => setSelectedSubItem(null)} />;
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container mx-auto px-4 lg:px-12 mt-8 pb-20">
      <div className="text-center mb-12">
        <h2 className="text-sm font-black text-blue-500 uppercase tracking-[0.3em] mb-3">Our Projects</h2>
        <h3 className="text-4xl font-black text-slate-900 tracking-tighter">আমাদের প্রজেক্ট সমূহ</h3>
      </div>
      
      <div className="bg-blue-600 p-8 lg:p-12 rounded-[3rem] shadow-2xl shadow-blue-200">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-6 lg:gap-10">
          {EXTRA_MENU_ITEMS.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedSubItem(item)}
              className="group cursor-pointer flex flex-col items-center gap-4"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:shadow-blue-400/50 transition-all">
                <item.icon className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600 group-hover:text-blue-500 transition-colors" />
              </div>
              <span className="text-center text-white font-black text-sm lg:text-base leading-tight font-hind px-2">
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

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

function CareerRanking() {
  const RANKS = [
    { name: "Member", desc: "ক্যারিয়ারের শুরু, কাজ শেখা ও বেসিক ইনকাম।", bg: "bg-slate-50", border: "border-slate-200", text: "text-slate-800", icon: User, iconBg: "bg-slate-200 text-slate-700" },
    { name: "Trainer", desc: "অন্যদের শেখানোর যোগ্যতা ও ট্রেইনিং ইনসেনটিভ।", bg: "bg-green-50", border: "border-green-200", text: "text-green-800", icon: Award, iconBg: "bg-green-200 text-green-700" },
    { name: "Counsellor", desc: "মেম্বারদের গাইড করা ও স্পেশাল বোনাস।", bg: "bg-teal-50", border: "border-teal-200", text: "text-teal-800", icon: HeartHandshake, iconBg: "bg-teal-200 text-teal-700" },
    { name: "Team Leader", desc: "নিজস্ব টিম পরিচালনা ও টিম বোনাস অর্জন।", bg: "bg-indigo-50", border: "border-indigo-200", text: "text-indigo-800", icon: Users, iconBg: "bg-indigo-200 text-indigo-700" },
    { name: "Senior Counsellor", desc: "বড় টিমের দায়িত্ব ও সম্মানজনক রিওয়ার্ড।", bg: "bg-orange-50", border: "border-orange-200", text: "text-orange-800", icon: Star, iconBg: "bg-orange-200 text-orange-700" },
    { name: "Senior Team Leader", desc: "একাধিক টিমের লিডারশিপ ও হাই ইনকাম।", bg: "bg-pink-50", border: "border-pink-200", text: "text-pink-800", icon: Zap, iconBg: "bg-pink-200 text-pink-700" },
    { name: "Manager", desc: "কোম্পানির ম্যানেজমেন্ট টায়ার ও ফিক্সড বেনিফিট।", bg: "bg-red-50", border: "border-red-200", text: "text-red-800", icon: Briefcase, iconBg: "bg-red-200 text-red-700" },
    { name: "Senior Manager", desc: "টপ লেভেল ম্যানেজমেন্ট ও বিশেষ কর্পোরেট সুযোগ।", bg: "bg-gradient-to-r from-yellow-50 to-amber-50", border: "border-yellow-300", text: "text-yellow-900", icon: Crown, iconBg: "bg-yellow-400 text-yellow-900 shadow-lg shadow-yellow-200", premium: true },
    { name: "Admin/CEO", desc: "কোম্পানির সর্বোচ্চ সম্মান ও সিদ্ধান্ত গ্রহণকারী।", bg: "bg-gradient-to-r from-slate-900 via-gray-900 to-black", border: "border-gray-800", text: "text-white", icon: Diamond, iconBg: "bg-slate-800 text-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.3)]", apex: true }
  ];

  return (
    <div className="container mx-auto px-4 lg:px-12 mt-8 pb-20 font-bengali">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-4 bg-yellow-100 rounded-full mb-4 shadow-inner">
            <Trophy className="w-10 h-10 text-yellow-600" />
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 tracking-tight">ক্যারিয়ার র‍্যাংকিং</h2>
          <p className="text-gray-600 font-medium text-lg max-w-2xl mx-auto leading-relaxed">
            Unity Earning-এ আপনার ক্যারিয়ার গড়ুন! নিবেদিত কাজ ও দক্ষতার মাধ্যমে আপনিও অর্জন করতে পারেন সর্বোচ্চ সম্মান ও রিওয়ার্ড। ধাপে ধাপে নিজেকে উন্নীত করুন।
          </p>
        </div>

        <div className="relative">
          {/* Vertical tracking line */}
          <div className="absolute left-[39px] sm:left-1/2 top-10 bottom-10 w-1 bg-gradient-to-b from-slate-200 via-indigo-200 to-yellow-400 -translate-x-1/2 rounded-full hidden sm:block" />

          <div className="space-y-4 sm:space-y-8 relative">
            {RANKS.map((rank, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative flex flex-col sm:flex-row items-center gap-4 sm:gap-8 ${i % 2 === 0 ? 'sm:flex-row-reverse' : ''}`}
              >
                {/* Timeline connector dot for medium+ screens */}
                <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border-4 border-white bg-slate-200 shadow-md z-10 items-center justify-center text-[10px] font-black text-slate-500">
                  {i + 1}
                </div>

                <div className={`w-full sm:w-1/2 flex ${i % 2 === 0 ? 'sm:justify-start' : 'sm:justify-end'}`}>
                  <div className={`w-full max-w-sm p-5 md:p-6 rounded-2xl border-2 shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300 relative overflow-hidden group ${rank.bg} ${rank.border} ${rank.apex ? 'ring-2 ring-yellow-400 ring-offset-2' : ''}`}>
                    {rank.premium && <div className="absolute top-0 right-0 w-16 h-16 bg-white/20 blur-2xl rounded-full pointer-events-none" />}
                    {rank.apex && <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/10 blur-[40px] rounded-full pointer-events-none animate-pulse" />}
                    
                    <div className="flex items-start gap-4 relative z-10">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${rank.iconBg} transition-transform group-hover:scale-110`}>
                        <rank.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-[10px] sm:text-xs font-black uppercase tracking-widest opacity-60 mb-1 flex items-center gap-1">
                          Level {i + 1} {rank.apex && <span className="text-yellow-400 ml-1">★</span>}
                        </div>
                        <h3 className={`text-xl font-black mb-1.5 ${rank.text}`}>{rank.name}</h3>
                        <p className={`text-sm font-medium leading-snug ${rank.apex ? 'text-gray-300' : 'text-gray-600'}`}>
                          {rank.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="hidden sm:block w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-16 bg-blue-50 border border-blue-100 p-8 rounded-[32px] text-center shadow-inner relative overflow-hidden">
           <div className="absolute top-0 right-0 p-8 opacity-5"><Zap className="w-32 h-32 text-blue-900" /></div>
           <h4 className="text-2xl font-black text-blue-900 mb-3 relative z-10">আপনার পরবর্তী লক্ষ্য কোনটি?</h4>
           <p className="text-blue-800 font-medium max-w-lg mx-auto relative z-10">কঠোর পরিশ্রম এবং সঠিক গাইডলাইনের মাধ্যমে আপনিও পৌঁছাতে পারেন আপনার কাঙ্ক্ষিত র‍্যাংকে। কাজ শুরু করুন আজই!</p>
        </div>
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
                  else if (item.label === 'Photo Gallery') navigateTo('gallery');
                  else if (item.label === 'Edit Profile') navigateTo('edit-profile');
                  else if (item.label === 'My Passbook') navigateTo('passbook');
                  else if (item.label === 'Withdrawals') navigateTo('withdrawals');
                  else if (item.label === 'Notice') navigateTo('notice');
                  else if (item.label === 'Store') navigateTo('store');
                  else if (item.label === 'Email Marketing') navigateTo('email-marketing');
                  else if (item.label === 'Daily Quiz') navigateTo('daily-quiz');
                  else if (item.label === 'Menu') navigateTo('extra-menu');
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
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <img src="https://unityearning.com/assets/img/unityearning.png" alt="Logo" className="h-10 w-auto" />
                <div className="flex items-center gap-2">
                  <button onClick={() => { window.open(getValidUrl(settings?.socialLinks?.community || "https://whatsapp.com"), "_blank"); setIsMobileMenuOpen(false); }} className="p-2 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-100 transition-colors">
                    <Users className="w-6 h-6" />
                  </button>
                  <button onClick={() => { navigateTo('ranking'); setIsMobileMenuOpen(false); }} className="p-2 bg-yellow-50 text-yellow-600 rounded-xl hover:bg-yellow-100 transition-colors">
                    <Trophy className="w-6 h-6" />
                  </button>
                  <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-gray-100 rounded-xl"><X className="w-6 h-6" /></button>
                </div>
              </div>
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
                      else if (item.label === 'Photo Gallery') navigateTo('gallery');
                      else if (item.label === 'Edit Profile') navigateTo('edit-profile');
                      else if (item.label === 'My Passbook') navigateTo('passbook');
                      else if (item.label === 'Withdrawals') navigateTo('withdrawals');
                      else if (item.label === 'Notice') navigateTo('notice');
                      else if (item.label === 'Store') navigateTo('store');
                      else if (item.label === 'Email Marketing') navigateTo('email-marketing');
                      else if (item.label === 'Daily Quiz') navigateTo('daily-quiz');
                      else if (item.label === 'Menu') navigateTo('extra-menu');
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
              <div className="bg-white p-6 rounded-2xl shadow-xl mb-8">
                <div className="flex justify-center mb-6">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-500 rounded-lg text-emerald-700 font-bold uppercase tracking-wide text-[10px] shadow-sm">
                    <CheckCircle2 className="w-3 h-3" />
                    Active Account
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed font-bold">এটি একটি বিশ্বস্ত বাংলাদেশি অনলাইন প্ল্যাটফর্ম। কেবলমাত্র স্মার্টফোন ব্যবহার করে ঘরে বসে অবসর সময়কে কাজে লাগিয়ে শেখা এবং আয় করার সুযোগ রয়েছে। মাতৃভাষায় সহজভাবে শেখার পাশাপাশি আমাদের কমিউনিটি থেকে কোর্স, সার্ভিস বা প্রোডাক্ট বিক্রির মাধ্যমে আয় করতে পারবেন—ধাপে ধাপে ক্যারিয়ার গড়ুন আত্মবিশ্বাসে।</p>
              </div>
              
              {/* Refined Support Team UI */}
              <div className="bg-white rounded-[2rem] p-6 lg:p-8 mb-8 shadow-sm border border-slate-100 font-bengali">
                <h6 className="text-slate-950 font-black mb-6 text-xl sm:text-2xl flex items-center gap-2">
                  <ShieldCheck className="w-7 h-7 text-indigo-600" /> সাপোর্ট টিম
                </h6>
                
                <div className="flex flex-col gap-4 relative z-10 w-full sm:max-w-md">
                  {settings.supportTeam.map((member, i) => {
                    const isTeamLeader = member.role === 'Team Leader';
                    const RoleIcon = isTeamLeader ? Crown : User;
                    return (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="group p-4 bg-white rounded-2xl border border-slate-100 flex items-center gap-4 transition-all hover:border-indigo-100 hover:shadow-lg hover:shadow-indigo-500/5 shadow-sm"
                    >
                      <div className={`w-12 h-12 ${isTeamLeader ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-500'} rounded-xl flex items-center justify-center shrink-0`}>
                        <RoleIcon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0 pr-2">
                        <div className="text-slate-900 font-bold text-sm whitespace-normal break-words">{member.name}</div>
                        <div className="text-xs text-indigo-600 font-black uppercase tracking-wider mt-0.5 whitespace-nowrap">
                          {isTeamLeader ? 'টিম লিডার' : member.role === 'Trainer' ? 'ট্রেইনার' : member.role}
                        </div>
                      </div>
                      <motion.a 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        href={`https://wa.me/88${member.phone.replace(/[^0-9]/g, '')}`} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="w-10 h-10 bg-emerald-50 hover:bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 border border-emerald-100 transition-all shrink-0"
                      >
                        <MessageSquare className="w-5 h-5" />
                      </motion.a>
                    </motion.div>
                  )})}
                </div>

                {/* Helpline option */}
                <div className="mt-8 pt-8 border-t border-slate-100 w-full">
                  <button onClick={() => window.dispatchEvent(new CustomEvent('open-chat-agent'))} className="w-full text-left flex items-center justify-between bg-indigo-600 hover:bg-indigo-700 rounded-2xl p-4 transition-all gap-4 shadow-lg shadow-indigo-500/20 group">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-white/10 backdrop-blur flex items-center justify-center rounded-2xl shrink-0">
                        <Bot className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <p className="text-indigo-100 font-bold text-xs uppercase tracking-widest mb-0.5">সব সময় সাহায্যে প্রস্তুত</p>
                        <p className="text-white font-black text-lg">হেল্পলাইন এ যোগাযোগ করুন</p>
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white">
                      <ArrowRight className="w-5 h-5" />
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
              
              {/* Additional Company Info & Terms */}
              <div className="mt-16 bg-white p-6 sm:p-10 md:p-12 rounded-[32px] md:rounded-[40px] shadow-sm border border-slate-100 font-bengali">
                
                <div className="text-center mb-12">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-800 mb-3 tracking-tight">Unity Earning E-learning Platform</h3>
                  <div className="inline-block bg-blue-50 text-blue-700 px-6 py-2 rounded-full font-bold text-sm sm:text-base border border-blue-100">
                    স্কিল শিখুন • কাজ করুন • ইনকাম শুরু করুন
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                  
                  {/* Left Column */}
                  <div className="space-y-10">
                    <section>
                      <h4 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2 border-b border-slate-100 pb-2">
                        <span className="text-blue-500 text-2xl">❖</span> Joining হলে কী কী পাবেন?
                      </h4>
                      <ul className="space-y-3">
                        {["টপ পপুলার ও আপডেটেড প্রফেশনাল কোর্স", "প্র্যাকটিক্যাল প্রজেক্ট ও রিয়েল কাজের অভিজ্ঞতা", "Trainer, Team Leader ও Live Support", "ক্যারিয়ার গাইডলাইন ও ইনকাম রোডম্যাপ"].map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
                            <span className="text-slate-700 font-medium leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </section>

                    <section>
                      <h4 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2 border-b border-slate-100 pb-2">
                        <span className="text-indigo-500 text-2xl">❖</span> কেন আমাদের কোম্পানিতে জয়েন করবেন?
                      </h4>
                      <p className="text-indigo-900 font-bold mb-2 bg-indigo-50 p-4 rounded-xl border border-indigo-100">আমরা শুধু কোর্স বিক্রি করি না — আমরা আপনাকে একটি পূর্ণ প্রফেশনাল ক্যারিয়ার রোডম্যাপ দেই।</p>
                      <p className="text-slate-600 font-medium mt-3 px-2">স্বল্প খরচে টপ পপুলার স্কিল শিখে কাজ ও ইনকামের সুযোগ।</p>
                    </section>

                    <section>
                      <h4 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2 border-b border-slate-100 pb-2">
                        <span className="text-blue-500 text-2xl">❖</span> আমাদের কোর্সের সুবিধা
                      </h4>
                      <ul className="space-y-3">
                        <li className="flex gap-3 text-slate-700 font-medium"><div className="w-2 h-2 rounded-full bg-blue-500 mt-2 shrink-0" /> প্রফেশনাল ও আপডেটেড সিলেবাস</li>
                        <li className="flex gap-3 text-slate-700 font-medium"><div className="w-2 h-2 rounded-full bg-blue-500 mt-2 shrink-0" /> প্র্যাকটিক্যাল প্রজেক্ট ও রিয়েল উদাহরণ</li>
                        <li className="flex gap-3 text-slate-700 font-medium"><div className="w-2 h-2 rounded-full bg-blue-500 mt-2 shrink-0" /> কোম্পানি পলিসি অনুযায়ী কোর্স এক্সেস</li>
                      </ul>
                    </section>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-10">
                    <section className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                      <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">Income Opportunity</p>
                      <h4 className="text-xl font-bold text-slate-900 mb-4">ইনকাম করা কি সম্ভব?</h4>
                      <div className="bg-white border border-blue-100 p-4 rounded-xl mb-4 shadow-sm">
                        <p className="text-blue-800 font-bold">হ্যাঁ, আমাদের প্ল্যাটফর্ম থেকে শেখা স্কিল ব্যবহার করে <span className="text-blue-600">বাস্তব কাজের মাধ্যমে ইনকাম করা সম্ভব।</span></p>
                      </div>
                      <ul className="space-y-3 mb-5">
                        {["শুধু ভিডিও নয় — হাতে-কলমে কাজ শেখানো হয়", "রিয়েল টাস্ক ও প্র্যাকটিক্যাল কাজ করানো হয়", "কাজ করার সঠিক গাইডলাইন ও সাপোর্ট দেওয়া হয়", "নিয়মিত কাজ করলে ইনকামের সুযোগ তৈরি হয়"].map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-blue-500 font-bold shrink-0">·</span>
                            <span className="text-slate-600 font-medium text-sm sm:text-base">{item}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="bg-emerald-50 text-emerald-800 font-bold p-3 rounded-lg border border-emerald-100 text-center text-sm md:text-base">
                        ✅ স্কিল + সময় + নিয়মিত কাজ = ইনকাম করার বাস্তব সম্ভাবনা
                      </div>
                    </section>

                    <section>
                      <h4 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2 border-b border-slate-100 pb-2">
                        <span className="text-blue-500 text-2xl">❖</span> Trainer • Team Leader • Live Support
                      </h4>
                      <div className="space-y-3">
                        <div className="flex gap-3 bg-white p-3 rounded-xl border border-slate-100 shadow-sm"><span className="text-emerald-500 font-bold">✔</span> <p className="text-slate-700 font-medium"><span className="font-bold text-slate-900">Trainer</span> – স্টেপ বাই স্টেপ স্কিল শেখাবে</p></div>
                        <div className="flex gap-3 bg-white p-3 rounded-xl border border-slate-100 shadow-sm"><span className="text-emerald-500 font-bold">✔</span> <p className="text-slate-700 font-medium"><span className="font-bold text-slate-900">Team Leader</span> – কাজ ও গ্রোথ মনিটর করবে</p></div>
                        <div className="flex gap-3 bg-white p-3 rounded-xl border border-slate-100 shadow-sm"><span className="text-emerald-500 font-bold">✔</span> <p className="text-slate-700 font-medium"><span className="font-bold text-slate-900">Live Support</span> – ইনবক্স ও গ্রুপে সাপোর্ট</p></div>
                      </div>
                    </section>
                  </div>
                </div>

                <div className="mt-10 lg:mt-12 space-y-6">
                  {/* Company Overview & Warning side by side on large screens */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <section className="bg-slate-900 text-white p-6 sm:p-8 rounded-2xl relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 blur-[50px] rounded-full pointer-events-none"></div>
                      <h4 className="text-lg sm:text-xl font-bold mb-4 relative z-10 flex items-center gap-2"><span className="text-blue-400">❖</span> কোম্পানি সম্পর্কে</h4>
                      <p className="text-blue-300 font-bold mb-1 relative z-10">Unity Earning E-learning Platform</p>
                      <p className="text-slate-400 text-sm mb-4 relative z-10 border-b border-slate-700 pb-4">২০২১ সাল থেকে সততা ও দায়িত্বের সাথে পরিচালিত।</p>
                      <ul className="space-y-2 relative z-10">
                        <li className="flex gap-3 text-slate-300 font-medium"><span className="text-blue-400">▹</span> নিজস্ব টিম ও ম্যানেজমেন্ট সিস্টেম</li>
                        <li className="flex gap-3 text-slate-300 font-medium"><span className="text-blue-400">▹</span> টেকনোলজি ভিত্তিক কাজ ও সার্ভিস</li>
                        <li className="flex gap-3 text-slate-300 font-medium"><span className="text-blue-400">▹</span> দীর্ঘমেয়াদী ইনকাম সুযোগ</li>
                      </ul>
                    </section>

                    <div className="space-y-6">
                      <section className="bg-red-50 p-6 sm:p-8 rounded-2xl border border-red-100 h-full flex flex-col justify-center">
                        <h4 className="text-lg sm:text-xl font-bold text-red-700 mb-4 flex items-center gap-2">
                          <AlertTriangle className="w-5 h-5" /> গুরুত্বপূর্ণ কোম্পানি কন্ডিশন
                        </h4>
                        <div className="space-y-4">
                          <button 
                            onClick={() => window.open("tel:+8801XXXXXXXXX", "_self")}
                            className="bg-white p-4 rounded-2xl border border-blue-100 shadow-sm flex items-center gap-4 w-full group hover:border-blue-300 transition-all"
                          >
                            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                              <Phone className="w-6 h-6" />
                            </div>
                            <div className="text-left">
                              <p className="text-slate-900 font-black text-sm">সরাসরি কথা বলুন</p>
                              <p className="text-xs text-slate-500 font-bold">কল করুন বাটন ক্লিক করে</p>
                            </div>
                          </button>
                          
                          <button 
                            onClick={() => window.open("https://wa.me/8801XXXXXXXXX", "_blank")}
                            className="bg-white p-4 rounded-2xl border border-emerald-100 shadow-sm flex items-center gap-4 w-full group hover:border-emerald-300 transition-all"
                          >
                            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                              <MessageSquare className="w-6 h-6" />
                            </div>
                            <div className="text-left">
                              <p className="text-slate-900 font-black text-sm">হোয়াটসঅ্যাপ মেসেজ</p>
                              <p className="text-xs text-slate-500 font-bold">সরাসরি মেসেজ করুন</p>
                            </div>
                          </button>
                        </div>
                      </section>
                    </div>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 text-amber-900 p-4 rounded-xl flex items-center gap-3 text-sm sm:text-base font-bold shadow-sm justify-center text-center">
                    <span className="text-xl">⛔</span> প্রতিদিন নিয়মিত মিটিং অংশগ্রহণ করতে হবে না হলে গ্রুপ থেকে রিমুভ করা হতে পারে।
                  </div>
                </div>

              </div>
            </div></>
        ) : activeTab === 'profile' ? <StudentProfile /> : activeTab === 'gallery' ? <PhotoGallery /> : activeTab === 'edit-profile' ? <EditProfile /> : activeTab === 'passbook' ? <MyPassbook /> : activeTab === 'withdrawals' ? <Withdrawals onNavigate={navigateTo} /> : activeTab === 'new-withdraw' ? <NewWithdrawRequest onBack={() => navigateTo('withdrawals')} /> : activeTab === 'notice' ? <Notice notices={settings.notices} /> : activeTab === 'extra-menu' ? <ExtraMenu /> : activeTab === 'store' ? <UnityStoreView /> : activeTab === 'change-password' ? <ChangePassword /> : activeTab === 'email-marketing' ? <EmailMarketing /> : activeTab === 'daily-quiz' ? <DailyQuiz /> : activeTab === 'ranking' ? <CareerRanking /> : <MyHomeworks />}
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
            className="absolute -bottom-20 right-0 w-[calc(100vw-2rem)] sm:w-[320px] bg-white rounded-2xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden origin-bottom-right max-h-[80vh]"
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
