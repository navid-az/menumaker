"use client";

import Link from "next/link";

//components
import OrderedItem from "./components/OrderedItem";
import { Button } from "@/components/ui/button";

//hooks
import { useItems } from "../menu/components/ItemsContext";

// react query
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import PriceTag from "../menu/components/PriceTag";

//SVGs
import { ArrowLeft } from "@/app/components/svgs";

export default function Orders({ params }) {
  const { items, getItemQuantity } = useItems();

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["items"],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://127.0.0.1:8000/menu/single/items/${params.menu_id}`
      );
      return data;
    },
  });

  return (
    <div className="container mx-auto flex h-screen flex-col gap-8 p-4">
      <header className="flex items-center justify-between transition-all">
        <Button size="icon" className=" rounded-full bg-royal-green" asChild>
          <Link href={`/${params.menu_id}/menu`}>
            <ArrowLeft className={`stroke-sky-blue text-xl`} />
          </Link>
        </Button>
        <h1 className=" text-lg font-bold">لیست سفارشات</h1>
      </header>
      <section className="flex flex-col gap-4">
        {items.map((item) => (
          <OrderedItem key={item.id} params={params} {...item} />
        ))}
        {items.length > 0 && !isLoading && (
          <>
            <hr className="border-sky-blue/75" />
            <div className="flex justify-between">
              <div>
                <PriceTag
                  price={items.reduce((total, orderedItem) => {
                    let item = data.find((item) => item.id === orderedItem.id);
                    return total + (item?.price || 0) * orderedItem.quantity;
                  }, 0)}
                />
              </div>
              <h2>مجموع قیمت</h2>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
