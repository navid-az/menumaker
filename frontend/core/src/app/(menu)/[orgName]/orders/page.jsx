"use client";

import { useItems } from "../menu/components/ItemsContext";
import Link from "next/link";

export default function Orders({ params }) {
  const { items, getItemQuantity } = useItems();
  console.log(items);
  return (
    <>
      <Link href={`/${params.orgName}/menu`}>Menu</Link>
      {items.map((item) => (
        <div className="flex gap-2" key={item.id}>
          <div>{item.id}</div>
          <div>{item.count}</div>
        </div>
      ))}
    </>
  );
}
