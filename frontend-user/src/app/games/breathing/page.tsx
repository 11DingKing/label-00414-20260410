"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Play, Pause, RotateCcw } from "lucide-react";
import Link from "next/link";
import { useStore } from "@/store/useStore";
import logger from "@/lib/logger";

type Phase = "inhale" | "hold" | "exhale" | "rest";

const phaseConfig = {
  inhale: { duration: 4, label: "吸气", color: "#7A9CA6" },
  hold: { duration: 7, label: "屏息", color: "#A8D5BA" },
  exhale: { duration: 8, label: "呼气", color: "#B8C5D6" },
  rest: { duration: 2, label: "休息", color: "#BCCCD1" },
};

export default function BreathingPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [phase, setPhase] = useState<Phase>("inhale");
  const [count, setCount] = useState(4);
  const [cycles, setCycles] = useState(0);
  const { addPoints, showSuccess, showInfo } = useStore();

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          // 切换到下一阶段
          setPhase((currentPhase) => {
            const phases: Phase[] = ["inhale", "hold", "exhale", "rest"];
            const currentIndex = phases.indexOf(currentPhase);
            const nextPhase = phases[(currentIndex + 1) % 4];
            
            if (nextPhase === "inhale") {
              setCycles((c) => c + 1);
            }
            
            return nextPhase;
          });
          return phaseConfig[phase === "rest" ? "inhale" : 
                 phase === "inhale" ? "hold" : 
                 phase === "hold" ? "exhale" : "rest"].duration;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, phase]);

  const handleComplete = () => {
    setIsPlaying(false);
    if (cycles >= 3) {
      addPoints(15);
      logger.info("呼吸练习完成", "BreathingGame", { cycles });
      showSuccess("太棒了！获得 15 积分", "你完成了呼吸练习，身心得到放松");
    } else {
      showInfo("继续加油", `还需完成 ${3 - cycles} 个周期才能获得积分`);
    }
  };

  const reset = () => {
    setIsPlaying(false);
    setPhase("inhale");
    setCount(4);
    setCycles(0);
    logger.info("重置呼吸练习", "BreathingGame");
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-primary/10 to-background">
      <div className="px-4 py-4 flex items-center justify-between">
        <Link href="/games">
          <ArrowLeft size={24} className="text-text-main" />
        </Link>
        <h1 className="font-bold text-text-main">4-7-8 呼吸法</h1>
        <div className="w-6" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-8">
        {/* 呼吸圆圈 */}
        <div className="relative w-64 h-64">
          <motion.div
            animate={{
              scale: phase === "inhale" ? 1.3 : phase === "exhale" ? 0.8 : 1,
            }}
            transition={{ duration: phaseConfig[phase].duration, ease: "easeInOut" }}
            className="w-full h-full rounded-full flex items-center justify-center"
            style={{ backgroundColor: `${phaseConfig[phase].color}30` }}
          >
            <motion.div
              animate={{
                scale: phase === "inhale" ? 1.2 : phase === "exhale" ? 0.9 : 1,
              }}
              transition={{ duration: phaseConfig[phase].duration, ease: "easeInOut" }}
              className="w-48 h-48 rounded-full flex flex-col items-center justify-center"
              style={{ backgroundColor: phaseConfig[phase].color }}
            >
              <span className="text-white text-4xl font-bold">{count}</span>
              <span className="text-white/80 text-lg mt-2">
                {phaseConfig[phase].label}
              </span>
            </motion.div>
          </motion.div>
        </div>

        {/* 周期计数 */}
        <p className="mt-8 text-text-main/50">
          已完成 <span className="text-primary font-bold">{cycles}</span> 个周期
        </p>
        <p className="text-text-main/30 text-sm mt-1">完成 3 个周期可获得积分</p>

        {/* 控制按钮 */}
        <div className="flex items-center gap-4 mt-8">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={reset}
            className="w-14 h-14 rounded-full bg-surface shadow-md flex items-center justify-center"
          >
            <RotateCcw size={24} className="text-text-main/50" />
          </motion.button>
          
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              if (cycles >= 3) {
                handleComplete();
              } else {
                setIsPlaying(!isPlaying);
              }
            }}
            className="w-20 h-20 rounded-full bg-primary shadow-lg flex items-center justify-center"
          >
            {isPlaying ? (
              <Pause size={32} className="text-white" />
            ) : (
              <Play size={32} className="text-white ml-1" />
            )}
          </motion.button>

          <div className="w-14 h-14" />
        </div>
      </div>

      {/* 说明 */}
      <div className="px-8 pb-8">
        <div className="bg-surface rounded-2xl p-4 shadow-sm">
          <h3 className="font-medium text-text-main mb-2">4-7-8 呼吸法</h3>
          <p className="text-text-main/50 text-sm">
            吸气 4 秒 → 屏息 7 秒 → 呼气 8 秒。这种呼吸法可以帮助放松身心，缓解焦虑。
          </p>
        </div>
      </div>
    </div>
  );
}
