"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ChevronLeft, ChevronRight, Check } from "lucide-react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";

const DAYS = ["日", "一", "二", "三", "四", "五", "六"];
const MONTHS = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];

// 模拟签到数据
const checkedDays = [1, 2, 3, 5, 6, 7, 8, 10, 11, 12, 15, 16, 17, 18, 19, 22, 23, 24, 25, 26, 29, 30, 31];

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const today = new Date();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const isToday = (day: number) => {
    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    );
  };

  const isChecked = (day: number) => {
    return checkedDays.includes(day) && month === today.getMonth() && year === today.getFullYear();
  };

  const days = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={`empty-${i}`} className="w-10 h-10" />);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(
      <motion.div
        key={day}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: day * 0.01 }}
        className={`w-10 h-10 flex items-center justify-center rounded-full relative ${
          isToday(day)
            ? "bg-primary text-white"
            : isChecked(day)
            ? "bg-primary/20 text-primary"
            : "text-text-main"
        }`}
      >
        {day}
        {isChecked(day) && !isToday(day) && (
          <Check size={10} className="absolute bottom-0 right-0 text-primary" />
        )}
      </motion.div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-background pb-24">
      <div className="bg-surface px-4 py-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <Link href="/profile">
            <ArrowLeft size={24} className="text-text-main" />
          </Link>
          <h1 className="text-xl font-bold text-text-main">疗愈日历</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 hide-scrollbar">
        <div className="bg-surface rounded-2xl p-4 shadow-sm">
          {/* 月份导航 */}
          <div className="flex items-center justify-between mb-4">
            <button onClick={prevMonth} className="p-2">
              <ChevronLeft size={20} className="text-text-main" />
            </button>
            <h2 className="font-bold text-text-main">
              {year}年 {MONTHS[month]}
            </h2>
            <button onClick={nextMonth} className="p-2">
              <ChevronRight size={20} className="text-text-main" />
            </button>
          </div>

          {/* 星期标题 */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {DAYS.map((day) => (
              <div
                key={day}
                className="w-10 h-10 flex items-center justify-center text-text-main/50 text-sm"
              >
                {day}
              </div>
            ))}
          </div>

          {/* 日期网格 */}
          <div className="grid grid-cols-7 gap-1">{days}</div>
        </div>

        {/* 统计 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-4 text-white"
        >
          <h3 className="font-medium mb-2">本月统计</h3>
          <div className="flex justify-around">
            <div className="text-center">
              <p className="text-2xl font-bold">{checkedDays.length}</p>
              <p className="text-white/70 text-xs">签到天数</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">7</p>
              <p className="text-white/70 text-xs">最长连续</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">230</p>
              <p className="text-white/70 text-xs">获得积分</p>
            </div>
          </div>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
}
