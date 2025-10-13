//components
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

//SVGs
import { AlignLeft } from "lucide-react";

//libraries
import { cn } from "@/lib/utils";

//types
import { type Menu } from "@/app/types/api/menu";

// GET menu data
export async function getMenuData(menu_id: string) {
  try {
    let res = await fetch(`http://127.0.0.1:8000/menu/${menu_id}`);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error("error fetching data:", error);
  }
}
// GET menu global stylings
export async function getGlobalStyling(menu_id: string) {
  try {
    let res = await fetch(
      `http://127.0.0.1:8000/menu/${menu_id}/global-styling/`
    );
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error("error fetching data:", error);
  }
}

export default async function page(props: {
  params: Promise<{ menu_id: string }>;
}) {
  const params = await props.params;

  const menuData: Menu = await getMenuData(params.menu_id);

  return (
    <div className="relative flex h-screen w-screen flex-col justify-between overflow-x-hidden bg-(--secondary)">
      <section className="flex flex-col gap-4">
        <header className="flex justify-between">
          <svg
            className="absolute -right-20 top-[6vh] text-(--primary)"
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
            <div className="relative h-[22vh] w-6/12">
              <Image
                src={`http://127.0.0.1:8000${menuData.secondary_image}`}
                fill
                alt="secondary_image"
                className="rounded-bl-(--radius-md) object-cover"
              ></Image>
            </div>
          )}
          <Button
            size="icon"
            className="ml-4 mt-4 bg-(--secondary) text-(--primary)"
          >
            <AlignLeft></AlignLeft>
          </Button>
          <svg
            className="absolute -left-1 top-[20vh] text-(--primary)"
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
        <div className="flex flex-col gap-2 px-4 text-(--primary)">
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
            className="rounded-r-(--radius-sm) object-cover"
          ></Image>
        </div>
      )}
      <footer className="flex h-[52vh] w-screen">
        <Button
          asChild
          className="group flex h-full w-20 flex-col gap-20 rounded-none bg-(--secondary) pt-20 text-(--primary)"
        >
          <Link href={`/${params.menu_id}/menu`}>
            <span className="-rotate-90 transform text-xl">
              ورود به منو آیتم ها
            </span>
            <div className="text-4xl">↓</div>
          </Link>
        </Button>
        <div className="relative h-full w-full">
          <Image
            src={`http://127.0.0.1:8000${menuData.primary_image}`}
            fill
            alt="primary_image"
            className="rounded-tr-(--radius-lg) object-cover"
          ></Image>
        </div>
      </footer>
    </div>
  );
}
