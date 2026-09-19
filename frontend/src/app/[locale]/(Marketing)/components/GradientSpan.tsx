import { cn } from "@/lib/utils";

export function GradientSpan({
  children,
  variant = "dark",
}: {
  children: React.ReactNode;
  variant?: "light" | "dark";
}) {
  return (
    <span
      className={cn(
        "bg-clip-text text-transparent",
        variant === "light"
          ? "rtl:bg-[linear-gradient(135deg,#94d9e2_0%,#a1fcb5_70%)] bg-[linear-gradient(315deg,#94d9e2_0%,#a1fcb5_70%)]"
          : "rtl:bg-[linear-gradient(135deg,#94d9e2_0%,#0f2c30_70%)] bg-[linear-gradient(315deg,#94d9e2_0%,#0f2c30_70%)]"
      )}
    >
      {children}
    </span>
  );
}