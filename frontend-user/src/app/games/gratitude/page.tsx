"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Heart, Plus, Trash2, Save } from "lucide-react";
import Link from "next/link";
import { useStore } from "@/store/useStore";
import logger from "@/lib/logger";

interface GratitudeItem {
  id: number;
  text: string;
  date: string;
}

const initialItems: GratitudeItem[] = [
  { id: 1, text: "今天阳光很好，心情也跟着明朗起来", date: "2026-02-03" },
  { id: 2, text: "感谢朋友的一通电话，让我感到被关心", date: "2026-02-02" },
  { id: 3, text: "完成了一个小目标，为自己感到骄傲", date: "2026-02-01" },
];

export default function GratitudePage() {
  const [items, setItems] = useState<GratitudeItem[]>(initialItems);
  const [newItem, setNewItem] = useState("");
  const [showInput, setShowInput] = useState(false);
  const { addPoints, showSuccess, showWarning } = useStore();

  const handleAdd = () => {
    if (!newItem.trim()) {
      showWarning("内容不能为空", "请输入你想记录的感恩内容");
      return;
    }
    
    const item: GratitudeItem = {
      id: Date.now(),
      text: newItem,
      date: new Date().toISOString().split("T")[0],
    };
    
    setItems([item, ...items]);
    setNewItem("");
    setShowInput(false);
    addPoints(15);
    logger.info("感恩日记已保存", "GratitudeGame", { itemId: item.id });
    showSuccess("获得 15 积分！", "感恩记录已保存，继续保持这份美好的心态");
  };

  const handleDelete = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
    logger.info("删除感恩记录", "GratitudeGame", { itemId: id });
  };

  return (
    <div className="h-full flex flex-col bg-background">
      <div className="px-4 py-4 flex items-center justify-between bg-surface border-b border-gray-100">
        <Link href="/games">
          <ArrowLeft size={24} className="text-text-main" />
        </Link>
        <h1 className="font-bold text-text-main">感恩日记</h1>
        <button onClick={() => setShowInput(true)}>
          <Plus size={24} className="text-primary" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 hide-scrollbar">
        {/* 添加新记录 */}
        <AnimatePresence>
          {showInput && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4"
            >
              <div className="bg-surface rounded-2xl p-4 shadow-sm">
                <textarea
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                  placeholder="今天有什么值得感恩的事情？"
                  className="w-full h-24 p-3 bg-background rounded-xl text-sm text-text-main placeholder:text-text-main/30 focus:outline-none resize-none"
                  autoFocus
                />
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => setShowInput(false)}
                    className="flex-1 py-2 border border-gray-200 rounded-xl text-text-main/50"
                  >
                    取消
                  </button>
                  <button
                    onClick={handleAdd}
                    className="flex-1 py-2 bg-primary text-white rounded-xl flex items-center justify-center gap-2"
                  >
                    <Save size={18} />
                    保存
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 提示 */}
        <div className="bg-primary/10 rounded-2xl p-4 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Heart size={18} className="text-primary" />
            <span className="font-medium text-primary">每日感恩</span>
          </div>
          <p className="text-text-main/60 text-sm">
            记录生活中的美好瞬间，培养积极心态
          </p>
        </div>

        {/* 记录列表 */}
        <div className="space-y-3">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-surface rounded-2xl p-4 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-text-main text-sm">{item.text}</p>
                  <p className="text-text-main/30 text-xs mt-2">{item.date}</p>
                </div>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 size={16} className="text-red-400" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {items.length === 0 && (
          <div className="text-center py-12">
            <p className="text-text-main/30">还没有感恩记录</p>
            <p className="text-text-main/30 text-sm mt-1">点击右上角添加</p>
          </div>
        )}
      </div>
    </div>
  );
}
