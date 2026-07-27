import * as React from "react";

//functions
import { cn } from "@/lib/utils";

interface BentoBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3 | 4 | 5 | 6;
}

const gridCols = {
  1: "grid-cols-1 md:grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-3",
  4: "grid-cols-1 md:grid-cols-4",
  5: "grid-cols-1 md:grid-cols-5",
  6: "grid-cols-1 md:grid-cols-6",
}

export function BentoBox({
  cols = 4,
  className,
  children,
  ...props
}: BentoBoxProps) {
  return (
    <div className={cn("grid gap-4", "grid-cols-1",
      `md:${gridCols[cols]}`, className)} {...props}>
      {children}
    </div>
  );
}

interface BentoProps extends React.HTMLAttributes<HTMLDivElement> {
  colSpan?: 1 | 2 | 3 | 4 | 5 | 6;
  rowSpan?: 1 | 2 | 3 | 4 | 5 | 6;
  mobileRowSpan?: 1 | 2 | 3 | 4 | 5 | 6;
}

const colSpans = {
  1: "col-span-1 md:col-span-1",
  2: "col-span-1 md:col-span-2",
  3: "col-span-1 md:col-span-3",
  4: "col-span-1 md:col-span-4",
  5: "col-span-1 md:col-span-5",
  6: "col-span-1 md:col-span-6",
}

const rowSpans = {
  1: "md:row-span-1",
  2: "md:row-span-2",
  3: "md:row-span-3",
  4: "md:row-span-4",
  5: "md:row-span-5",
  6: "md:row-span-6",
}

// Mobile-only row spans (applied below md)
const mobileRowSpans = {
  1: "row-span-1",
  2: "row-span-2",
  3: "row-span-3",
  4: "row-span-4",
  5: "row-span-5",
  6: "row-span-6",
}

export function Bento({
  colSpan = 1,
  rowSpan = 1,
  mobileRowSpan = 1,
  className,
  children,
  ...props
}: BentoProps) {
  return (
    <div
      className={cn(
        "flex h-full flex-col hover:border-royal-green rounded-xl border border-sad-blue relative gap-4 bg-background p-4 lg:p-6 transition-all duration-300 scale-pro hover:scale-[101%] hover:shadow-xl shadow-gray-200",
        colSpans[colSpan],
        mobileRowSpans[mobileRowSpan],
        rowSpans[rowSpan],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function BentoHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex flex-col space-y-2", className)} {...props} />
  );
}

export function BentoTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        "text-lg lg:text-xl text-royal-green font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  );
}

export function BentoDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-xs lg:text-sm text text-teal-950/60", className)} {...props} />
  );
}

export function BentoBody({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex-1", className)} {...props} />;
}

export function BentoFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("mt-auto flex items-center pt-6", className)}
      {...props}
    />
  );
}
