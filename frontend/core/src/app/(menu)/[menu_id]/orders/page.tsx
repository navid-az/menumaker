//components
import Link from "next/link";
import { Button } from "@/components/ui/button";

//SVGs
import { ArrowLeft, ConciergeBell } from "lucide-react";

//types
import { type MenuItemType } from "../menu/components/Items/MenuItem";
import { type MenuGlobalStyling } from "../menu/page";
import OrderList from "./components/OrderList";
export type ValidItemType = { item: MenuItemType; count?: number };

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
  const data: MenuItemType[] = await getItems(params.menu_id);
  const globalStyling: MenuGlobalStyling = await getGlobalStyling(
    params.menu_id
  );

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
          disabled
          className="h-12 basis-9/12 rounded-(--radius-base) bg-(--primary) text-base text-(--secondary)"
        >
          ثبت سفارش
        </Button>
        <Button
          size="icon"
          className="h-12 basis-3/12 rounded-(--radius-base) bg-(--primary) text-(--secondary)"
        >
          <ConciergeBell />
        </Button>
      </footer>
    </div>
  );
}
