//components
import Link from "next/link";
import { Button } from "@/components/ui/button";
import OrderList from "./components/OrderList";

//SVGs
import { ArrowLeft, ConciergeBell } from "lucide-react";

//types
import { type MenuItem } from "@/app/types/api/menu";
import { type MenuGlobalStyling } from "@/app/types/api/menu";
export type ValidItemType = { item: MenuItem; count?: number };

//libraries
import { cn } from "@/lib/utils";

// GET menu items
async function getItems(menu_id: string) {
  try {
    let res = await fetch(`http://127.0.0.1:8000/business/${menu_id}/items`);
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

export default async function Page(props: {
  params: Promise<{ menu_id: string }>;
}) {
  const params = await props.params;
  const data: MenuItem[] = await getItems(params.menu_id);
  const globalStyling: MenuGlobalStyling = await getGlobalStyling(
    params.menu_id
  );

  const isDisabled = true;
  return (
    <div className="container flex h-screen flex-col justify-between gap-8 p-4">
      <header className="flex items-center justify-between">
        <h3 className="text-lg text-(--primary)">لیست سفارشات</h3>
        <Button
          size="icon"
          variant="ghost"
          className="rounded-(--radius-base) text-(--primary)"
          asChild
        >
          <Link href={`/${params.menu_id}/menu`}>
            <ArrowLeft className="h-7 w-7"></ArrowLeft>
          </Link>
        </Button>
      </header>
      <OrderList data={data} globalStyling={globalStyling} />
      <footer className="flex gap-4">
        <Button
          disabled={isDisabled}
          className={cn(
            "h-12 basis-9/12 rounded-(--radius-base) bg-(--primary) text-base text-(--secondary) transition-all duration-300",
            globalStyling.style === "retro" &&
              `border-3 border-(--secondary) ${!isDisabled && "shadow-[4px_4px_0px_0px_var(--secondary)]"}`
          )}
        >
          ثبت سفارش
        </Button>
        <Button
          size="icon"
          className={cn(
            "h-12 basis-3/12 rounded-(--radius-base) bg-(--primary) text-(--secondary)",
            globalStyling.style === "retro" &&
              "border-3 border-(--secondary) shadow-[4px_4px_0px_0px_var(--secondary)]"
          )}
        >
          <ConciergeBell />
        </Button>
      </footer>
    </div>
  );
}
