"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useStore } from "@/store/useStore";
import logger from "@/lib/logger";

const emotionCards = [
  { emoji: "😊", name: "开心", desc: "感到快乐和满足", color: "#FFD93D" },
  { emoji: "😢", name: "悲伤", desc: "感到失落和难过", color: "#6C9BCF" },
  { emoji: "😠", name: "愤怒", desc: "感到生气和不满", color: "#FF6B6B" },
  { emoji: "😰", name: "焦虑", desc: "感到担忧和不安", color: "#C9B1FF" },
  { emoji: "😌", name: "平静", desc: "感到安宁和放松", color: "#A8D5BA" },
  { emoji: "🥰", name: "感激", desc: "感到感恩和珍惜", color: "#FFB6C1" },
  { emoji: "😔", name: "失望", desc: "期望落空的感觉", color: "#B8C5D6" },
  { emoji: "🤗", name: "温暖", desc: "感到被爱和关怀", color: "#F5D0A9" },
  { emoji: "😤", name: "沮丧", desc: "感到受挫和无力", color: "#DDA0DD" },
  { emoji: "🥺", name: "脆弱", desc: "感到敏感和需要支持", color: "#E8B4B8" },
  { emoji: "😎", name: "自信", desc: "感到有能力和确定", color: "#87CEEB" },
  { emoji: "🤔", name: "困惑", desc: "感到迷茫和不确定", color: "#D4B8E0" },
];

export default function EmotionPage() {
  const [currentCard, setCurrentCard] = useState<number | null>(null);
  const [flipped, setFlipped] = useState(false);
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  const { addPoints, showSuccess } = useStore();

  const drawCard = () => {
    setFlipped(false);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * emotionCards.length);
      setCurrentCard(randomIndex);
      setFlipped(true);
    }, 300);
  };

  const selectEmotion = (name: string) => {
    if (selectedEmotions.includes(name)) {
      setSelectedEmotions(selectedEmotions.filter((e) => e !== name));
    } else {
      setSelectedEmotions([...selectedEmotions, name]);
    }
  };

  const handleComplete = () => {
    if (selectedEmotions.length > 0) {
      addPoints(10);
      logger.info("情绪识别完成", "EmotionGame", { emotions: selectedEmotions });
      showSuccess(
        "获得 10 积分！",
        `你选择了：${selectedEmotions.join("、")}。认识自己的情绪是很重要的一步！`
      );
      setSelectedEmotions([]);
    }
  };

  return (
    <div className="h-full flex flex-col bg-background">
      <div className="px-4 py-4 flex items-center justify-between bg-surface border-b border-gray-100">
        <Link href="/games">
          <ArrowLeft size={24} className="text-text-main" />
        </Link>
        <h1 className="font-bold text-text-main">情绪卡牌</h1>
        <div className="w-6" />
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 hide-scrollbar">
        {/* 抽卡区域 */}
        <div className="bg-surface rounded-2xl p-6 shadow-sm mb-4">
          <h3 className="font-medium text-text-main text-center mb-4">
            抽一张卡牌，认识今天的情绪
          </h3>
          
          <div className="flex justify-center mb-4">
            <motion.div
              className="w-40 h-56 rounded-2xl cursor-pointer perspective-1000"
              onClick={drawCard}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {currentCard !== null && flipped ? (
                  <motion.div
                    key="front"
                    initial={{ rotateY: 180 }}
                    animate={{ rotateY: 0 }}
                    exit={{ rotateY: -180 }}
                    className="w-full h-full rounded-2xl flex flex-col items-center justify-center"
                    style={{ backgroundColor: emotionCards[currentCard].color }}
                  >
                    <span className="text-5xl mb-2">{emotionCards[currentCard].emoji}</span>
                    <span className="text-white font-bold text-lg">{emotionCards[currentCard].name}</span>
                    <span className="text-white/70 text-xs mt-1 px-4 text-center">
                      {emotionCards[currentCard].desc}
                    </span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="back"
                    initial={{ rotateY: 0 }}
                    animate={{ rotateY: 0 }}
                    exit={{ rotateY: 180 }}
                    className="w-full h-full rounded-2xl bg-primary flex flex-col items-center justify-center"
                  >
                    <span className="text-4xl mb-2">🎴</span>
                    <span className="text-white/80 text-sm">点击抽卡</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          <button
            onClick={drawCard}
            className="w-full py-3 border border-primary text-primary rounded-xl flex items-center justify-center gap-2"
          >
            <RefreshCw size={18} />
            重新抽卡
          </button>
        </div>

        {/* 情绪选择 */}
        <div className="bg-surface rounded-2xl p-4 shadow-sm">
          <h3 className="font-medium text-text-main mb-3">
            你现在的感受是？（可多选）
          </h3>
          <div className="grid grid-cols-4 gap-2">
            {emotionCards.map((card) => (
              <motion.button
                key={card.name}
                whileTap={{ scale: 0.95 }}
                onClick={() => selectEmotion(card.name)}
                className={`p-2 rounded-xl text-center ${
                  selectedEmotions.includes(card.name)
                    ? "ring-2 ring-primary bg-primary/10"
                    : "bg-gray-50"
                }`}
              >
                <span className="text-2xl">{card.emoji}</span>
                <p className="text-xs text-text-main/70 mt-1">{card.name}</p>
              </motion.button>
            ))}
          </div>

          {selectedEmotions.length > 0 && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={handleComplete}
              className="w-full mt-4 py-3 bg-primary text-white rounded-xl"
            >
              确认选择 ({selectedEmotions.length})
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
}
