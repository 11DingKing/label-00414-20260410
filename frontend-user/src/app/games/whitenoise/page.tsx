"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Play, Pause, Volume2 } from "lucide-react";
import Link from "next/link";
import { useStore } from "@/store/useStore";
import logger from "@/lib/logger";

// 使用免费的 Web Audio API 生成白噪音
const sounds = [
  { id: 1, name: "雨声", icon: "🌧️", desc: "轻柔的雨滴声", type: "rain" },
  { id: 2, name: "海浪", icon: "🌊", desc: "海边的浪涛声", type: "ocean" },
  { id: 3, name: "森林", icon: "🌲", desc: "鸟鸣与风声", type: "forest" },
  { id: 4, name: "篝火", icon: "🔥", desc: "温暖的火焰声", type: "fire" },
  { id: 5, name: "溪流", icon: "💧", desc: "潺潺的流水声", type: "stream" },
  { id: 6, name: "风声", icon: "🍃", desc: "轻柔的微风", type: "wind" },
];

// 使用 Web Audio API 生成不同类型的白噪音
class NoiseGenerator {
  private audioContext: AudioContext | null = null;
  private gainNode: GainNode | null = null;
  private noiseNode: AudioBufferSourceNode | null = null;
  private filterNode: BiquadFilterNode | null = null;
  private isPlaying = false;

  createNoise(type: string): AudioBuffer | null {
    if (!this.audioContext) return null;
    
    const bufferSize = 2 * this.audioContext.sampleRate;
    const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      // 基础白噪音
      let sample = Math.random() * 2 - 1;
      
      // 根据类型调整波形
      switch (type) {
        case "rain":
          // 雨声：添加周期性的滴答感
          sample *= 0.3 + 0.7 * Math.abs(Math.sin(i / 100));
          break;
        case "ocean":
          // 海浪：慢速正弦调制
          sample *= 0.3 + 0.7 * Math.abs(Math.sin(i / 44100));
          break;
        case "forest":
          // 森林：更轻柔的噪音
          sample *= 0.5;
          break;
        case "fire":
          // 篝火：不规则噼啪声
          if (Math.random() > 0.999) sample *= 3;
          sample *= 0.4;
          break;
        case "stream":
          // 溪流：高频成分更多
          sample = sample * 0.3 + (Math.random() * 2 - 1) * 0.2;
          break;
        case "wind":
          // 风声：低频调制
          sample *= 0.3 + 0.4 * Math.sin(i / 8820);
          break;
      }
      
      data[i] = sample;
    }
    
    return buffer;
  }

  play(type: string, volume: number) {
    try {
      // 创建或恢复 AudioContext
      if (!this.audioContext) {
        this.audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      }

      if (this.audioContext.state === "suspended") {
        this.audioContext.resume();
      }

      this.stop();

      // 创建增益节点控制音量
      this.gainNode = this.audioContext.createGain();
      this.gainNode.gain.value = volume / 100;

      // 创建滤波器使声音更自然
      this.filterNode = this.audioContext.createBiquadFilter();
      this.filterNode.type = "lowpass";
      
      // 根据声音类型调整滤波器
      switch (type) {
        case "rain":
          this.filterNode.frequency.value = 3000;
          break;
        case "ocean":
          this.filterNode.frequency.value = 1500;
          break;
        case "forest":
          this.filterNode.frequency.value = 4000;
          break;
        case "fire":
          this.filterNode.frequency.value = 2500;
          break;
        case "stream":
          this.filterNode.frequency.value = 5000;
          break;
        case "wind":
          this.filterNode.frequency.value = 800;
          break;
        default:
          this.filterNode.frequency.value = 2000;
      }

      // 创建并配置噪音源
      const buffer = this.createNoise(type);
      if (!buffer) {
        logger.error("无法创建音频缓冲区", "WhiteNoise");
        return;
      }

      this.noiseNode = this.audioContext.createBufferSource();
      this.noiseNode.buffer = buffer;
      this.noiseNode.loop = true;

      // 连接节点
      this.noiseNode.connect(this.filterNode);
      this.filterNode.connect(this.gainNode);
      this.gainNode.connect(this.audioContext.destination);

      // 开始播放
      this.noiseNode.start();
      this.isPlaying = true;
      
      logger.info(`开始播放白噪音: ${type}`, "WhiteNoise");
    } catch (error) {
      logger.error("播放白噪音失败", "WhiteNoise", error);
    }
  }

  stop() {
    if (this.noiseNode) {
      try {
        this.noiseNode.stop();
        this.noiseNode.disconnect();
      } catch {
        // 忽略已停止的节点错误
      }
      this.noiseNode = null;
    }
    if (this.filterNode) {
      this.filterNode.disconnect();
      this.filterNode = null;
    }
    if (this.gainNode) {
      this.gainNode.disconnect();
      this.gainNode = null;
    }
    this.isPlaying = false;
    logger.info("停止播放白噪音", "WhiteNoise");
  }

  setVolume(volume: number) {
    if (this.gainNode) {
      this.gainNode.gain.value = volume / 100;
    }
  }

  getIsPlaying() {
    return this.isPlaying;
  }
}

