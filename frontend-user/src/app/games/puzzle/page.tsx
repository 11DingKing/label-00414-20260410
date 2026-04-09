"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, RotateCcw, Trophy } from "lucide-react";
import Link from "next/link";
import { useStore } from "@/store/useStore";

const images = ["🌸", "🌺", "🌻", "🌷", "🌹", "🌼", "💐", "🪷"];

function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function PuzzlePage() {
  const [tiles, setTiles] = useState<string[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [completed, setCompleted] = useState(false);
  const { addPoints } = useStore();

  useEffect(() => {
    initGame();
  }, []);

  const initGame = () => {
    const pairs = [...images, ...images];
    setTiles(shuffle(pairs));
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setCompleted(false);
  };

  const handleTileClick = (index: number) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) {
      return;
    }

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [first, second] = newFlipped;
      
      if (tiles[first] === tiles[second]) {
        setMatched((m) => [...m, first, second]);
        setFlipped([]);
        
        if (matched.length + 2 === tiles.length) {
          setCompleted(true);
          addPoints(20);
        }
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  return (
    <div className="h-full flex flex-col bg-background">
      <div className="px-4 py-4 flex items-center justify-between bg-surface border-b border-gray-100">
        <Link href="/games">
          <ArrowLeft size={24} className="text-text-main" />
        </Link>
        <h1 className="font-bold text-text-main">正念拼图</h1>
        <button onClick={initGame}>
          <RotateCcw size={24} className="text-text-main/50" />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4">
        {completed ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <Trophy size={64} className="text-yellow-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-text-main mb-2">恭喜完成！</h2>
            <p className="text-text-main/50">用了 {moves} 步完成拼图</p>
            <p className="text-primary mt-2">获得 20 积分！</p>
            <button
              onClick={initGame}
              className="mt-6 px-6 py-3 bg-primary text-white rounded-full"
            >
              再玩一次
            </button>
          </motion.div>
        ) : (
          <>
            <p className="text-text-main/50 mb-4">步数：{moves}</p>
            
            <div className="grid grid-cols-4 gap-2">
              {tiles.map((tile, index) => {
                const isFlipped = flipped.includes(index) || matched.includes(index);
                return (
                  <motion.button
                    key={index}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleTileClick(index)}
                    className={`w-16 h-16 rounded-xl flex items-center justify-center text-2xl ${
                      isFlipped
                        ? matched.includes(index)
                          ? "bg-primary/20"
                          : "bg-surface"
                        : "bg-primary"
                    } shadow-sm`}
                  >
                    {isFlipped ? tile : "?"}
                  </motion.button>
                );
              })}
            </div>

            <p className="mt-6 text-text-main/30 text-sm text-center">
              翻开卡片，找到相同的配对
            </p>
          </>
        )}
      </div>

      <div className="px-4 pb-8">
        <div className="bg-primary/10 rounded-2xl p-4 text-center">
          <p className="text-primary text-sm">
            🧩 专注于当下，享受拼图的乐趣
          </p>
        </div>
      </div>
    </div>
  );
}
