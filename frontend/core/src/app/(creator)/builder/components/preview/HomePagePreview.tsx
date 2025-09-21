//components
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

//SVGs
import { AlignLeft } from "lucide-react";

//libraries
import { cn } from "@/lib/utils";

export default function HomePagePreview({
  imageUrls,
  colors,
  globalBorderRadius,
  homeTitle,
  homeSubtitle,
}: {
  imageUrls: { tempId: string; url: string }[];
  colors: string[];
  globalBorderRadius: "full" | "lg" | "md" | "sm";
  homeTitle: string;
  homeSubtitle: string;
}) {
  return (
    <div className="relative flex h-full w-full flex-col justify-between overflow-x-hidden rounded-[30px] bg-(--secondary) pt-[60px] transition-colors duration-300">
      <section className="flex flex-col gap-4">
        <header className="flex justify-between">
          <svg
            className="absolute -right-20 top-[10vh] text-(--primary) transition-colors duration-300"
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
          {imageUrls[1] ? (
            <div className="relative h-[22vh] w-6/12">
              <Image
                src={`http://127.0.0.1:8000${imageUrls[1]}`}
                fill
                alt="secondary_image"
                className={`${
                  globalBorderRadius === "full"
                    ? "rounded-bl-[100px]"
                    : "rounded-bl-(--radius-exception)"
                } object-cover`}
              ></Image>
            </div>
          ) : (
            <div
              className={cn(
                "relative flex h-[22vh] w-6/12 animate-pulse items-center justify-center bg-(--primary) text-xl text-(--secondary) transition-colors",
                globalBorderRadius === "full"
                  ? "rounded-bl-[100px]"
                  : "rounded-bl-(--radius-exception)"
              )}
            >
              تصویر ۲
            </div>
          )}
          <Button size="icon" className="ml-2 text-(--primary)">
            <AlignLeft></AlignLeft>
          </Button>
          <svg
            className="absolute -left-1 top-[18vh] text-(--primary) transition-colors duration-300"
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
        <div className="flex flex-col gap-2 px-4 text-(--primary) transition-colors duration-300">
          <h1
            className={cn(
              "font-semibold",
              imageUrls[2] ? "text-3xl" : " text-5xl"
            )}
          >
            {homeTitle}
          </h1>
          <h3 className="text-base font-normal transition-colors duration-300">
            {homeSubtitle}
          </h3>
        </div>
      </section>
      {imageUrls[2] ? (
        <div className="absolute left-0 top-[16vh] h-[24vh] w-[100px]">
          <Image
            src={`http://127.0.0.1:8000${imageUrls[2]}`}
            fill
            alt="tertiary_image"
            className={`${
              globalBorderRadius === "full"
                ? "rounded-r-[40px]"
                : "rounded-r-(--radius-exception)"
            } object-cover`}
          ></Image>
        </div>
      ) : (
        <div
          className={cn(
            "absolute left-0 top-[16vh] flex h-[24vh] w-[100px] animate-pulse items-center justify-center bg-(--primary) text-(--secondary) transition-colors",
            globalBorderRadius === "full"
              ? "rounded-r-[40px]"
              : "rounded-r-(--radius-exception)"
          )}
        >
          تصویر ۲
        </div>
      )}
      <footer className="flex h-[52vh] w-screen">
        <Button className="group flex h-full w-20 flex-col gap-20 rounded-none bg-(--secondary) pt-20 text-(--primary) transition-colors duration-300">
          <span className="-rotate-90 transform text-xl">
            ورود به منو آیتم ها
          </span>
          <div className="text-4xl">↓</div>
          {/* <Link href={`/${params.menu_id}/menu`}>
          </Link> */}
        </Button>
        {imageUrls[0] ? (
          <Image
            width={300}
            height={200}
            src={`http://127.0.0.1:8000${imageUrls[0]}`}
            alt="primary_image"
            className={`${
              globalBorderRadius === "full"
                ? "rounded-tr-[120px]"
                : "rounded-tr-(--radius-exception)"
            } rounded-bl-[100px] object-cover`}
          ></Image>
        ) : (
          <div
            className={cn(
              "flex h-full w-[300px] animate-pulse items-center justify-center bg-(--primary) text-2xl text-(--secondary) transition-colors",
              globalBorderRadius === "full"
                ? "rounded-tr-[120px]"
                : "rounded-tr-(--radius-exception)"
            )}
          >
            تصویر ۱
          </div>
        )}
      </footer>
    </div>
  );
}
