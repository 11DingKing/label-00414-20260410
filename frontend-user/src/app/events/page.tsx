"use client";

import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Calendar, Users, Clock } from "lucide-react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";

const events = [
  {
    id: 1,
    title: "正念冥想工作坊",
    date: "2月15日 周六",
    time: "14:00-16:00",
    location: "北京·朝阳区",
    participants: 12,
    maxParticipants: 20,
    image: "🧘",
    tag: "热门",
  },
  {
    id: 2,
    title: "情绪管理沙龙",
    date: "2月22日 周六",
    time: "15:00-17:00",
    location: "北京·海淀区",
    participants: 8,
    maxParticipants: 15,
    image: "💭",
    tag: "新活动",
  },
  {
    id: 3,
    title: "户外疗愈徒步",
    date: "3月1日 周六",
    time: "09:00-12:00",
    location: "北京·香山",
    participants: 18,
    maxParticipants: 30,
    image: "🌲",
    tag: null,
  },
  {
    id: 4,
    title: "艺术疗愈体验",
    date: "3月8日 周六",
    time: "14:00-17:00",
    location: "北京·798艺术区",
    participants: 5,
    maxParticipants: 12,
    image: "🎨",
    tag: "限时优惠",
  },
];

export default function EventsPage() {
  return (
    <div className="h-full flex flex-col bg-background pb-24">
      {/* 头部 */}
      <div className="bg-surface px-4 py-3 flex items-center gap-3 border-b border-gray-100">
        <Link href="/tasks" className="p-2 -ml-2">
          <ArrowLeft size={24} className="text-text-main" />
        </Link>
        <h1 className="font-medium text-text-main">线下活动</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 hide-scrollbar">
        {/* 活动列表 */}
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-surface rounded-2xl shadow-sm overflow-hidden"
          >
            {/* 活动图片区域 */}
            <div className="h-32 bg-gradient-to-br from-primary/20 to-secondary/30 flex items-center justify-center relative">
              <span className="text-5xl">{event.image}</span>
              {event.tag && (
                <span className="absolute top-3 right-3 bg-primary text-white text-xs px-2 py-1 rounded-full">
                  {event.tag}
                </span>
              )}
            </div>

            {/* 活动信息 */}
            <div className="p-4">
              <h3 className="font-bold text-text-main">{event.title}</h3>

              <div className="mt-3 space-y-2">
                <div className="flex items-center gap-2 text-text-main/60 text-sm">
                  <Calendar size={16} />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2 text-text-main/60 text-sm">
                  <Clock size={16} />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2 text-text-main/60 text-sm">
                  <MapPin size={16} />
                  <span>{event.location}</span>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-primary" />
                  <span className="text-sm text-text-main/60">
                    {event.participants}/{event.maxParticipants} 人已报名
                  </span>
                </div>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="bg-primary text-white text-sm px-4 py-2 rounded-full"
                >
                  立即报名
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}

        {/* 底部提示 */}
        <div className="text-center py-4">
          <p className="text-text-main/30 text-sm">更多活动即将上线...</p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
