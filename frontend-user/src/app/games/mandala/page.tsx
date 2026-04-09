"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Palette, RotateCcw, Check } from "lucide-react";
import Link from "next/link";
import { useStore } from "@/store/useStore";
import logger from "@/lib/logger";

const colors = [
  "#E8B4B8", "#A8D5BA", "#B8C5D6", "#D4B8E0", "#F5D0A9", "#A8D8EA",
  "#FFB6C1", "#98D8C8", "#DDA0DD", "#F0E68C", "#87CEEB", "#FFA07A",
];

const sections = Array.from({ length: 12 }, (_, i) => i);

export default function MandalaPage() {
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [filledSections, setFilledSections] = useState<Record<number, string>>({});
  const { addPoints, showSuccess, showWarning } = useStore();

  const handleSectionClick = (index: number) => {
    setFilledSections((prev) => ({
      ...prev,
      [index]: selectedColor,
    }));
  };

  const handleReset = () => {
    setFilledSections({});
    logger.info("重置曼陀罗填色", "MandalaGame");
  };

  const handleComplete = () => {
    const filledCount = Object.keys(filledSections).length;
    if (filledCount >= 6) {
      addPoints(10);
      logger.info("曼陀罗填色完成", "MandalaGame", { filledCount });
      showSuccess("太棒了！获得 10 积分", "你完成了曼陀罗填色，继续保持专注力！");
    } else {
      showWarning("还需要再填充一些", `请至少填充 6 个区域才能完成哦～（当前：${filledCount} 个）`);
    }
  };

  return (
    <div className="h-full flex flex-col bg-background">
      <div className="px-4 py-4 flex items-center justify-between bg-surface border-b border-gray-100">
        <Link href="/games">
          <ArrowLeft size={24} className="text-text-main" />
        </Link>
        <h1 className="font-bold text-text-main">曼陀罗填色</h1>
        <button onClick={handleReset}>
          <RotateCcw size={24} className="text-text-main/50" />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4">
        {/* 曼陀罗图案 */}
        <div className="relative w-72 h-72">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {/* 外圈 */}
            {sections.map((i) => {
              const angle = (i * 30 - 90) * (Math.PI / 180);
              const nextAngle = ((i + 1) * 30 - 90) * (Math.PI / 180);
              const x1 = 100 + 80 * Math.cos(angle);
              const y1 = 100 + 80 * Math.sin(angle);
              const x2 = 100 + 80 * Math.cos(nextAngle);
              const y2 = 100 + 80 * Math.sin(nextAngle);
              const x3 = 100 + 50 * Math.cos(nextAngle);
              const y3 = 100 + 50 * Math.sin(nextAngle);
              const x4 = 100 + 50 * Math.cos(angle);
              const y4 = 100 + 50 * Math.sin(angle);

              return (
                <motion.path
                  key={`outer-${i}`}
                  d={`M ${x1} ${y1} A 80 80 0 0 1 ${x2} ${y2} L ${x3} ${y3} A 50 50 0 0 0 ${x4} ${y4} Z`}
                  fill={filledSections[i] || "#f0f0f0"}
                  stroke="#ddd"
                  strokeWidth="1"
                  onClick={() => handleSectionClick(i)}
                  whileTap={{ scale: 0.95 }}
                  className="cursor-pointer"
                />
              );
            })}
            {/* 内圈 */}
            {sections.map((i) => {
              const angle = (i * 30 - 90) * (Math.PI / 180);
              const nextAngle = ((i + 1) * 30 - 90) * (Math.PI / 180);
              const x1 = 100 + 50 * Math.cos(angle);
              const y1 = 100 + 50 * Math.sin(angle);
              const x2 = 100 + 50 * Math.cos(nextAngle);
              const y2 = 100 + 50 * Math.sin(nextAngle);
              const x3 = 100 + 25 * Math.cos(nextAngle);
              const y3 = 100 + 25 * Math.sin(nextAngle);
              const x4 = 100 + 25 * Math.cos(angle);
              const y4 = 100 + 25 * Math.sin(angle);

              return (
                <motion.path
                  key={`inner-${i}`}
                  d={`M ${x1} ${y1} A 50 50 0 0 1 ${x2} ${y2} L ${x3} ${y3} A 25 25 0 0 0 ${x4} ${y4} Z`}
                  fill={filledSections[i + 12] || "#f0f0f0"}
                  stroke="#ddd"
                  strokeWidth="1"
                  onClick={() => handleSectionClick(i + 12)}
                  whileTap={{ scale: 0.95 }}
                  className="cursor-pointer"
                />
              );
            })}
            {/* 中心圆 */}
            <motion.circle
              cx="100"
              cy="100"
              r="25"
              fill={filledSections[24] || "#f0f0f0"}
              stroke="#ddd"
              strokeWidth="1"
              onClick={() => handleSectionClick(24)}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer"
            />
          </svg>
        </div>

        <p className="mt-4 text-text-main/50 text-sm">
          已填充 {Object.keys(filledSections).length} 个区域
        </p>
      </div>

      {/* 颜色选择器 */}
      <div className="px-4 pb-4">
        <div className="bg-surface rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Palette size={18} className="text-primary" />
            <span className="text-sm font-medium text-text-main">选择颜色</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => (
              <motion.button
                key={color}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedColor(color)}
                className={`w-10 h-10 rounded-full ${
                  selectedColor === color ? "ring-2 ring-offset-2 ring-primary" : ""
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleComplete}
          className="w-full mt-4 py-4 bg-primary text-white rounded-2xl font-medium flex items-center justify-center gap-2"
        >
          <Check size={20} />
          完成作品
        </motion.button>
      </div>
    </div>
  );
}
