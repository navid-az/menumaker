import { useEffect, useState } from "react";

//utils
import { formatTime } from "@/lib/formatTime";
import { formatElapsedTime } from "@/lib/formatElapsedTime";
import { toPersianDigits } from "../[locale]/(menu)/[business_slug]/utilities/formatCurrency";

//libraries
import { useLocale } from "next-intl";

// hook to calculate progress between two timestamps
// returns progress (0-100), remaining time and elapsed time
export function useProgress(
  startTime: string,
  endTime: string,
  formatElapsed: boolean = false,
  mode: "countdown" | "countup" = "countdown",
  onExpire?: () => void,
  isInView?: boolean // Used for LiveCards in mockups
) {
  const [progress, setProgress] = useState(100);
  const [remainingMs, setRemainingMs] = useState(0);
  const [elapsedMs, setElapsedMs] = useState(0);

  const locale = useLocale()

  useEffect(() => {
    // If isInView boolean is provided AND progress is NOT in view do not start the progress
    if (isInView === false) return;

    const start = new Date(startTime).getTime();
    const end = new Date(endTime).getTime();
    const total = end - start;

    const tick = () => {
      const now = Date.now();
      const elapsed = now - start;
      let remaining = 0;
      let progress = 0;

      if (mode === "countdown" && end && total) {
        remaining = Math.max(end - now, 0);
        progress = Math.max(100 - (elapsed / total) * 100, 0);
        if (remaining <= 0) onExpire?.();
      } else {
        const maxForFill = 20 * 60 * 1000; // 20 min in ms – adjust to your needs
        progress = Math.min((elapsed / maxForFill) * 100, 100);
      }

      setProgress(progress);
      setRemainingMs(remaining);
      setElapsedMs(elapsed);
    };

    tick(); // initial call
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [startTime, endTime, onExpire, isInView]);

  const formattedElapsed = formatElapsed
    ? formatElapsedTime(elapsedMs, locale as 'en' | 'fa') // Add type safety later
    : formatTime(elapsedMs);

  const result = {
    progress: progress,
    remainingMs: locale === 'fa' ? toPersianDigits(formatTime(remainingMs)) : formatTime(remainingMs),
    elapsedMs: locale === "fa"
      ? toPersianDigits(formattedElapsed)
      : formattedElapsed,
  };

  return {
    ...result,
  };
}
