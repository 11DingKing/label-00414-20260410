"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronDown, MessageCircle, Send } from "lucide-react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";

const faqs = [
  {
    q: "如何获得积分？",
    a: "完成每日任务、参与疗愈游戏、连续签到等都可以获得积分。积分可以用于抽奖和兑换礼品。",
  },
  {
    q: "AI 对话是否保密？",
    a: "是的，您与 AI 的所有对话都是完全保密的。我们采用端到端加密技术保护您的隐私。",
  },
  {
    q: "如何参加线下活动？",
    a: "在「活动」页面可以查看所有线下活动，点击报名即可参加。部分活动可能需要消耗积分。",
  },
  {
    q: "会员有什么特权？",
    a: "会员可以解锁全部疗愈游戏、获得专属心理报告、优先参加线下活动等特权。",
  },
  {
    q: "如何联系人工客服？",
    a: "您可以在本页面底部提交反馈，或发送邮件至 support@mindsoul.com，我们会在24小时内回复。",
  },
];

export default function HelpPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!feedback.trim()) return;
    setSubmitted(true);
    setFeedback("");
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="h-full flex flex-col bg-background pb-24">
      <div className="bg-surface px-4 py-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <Link href="/profile">
            <ArrowLeft size={24} className="text-text-main" />
          </Link>
          <h1 className="text-xl font-bold text-text-main">帮助与反馈</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 hide-scrollbar">
        {/* FAQ */}
        <div>
          <h2 className="text-sm font-medium text-text-main/50 mb-3">常见问题</h2>
          <div className="bg-surface rounded-2xl shadow-sm overflow-hidden">
            {faqs.map((faq, index) => (
              <div key={index} className={index !== faqs.length - 1 ? "border-b border-gray-50" : ""}>
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-4 text-left"
                >
                  <span className="font-medium text-text-main text-sm">{faq.q}</span>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown size={20} className="text-text-main/30" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="px-4 pb-4 text-text-main/60 text-sm">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* 反馈 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface rounded-2xl shadow-sm p-4"
        >
          <div className="flex items-center gap-2 mb-3">
            <MessageCircle size={20} className="text-primary" />
            <h3 className="font-medium text-text-main">提交反馈</h3>
          </div>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="请描述您遇到的问题或建议..."
            className="w-full h-24 p-3 bg-background rounded-xl text-sm text-text-main placeholder:text-text-main/30 focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
          />
          <button
            onClick={handleSubmit}
            className="mt-3 w-full flex items-center justify-center gap-2 py-3 bg-primary text-white rounded-xl font-medium"
          >
            <Send size={18} />
            提交反馈
          </button>
          <AnimatePresence>
            {submitted && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-3 text-center text-primary text-sm"
              >
                感谢您的反馈，我们会尽快处理！
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
}
