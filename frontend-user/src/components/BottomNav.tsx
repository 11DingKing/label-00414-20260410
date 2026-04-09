"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { 
  MessageCircle, 
  Gamepad2, 
  ClipboardList,
  CalendarDays,
  Gift, 
  User 
} from "lucide-react";

const navItems = [
  { href: "/chat", icon: MessageCircle, label: "疗愈" },
  { href: "/games", icon: Gamepad2, label: "游戏" },
  { href: "/tasks", icon: ClipboardList, label: "任务" },
  { href: "/events", icon: CalendarDays, label: "活动" },
  { href: "/points", icon: Gift, label: "积分" },
  { href: "/profile", icon: User, label: "我的" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 bg-surface border-t border-gray-100 z-40"
      style={{ paddingBottom: "max(env(safe-area-inset-bottom, 0px), 8px)" }}
    >
      <div className="max-w-[430px] mx-auto flex items-center justify-around pt-2 pb-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon = item.icon;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center gap-0.5 py-1 px-1 min-w-[45px]"
            >
              <motion.div
                whileTap={{ scale: 0.9 }}
                className={`p-1 rounded-lg transition-colors ${
                  isActive ? "bg-primary/10" : ""
                }`}
              >
                <Icon
                  size={20}
                  className={isActive ? "text-primary" : "text-gray-400"}
                  strokeWidth={isActive ? 2.5 : 2}
                />
              </motion.div>
              <span
                className={`text-[9px] ${
                  isActive ? "text-primary font-medium" : "text-gray-400"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
