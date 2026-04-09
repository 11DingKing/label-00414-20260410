"use client";

import { motion } from "framer-motion";
import {
  ChevronRight,
  FileText,
  Settings,
  HelpCircle,
  LogOut,
  Star,
  Award,
  Calendar,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import BottomNav from "@/components/BottomNav";
import { useStore } from "@/store/useStore";
import logger from "@/lib/logger";

const menuItems = [
  { icon: FileText, label: "我的报告", href: "/report" },
  { icon: Award, label: "成就徽章", href: "/profile/badges" },
  { icon: Calendar, label: "疗愈日历", href: "/profile/calendar" },
  { icon: Settings, label: "设置", href: "/profile/settings" },
  { icon: HelpCircle, label: "帮助与反馈", href: "/profile/help" },
];

const stats = [
  { label: "疗愈天数", value: "28" },
  { label: "对话次数", value: "156" },
  { label: "获得徽章", value: "12" },
];

export default function ProfilePage() {
  const { points, showInfo } = useStore();
  const router = useRouter();

  const handleLogout = () => {
    logger.info("用户退出登录", "Profile");
    router.push("/");
  };

  const handleMemberClick = () => {
    showInfo("功能开发中", "会员功能即将上线，敬请期待！");
    logger.info("点击会员功能", "Profile");
  };

  return (
    <div className="h-full flex flex-col bg-background pb-24">
      {/* 用户信息卡片 */}
      <div className="bg-gradient-to-br from-primary to-primary/80 px-4 pt-4 pb-8 text-white">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-3xl">
            🌸
          </div>
          <div className="flex-1">
            <h2 className="font-bold text-lg">小花同学</h2>
            <p className="text-white/70 text-sm">疗愈旅程第 28 天</p>
          </div>
          <Link href="/points" className="flex items-center gap-1 bg-white/20 rounded-full px-3 py-1">
            <Star size={14} className="text-yellow-300" fill="currentColor" />
            <span className="text-sm font-medium">{points || 0}</span>
          </Link>
        </div>

        {/* 统计数据 */}
        <div className="flex justify-around mt-6 bg-white/10 rounded-2xl py-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-bold font-english">{stat.value}</p>
              <p className="text-white/60 text-xs mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 hide-scrollbar -mt-4">
        {/* 会员卡片 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-amber-100 to-amber-50 rounded-2xl p-4 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-amber-800 font-medium">开通会员</p>
              <p className="text-amber-600/70 text-sm mt-1">
                解锁全部疗愈功能
              </p>
            </div>
            <button 
              onClick={handleMemberClick}
              className="bg-amber-500 text-white text-sm px-4 py-2 rounded-full"
            >
              立即开通
            </button>
          </div>
        </motion.div>

        {/* 菜单列表 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-surface rounded-2xl shadow-sm overflow-hidden"
        >
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-4 p-4 ${
                  index !== menuItems.length - 1 ? "border-b border-gray-50" : ""
                }`}
              >
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Icon size={20} className="text-primary" />
                </div>
                <span className="flex-1 text-text-main">{item.label}</span>
                <ChevronRight size={20} className="text-text-main/30" />
              </Link>
            );
          })}
        </motion.div>

        {/* 退出登录 */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onClick={handleLogout}
          className="w-full bg-surface rounded-2xl p-4 shadow-sm flex items-center justify-center gap-2 text-red-400"
        >
          <LogOut size={20} />
          <span>退出登录</span>
        </motion.button>

        {/* 版本信息 */}
        <p className="text-center text-text-main/20 text-xs py-4">
          MindSoul v1.0.0
        </p>
      </div>

      <BottomNav />
    </div>
  );
}
