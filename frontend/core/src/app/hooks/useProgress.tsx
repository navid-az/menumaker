import { useEffect, useState } from "react";

//utils
import { formatElapsedTime } from "@/lib/formatElapsedTime";
import { formatTime } from "@/lib/formatTime";
import { toPersianDigits } from "../(menu)/[menu_id]/utilities/formatCurrency";

// hook to calculate progress between two timestamps
// returns progress (0-100), remaining time and elapsed time
export function useProgress(
  startTime: string,
  endTime: string,
  onExpire?: () => void,
  formatDigits: boolean = false
) {
  const [progress, setProgress] = useState(100);
  const [remainingMs, setRemainingMs] = useState(0);
  const [elapsedMs, setElapsedMs] = useState(0);

  useEffect(() => {
    const start = new Date(startTime).getTime();
    const end = new Date(endTime).getTime();
    const total = end - start;

    const tick = () => {
      const now = Date.now();
      const elapsed = now - start;
      const remaining = Math.max(end - now, 0);
      const newProgress = Math.max(100 - (elapsed / total) * 100, 0);

      setProgress(newProgress);
      setRemainingMs(remaining);
      setElapsedMs(elapsed);

      if (remaining <= 0) onExpire?.();
    };

    tick(); // initial call
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [startTime, endTime, onExpire]);

  const result = {
    progress: progress,
    formattedRemaining: formatDigits
      ? toPersianDigits(formatTime(remainingMs))
      : formatTime(remainingMs),
    formattedElapsed: formatDigits
      ? formatElapsedTime(elapsedMs)
      : toPersianDigits(formatElapsedTime(elapsedMs)),
  };

  return {
    ...result,
  };
}
