"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

const questions = [
  {
    id: 1,
    question: "最近，你的心情怎么样？",
    options: ["很好，充满活力", "还不错", "有些低落", "很糟糕"],
  },
  {
    id: 2,
    question: "你最近的睡眠质量如何？",
    options: ["很好，一觉到天亮", "还可以", "经常失眠", "严重失眠"],
  },
  {
    id: 3,
    question: "你希望获得什么样的帮助？",
    options: ["缓解焦虑", "改善情绪", "提升自信", "改善人际关系"],
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSelect = (option: string) => {
    const newAnswers = [...answers, option];
    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      // 完成问卷，生成 IP
      setIsGenerating(true);
      setTimeout(() => {
        router.push("/chat");
      }, 2500);
    }
  };

  if (isGenerating) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-background px-8">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-20 h-20 rounded-full border-4 border-primary/20 border-t-primary mb-8"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-2 text-primary mb-2">
            <Sparkles size={20} />
            <span className="text-lg font-medium">正在生成你的专属疗愈师</span>
            <Sparkles size={20} />
          </div>
          <p className="text-text-main/50 text-sm">
            根据你的回答，为你匹配最适合的 AI 伙伴
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-background px-6 py-8">
      {/* 进度条 */}
      <div className="flex gap-2 mb-12">
        {questions.map((_, index) => (
          <div
            key={index}
            className={`h-1 flex-1 rounded-full transition-colors ${
              index <= step ? "bg-primary" : "bg-secondary/50"
            }`}
          />
        ))}
      </div>

      {/* 问题区域 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -50, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="flex-1"
        >
          <h2 className="text-2xl font-bold text-text-main mb-8">
            {questions[step].question}
          </h2>

          <div className="space-y-3">
            {questions[step].options.map((option, index) => (
              <motion.button
                key={option}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelect(option)}
                className="w-full bg-surface rounded-2xl p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow"
              >
                <span className="text-text-main">{option}</span>
                <ChevronRight size={20} className="text-primary" />
              </motion.button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* 跳过按钮 */}
      <button
        onClick={() => router.push("/chat")}
        className="text-text-main/40 text-sm mt-8"
      >
        跳过，稍后完善
      </button>
    </div>
  );
}
