//libraries
import { cn } from "@/lib/utils";

//types
type ProgressBarProps = {
  progress: number; // 0 - 100
  size?: number; // any size (default: 175)
  outerColor?: string;
  innerColor?: string;
  className?: string;
};

export default function ProgressBar({
  progress,
  size = 175,
  outerColor = "#EBEBEB",
  innerColor = "#0F2C30",
  className,
}: ProgressBarProps) {
  const strokeOuter = 12; // outer ring thickness (relative)
  const strokeInner = 8; // inner ring thickness (relative)

  const radius = 50 - strokeOuter / 2; // base radius in relative units (0–100 viewBox)
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      className={cn("", className)}
    >
      {/* Outer gray ring */}
      <circle
        cx="50"
        cy="50"
        r={radius}
        stroke={outerColor}
        strokeWidth={strokeOuter}
        fill="none"
        style={{
          transition: "stroke 0.3s ease-in-out", // smooth color change
        }}
      />

      {/* Inner progress ring */}
      <circle
        cx="50"
        cy="50"
        r={radius}
        stroke={innerColor}
        strokeWidth={strokeInner}
        strokeLinecap="round"
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        style={{
          transform: "rotate(-90deg)",
          transformOrigin: "50% 50%",
          transition: `
            stroke-dashoffset 0.8s ease-in-out,
            stroke 0.3s ease-in-out
          `, //smooth progress animation &  color change
        }}
      />
    </svg>
  );
}
