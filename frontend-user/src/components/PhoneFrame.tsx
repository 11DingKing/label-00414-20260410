"use client";

import { ReactNode, useEffect, useState } from "react";
import ToastContainer from "./Toast";

interface PhoneFrameProps {
  children: ReactNode;
}

export default function PhoneFrame({ children }: PhoneFrameProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      // 检测是否为移动设备（宽度小于 768px 或者是触摸设备）
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // 移动设备：全屏显示，无手机外壳
  if (isMobile) {
    return (
      <div className="min-h-screen w-full bg-background">
        {/* 状态栏占位 - 移动端使用系统状态栏 */}
        <div className="h-[env(safe-area-inset-top,0px)]" />
        
        {/* Toast 通知容器 */}
        <ToastContainer />
        
        {/* 页面内容 */}
        <div className="h-screen overflow-y-auto hide-scrollbar">
          {children}
        </div>
      </div>
    );
  }

  // 桌面设备：显示手机模拟器
  return (
    <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center p-4">
      {/* 手机外壳 */}
      <div className="relative w-full max-w-[430px] h-[90vh] max-h-[932px] bg-black rounded-[55px] p-3 shadow-2xl">
        {/* 手机屏幕 */}
        <div className="relative w-full h-full bg-background rounded-[45px] overflow-hidden">
          {/* 状态栏 */}
          <StatusBar />
          
          {/* Toast 通知容器 */}
          <ToastContainer />
          
          {/* 页面内容 */}
          <div className="h-full pt-12 overflow-y-auto hide-scrollbar">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusBar() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("zh-CN", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      );
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute top-0 left-0 right-0 z-50 px-8 pt-3 pb-1">
      <div className="flex items-center justify-between text-text-main text-sm font-medium">
        {/* 时间 */}
        <span className="w-16 font-english">{time}</span>
        
        {/* 动态岛 */}
        <div className="w-[126px] h-[37px] bg-black rounded-full" />
        
        {/* 状态图标 */}
        <div className="w-16 flex items-center justify-end gap-1">
          {/* 信号 */}
          <svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor">
            <rect x="0" y="8" width="3" height="4" rx="0.5" />
            <rect x="5" y="5" width="3" height="7" rx="0.5" />
            <rect x="10" y="2" width="3" height="10" rx="0.5" />
            <rect x="15" y="0" width="3" height="12" rx="0.5" />
          </svg>
          {/* WiFi */}
          <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor">
            <path d="M8 9.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM8 6c-2.2 0-4.2.9-5.7 2.3l1.4 1.4C4.9 8.6 6.4 8 8 8s3.1.6 4.3 1.7l1.4-1.4C12.2 6.9 10.2 6 8 6zm0-4C4.7 2 1.7 3.3 0 5.5l1.4 1.4C2.9 5.1 5.3 4 8 4s5.1 1.1 6.6 2.9L16 5.5C14.3 3.3 11.3 2 8 2z" />
          </svg>
          {/* 电量 */}
          <div className="flex items-center">
            <div className="w-[25px] h-[12px] border border-current rounded-[3px] p-[1px]">
              <div className="w-[80%] h-full bg-current rounded-[1px]" />
            </div>
            <div className="w-[1.5px] h-[5px] bg-current rounded-r-sm ml-[1px]" />
          </div>
        </div>
      </div>
    </div>
  );
}
