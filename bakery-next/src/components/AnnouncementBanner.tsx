"use client";

import { useState, useEffect } from 'react';
import { settingsAPI } from '@/services/api';
import { motion, AnimatePresence } from 'framer-motion';

export default function AnnouncementBanner() {
  const [announcement, setAnnouncement] = useState('');
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        const res = await settingsAPI.getAll();
        if (res.data.announcement) {
          setAnnouncement(res.data.announcement);
        }
      } catch (err) {
        // Silently fail if table doesn't exist yet
      }
    };
    fetchAnnouncement();
  }, []);

  if (!announcement || !visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
        className="fixed top-0 left-0 right-0 z-[100] bg-bakery-brown text-white py-2 px-4 text-center text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-4"
      >
        <span>✨ {announcement} ✨</span>
        <button 
          onClick={() => setVisible(false)}
          className="hover:text-bakery-rose transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-sm">close</span>
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
