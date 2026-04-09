/**
 * 统一日志记录工具
 * 在开发环境输出到控制台，生产环境可扩展为发送到日志服务
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  context?: string;
  data?: unknown;
}

const isDev = process.env.NODE_ENV !== 'production';

const formatLog = (entry: LogEntry): string => {
  const { level, message, timestamp, context, data } = entry;
  const contextStr = context ? `[${context}]` : '';
  const dataStr = data ? `\n${JSON.stringify(data, null, 2)}` : '';
  return `[${timestamp}] [${level.toUpperCase()}] ${contextStr} ${message}${dataStr}`;
};

const createLogEntry = (
  level: LogLevel,
  message: string,
  context?: string,
  data?: unknown
): LogEntry => ({
  level,
  message,
  timestamp: new Date().toISOString(),
  context,
  data,
});

/**
 * 日志记录器
 * @example
 * logger.info('用户登录成功', 'Auth', { userId: 123 })
 * logger.error('API调用失败', 'Chat', error)
 */
export const logger = {
  debug: (message: string, context?: string, data?: unknown) => {
    if (!isDev) return;
    const entry = createLogEntry('debug', message, context, data);
    console.debug(formatLog(entry));
  },

  info: (message: string, context?: string, data?: unknown) => {
    const entry = createLogEntry('info', message, context, data);
    if (isDev) {
      console.info(formatLog(entry));
    }
    // 生产环境可在此发送到日志服务
  },

  warn: (message: string, context?: string, data?: unknown) => {
    const entry = createLogEntry('warn', message, context, data);
    console.warn(formatLog(entry));
    // 可在此发送到日志服务
  },

  error: (message: string, context?: string, data?: unknown) => {
    const entry = createLogEntry('error', message, context, data);
    console.error(formatLog(entry));
    // 可在此发送到错误监控服务（如 Sentry）
  },
};

export default logger;
