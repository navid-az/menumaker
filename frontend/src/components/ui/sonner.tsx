"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      style={{ fontFamily: "inherit" }}
      duration={10000}
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast !bg-soft-blue/80 !text-royal-green border-royal-green backdrop-blur-sm shadow-xl",

          description:
            "text-muted-foreground",

          actionButton:
            "bg-primary text-primary-foreground",

          cancelButton:
            "bg-primary text-primary-foreground rounded-full px-3 active:scale-90 transition-all",

          closeButton:
            "border-sad-blue text-primary",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
