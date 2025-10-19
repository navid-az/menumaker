//utils
import { normalizeTime } from "./normalizeTime";

export const formatElapsedTime = (ms: number): string => {
  const { hours, minutes, seconds } = normalizeTime(ms);

  if (hours > 0) return `${hours}س ${minutes}د`;
  if (minutes > 0) return `${minutes}د ${seconds}ث`;
  return `${seconds} ثانیه`;
};
