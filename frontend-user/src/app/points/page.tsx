"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Ticket, ChevronRight, Sparkles } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { useStore } from "@/store/useStore";
import logger from "@/lib/logger";

const prizes = [
  { id: 1, name: "心理咨询优惠券", points: 500, icon: "🎫" },
  { id: 2, name: "疗愈音乐会员", points: 300, icon: "🎵" },
  { id: 3, name: "冥想课程", points: 200, icon: "🧘" },
  { id: 4, name: "精美周边", points: 800, icon: "🎁" },
];

const lotteryPrizes = [
  { text: "谢谢参与", color: "#E8E8E8", emoji: "😊" },
  { text: "10 积分", color: "#FFE4B5", emoji: "⭐" },
  { text: "优惠券", color: "#B8E6CF", emoji: "🎫" },
  { text: "50 积分", color: "#FFD700", emoji: "💫" },
  { text: "会员体验", color: "#DDA0DD", emoji: "👑" },
  { text: "100 积分", color: "#FF6B6B", emoji: "🎉" },
  { text: "神秘礼物", color: "#87CEEB", emoji: "🎁" },
  { text: "谢谢参与", color: "#E8E8E8", emoji: "😊" },
];

// 计算扇形路径
function getSlicePath(index: number, total: number, radius: number): string {
  const angle = 360 / total;
  const startAngle = index * angle - 90;
  const endAngle = startAngle + angle;
  
  const startRad = (startAngle * Math.PI) / 180;
  const endRad = (endAngle * Math.PI) / 180;
  
  const x1 = 100 + radius * Math.cos(startRad);
  const y1 = 100 + radius * Math.sin(startRad);
  const x2 = 100 + radius * Math.cos(endRad);
  const y2 = 100 + radius * Math.sin(endRad);
  
  const largeArc = angle > 180 ? 1 : 0;
  
  return `M 100 100 L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;
}

// 计算文字位置
function getTextPosition(index: number, total: number, radius: number) {
  const angle = 360 / total;
  const midAngle = index * angle + angle / 2 - 90;
  const rad = (midAngle * Math.PI) / 180;
  
  return {
    x: 100 + radius * 0.65 * Math.cos(rad),
    y: 100 + radius * 0.65 * Math.sin(rad),
    rotation: midAngle + 90,
  };
}

export default function PointsPage() {
  const { points, addPoints, deductPoints, showSuccess, showError, showInfo } = useStore();
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<string | null>(null);

  const handleSpin = () => {
    if (isSpinning) return;
    
    // 检查积分是否足够
    if (points < 50) {
      addPoints(200);
      showInfo("赠送积分", "首次体验赠送 200 积分！");
      logger.info("首次体验赠送积分", "Points", { amount: 200 });
    }
    
    if (!deductPoints(50)) {
      showError("积分不足", "需要 50 积分才能抽奖");
      logger.warn("积分不足无法抽奖", "Points", { currentPoints: points });
      return;
    }

    logger.info("开始抽奖", "Points", { cost: 50 });
    setIsSpinning(true);
    setResult(null);

    // 随机选择奖品
    const prizeIndex = Math.floor(Math.random() * 8);
    // 计算旋转角度：5圈 + 对应奖品的角度
    const sliceAngle = 360 / 8;
    const targetAngle = 360 * 5 + (7 - prizeIndex) * sliceAngle + sliceAngle / 2;
    setRotation(rotation + targetAngle);

    setTimeout(() => {
      setIsSpinning(false);
      const prize = lotteryPrizes[prizeIndex];
      setResult(prize.text);
      
      if (prize.text.includes("积分")) {
        const pointsWon = parseInt(prize.text);
        if (!isNaN(pointsWon)) {
          addPoints(pointsWon);
          showSuccess(`恭喜获得 ${pointsWon} 积分！`, "积分已自动到账");
          logger.info("抽奖获得积分", "Points", { prize: prize.text, pointsWon });
        }
      } else if (prize.text === "谢谢参与") {
        showInfo("谢谢参与", "下次好运！");
      } else {
        showSuccess(`恭喜获得：${prize.text}`, "奖品将在3个工作日内发放");
        logger.info("抽奖获得奖品", "Points", { prize: prize.text });
      }
    }, 4000);
  };

  return (
    <div className="h-full flex flex-col bg-background pb-24">
      {/* 头部积分卡 */}
      <div className="bg-gradient-to-br from-primary to-primary/80 px-4 py-6 text-white">
        <p className="text-white/70 text-sm">我的积分</p>
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-4xl font-bold font-english">{points || 0}</span>
          <Star size={20} className="text-yellow-300" fill="currentColor" />
        </div>
        <p className="text-white/50 text-xs mt-2">完成任务和游戏可获得积分</p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6 hide-scrollbar">
        {/* 幸运转盘 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface rounded-2xl p-4 shadow-sm"
        >
          <div className="flex items-center gap-2 mb-4">
            <Ticket size={20} className="text-primary" />
            <h2 className="font-medium text-text-main">幸运转盘</h2>
            <span className="text-xs text-text-main/40 ml-auto">50 积分/次</span>
          </div>

          {/* 转盘容器 */}
          <div className="relative w-64 h-64 mx-auto">
            {/* 外圈装饰 */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-primary/60 p-2">
              {/* 小灯泡装饰 */}
              <div className="absolute inset-0">
                {Array.from({ length: 16 }).map((_, i) => {
                  const angle = (i * 22.5 - 90) * (Math.PI / 180);
                  const x = 50 + 48 * Math.cos(angle);
                  const y = 50 + 48 * Math.sin(angle);
                  return (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 rounded-full bg-yellow-300"
                      style={{
                        left: `${x}%`,
                        top: `${y}%`,
                        transform: "translate(-50%, -50%)",
                      }}
                      animate={{
                        opacity: isSpinning ? [0.3, 1, 0.3] : 1,
                        scale: isSpinning ? [0.8, 1.2, 0.8] : 1,
                      }}
                      transition={{
                        duration: 0.5,
                        repeat: isSpinning ? Infinity : 0,
                        delay: i * 0.03,
                      }}
                    />
                  );
                })}
              </div>
              
              {/* 转盘主体 */}
              <motion.div
                className="w-full h-full rounded-full overflow-hidden bg-white"
                style={{ rotate: rotation }}
                animate={{ rotate: rotation }}
                transition={{ duration: 4, ease: [0.17, 0.67, 0.12, 0.99] }}
              >
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  {/* 扇形区域 */}
                  {lotteryPrizes.map((prize, index) => (
                    <g key={index}>
                      <path
                        d={getSlicePath(index, 8, 98)}
                        fill={prize.color}
                        stroke="#fff"
                        strokeWidth="1"
                      />
                    </g>
                  ))}
                  
                  {/* 文字和图标 */}
                  {lotteryPrizes.map((prize, index) => {
                    const pos = getTextPosition(index, 8, 98);
                    return (
                      <g key={`text-${index}`}>
                        <text
                          x={pos.x}
                          y={pos.y - 8}
                          textAnchor="middle"
                          fontSize="16"
                          transform={`rotate(${pos.rotation}, ${pos.x}, ${pos.y - 8})`}
                        >
                          {prize.emoji}
                        </text>
                        <text
                          x={pos.x}
                          y={pos.y + 8}
                          textAnchor="middle"
                          fontSize="8"
                          fontWeight="500"
                          fill="#333"
                          transform={`rotate(${pos.rotation}, ${pos.x}, ${pos.y + 8})`}
                        >
                          {prize.text}
                        </text>
                      </g>
                    );
                  })}
                  
                  {/* 中心圆 */}
                  <circle cx="100" cy="100" r="20" fill="#7A9CA6" />
                  <circle cx="100" cy="100" r="16" fill="#fff" />
                  <text
                    x="100"
                    y="104"
                    textAnchor="middle"
                    fontSize="10"
                    fontWeight="bold"
                    fill="#7A9CA6"
                  >
                    抽奖
                  </text>
                </svg>
              </motion.div>
            </div>
            
            {/* 指针 */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10">
              <div className="relative">
                <div 
                  className="w-0 h-0"
                  style={{
                    borderLeft: "12px solid transparent",
                    borderRight: "12px solid transparent",
                    borderTop: "24px solid #7A9CA6",
                  }}
                />
                <div 
                  className="absolute top-1 left-1/2 -translate-x-1/2 w-0 h-0"
                  style={{
                    borderLeft: "8px solid transparent",
                    borderRight: "8px solid transparent",
                    borderTop: "16px solid #fff",
                  }}
                />
              </div>
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleSpin}
            disabled={isSpinning}
            className={`w-full mt-6 py-3 rounded-xl font-medium transition-all ${
              isSpinning
                ? "bg-secondary/50 text-text-main/50"
                : "bg-primary text-white shadow-lg shadow-primary/30"
            }`}
          >
            {isSpinning ? "转动中..." : "开始抽奖"}
          </motion.button>

          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-4 text-center"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary">
                  <Sparkles size={16} />
                  <span className="font-medium">{result}</span>
                  <Sparkles size={16} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* 积分商城 */}
        <div>
          <h2 className="text-sm font-medium text-text-main/50 mb-3">
            积分兑换
          </h2>
          <div className="space-y-3">
            {prizes.map((prize, index) => (
              <motion.div
                key={prize.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-surface rounded-2xl p-4 shadow-sm flex items-center gap-4"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-2xl">
                  {prize.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-text-main text-sm">
                    {prize.name}
                  </h3>
                  <p className="text-primary text-xs mt-1">
                    {prize.points} 积分
                  </p>
                </div>
                <ChevronRight size={20} className="text-text-main/30" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
