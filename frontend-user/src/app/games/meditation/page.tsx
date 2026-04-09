"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Play, Pause, SkipForward } from "lucide-react";
import Link from "next/link";
import { useStore } from "@/store/useStore";

const steps = [
  { text: "找一个舒适的姿势坐下", duration: 5 },
  { text: "轻轻闭上眼睛", duration: 5 },
  { text: "深呼吸，感受空气进入身体", duration: 8 },
  { text: "慢慢呼气，释放所有紧张", duration: 8 },
  { text: "将注意力集中在呼吸上", duration: 10 },
  { text: "感受身体的每一个部位", duration: 10 },
  { text: "让思绪自由流动，不做评判", duration: 15 },
  { text: "感受内心的平静与安宁", duration: 15 },
  { text: "慢慢睁开眼睛", duration: 5 },
  { text: "带着这份平静继续你的一天", duration: 5 },
];

export default function MeditationPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [timeLeft, setTimeLeft] = useState(steps[0].duration);
  const [completed, setCompleted] = useState(false);
  const { addPoints } = useStore();

  useEffect(() => {
    if (!isPlaying || completed) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (currentStep < steps.length - 1) {
            setCurrentStep((s) => s + 1);
            return steps[currentStep + 1].duration;
          } else {
            setIsPlaying(false);
            setCompleted(true);
            addPoints(30);
            return 0;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, currentStep, completed, addPoints]);

  const skipStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((s) => s + 1);
      setTimeLeft(steps[currentStep + 1].duration);
    }
  };

  const totalDuration = steps.reduce((acc, s) => acc + s.duration, 0);
  const elapsed = steps.slice(0, currentStep).reduce((acc, s) => acc + s.duration, 0) + (steps[currentStep].duration - timeLeft);
  const progress = (elapsed / totalDuration) * 100;

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-primary/20 to-background">
      <div className="px-4 py-4 flex items-center justify-between">
        <Link href="/games">
          <ArrowLeft size={24} className="text-text-main" />
        </Link>
        <h1 className="font-bold text-text-main">5 分钟正念冥想</h1>
        <div className="w-6" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-8">
        {completed ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="text-6xl mb-4">🧘</div>
            <h2 className="text-2xl font-bold text-text-main mb-2">冥想完成</h2>
            <p className="text-primary">恭喜获得 30 积分！</p>
            <Link href="/games">
              <button className="mt-6 px-6 py-3 bg-primary text-white rounded-full">
                返回游戏
              </button>
            </Link>
          </motion.div>
        ) : (
          <>
            {/* 进度环 */}
            <div className="relative w-64 h-64">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="128"
                  cy="128"
                  r="120"
                  fill="none"
                  stroke="#e0e0e0"
                  strokeWidth="8"
                />
                <motion.circle
                  cx="128"
                  cy="128"
                  r="120"
                  fill="none"
                  stroke="#7A9CA6"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 120}
                  strokeDashoffset={2 * Math.PI * 120 * (1 - progress / 100)}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.p
                  key={currentStep}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-text-main text-center px-8 text-lg"
                >
                  {steps[currentStep].text}
                </motion.p>
                <p className="text-primary text-2xl font-bold mt-4">{timeLeft}s</p>
              </div>
            </div>

            {/* 步骤指示 */}
            <p className="mt-6 text-text-main/50 text-sm">
              步骤 {currentStep + 1} / {steps.length}
            </p>

            {/* 控制按钮 */}
            <div className="flex items-center gap-4 mt-8">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-16 h-16 rounded-full bg-primary shadow-lg flex items-center justify-center"
              >
                {isPlaying ? (
                  <Pause size={28} className="text-white" />
                ) : (
                  <Play size={28} className="text-white ml-1" />
                )}
              </motion.button>
              
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={skipStep}
                className="w-12 h-12 rounded-full bg-surface shadow-md flex items-center justify-center"
              >
                <SkipForward size={20} className="text-text-main/50" />
              </motion.button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
