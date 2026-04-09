import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ToastMessage, ToastType } from "@/components/Toast";

interface UserInfo {
  id: string;
  nickname: string;
  avatar: string;
  ipCharacter: string; // 用户的 IP 形象
}

interface AppState {
  // 用户信息
  user: UserInfo | null;
  setUser: (user: UserInfo) => void;
  
  // 积分系统
  points: number;
  addPoints: (amount: number) => void;
  deductPoints: (amount: number) => boolean;
  
  // 登录状态
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  
  // 完成的任务
  completedTasks: string[];
  completeTask: (taskId: string) => void;
  
  // Toast 通知系统
  toasts: ToastMessage[];
  addToast: (type: ToastType, title: string, description?: string, duration?: number) => void;
  removeToast: (id: string) => void;
  
  // 便捷方法
  showSuccess: (title: string, description?: string) => void;
  showError: (title: string, description?: string) => void;
  showWarning: (title: string, description?: string) => void;
  showInfo: (title: string, description?: string) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // 用户信息
      user: null,
      setUser: (user) => set({ user }),
      
      // 积分系统
      points: 0,
      addPoints: (amount) => set((state) => ({ points: state.points + amount })),
      deductPoints: (amount) => {
        const currentPoints = get().points;
        if (currentPoints >= amount) {
          set({ points: currentPoints - amount });
          return true;
        }
        return false;
      },
      
      // 登录状态
      isLoggedIn: false,
      login: () => set({ isLoggedIn: true }),
      logout: () => set({ isLoggedIn: false, user: null, points: 0 }),
      
      // 完成的任务
      completedTasks: [],
      completeTask: (taskId) =>
        set((state) => ({
          completedTasks: [...state.completedTasks, taskId],
        })),
      
      // Toast 通知系统
      toasts: [],
      addToast: (type, title, description, duration = 3000) => {
        const id = Date.now().toString() + Math.random().toString(36).slice(2);
        const toast: ToastMessage = { id, type, title, description, duration };
        set((state) => ({ toasts: [...state.toasts, toast] }));
      },
      removeToast: (id) => {
        set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
      },
      
      // 便捷方法
      showSuccess: (title, description) => get().addToast("success", title, description),
      showError: (title, description) => get().addToast("error", title, description),
      showWarning: (title, description) => get().addToast("warning", title, description),
      showInfo: (title, description) => get().addToast("info", title, description),
    }),
    {
      name: "mindsoul-storage",
      // 排除 toasts，不需要持久化
      partialize: (state) => ({
        user: state.user,
        points: state.points,
        isLoggedIn: state.isLoggedIn,
        completedTasks: state.completedTasks,
      }),
    }
  )
);
