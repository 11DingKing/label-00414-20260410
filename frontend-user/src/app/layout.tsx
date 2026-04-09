import type { Metadata, Viewport } from "next";
import "./globals.css";
import PhoneFrame from "@/components/PhoneFrame";
import React from "react";

export const metadata: Metadata = {
  title: "MindSoul - AI 心理疗愈",
  description: "你的专属 AI 心理疗愈师",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "MindSoul",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#7A9CA6",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

/**
 * 根布局组件
 * - 负责应用的整体结构
 * - 移动端全屏显示
 * - 桌面端显示手机模拟器
 */
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="zh-CN">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body>
        <PhoneFrame>
          <main className="w-full h-full">
            {children}
          </main>
        </PhoneFrame>
      </body>
    </html>
  );
}
