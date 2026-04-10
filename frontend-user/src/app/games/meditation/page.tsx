"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Play, Pause } from "lucide-react";
import Link from "next/link";
import { useStore } from "@/store/useStore";
import logger from "@/lib/logger";

type Phase = "inhale" | "exhale";
type Duration = 3 | 5 | 10;

const phaseConfig = {
  inhale: { duration: 4, label: "吸气...", color: "#7A9CA6" },
  exhale: { duration: 4, label: "呼气...", color: "#BCCCD1" },
};

const durationOptions: { value: Duration; label: string }[] = [
  { value: 3, label: "3 分钟" },
  { value: 5, label: "5 分钟" },
  { value: 10, label: "10 分钟" },
];

export default function MeditationPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [phase, setPhase] = useState<Phase>("inhale");
  const [phaseCountdown, setPhaseCountdown] = useState(4);
  const [selectedDuration, setSelectedDuration] = useState<Duration>(5);
  const [totalSecondsLeft, setTotalSecondsLeft] = useState(5 * 60);
  const [completed, setCompleted] = useState(false);
  const { addPoints, showSuccess } = useStore();

  const totalSeconds = selectedDuration * 60;

  const reset = useCallback(() => {
    setIsPlaying(false);
    setPhase("inhale");
    setPhaseCountdown(4);
    setTotalSecondsLeft(selectedDuration * 60);
    setCompleted(false);
  }, [selectedDuration]);

  const handleDurationChange = (duration: Duration) => {
    if (isPlaying) return;
    setSelectedDuration(duration);
    setTotalSecondsLeft(duration * 60);
  };

  const handleComplete = useCallback(() => {
    setIsPlaying(false);
    setCompleted(true);
    addPoints(10);
    logger.info("正念冥想完成", "MeditationGame", { duration: selectedDuration });
    showSuccess("冥想完成！", "恭喜获得 10 积分");
  }, [addPoints, showSuccess, selectedDuration]);

  useEffect(() => {
    if (!isPlaying || completed) return;

    const timer = setInterval(() => {
      setPhaseCountdown((prev) => {
        if (prev <= 1) {
          setPhase((currentPhase) => {
            const nextPhase: Phase = currentPhase === "inhale" ? "exhale" : "inhale";
            return nextPhase;
          });
          return 4;
        }
        return prev - 1;
      });

      setTotalSecondsLeft((prev) => {
        if (prev <= 1) {
          handleComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, completed, handleComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const progress = ((totalSeconds - totalSecondsLeft) / totalSeconds) * 100;

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-primary/10 to-background">
      <div className="px-4 py-4 flex items-center justify-between">
        <Link href="/games">
          <ArrowLeft size={24} className="text-text-main" />
        </Link>
        <h1 className="font-bold text-text-main">正念冥想</h1>
        <div className="w-6" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-8">
        <AnimatePresence mode="wait">
          {completed ? (
            <motion.div
              key="completed"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-center"
            >
              <div className="text-6xl mb-4">🧘</div>
              <h2 className="text-2xl font-bold text-text-main mb-2">冥想完成</h2>
              <p className="text-primary mb-6">恭喜获得 10 积分！</p>
              <div className="flex gap-3">
                <Link href="/games">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-surface text-text-main rounded-full shadow-md"
                  >
                    返回游戏
                  </motion.button>
                </Link>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={reset}
                  className="px-6 py-3 bg-primary text-white rounded-full shadow-md"
                >
                  再来一次
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="playing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center"
            >
              <div className="relative w-64 h-64 mb-8">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="128"
                    cy="128"
                    r="120"
                    fill="none"
                    stroke="#e0e0e0"
                    strokeWidth="6"
                  />
                  <motion.circle
                    cx="128"
                    cy="128"
                    r="120"
                    fill="none"
                    stroke="#7A9CA6"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 120}
                    strokeDashoffset={2 * Math.PI * 120 * (1 - progress / 100)}
                    transition={{ duration: 1, ease: "linear" }}
                  />
                </svg>

                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{
                      scale: phase === "inhale" ? 1.2 : 0.8,
                    }}
                    transition={{
                      duration: 4,
                      ease: "easeInOut",
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                    className="w-40 h-40 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: `${phaseConfig[phase].color}40`,
                    }}
                  >
                    <motion.div
                      animate={{
                        scale: phase === "inhale" ? 1.1 : 0.9,
                      }}
                      transition={{
                        duration: 4,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                      className="w-28 h-28 rounded-full flex flex-col items-center justify-center"
                      style={{
                        backgroundColor: phaseConfig[phase].color,
                      }}
                    >
                      <span className="text-white text-3xl font-bold">
                        {phaseCountdown}
                      </span>
                    </motion.div>
                  </motion.div>
                </div>
              </div>

              <motion.p
                key={phase}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl font-bold text-text-main mb-2"
              >
                {phaseConfig[phase].label}
              </motion.p>

              <p className="text-text-main/50 text-lg mb-8">
                {formatTime(totalSecondsLeft)}
              </p>

              <div className="flex items-center gap-4 mb-8">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-20 h-20 rounded-full bg-primary shadow-lg flex items-center justify-center"
                >
                  {isPlaying ? (
                    <Pause size={32} className="text-white" />
                  ) : (
                    <Play size={32} className="text-white ml-1" />
                  )}
                </motion.button>
              </div>

              <div className="flex gap-3">
                {durationOptions.map((option) => (
                  <motion.button
                    key={option.value}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDurationChange(option.value)}
                    disabled={isPlaying}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedDuration === option.value
                        ? "bg-primary text-white shadow-md"
                        : "bg-surface text-text-main/60 shadow-sm"
                    } ${isPlaying ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    {option.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="px-8 pb-8">
        <div className="bg-surface rounded-2xl p-4 shadow-sm">
          <h3 className="font-medium text-text-main mb-2">正念冥想</h3>
          <p className="text-text-main/50 text-sm">
            跟随圆圈的节奏，吸气 4 秒，呼气 4 秒。专注于呼吸，让心灵回归平静。
          </p>
        </div>
      </div>
    </div>
  );
}
