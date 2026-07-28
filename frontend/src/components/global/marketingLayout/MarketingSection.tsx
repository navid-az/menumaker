import * as React from "react";
import { cn } from "@/lib/utils";

type SectionProps = React.ComponentPropsWithRef<"section">;

export function Section({ className, ref, ...props }: SectionProps) {
  return (
    <section
      ref={ref}
      className={cn(
        "mx-auto flex w-full items-center justify-between gap-12 px-4 py-12 lg:px-16 lg:py-24",
        className
      )}
      {...props}
    />
  );
}

interface SectionTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  size?: number;
  color?: string;
  center?: boolean;
}

export function SectionHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex self-start max-w-xl flex-col gap-4",
        className
      )}
      {...props}
    />
  );
}

export function SectionTitle({
  className,
  size,
  color,
  center,
  style,
  ...props
}: SectionTitleProps) {
  return (
    <h2
      className={cn(
        "text-3xl lg:text-4xl xl:text-5xl leading-snug font-semibold lg:font-bold text-primary text-right",
        center && "text-center",
        className
      )}
      {...props}
    />
  );
}

interface SectionSubtitleProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  size?: number;
  color?: string;
  center?: boolean;
}

export function SectionSubtitle({
  className,
  size,
  color,
  center,
  style,
  ...props
}: SectionSubtitleProps) {
  return (
    <p
      className={cn(
        "text-soft-blue/60 font-light max-w-5/6 lg:max-w-md xl:max-w-xl text-right text-sm lg:text-base xl:text-lg",
        center && "mx-auto text-center",
        className
      )}
      {...props}
    />
  );
}

