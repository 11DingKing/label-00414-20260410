"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Bell, Moon, Volume2, Shield, Info } from "lucide-react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [sound, setSound] = useState(true);

  return (
    <div className="h-full flex flex-col bg-background pb-24">
      <div className="bg-surface px-4 py-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <Link href="/profile">
            <ArrowLeft size={24} className="text-text-main" />
          </Link>
          <h1 className="text-xl font-bold text-text-main">设置</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 hide-scrollbar">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface rounded-2xl shadow-sm overflow-hidden"
        >
          {/* 通知设置 */}
          <div className="flex items-center justify-between p-4 border-b border-gray-50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <Bell size={20} className="text-primary" />
              </div>
              <div>
                <p className="font-medium text-text-main">消息通知</p>
                <p className="text-text-main/50 text-xs">接收任务和活动提醒</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          {/* 深色模式 */}
          <div className="flex items-center justify-between p-4 border-b border-gray-50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <Moon size={20} className="text-primary" />
              </div>
              <div>
                <p className="font-medium text-text-main">深色模式</p>
                <p className="text-text-main/50 text-xs">保护眼睛，夜间更舒适</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={darkMode}
                onChange={(e) => setDarkMode(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          {/* 声音 */}
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <Volume2 size={20} className="text-primary" />
              </div>
              <div>
                <p className="font-medium text-text-main">音效</p>
                <p className="text-text-main/50 text-xs">操作反馈音效</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={sound}
                onChange={(e) => setSound(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-surface rounded-2xl shadow-sm overflow-hidden"
        >
          <Link href="/profile/settings/privacy" className="flex items-center gap-3 p-4 border-b border-gray-50">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
              <Shield size={20} className="text-primary" />
            </div>
            <span className="flex-1 font-medium text-text-main">隐私设置</span>
          </Link>

          <Link href="/profile/settings/about" className="flex items-center gap-3 p-4">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
              <Info size={20} className="text-primary" />
            </div>
            <span className="flex-1 font-medium text-text-main">关于我们</span>
          </Link>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full bg-surface rounded-2xl p-4 shadow-sm text-red-400 font-medium"
        >
          清除缓存
        </motion.button>
      </div>

      <BottomNav />
    </div>
  );
}
