"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mic, MoreHorizontal, Sparkles } from "lucide-react";
import BottomNav from "@/components/BottomNav";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content: "你好呀～我是小愈，你的专属 AI 疗愈师 💙\n\n今天想聊些什么呢？无论是工作压力、情感困扰，还是只是想找人说说话，我都在这里陪着你。",
    timestamp: new Date(),
  },
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // 模拟 AI 回复
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: getAIResponse(input),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="h-full flex flex-col bg-background pb-24">
      {/* 头部 */}
      <div className="bg-surface px-4 py-3 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
            <Sparkles size={20} className="text-primary" />
          </div>
          <div>
            <h1 className="font-medium text-text-main">小愈</h1>
            <p className="text-xs text-primary">在线 · 随时倾听</p>
          </div>
        </div>
        <button className="p-2">
          <MoreHorizontal size={20} className="text-text-main/50" />
        </button>
      </div>

      {/* 消息列表 */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 hide-scrollbar">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.role === "user"
                    ? "bg-primary text-white rounded-br-md"
                    : "bg-surface text-text-main shadow-sm rounded-bl-md"
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* 正在输入指示器 */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-surface rounded-2xl px-4 py-3 shadow-sm rounded-bl-md">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce [animation-delay:0.1s]" />
                <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce [animation-delay:0.2s]" />
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* 输入区域 */}
      <div className="bg-surface border-t border-gray-100 px-4 py-3">
        <div className="flex items-center gap-3">
          <button className="p-2 text-primary">
            <Mic size={24} />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="说说你的心情..."
            className="flex-1 bg-background rounded-full px-4 py-2 text-sm text-text-main placeholder:text-text-main/30 focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleSend}
            disabled={!input.trim()}
            className={`p-2 rounded-full ${
              input.trim() ? "bg-primary text-white" : "bg-secondary/50 text-text-main/30"
            }`}
          >
            <Send size={20} />
          </motion.button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

function getAIResponse(input: string): string {
  const responses = [
    "我能感受到你现在的心情。能和我多说说吗？我在这里认真听着。",
    "谢谢你愿意和我分享这些。你的感受是完全正常的，每个人都会有这样的时刻。",
    "听起来你最近承受了不少压力。记住，照顾好自己的情绪也是很重要的事情哦。",
    "我理解你的感受。有时候，只是把心里的话说出来，就已经是很勇敢的一步了。",
  ];
  return responses[Math.floor(Math.random() * responses.length)];
}
