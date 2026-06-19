//utils
import { normalizeTime } from "./normalizeTime";

//format time as HH:MM:SS or MM:SS
export const formatTime = (ms: number): string => {
  if (ms <= 0) return "00:00";
  const { hours, minutes, seconds } = normalizeTime(ms);

  if (hours > 0) {
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  }
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
};
