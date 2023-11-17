"use client";

//components
import GoBackBtn from "@/app/components/GoBackBtn";
import OrderedItem from "./components/OrderedItem";

//hooks
import { useItems } from "../menu/components/ItemsContext";
import { useEffect, useState } from "react";

// react query
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import PriceTag from "../menu/components/PriceTag";

export default function Orders({ params }) {
  const { items, getItemQuantity } = useItems();

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["items"],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://127.0.0.1:8000/menu/single/items/${params.orgName}`
      );
      return data;
    },
  });

  return (
    <div className="container mx-auto flex h-screen flex-col gap-8 p-4">
      <header className="flex items-center justify-between transition-all">
        <GoBackBtn absolute={false} link={`/${params.orgName}/menu`} />
        <h1 className=" text-lg font-bold">لیست سفارشات</h1>
      </header>
      <section className="flex flex-col gap-4">
        {items.map((item) => (
          <OrderedItem key={item.id} params={params} {...item} />
        ))}
        {items.length > 0 && (
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
