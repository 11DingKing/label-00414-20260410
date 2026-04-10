"use client";

import { motion } from "framer-motion";
import { Palette, Wind, Music, Puzzle, Heart, Sparkles } from "lucide-react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";

const games = [
  {
    id: 1,
    name: "曼陀罗填色",
    desc: "专注当下，释放压力",
    icon: Palette,
    color: "#E8B4B8",
    points: 10,
    href: "/games/mandala",
  },
  {
    id: 2,
    name: "呼吸练习",
    desc: "4-7-8 呼吸法",
    icon: Wind,
    color: "#A8D5BA",
    points: 15,
    href: "/games/breathing",
  },
  {
    id: 3,
    name: "白噪音",
    desc: "自然声音助眠",
    icon: Music,
    color: "#B8C5D6",
    points: 5,
    href: "/games/whitenoise",
  },
  {
    id: 4,
    name: "正念拼图",
    desc: "平静心灵的拼图",
    icon: Puzzle,
    color: "#D4B8E0",
    points: 20,
    href: "/games/puzzle",
  },
  {
    id: 5,
    name: "感恩日记",
    desc: "记录美好瞬间",
    icon: Heart,
    color: "#F5D0A9",
    points: 15,
    href: "/games/gratitude",
  },
  {
    id: 6,
    name: "情绪卡牌",
    desc: "认识你的情绪",
    icon: Sparkles,
    color: "#A8D8EA",
    points: 10,
    href: "/games/emotion",
  },
];

export default function GamesPage() {
  return (
    <div className="h-full flex flex-col bg-background pb-24">
      {/* 头部 */}
      <div className="bg-surface px-4 py-4 border-b border-gray-100">
        <h1 className="text-xl font-bold text-text-main">疗愈游戏</h1>
        <p className="text-text-main/50 text-sm mt-1">
          玩游戏，放松心情，还能赚积分哦～
        </p>
      </div>

      {/* 游戏列表 */}
      <div className="flex-1 overflow-y-auto px-4 py-4 hide-scrollbar">
        <div className="grid grid-cols-2 gap-3">
          {games.map((game, index) => {
            const Icon = game.icon;
            return (
              <Link key={game.id} href={game.href}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-surface rounded-2xl p-4 shadow-sm cursor-pointer"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
                    style={{ backgroundColor: `${game.color}30` }}
                  >
                    <Icon size={24} style={{ color: game.color }} />
                  </div>
                  <h3 className="font-medium text-text-main text-sm">
                    {game.name}
                  </h3>
                  <p className="text-text-main/40 text-xs mt-1">{game.desc}</p>
                  <div className="flex items-center gap-1 mt-3">
                    <span className="text-xs text-primary font-medium">
                      +{game.points} 积分
                    </span>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>

        {/* 每日推荐 */}
        <Link href="/games/meditation">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileTap={{ scale: 0.98 }}
            className="mt-6 bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-4 text-white"
          >
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={16} />
              <span className="text-sm font-medium">今日推荐</span>
            </div>
            <h3 className="font-bold text-lg">正念冥想</h3>
            <p className="text-white/70 text-sm mt-1">
              跟随呼吸节奏，放松身心，完成可获得 10 积分
            </p>
            <button className="mt-3 bg-white text-primary rounded-full px-4 py-2 text-sm font-medium">
              立即开始
            </button>
          </motion.div>
        </Link>
      </div>

      <BottomNav />
    </div>
  );
}
