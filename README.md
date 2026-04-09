# MindSoul - AI 心理疗愈平台

## How to Run

### 使用 Docker Compose（推荐）

```bash
# 构建并启动所有服务
docker-compose up --build -d

# 查看服务状态
docker-compose ps

# 查看日志
docker-compose logs -f

# 停止所有服务
docker-compose down
```

### 验证 ARM 镜像兼容性（苹果电脑）

```bash
docker pull --platform linux/arm64 node:18-alpine
```

### 本地开发

```bash
cd frontend-user
npm install
npm run dev
# 访问 http://localhost:3000
```

## Services

| 服务名称 | 端口 | 说明 |
|---------|------|------|
| frontend-user | 8081 | 用户端 - AI 心理疗愈 App |

**访问地址**：http://localhost:8081

## 测试账号

| 系统 | 账号 | 密码 |
|------|------|------|
| 用户端 | 无需登录 | 点击微信登录即可体验 |
| 手机号登录 | 任意11位手机号 | 验证码：123456 |

## 题目内容

```
# Role 
资深移动端前端架构师 & UI 设计师。 

# Project Goal 
开发一款名为 "MindSoul" (暂定名) 的 AI 心理疗愈 App 原型。 

# Tech Stack 
- Next.js 14 (App Router) 
- Tailwind CSS (用于样式) 
- Framer Motion (用于丝滑交互动画) 
- Lucide React (图标库) 
- Recharts (用于心理评估图表) 
- Zustand (全局状态管理：积分、用户信息) 

# Design System (关键！) 
1. **容器模拟**：由于是 Web 原型，请在全局 Layout 中强制限制最大宽度为 430px (iPhone 14 Pro Max 宽度)，高度 100vh，居中显示，并添加一个黑色边框模拟手机外壳，顶部模拟 iPhone 的动态岛（Dynamic Island）和状态栏（时间、信号、电量）。 
2. **字体**： 
- 中文：PingFang SC 
- 英文/数字：SF Pro Display 
- 请在 tailwind.config.js 中配置好 font-family。 
3. **色彩风格 (Morandi Blue)**： 
- 参考"弗洛伊德心理健康 App"的专业布局，但色调完全替换。 
- Primary: #7A9CA6 (莫兰迪蓝-主色) 
- Secondary: #BCCCD1 (莫兰迪蓝-辅色) 
- Background: #F7F9FA (极淡的冷灰白) 
- Surface: #FFFFFF (卡片背景) 
- Text-Main: #2C3E50 (深灰蓝，非纯黑) 
4. **UI 特征**： 
- 卡片式设计，圆角统一为 `rounded-2xl`。 
- 阴影柔和 `shadow-sm`。 

# Task 
请初始化项目，配置好上述设计系统，并创建以下路由结构： 
/ (登录页) 
/onboarding (IP生成与初筛) 
/chat (AI疗愈师对话) 
/report (评估报告) 
/games (疗愈游戏大厅) 
/tasks (线下任务与社群) 
/points (积分中心与抽奖) 
/events (线下活动) 
/profile (个人中心)
```

---

## 项目简介

MindSoul 是一款 AI 驱动的心理疗愈 App 原型，旨在提供温暖的心理健康辅助服务。

### 核心功能

- 🤖 **AI 疗愈对话** - 智能心理疗愈师陪伴
- 📊 **心理评估报告** - 多维度健康分析
- 🎮 **疗愈游戏** - 曼陀罗填色、呼吸练习、情绪卡牌、感恩日记
- 🎧 **白噪音** - 雨声、海浪、森林等环境音（Web Audio API 生成）
- ✅ **每日任务** - 培养健康习惯
- 🎁 **积分系统** - 完成任务赚积分、幸运转盘抽奖
- 📅 **线下活动** - 冥想工作坊、情绪沙龙

## 技术栈

| 技术 | 说明 |
|------|------|
| Next.js 14 | React 全栈框架 (App Router) |
| TypeScript | 类型安全 |
| Tailwind CSS | 原子化 CSS |
| Framer Motion | 动画效果 |
| Zustand | 状态管理 |
| Recharts | 数据可视化 |
| Docker | 容器化部署 |

## 项目结构

