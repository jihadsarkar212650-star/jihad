import { useState, useEffect } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from './firebase';

export interface GlobalSettings {
  notices: string[];
  supportTeam: {
    role: string;
    name: string;
    phone: string;
  }[];
  systemActive: boolean;
  globalBanner: string;
  scrollingTicker?: string;
}

const DEFAULT_SETTINGS: GlobalSettings = {
  notices: [
    "আপনার অ্যাকাউন্টের পাসওয়ার্ড কোনো অবস্থাতেই কাউকে শেয়ার করবেন না।",
    "আপনার রেফারেল লিংক বা অ্যাকাউন্ট ব্যালেন্সের স্ক্রিনশট কারও সঙ্গে শেয়ার করা সম্পূর্ণ নিষিদ্ধ।",
    "একবার টাকা উইথড্র দেওয়ার পর টাকা না পাওয়া পর্যন্ত দ্বিতীয়বার রিকোয়েস্ট পাঠাবেন না।",
    "টাকা উইথড্র দেওয়ার সাথে সাথেই আপনার টিম লিডার / ট্রেনারকে জানাবেন।"
  ],
  supportTeam: [
    { role: "টিম লিডার", name: "Nurjahan Islam", phone: "01785613673" },
    { role: "ট্রেইনার", name: "Sadia Akter", phone: "01636276634" }
  ],
  systemActive: true,
  globalBanner: "",
  scrollingTicker: ""
};

export function useSettings() {
  const [settings, setSettings] = useState<GlobalSettings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'settings', 'global'), (docSnap) => {
      if (docSnap.exists()) {
        setSettings(docSnap.data() as GlobalSettings);
      } else {
        // Initialize with defaults if doesn't exist
        setDoc(doc(db, 'settings', 'global'), DEFAULT_SETTINGS);
      }
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const updateSettings = async (newSettings: Partial<GlobalSettings>) => {
    await setDoc(doc(db, 'settings', 'global'), { ...settings, ...newSettings }, { merge: true });
  };

  return { settings, loading, updateSettings };
}
