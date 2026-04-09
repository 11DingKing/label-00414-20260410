"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Lock } from "lucide-react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";

const badges = [
  { id: 1, name: "初心者", desc: "完成首次对话", icon: "🌱", unlocked: true },
  { id: 2, name: "坚持者", desc: "连续签到7天", icon: "🔥", unlocked: true },
  { id: 3, name: "倾听者", desc: "完成10次对话", icon: "👂", unlocked: true },
  { id: 4, name: "探索者", desc: "尝试所有游戏", icon: "🧭", unlocked: true },
  { id: 5, name: "冥想大师", desc: "完成30次冥想", icon: "🧘", unlocked: false },
  { id: 6, name: "社交达人", desc: "参加5次线下活动", icon: "🤝", unlocked: false },
  { id: 7, name: "积分王者", desc: "累计获得1000积分", icon: "👑", unlocked: false },
  { id: 8, name: "疗愈之星", desc: "连续使用30天", icon: "⭐", unlocked: false },
];

export default function BadgesPage() {
  const unlockedCount = badges.filter((b) => b.unlocked).length;

  return (
    <div className="h-full flex flex-col bg-background pb-24">
      <div className="bg-surface px-4 py-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <Link href="/profile">
            <ArrowLeft size={24} className="text-text-main" />
          </Link>
          <h1 className="text-xl font-bold text-text-main">成就徽章</h1>
        </div>
        <p className="text-text-main/50 text-sm mt-2">
          已解锁 {unlockedCount}/{badges.length} 个徽章
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 hide-scrollbar">
        <div className="grid grid-cols-2 gap-3">
          {badges.map((badge, index) => (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className={`bg-surface rounded-2xl p-4 shadow-sm text-center ${
                !badge.unlocked ? "opacity-60" : ""
              }`}
            >
              <div className="relative w-16 h-16 mx-auto mb-3">
                <div
                  className={`w-full h-full rounded-full flex items-center justify-center text-3xl ${
                    badge.unlocked ? "bg-primary/10" : "bg-gray-100"
                  }`}
                >
                  {badge.unlocked ? (
                    badge.icon
                  ) : (
                    <Lock size={24} className="text-gray-400" />
                  )}
                </div>
              </div>
              <h3 className="font-medium text-text-main text-sm">{badge.name}</h3>
              <p className="text-text-main/40 text-xs mt-1">{badge.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
