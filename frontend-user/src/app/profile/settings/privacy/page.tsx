"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";

export default function PrivacyPage() {
  const [shareData, setShareData] = useState(false);
  const [showOnline, setShowOnline] = useState(true);

  return (
    <div className="h-full flex flex-col bg-background pb-24">
      <div className="bg-surface px-4 py-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <Link href="/profile/settings">
            <ArrowLeft size={24} className="text-text-main" />
          </Link>
          <h1 className="text-xl font-bold text-text-main">隐私设置</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 hide-scrollbar">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface rounded-2xl shadow-sm overflow-hidden"
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-50">
            <div>
              <p className="font-medium text-text-main">数据分析</p>
              <p className="text-text-main/50 text-xs mt-1">
                允许我们收集匿名数据以改进服务
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={shareData}
                onChange={(e) => setShareData(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4">
            <div>
              <p className="font-medium text-text-main">显示在线状态</p>
              <p className="text-text-main/50 text-xs mt-1">
                其他用户可以看到你的在线状态
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={showOnline}
                onChange={(e) => setShowOnline(e.target.checked)}
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
          className="bg-surface rounded-2xl shadow-sm p-4"
        >
          <h3 className="font-medium text-text-main mb-2">数据管理</h3>
          <p className="text-text-main/50 text-sm mb-4">
            你可以随时导出或删除你的个人数据
          </p>
          <div className="space-y-2">
            <button className="w-full py-3 border border-primary text-primary rounded-xl font-medium">
              导出我的数据
            </button>
            <button className="w-full py-3 border border-red-400 text-red-400 rounded-xl font-medium">
              删除账号
            </button>
          </div>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
}
