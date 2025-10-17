import { useEffect, useState } from "react";

const getProgress = (startTime: number, endTime: number) => {
  const now = Date.now();
  const total = endTime - startTime; // total duration
  const elapsed = now - startTime; // remaining time
  const progress = Math.min((elapsed / total) * 100, 100); // cap at 100%
  return progress;
};

export function useProgress(startTime: string, endTime: string) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = new Date(startTime).getTime();
    const end = new Date(endTime).getTime();

    const update = () => {
      setProgress(getProgress(start, end));
    };

    update(); // initial

    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [startTime, endTime]);

  return progress;
}
