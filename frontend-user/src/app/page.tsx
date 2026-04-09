"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, X, Phone, FileText, Shield } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStore } from "@/store/useStore";
import logger from "@/lib/logger";

export default function LoginPage() {
  const router = useRouter();
  const { showSuccess, showError, showInfo } = useStore();
  const [showPhoneLogin, setShowPhoneLogin] = useState(false);
  const [showAgreement, setShowAgreement] = useState<"user" | "privacy" | null>(null);
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);

  const handleSendCode = () => {
    if (phone.length === 11) {
      setCodeSent(true);
      showSuccess("验证码已发送", "演示验证码：123456");
      logger.info("验证码已发送", "Login", { phone: phone.slice(0, 3) + "****" + phone.slice(7) });
    } else {
      showError("手机号格式错误", "请输入正确的11位手机号");
    }
  };

  const handlePhoneLogin = () => {
    if (code === "123456") {
      logger.info("用户登录成功", "Login");
      router.push("/onboarding");
    } else {
      showError("验证码错误", "请输入 123456");
    }
  };

  const handleGuestLogin = () => {
    logger.info("游客模式登录", "Login");
    showInfo("游客模式", "部分功能可能受限");
    router.push("/chat");
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-primary/10 to-background">
      {/* Logo 区域 */}
      <div className="flex-1 flex flex-col items-center justify-center px-8">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-28 h-28 bg-primary rounded-[32px] flex items-center justify-center mb-6 shadow-lg"
        >
          <Heart size={56} className="text-white" strokeWidth={1.5} />
        </motion.div>
        
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-3xl font-bold text-text-main mb-2"
        >
          MindSoul
        </motion.h1>
        
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-secondary text-base"
        >
          你的专属 AI 心理疗愈师
        </motion.p>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex items-center gap-2 mt-8 text-primary/60"
        >
          <Sparkles size={16} />
          <span className="text-sm">温柔陪伴，疗愈心灵</span>
          <Sparkles size={16} />
        </motion.div>
      </div>

      {/* 登录按钮区域 */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="px-8 pb-16"
      >
        <Link href="/onboarding">
          <motion.button
            whileTap={{ scale: 0.98 }}
            className="w-full bg-primary text-white rounded-2xl py-4 text-lg font-medium shadow-lg shadow-primary/30"
          >
            微信登录
          </motion.button>
        </Link>
        
        <div className="flex items-center justify-center gap-4 mt-6">
          <button 
            onClick={() => setShowPhoneLogin(true)}
            className="text-text-main/50 text-sm hover:text-primary transition-colors"
          >
            手机号登录
          </button>
          <span className="text-text-main/20">|</span>
          <button 
            onClick={handleGuestLogin}
            className="text-text-main/50 text-sm hover:text-primary transition-colors"
          >
            游客体验
          </button>
        </div>
        
        <p className="text-center text-xs text-text-main/30 mt-8">
          登录即表示同意
          <button 
            onClick={() => setShowAgreement("user")}
            className="text-primary/60 hover:underline"
          >
            《用户协议》
          </button>
          和
          <button 
            onClick={() => setShowAgreement("privacy")}
            className="text-primary/60 hover:underline"
          >
            《隐私政策》
          </button>
        </p>
      </motion.div>

      {/* 手机号登录弹窗 */}
      <AnimatePresence>
        {showPhoneLogin && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-end justify-center z-50"
            onClick={() => setShowPhoneLogin(false)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              onClick={(e) => e.stopPropagation()}
              className="w-full bg-white rounded-t-3xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-text-main">手机号登录</h2>
                <button onClick={() => setShowPhoneLogin(false)}>
                  <X size={24} className="text-text-main/50" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="tel"
                    placeholder="请输入手机号"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    maxLength={11}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="验证码"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    maxLength={6}
                    className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
                  />
                  <button
                    onClick={handleSendCode}
                    disabled={codeSent}
                    className={`px-4 py-3 rounded-xl text-sm whitespace-nowrap ${
                      codeSent
                        ? "bg-gray-100 text-gray-400"
                        : "bg-primary/10 text-primary"
                    }`}
                  >
                    {codeSent ? "已发送" : "获取验证码"}
                  </button>
                </div>

                <button
                  onClick={handlePhoneLogin}
                  className="w-full py-3 bg-primary text-white rounded-xl font-medium"
                >
                  登录
                </button>

                <p className="text-center text-text-main/30 text-xs">
                  演示验证码：123456
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 用户协议/隐私政策弹窗 */}
      <AnimatePresence>
        {showAgreement && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowAgreement(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-white rounded-2xl p-6 max-h-[80vh] overflow-y-auto"
            >
              <div className="flex items-center gap-3 mb-4">
                {showAgreement === "user" ? (
                  <FileText size={24} className="text-primary" />
                ) : (
                  <Shield size={24} className="text-primary" />
                )}
                <h2 className="text-xl font-bold text-text-main">
                  {showAgreement === "user" ? "用户协议" : "隐私政策"}
                </h2>
              </div>
              
              <div className="text-text-main/70 text-sm space-y-3">
                {showAgreement === "user" ? (
                  <>
                    <p className="font-medium text-text-main">1. 服务说明</p>
                    <p>本应用仅供心理健康辅助使用，不能替代专业心理咨询或治疗。</p>
                    <p className="font-medium text-text-main">2. 专业帮助</p>
                    <p>如有严重心理问题，请及时寻求专业心理医生或心理咨询师的帮助。</p>
                    <p className="font-medium text-text-main">3. 数据安全</p>
                    <p>我们重视并保护您的隐私数据安全，不会泄露您的个人信息。</p>
                  </>
                ) : (
                  <>
                    <p className="font-medium text-text-main">1. 信息收集</p>
                    <p>我们收集的信息仅用于改善服务质量和用户体验。</p>
                    <p className="font-medium text-text-main">2. 对话保密</p>
                    <p>您的对话内容完全保密，仅用于AI模型优化（匿名化处理）。</p>
                    <p className="font-medium text-text-main">3. 数据分享</p>
                    <p>我们不会向任何第三方分享您的个人数据。</p>
                  </>
                )}
              </div>
              
              <button
                onClick={() => setShowAgreement(null)}
                className="w-full mt-6 py-3 bg-primary text-white rounded-xl font-medium"
              >
                我知道了
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
