export function GradientSpan({ children }: { children: string }) {
  return (
    <span className="bg-[linear-gradient(135deg,#94d9e2_0%,#0f2c30_70%)] bg-clip-text text-transparent">
      {children}
    </span>
  );
}