```
mindsoul/
├── frontend-user/          # 用户端应用
│   ├── src/
│   │   ├── app/            # 页面路由
│   │   │   ├── chat/       # AI 对话
│   │   │   ├── games/      # 疗愈游戏
│   │   │   ├── points/     # 积分中心
│   │   │   ├── profile/    # 个人中心
│   │   │   └── ...
│   │   ├── components/     # 公共组件
│   │   ├── lib/            # 工具库
│   │   └── store/          # 状态管理
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml
├── .gitignore
└── README.md
```

## Mock 数据说明

⚠️ **重要**：本项目为前端原型演示，以下功能使用 Mock 数据，无后端服务支持：

### 1. 用户认证 (Mock)

| 功能 | Mock 方式 | 位置 |
|------|----------|------|
| 微信登录 | 直接跳转，无真实授权 | `page.tsx` (登录页) |
| 手机号登录 | 固定验证码 `123456` | `page.tsx` (登录页) |
| 用户信息 | 硬编码的用户数据 | `profile/page.tsx` |

### 2. AI 对话 (Mock)

| 功能 | Mock 方式 | 位置 |
|------|----------|------|
| AI 回复 | 随机从预设回复中选择 | `chat/page.tsx` → `getAIResponse()` |
| 对话历史 | 本地状态，不持久化 | `chat/page.tsx` |

### 3. 心理评估 (Mock)

| 功能 | Mock 方式 | 位置 |
|------|----------|------|
| 初筛问卷 | 硬编码的问题列表 | `onboarding/page.tsx` → `questions` |
| 评估报告 | 静态示例数据 | `report/page.tsx` |

### 4. 积分系统 (Mock)

| 功能 | Mock 方式 | 位置 |
|------|----------|------|
| 积分余额 | 本地存储 (LocalStorage) | `store/useStore.ts` |
| 抽奖结果 | 随机生成 | `points/page.tsx` |
| 积分商城 | 静态商品列表 | `points/page.tsx` → `prizes` |

### 5. 疗愈游戏 (Mock)

| 功能 | Mock 方式 | 位置 |
|------|----------|------|
| 白噪音 | Web Audio API 生成的噪音 | `games/whitenoise/page.tsx` |
| 情绪卡牌 | 硬编码的情绪列表 | `games/emotion/page.tsx` |
| 感恩日记 | 本地状态 + 示例数据 | `games/gratitude/page.tsx` |

### 6. 任务系统 (Mock)

| 功能 | Mock 方式 | 位置 |
|------|----------|------|
| 每日任务 | 硬编码的任务列表 | `tasks/page.tsx` |
| 任务完成 | 本地存储状态 | `store/useStore.ts` |

### 7. 活动系统 (Mock)

| 功能 | Mock 方式 | 位置 |
|------|----------|------|
| 活动列表 | 硬编码的活动数据 | `events/page.tsx` |
| 活动报名 | 无实际处理 | `events/page.tsx` |

### 8. 其他 Mock

| 功能 | Mock 方式 | 位置 |
|------|----------|------|
| 用户统计 | 硬编码数据 | `profile/page.tsx` → `stats` |
| 成就徽章 | 静态示例数据 | `profile/badges/page.tsx` |
| 疗愈日历 | 示例打卡数据 | `profile/calendar/page.tsx` |
| 会员功能 | 仅展示，无实际功能 | `profile/page.tsx` |

## 设计系统

### 色彩风格 (Morandi Blue)

```css
--primary: #7A9CA6    /* 莫兰迪蓝-主色 */
--secondary: #BCCCD1  /* 莫兰迪蓝-辅色 */
--background: #F7F9FA /* 冷灰白背景 */
--surface: #FFFFFF    /* 卡片背景 */
--text-main: #2C3E50  /* 深灰蓝文字 */
```

### UI 特征

- 卡片式设计，圆角统一 `rounded-2xl`
- 柔和阴影 `shadow-sm`
- 手机模拟器：430px 宽度，模拟 iPhone 14 Pro Max
- 动态岛 + 状态栏模拟

## 注意事项

1. **本项目仅供心理健康辅助使用**，不能替代专业心理咨询或治疗
2. 如有严重心理问题，请及时寻求专业心理医生的帮助
3. 所有用户数据仅存储在浏览器本地，刷新后积分和任务状态会保留

## License

MIT © 2026 MindSoul
