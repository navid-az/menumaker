import React, { useContext } from "react";

//components
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

//libraries
import { cn } from "@/lib/utils";

//SVGs
import { AlignLeft } from "lucide-react";

//types
import { type MenuGlobalStylingUI, type MenuUI } from "@/app/types/ui/menu";

//provider
import { usePreview } from "@/app/(creator)/builder/components/preview/PreviewContext";

export default function Home({
  menuData,
  businessSlug,
  isPreview = false,
  globalStyling,
}: {
  menuData: MenuUI;
  businessSlug?: string;
  isPreview?: boolean;
  globalStyling: MenuGlobalStylingUI;
}) {
  const { setActivePage } = usePreview();
  return (
    <div className="relative flex h-full w-full flex-col justify-between overflow-x-hidden bg-(--primary) transition-all duration-300">
      <section className="flex flex-col gap-4">
        <header className="flex justify-between">
          <svg
            className="absolute -right-20 top-[6vh] text-(--secondary)"
            width="200"
            height="298"
            viewBox="0 0 200 298"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M176.051 238.432C139.017 154.509 100.299 210.098 72.157 178.558C44.0151 147.017 89.654 88.4279 16.8185 66.0655C-41.45 48.1755 -83.7455 51.5566 -97.6097 55.4834"
              stroke="currentcolor"
              strokeOpacity="0.19"
              strokeWidth="2"
            />
            <path
              d="M150.172 269.617C113.137 185.695 74.4194 241.284 46.2775 209.744C18.1357 178.203 63.7746 119.614 -9.061 97.2514C-67.3295 79.3614 -112.136 82.2445 -126 86.1713"
              stroke="currentcolor"
              strokeOpacity="0.19"
              strokeWidth="2"
            />
            <path
              d="M161.208 254.625C124.173 170.702 85.4552 226.291 57.3133 194.751C29.1715 163.21 74.8104 104.621 1.97484 82.2585C-56.2936 64.3685 -98.5892 67.7496 -112.453 71.6764"
              stroke="currentcolor"
              strokeOpacity="0.19"
              strokeWidth="2"
            />
          </svg>
          {menuData.secondary_image && (
            <div className="relative h-[22vh] w-6/12 rounded-bl-(--radius-md)">
              <Image
                src={`http://127.0.0.1:8000${menuData.secondary_image}`}
                fill
                alt="secondary_image"
                className={cn(
                  "rounded-bl-(--radius-md) object-cover transition-all duration-300",
                  globalStyling.style === "retro" &&
                    "border-l-3 border-b-3 border-(--secondary)"
                )}
              ></Image>
            </div>
          )}
          <Button
            size="icon"
            className="ml-4 mt-4 bg-(--secondary) text-(--tertiary) rounded-(--radius-base) transition-all duration-300"
          >
            <AlignLeft></AlignLeft>
          </Button>
          <svg
            className="absolute -left-1 top-[20vh] text-(--secondary)"
            width="200"
            height="298"
            viewBox="0 0 200 298"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M176.051 238.432C139.017 154.509 100.299 210.098 72.157 178.558C44.0151 147.017 89.654 88.4279 16.8185 66.0655C-41.45 48.1755 -83.7455 51.5566 -97.6097 55.4834"
              stroke="currentcolor"
              strokeOpacity="0.19"
              strokeWidth="2"
            />
            <path
              d="M150.172 269.617C113.137 185.695 74.4194 241.284 46.2775 209.744C18.1357 178.203 63.7746 119.614 -9.061 97.2514C-67.3295 79.3614 -112.136 82.2445 -126 86.1713"
              stroke="currentcolor"
              strokeOpacity="0.19"
              strokeWidth="2"
            />
            <path
              d="M161.208 254.625C124.173 170.702 85.4552 226.291 57.3133 194.751C29.1715 163.21 74.8104 104.621 1.97484 82.2585C-56.2936 64.3685 -98.5892 67.7496 -112.453 71.6764"
              stroke="currentcolor"
              strokeOpacity="0.19"
              strokeWidth="2"
            />
          </svg>
        </header>
        <div className="flex flex-col gap-2 px-4 text-(--secondary) z-10 transition-all duration-300">
          <h1
            className={cn(
              "font-semibold",
              menuData.tertiary_image ? "text-3xl" : " text-5xl"
            )}
          >
            {menuData.home_title}
          </h1>
          <h3 className="text-base font-normal">{menuData.home_subtitle}</h3>
        </div>
      </section>
      {menuData.tertiary_image && (
        <div className="absolute left-0 top-[12vh] h-[24vh] w-[110px]">
          <Image
            src={`http://127.0.0.1:8000${menuData.tertiary_image}`}
            fill
            alt="tertiary_image"
            className={cn(
              "rounded-r-(--radius-sm) object-cover transition-all duration-300",
              globalStyling.style === "retro" &&
                "border-3 border-l-0 border-(--secondary)"
            )}
          ></Image>
        </div>
      )}
      <footer className="flex h-[52vh] w-full">
        <Button
          onClick={() => setActivePage("menu")}
          asChild
          className="group flex h-full w-20 flex-col gap-10 rounded-none bg-(--primary) pt-20 text-(--secondary) transition-all duration-300"
        >
          {isPreview ? (
            <div>
              <span className="-rotate-90 transform text-xl">ورود به منو</span>
              <div className="text-4xl">↓</div>
            </div>
          ) : (
            <Link href={`/${businessSlug}/menu`}>
              <span className="-rotate-90 transform text-xl">ورود به منو</span>
              <div className="text-4xl">↓</div>
            </Link>
          )}
        </Button>
        {menuData.primary_image && (
          <div className="relative h-full w-full">
            <Image
              src={`http://127.0.0.1:8000${menuData.primary_image}`}
              fill
              alt="primary_image"
              className={cn(
                "rounded-tr-(--radius-lg) object-cover transition-all duration-300",
                globalStyling.style === "retro" &&
                  "border-3 border-l-0 border-(--secondary)"
              )}
            ></Image>
          </div>
        )}
      </footer>
    </div>
  );
}
