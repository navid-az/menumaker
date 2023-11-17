// react query
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

//components
import AddItemBtn from "../../menu/components/AddItemBtn";
import PriceTag from "../../menu/components/PriceTag";

export default function OrderedItem({ id, quantity, params }) {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["items"],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://127.0.0.1:8000/menu/single/items/${params.orgName}`
      );
      return data;
    },
  });

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  if (!isLoading) {
    let item = data.find((item) => item.id === id);

    return (
      <div className="flex h-7 w-full items-center  justify-between gap-2 sm:h-10">
        <div className="flex-grow">
          <PriceTag
            price={item.price}
            priceUnit={item.priceUnit}
            primaryColor="#0F2C30"
            secondaryColor="#94D9E2"
            isLoading={isLoading}
          ></PriceTag>
        </div>
        <div className="flex h-full basis-7/12 justify-between">
          <AddItemBtn
            primaryColor="#0F2C30"
            secondaryColor="#94D9E2"
            itemId={item.id}
          ></AddItemBtn>
          <div>{item.name}</div>
        </div>
      </div>
    );
  } else {
    ("loading...");
  }
}
