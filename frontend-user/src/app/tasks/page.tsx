"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Circle, Users, MapPin, Calendar } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import Link from "next/link";

const dailyTasks = [
  { id: 1, title: "完成一次深呼吸练习", points: 10, completed: true },
  { id: 2, title: "记录今日心情", points: 10, completed: true },
  { id: 3, title: "与小愈聊天 5 分钟", points: 15, completed: false },
  { id: 4, title: "完成一个疗愈游戏", points: 20, completed: false },
];

const offlineTasks = [
  {
    id: 1,
    title: "户外散步 30 分钟",
    desc: "感受阳光和微风",
    points: 50,
    icon: MapPin,
  },
  {
    id: 2,
    title: "与朋友见面聊天",
    desc: "真实的社交连接",
    points: 80,
    icon: Users,
  },
  {
    id: 3,
    title: "参加线下活动",
    desc: "认识志同道合的朋友",
    points: 100,
    icon: Calendar,
  },
];

export default function TasksPage() {
  const completedCount = dailyTasks.filter((t) => t.completed).length;

  return (
    <div className="h-full flex flex-col bg-background pb-24">
      {/* 头部 */}
      <div className="bg-surface px-4 py-4 border-b border-gray-100">
        <h1 className="text-xl font-bold text-text-main">每日任务</h1>
        <div className="flex items-center gap-2 mt-2">
          <div className="flex-1 h-2 bg-secondary/30 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(completedCount / dailyTasks.length) * 100}%` }}
              className="h-full bg-primary rounded-full"
            />
          </div>
          <span className="text-sm text-text-main/50">
            {completedCount}/{dailyTasks.length}
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6 hide-scrollbar">
        {/* 每日任务 */}
        <div>
          <h2 className="text-sm font-medium text-text-main/50 mb-3">
            线上任务
          </h2>
          <div className="bg-surface rounded-2xl shadow-sm overflow-hidden">
            {dailyTasks.map((task, index) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`flex items-center gap-3 p-4 ${
                  index !== dailyTasks.length - 1 ? "border-b border-gray-50" : ""
                }`}
              >
                {task.completed ? (
                  <CheckCircle2 size={24} className="text-primary" />
                ) : (
                  <Circle size={24} className="text-secondary" />
                )}
                <span
                  className={`flex-1 text-sm ${
                    task.completed ? "text-text-main/40 line-through" : "text-text-main"
                  }`}
                >
                  {task.title}
                </span>
                <span className="text-xs text-primary font-medium">
                  +{task.points}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 线下任务 */}
        <div>
          <h2 className="text-sm font-medium text-text-main/50 mb-3">
            线下挑战
          </h2>
          <div className="space-y-3">
            {offlineTasks.map((task, index) => {
              const Icon = task.icon;
              return (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                  className="bg-surface rounded-2xl p-4 shadow-sm flex items-center gap-4"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Icon size={24} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-text-main text-sm">
                      {task.title}
                    </h3>
                    <p className="text-text-main/40 text-xs mt-1">{task.desc}</p>
                  </div>
                  <span className="text-primary font-medium text-sm">
                    +{task.points}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* 社群入口 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-secondary to-secondary/80 rounded-2xl p-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <Users size={16} className="text-text-main" />
            <span className="text-sm font-medium text-text-main">疗愈社群</span>
          </div>
          <p className="text-text-main/70 text-sm">
            加入社群，与同路人一起成长
          </p>
          <Link href="/events">
            <button className="mt-3 bg-white text-text-main rounded-full px-4 py-2 text-sm font-medium">
              查看活动
            </button>
          </Link>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
}
