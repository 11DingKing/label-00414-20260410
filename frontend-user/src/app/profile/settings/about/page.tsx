"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Heart, ExternalLink } from "lucide-react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";

export default function AboutPage() {
  return (
    <div className="h-full flex flex-col bg-background pb-24">
      <div className="bg-surface px-4 py-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <Link href="/profile/settings">
            <ArrowLeft size={24} className="text-text-main" />
          </Link>
          <h1 className="text-xl font-bold text-text-main">关于我们</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 hide-scrollbar">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface rounded-2xl shadow-sm p-6 text-center"
        >
          <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Heart size={40} className="text-white" />
          </div>
          <h2 className="text-xl font-bold text-text-main">MindSoul</h2>
          <p className="text-primary text-sm mt-1">你的专属 AI 心理疗愈师</p>
          <p className="text-text-main/50 text-xs mt-4">版本 1.0.0</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-surface rounded-2xl shadow-sm overflow-hidden"
        >
          <Link href="#" className="flex items-center justify-between p-4 border-b border-gray-50">
            <span className="text-text-main">用户协议</span>
            <ExternalLink size={18} className="text-text-main/30" />
          </Link>
          <Link href="#" className="flex items-center justify-between p-4 border-b border-gray-50">
            <span className="text-text-main">隐私政策</span>
            <ExternalLink size={18} className="text-text-main/30" />
          </Link>
          <Link href="#" className="flex items-center justify-between p-4">
            <span className="text-text-main">开源许可</span>
            <ExternalLink size={18} className="text-text-main/30" />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-surface rounded-2xl shadow-sm p-4"
        >
          <h3 className="font-medium text-text-main mb-2">联系我们</h3>
          <p className="text-text-main/50 text-sm">
            邮箱：support@mindsoul.com
          </p>
          <p className="text-text-main/50 text-sm mt-1">
            微信公众号：MindSoul心灵疗愈
          </p>
        </motion.div>

        <p className="text-center text-text-main/30 text-xs py-4">
          © 2026 MindSoul. All rights reserved.
        </p>
      </div>

      <BottomNav />
    </div>
  );
}
