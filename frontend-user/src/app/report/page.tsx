"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Download, Share2 } from "lucide-react";
import Link from "next/link";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";
import BottomNav from "@/components/BottomNav";

const radarData = [
  { subject: "情绪稳定", value: 75 },
  { subject: "压力管理", value: 60 },
  { subject: "人际关系", value: 80 },
  { subject: "自我认知", value: 70 },
  { subject: "睡眠质量", value: 55 },
  { subject: "生活满意度", value: 65 },
];

export default function ReportPage() {
  return (
    <div className="h-full flex flex-col bg-background pb-24">
      {/* 头部 */}
      <div className="bg-surface px-4 py-3 flex items-center justify-between border-b border-gray-100">
        <Link href="/chat" className="p-2 -ml-2">
          <ArrowLeft size={24} className="text-text-main" />
        </Link>
        <h1 className="font-medium text-text-main">心理评估报告</h1>
        <div className="flex gap-2">
          <button className="p-2">
            <Share2 size={20} className="text-text-main/50" />
          </button>
          <button className="p-2">
            <Download size={20} className="text-text-main/50" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 hide-scrollbar">
        {/* 总体评分 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface rounded-2xl p-6 shadow-sm text-center"
        >
          <p className="text-text-main/50 text-sm mb-2">心理健康指数</p>
          <div className="text-5xl font-bold text-primary mb-2">72</div>
          <p className="text-secondary text-sm">状态良好，继续保持 💪</p>
        </motion.div>

        {/* 雷达图 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-surface rounded-2xl p-4 shadow-sm"
        >
          <h3 className="font-medium text-text-main mb-4">维度分析</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#BCCCD1" />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fill: "#2C3E50", fontSize: 12 }}
                />
                <Radar
                  name="评分"
                  dataKey="value"
                  stroke="#7A9CA6"
                  fill="#7A9CA6"
                  fillOpacity={0.3}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* 建议 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-surface rounded-2xl p-4 shadow-sm"
        >
          <h3 className="font-medium text-text-main mb-3">专属建议</h3>
          <div className="space-y-3">
            {[
              { title: "改善睡眠", desc: "建议每晚 11 点前入睡，睡前避免使用手机" },
              { title: "压力释放", desc: "尝试每天 10 分钟冥想，帮助放松身心" },
              { title: "情绪记录", desc: "坚持记录每日心情，更好地了解自己" },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 bg-background rounded-xl"
              >
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-medium">{index + 1}</span>
                </div>
                <div>
                  <p className="font-medium text-text-main text-sm">{item.title}</p>
                  <p className="text-text-main/50 text-xs mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
}