export default function WhiteNoisePage() {
  const [playing, setPlaying] = useState<number | null>(null);
  const [volume, setVolume] = useState(70);
  const { addPoints, showSuccess, showInfo } = useStore();
  const noiseGeneratorRef = useRef<NoiseGenerator | null>(null);
  const pointsGivenRef = useRef(false);

  // 初始化噪音生成器
  useEffect(() => {
    noiseGeneratorRef.current = new NoiseGenerator();
    
    return () => {
      // 组件卸载时停止播放
      noiseGeneratorRef.current?.stop();
    };
  }, []);

  // 音量变化时更新
  useEffect(() => {
    noiseGeneratorRef.current?.setVolume(volume);
  }, [volume]);

  const togglePlay = (id: number) => {
    const sound = sounds.find(s => s.id === id);
    if (!sound) return;

    if (playing === id) {
      // 停止播放
      noiseGeneratorRef.current?.stop();
      setPlaying(null);
    } else {
      // 开始播放新声音
      noiseGeneratorRef.current?.play(sound.type, volume);
      setPlaying(id);
      
      // 首次播放给积分
      if (!pointsGivenRef.current) {
        setTimeout(() => {
          if (noiseGeneratorRef.current?.getIsPlaying()) {
            addPoints(5);
            showSuccess("获得 5 积分！", "感谢你使用白噪音放松身心");
            pointsGivenRef.current = true;
          }
        }, 3000);
      }
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (newVolume === 0) {
      showInfo("已静音", "拖动滑块恢复音量");
    }
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-primary/5 to-background">
      <div className="px-4 py-4 flex items-center justify-between bg-surface/80 backdrop-blur">
        <Link href="/games">
          <ArrowLeft size={24} className="text-text-main" />
        </Link>
        <h1 className="font-bold text-text-main">白噪音</h1>
        <div className="w-6" />
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 hide-scrollbar">
        <p className="text-text-main/50 text-sm mb-4 text-center">
          选择一种声音，放松身心
        </p>

        <div className="grid grid-cols-2 gap-3">
          {sounds.map((sound) => (
            <motion.button
              key={sound.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => togglePlay(sound.id)}
              className={`bg-surface rounded-2xl p-4 shadow-sm text-left ${
                playing === sound.id ? "ring-2 ring-primary" : ""
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl">{sound.icon}</span>
                {playing === sound.id ? (
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                  >
                    <Pause size={20} className="text-primary" />
                  </motion.div>
                ) : (
                  <Play size={20} className="text-text-main/30" />
                )}
              </div>
              <h3 className="font-medium text-text-main">{sound.name}</h3>
              <p className="text-text-main/40 text-xs mt-1">{sound.desc}</p>
            </motion.button>
          ))}
        </div>

        {/* 音量控制 */}
        {playing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 bg-surface rounded-2xl p-4 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <Volume2 size={20} className="text-primary" />
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => handleVolumeChange(Number(e.target.value))}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <span className="text-text-main/50 text-sm w-8">{volume}%</span>
            </div>
          </motion.div>
        )}

        {/* 正在播放提示 */}
        {playing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-center"
          >
            <p className="text-primary text-sm">
              正在播放：{sounds.find((s) => s.id === playing)?.name}
            </p>
            <p className="text-text-main/30 text-xs mt-1">
              持续收听可获得积分奖励
            </p>
          </motion.div>
        )}
      </div>

      {/* 底部提示 */}
      <div className="px-4 pb-8">
        <div className="bg-primary/10 rounded-2xl p-4 text-center">
          <p className="text-primary text-sm">
            💡 白噪音可以帮助集中注意力、改善睡眠
          </p>
        </div>
      </div>
    </div>
  );
}
